import axios from "axios";
import { useAuthStore } from "../store/authStore";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    const isRefreshEndpoint = original.url?.includes("/auth/refresh");

    if (
      error.response?.status === 401 &&
      !original._retry &&
      !isRefreshEndpoint
    ) {
      original._retry = true;
      try {
        const { data } = await api.post("/auth/refresh");
        const state = useAuthStore.getState();
        const refreshedUser = data.user ?? state.user;
        if (refreshedUser) {
          useAuthStore.getState().setAuth(refreshedUser, data.accessToken);
        } else {
          useAuthStore.getState().setAccessToken(data.accessToken);
        }
        original.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(original);
      } catch {
        useAuthStore.getState().clearAuth();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default api;
