import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "../components/core/Button";
import Input from "../components/core/Input";
import BackIcon from "../icons/back.svg";
import Logo from "../components/Logo";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";

const Login = ({
  changePage,
}: {
  changePage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Please provide a valid email")
      .required(`Please provider your email `),
    password: yup
      .string()
      .max(25, "The password must be at most 25 characters long")
      .min(8, "The password must be at least 8 characters long")
      .required("Please provide the password"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: any) => {
    toast.promise(signInWithEmailAndPassword(auth, data.email, data.password), {
      loading: "Signing in...",
      success: (userCredential) => {
        const user = userCredential.user;
        if (user) {
          changePage(5);
        }
        return "Signed in successfully";
      },
      error: (err) => {
        return err.message;
      },
    });
  };
  return (
    <div className="w-[100%]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[100%] px-8 py-10 text-white"
      >
        <div className="flex mb-4 justify-center">
          <Logo />
        </div>
        <p className="text-white text-2xl font-semibold text-center my-2">
          Log In
        </p>
        <button className="mb-5 mt-3" onClick={() => changePage(0)}>
          <BackIcon className="h-5 w-5" />
        </button>
        <Input
          label="Email"
          placeholder="Enter your Email"
          error={errors.email?.message}
          register={register}
        />
        <Input
          label="Password"
          placeholder="Enter your Password"
          type="password"
          error={errors.password?.message}
          register={register}
        />
        <div className="flex justify-between my-2 text-sm">
          <div></div>
          <button
            onClick={() => changePage(3)}
            className="hover:scale-110 transition-all duration-300"
          >
            Forgot Password
          </button>
        </div>
        <div className="flex justify-end items-center mt-5">
          <Button
            type="submit"
            background="#0C21C1"
            foreground="white"
            title={"Sign In"}
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
