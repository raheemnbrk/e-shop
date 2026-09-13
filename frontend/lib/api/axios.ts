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

const refreshAccessToken = async (): Promise<RefreshResponse> => {
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

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
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
        const state = useAuthStore.getState();
        if (data.user) {
          state.setAuth(data.user, data.accessToken);
        } else {
          state.setAccessToken(data.accessToken);
        }

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
