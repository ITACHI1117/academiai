import { logout } from "@/services/auth.service";
import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASEURL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = Cookies.get("refreshToken");
    if (
      error.response.status === 401 &&
      refreshToken &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      // logic to get new token
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BASEURL}/token/refresh`,
          {
            refreshToken,
          }
        );
        const newAccessToken = res.data.accessToken;
        Cookies.set("accessToken", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      } catch (error) {
        console.log(error);
        logout();
        return Promise.reject(error);
      }
      // then retry the request
    }
    return Promise.reject(error);
  }
);
