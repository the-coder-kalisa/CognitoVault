import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "../components/core/Button";
import Input from "../components/core/Input";
import BackIcon from "../icons/back.svg";
import Logo from "../components/Logo";
import { auth, db } from "../lib/firebase";
import { Iuser } from "../types/user";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import { ref, set } from "firebase/database";

const Signup = ({
  changePage,
}: {
  changePage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const schema = yup.object().shape({
    fullname: yup.string().min(3).required("Please enter your fullname"),
    username: yup.string().min(3).required("Please enter your username"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required(`Please enter your email `),
    password: yup
      .string()
      .max(25, "The password must be at most 25 characters long")
      .min(8, "The password must be at least 8 characters long")
      .required("Please enter the password"),
    // confirmPassword: yup
    //   .string()
    //   .oneOf([yup.ref("password")], "Passwords must match")
    //   .required("Please confirm your password")
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: any) => {
    try {
      await toast.promise(
        createUserWithEmailAndPassword(auth, data.email, data.password),
        {
          loading: "Signing up...",
          success: (userCredential) => {
            const user = userCredential.user;
            if (user) {
              const userRef = ref(db, `users/${user.uid}`);
              set(userRef, {
                fullname: data.fullname,
                username: data.username,
              });
              changePage(5);
            }
            return "Sign up successful!";
          },
          error: (error) => {
            switch (error.code) {
              case "auth/email-already-in-use":
                return "Email already in use";
              case "auth/invalid-email":
                return "Invalid email";
              case "auth/weak-password":
                return "Weak password";
              default:
                return "Something went wrong";
            }
          },
        }
      );
    } catch (error) {
      // toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full h-full overflow-y-scroll">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full px-8 py-10 text-white"
      >
        <div className="flex mb-4 justify-center">
          <Logo />
        </div>
        <p className="text-white text-2xl font-semibold my-2 text-center">
          Sign Up
        </p>
        <button className="mb-3" onClick={() => changePage(0)}>
          <BackIcon className="h-5 w-5" />
        </button>
        <div className="flex flex-col">
          <Input
            label="Fullname"
            placeholder="Enter your fullname"
            error={errors.fullname?.message}
            register={register}
          />
          <Input
            label="Username"
            type="text"
            placeholder="Enter your username"
            error={errors.username?.message}
            register={register}
          />
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
          {/* <Input
            label="Confirm Password"
            placeholder="Confirm your Password"
            type="password"
            error={errors.confirmPassword?.message}
            register={register}
          /> */}
        </div>
        <div className="flex justify-end items-center mt-5">
          <Button
            type="submit"
            background="#0C21C1"
            foreground="white"
            title={"Sign Up"}
          />
        </div>
      </form>
    </div>
  );
};

export default Signup;
