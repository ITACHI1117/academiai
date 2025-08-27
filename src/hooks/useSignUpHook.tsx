import { useToast } from "@/components/ui/toast";
import { useSignUp } from "@/queries/auth.queries";
import { signupSchema } from "@/schemas/auth";
import { RegisterData } from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const useSignUpHook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });
  const router = useRouter();

  const { toast } = useToast();

  const SignUpQuery = useSignUp();

  const onSubmit = async (data: RegisterData) => {
    console.log("form submitted");
    toast({
      title: "Setting up your account",
      variant: "info",
    });
    // handle form submission logic here
    SignUpQuery.mutateAsync(data);
  };

  useEffect(() => {
    if (SignUpQuery.isError) {
      const error = SignUpQuery.error as any;
      let errorMessage = "Something went wrong";
      
      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Error creating account",
        variant: "destructive",
        description: errorMessage,
      });
      console.log("Error creating account", error);
    }
  }, [SignUpQuery.isError, SignUpQuery.error]);

  useEffect(() => {
    SignUpQuery.isSuccess &&
      toast({
        title: "Account created successfully",
        variant: "success",
        description: `Account Created Successfully`,
      });
    if (SignUpQuery.isSuccess) {
      router.push("/auth/login");
      console.log("Account created successfully", SignUpQuery.data);
    }
  }, [SignUpQuery.isSuccess]);

  return { register, handleSubmit, errors, onSubmit, SignUpQuery };
};
