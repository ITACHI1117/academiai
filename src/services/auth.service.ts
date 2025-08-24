import axiosInstance from "@/config/axios";
import Cookies from "js-cookie";

export interface RegisterData {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}
// sign up
export const signup = async (data: RegisterData) => {
  try {
    const response = await axiosInstance.post("/authentication/Register", data);
    return response;
  } catch (error) {
    throw error;
  }
};

// login
export const login = async (data: LoginData) => {
  try {
    const response = axiosInstance.post("/authentication/login", data);
    Cookies.set("accessToken", (await response).data.accessToken);
    Cookies.set("refreshToken", (await response).data.refreshToken);

    return response;
  } catch (error) {
    throw error;
  }
};

// login
export const logout = async () => {
  try {
    const refreshToken = Cookies.get("refreshToken");
    if (refreshToken) {
      // const response = await axiosInstance.post("/authentication/logout", {
      //   refreshToken: refreshToken,
      // });
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      // return response;
    }
  } catch (error) {
    throw error;
  }
};
