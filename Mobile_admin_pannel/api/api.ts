import axios from "axios";
import { useAuthStore } from "../store/authStore";
import ENV from "@/utils/ENV";

console.log("API Base URL:", ENV.API_BASE_URL);

const api = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const tokens = useAuthStore.getState().tokens;
    if (tokens?.accessToken) {
      config.headers["Authorization"] = `Bearer ${tokens.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const tokens = useAuthStore.getState().tokens;
        if (tokens?.refreshToken) {
          const response = await axios.post(
            `${ENV.API_BASE_URL}/auth/refresh`,
            { refreshToken: tokens.refreshToken }
          );
          const { accessToken, refreshToken: newRefreshToken } = response.data;

          const user = useAuthStore.getState().user;
          await useAuthStore.getState().setAuth(user, {
            accessToken,
            refreshToken: newRefreshToken,
          });

          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        await useAuthStore.getState().logout();
      }
    }
    return Promise.reject(error);
  }
);

export default api;
