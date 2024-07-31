"use client"

import Button from "@/components/Shared/Button/Button";
import TextInput from "@/components/Shared/TextInput/TextInput";
import UsersData from "@/data/users";
import useAuth from "@/hooks/useAuth";
import useToast from "@/hooks/useToast";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import tw from "tailwind-styled-components";
import { z } from "zod";

const ErrorMessage = tw.div`
  text-sm text-red m-0
`;

export default function LoginPage() {

  const [responseErrors, setResponseErrors] = useState<string | null>(null);

  const { login } = useAuth();

  const router = useRouter();

  const { toast } = useToast();

  const validationSchema = z.object({
    email: z.string().email("Email is invalid").min(1, {message: "Field is required"}),
    password: z.string().min(1, { message: "Field is required" })
  });

  type ValidationSchema = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema)
  })

  const onLogin: SubmitHandler<ValidationSchema> = (formData) => {
    const users = UsersData;
    let isLoggedIn = false;
    users.forEach((user) => {
      if(user.email === formData.email && formData.password === user.password) {
        isLoggedIn = true;
        setResponseErrors(null);
        login(user);
        toast({
          variant: "positive",
          message: "Logged in sucessfully"
        })
        router.push("/dashboard");
      }
    });

    if(!isLoggedIn) toast({
      variant: "destructive",
      message: "Credentials are invalid"
    }) 
  }

  return (
    <>
      <div className="w-full h-[100vh] flex flex-col gap-5 justify-center items-center bg-black">
        <h1 className="text-white text-3xl">Ecommerce Platform</h1>
        <div className="w-[667px] px-8 py-8 shadow-lg border-2 border-black bg-white rounded-md flex flex-col gap-5">
          <h2 className="text-2xl font-bold text-center">Welcome Admin</h2>
          <div className="flex flex-col gap-2">
            <TextInput
              { ...register("email") }
              labelText="Email"
              type="email"
              paletteColor={errors.email ? "error" : "default"}
              helperText={errors.email ? errors.email.message : null}
            />            
          </div>
          <div className="flex flex-col gap-2">
            <TextInput
              { ...register("password") }
              labelText="Password"
              type="password"
              paletteColor={errors.password ? "error" : "default"}
              helperText={errors.password ? errors.password.message : null}
            />
          </div>
          <div className="flex flex-col gap-2">
            {responseErrors && <ErrorMessage>{responseErrors}</ErrorMessage>}
            <Button
              variant="dark"
              onClick={() => handleSubmit(onLogin)()}
            >Login</Button>
            <p className="text-xs text-center font-bold m-0 leading-none">OR</p>
            <Link href="/register" className="text-center">Create an account</Link>
          </div>
          

        </div>
      </div>
    </>
  );
}