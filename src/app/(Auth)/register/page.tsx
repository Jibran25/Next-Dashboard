"use client"

import UsersData from "@/data/users";
import useAuth from "@/hooks/useAuth";
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

export default function RegisterPage() {

  const [responseErrors, setResponseErrors] = useState<string | null>(null);

  const { login, signup } = useAuth();

  const router = useRouter();

  const validationSchema = z.object({
    name: z.string().min(1, { message: "Field is required" }),
    email: z.string().email("Email is invalid").min(1, {message: "Field is required"}),
    password: z.string().min(6, { message: "Password should be 6 characters" }),
    confirmPassword: z.string()
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password doesn't match password",
    path: ["confirmPassword"]
  });

  type ValidationSchema = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema)
  })

  const onSignup: SubmitHandler<ValidationSchema> = (formData) => {
    signup({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    router.push("/dashboard");
  }

  return (
    <>
      <div className="w-full h-[100vh] flex flex-col gap-5 justify-center items-center bg-black">
        <h1 className="text-white text-3xl">Ecommerce Platform</h1>
        <div className="w-[667px] px-8 py-8 shadow-lg border-2 border-black bg-white rounded-md flex flex-col gap-5">
          <h2 className="text-2xl font-bold text-center">Sign Up</h2>
          <div className="flex flex-col gap-2">
            <label>Name</label>
            <input type="text" {...register("name")} className="border border-black border-opacity-20 px-4 py-2"/>
            { errors.name && <ErrorMessage>{ errors.name.message }</ErrorMessage>}
          </div>
          <div className="flex flex-col gap-2">
            <label>Email</label>
            <input type="email" {...register("email")} className="border border-black border-opacity-20 px-4 py-2"/>
            { errors.email && <ErrorMessage>{ errors.email.message }</ErrorMessage>}
          </div>
          <div className="flex flex-col gap-2">
            <label>Password</label>
            <input type="password" {...register("password")} className="border border-black border-opacity-20 px-4 py-2"/>
            { errors.password && <ErrorMessage>{ errors.password.message }</ErrorMessage>}
          </div>
          <div className="flex flex-col gap-2">
            <label>Confirm Password</label>
            <input type="password" {...register("confirmPassword")} className="border border-black border-opacity-20 px-4 py-2"/>
            { errors.confirmPassword && <ErrorMessage>{ errors.confirmPassword.message }</ErrorMessage>}
          </div>
          <div className="flex flex-col gap-2">
            {responseErrors && <ErrorMessage>{responseErrors}</ErrorMessage>}
            <button className="bg-black px-4 py-2 text-xl uppercase font-semibold text-white" onClick={() => handleSubmit(onSignup)()}>Signup</button>
            <p className="text-xs text-center font-bold m-0 leading-none">OR</p>
            <Link href="/login" className="text-center">Already registered?</Link>
          </div>

        </div>
      </div>
    </>
  );
}