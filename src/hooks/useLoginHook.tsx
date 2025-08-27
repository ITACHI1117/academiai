import { useToast } from "@/components/ui/toast";
import { useLogin } from "@/queries/auth.queries";
import { loginSchema } from "@/schemas/auth";
import { LoginData } from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export const useLoginHook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const { toast } = useToast();
  const router = useRouter();

  const LoginQuery = useLogin();

  const onSubmit = async (data: LoginData) => {
    console.log("form submitted");
    // handle form submission logic here
    const promise = LoginQuery.mutateAsync(data);

    toast({
      title: "Logging you in",
      variant: "info",
      //   duration: (await promise) ? 10000 : 3000,
    });
  };

  useEffect(() => {
    if (LoginQuery.isError) {
      const error = LoginQuery.error as any;
      let errorMessage = "Something went wrong";
      
      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error?.response?.status === 400 || error?.response?.status === 401) {
        errorMessage = "Invalid email or password";
      } else if (error?.response?.status === 404) {
        errorMessage = "Service not available";
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Login failed",
        variant: "destructive",
        description: errorMessage,
      });
      console.log("Error while trying to Login", error);
    }
  }, [LoginQuery.isError, LoginQuery.error]);

  useEffect(() => {
    if (LoginQuery.isSuccess && LoginQuery.data) {
      const response = LoginQuery.data.data;
      const token = response.accessToken || response.token;
      
      if (token) {
        try {
          const decoded = jwtDecode(token);
          console.log('Decoded JWT:', decoded);
          
          const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
          const isAdmin = role === 'Admin';
          
          // Token is already stored in cookie by auth service
          
          toast({
            title: "Welcome back!",
            variant: "success",
          });
          
          // Redirect based on admin role in JWT
          if (isAdmin) {
            console.log('Redirecting to admin dashboard');
            router.push('/admin/dashboard');
          } else {
            console.log('Redirecting to user dashboard');
            router.push('/dashboard');
          }
        } catch (error) {
          console.error('JWT decode error:', error);
          router.push('/dashboard');
        }
      }
    }
  }, [LoginQuery.isSuccess, LoginQuery.data, router]);

  return { register, handleSubmit, errors, onSubmit, LoginQuery };
};
