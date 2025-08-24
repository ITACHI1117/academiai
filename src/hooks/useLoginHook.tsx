import { useToast } from "@/components/ui/toast";
import { useLogin } from "@/queries/auth.queries";
import { loginSchema } from "@/schemas/auth";
import { LoginData } from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const useLoginHook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const { toast } = useToast();

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
    LoginQuery.isError &&
      toast({
        title: "Error while trying to Login",
        variant: "destructive",
        description: `${
          LoginQuery.error?.message ||
          LoginQuery.error?.data?.error ||
          "Something went wrong"
        }`,
      });
    LoginQuery.isError &&
      console.log("Error while trying to Login", LoginQuery.error);
  }, [LoginQuery.isError, LoginQuery.error]);

  useEffect(() => {
    LoginQuery.isSuccess &&
      toast({
        title: "Welcome back!",
        variant: "success",
        // description: `Account Created Successfully`,
      });
    if (LoginQuery.isSuccess) {
      console.log("Welcome back!", LoginQuery.data);
      window.location.reload();
    }
  }, [LoginQuery.isSuccess]);

  return { register, handleSubmit, errors, onSubmit, LoginQuery };
};
