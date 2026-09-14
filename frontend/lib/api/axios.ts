import axios from "axios";
import { useAuthStore } from "../store/authStore";

type RefreshResponse = {
  accessToken: string;
  user: ReturnType<typeof useAuthStore.getState>["user"];
};

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
  withCredentials: true,
});

let refreshPromise: Promise<RefreshResponse> | null = null;

const tokenExpiresSoon = (token: string, bufferSeconds = 30) => {
  try {
    const payload = token.split(".")[1];
    const { exp } = JSON.parse(
      window.atob(payload.replace(/-/g, "+").replace(/_/g, "/")),
    ) as { exp?: number };

    return !exp || exp * 1000 <= Date.now() + bufferSeconds * 1000;
  } catch {
    return true;
  }
};

const saveRefreshResponse = (data: RefreshResponse) => {
  const state = useAuthStore.getState();
  if (data.user) {
    state.setAuth(data.user, data.accessToken);
  } else {
    state.setAccessToken(data.accessToken);
  }
};

export const refreshAccessToken = async (): Promise<RefreshResponse> => {
  if (!refreshPromise) {
    refreshPromise = api
      .post<RefreshResponse>("/auth/refresh")
      .then((response) => response.data)
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

api.interceptors.request.use(async (config) => {
  const token = useAuthStore.getState().accessToken;
  const isRefreshEndpoint = config.url?.includes("/auth/refresh");

  if (token && !isRefreshEndpoint && tokenExpiresSoon(token)) {
    const data = await refreshAccessToken();
    saveRefreshResponse(data);
    config.headers.Authorization = `Bearer ${data.accessToken}`;
  } else if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    const isRefreshEndpoint = original?.url?.includes("/auth/refresh");

    if (
      error.response?.status === 401 &&
      original &&
      !original._retry &&
      !isRefreshEndpoint
    ) {
      original._retry = true;
      try {
        const data = await refreshAccessToken();
        saveRefreshResponse(data);

        if (original.headers?.set) {
          original.headers.set("Authorization", `Bearer ${data.accessToken}`);
        } else {
          original.headers = {
            ...original.headers,
            Authorization: `Bearer ${data.accessToken}`,
          };
        }

        return api(original);
      } catch (refreshError) {
        useAuthStore.getState().clearAuth();
        if (typeof window !== "undefined") window.location.assign("/login");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
