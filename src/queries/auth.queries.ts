import {
  login,
  LoginData,
  RegisterData,
  signup,
} from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useSignUp = () => {
  return useMutation({
    mutationFn: (data: RegisterData) => signup(data),
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginData) => login(data),
  });
};
