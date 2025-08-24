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

// axiosInstance.interceptors.response.use((response) =>{
//     const refreshToken  =localStorage.getItem('refreshToken')
//     if(response.status === 401 && refreshToken){
//         // logic to get new token
//     }
// })
