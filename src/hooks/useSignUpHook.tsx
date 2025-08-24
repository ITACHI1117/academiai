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
    SignUpQuery.isError &&
      toast({
        title: "Error creating account",
        variant: "destructive",
        description: `${
          SignUpQuery.error?.message ||
          SignUpQuery.error?.data?.error ||
          "Something went wrong"
        }`,
      });
    SignUpQuery.isError &&
      console.log("Error creating account", SignUpQuery.error);
  }, [SignUpQuery.isError, SignUpQuery.error]);

  useEffect(() => {
    SignUpQuery.isSuccess &&
      toast({
        title: "Account created successfully",
        variant: "success",
        description: `Account Created Successfully`,
      });
    if (SignUpQuery.isSuccess) {
      router.push("auth/login");
      console.log("Account created successfully", SignUpQuery.data);
    }
  }, [SignUpQuery.isSuccess]);

  return { register, handleSubmit, errors, onSubmit, SignUpQuery };
};
