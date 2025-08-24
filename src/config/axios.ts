import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASEURL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");
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
