import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "../components/core/Button";
import Input from "../components/core/Input";
import { BackIcon } from "../components/core/icons";
import Logo from "../components/Logo";

const Signup = ({
  changePage,
}: {
  changePage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    fullname: yup.string().min(3).required("Please provide your fullname"),
    username: yup.string().min(3).required("Please provide your username"),
    email: yup
      .string()
      .email("Please provide a valid email")
      .required(`Please provider your email `),
    password: yup
      .string()
      .max(25, "The password must be at most 25 characters long")
      .min(8, "The password must be at least 8 characters long")
      .required("Please provide the password"),
    confirmPassword: yup
      .string()
      .required("Please confirm your password")
      .oneOf([yup.ref("password")], "Passwords must match")
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: any) => {
    setLoading(true);
    console.log(data);
    setLoading(false);
  };
  return (
    <div className="w-full h-full overflow-y-scroll">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full p-4 py-10 text-white"
      >
        <div className="flex mb-4 justify-center">
          <Logo />
        </div>
        <p className="text-white text-2xl font-semibold my-2 text-center">
          Sign Up
        </p>
        <button className="mb-3" onClick={() => changePage(0)}>
          <BackIcon />
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
          <Input
            label="Confirm Password"
            placeholder="Confirm your Password"
            type="password"
            error={errors.confirmPassword?.message}
            register={register}
          />
        </div>
        <div className="flex justify-end items-center mt-5">
          <Button
            type="submit"
            background="#0C21C1"
            foreground="white"
            loading={loading}
            title={"Sign Up"}
          />
        </div>
      </form>
    </div>
  );
};

export default Signup;
