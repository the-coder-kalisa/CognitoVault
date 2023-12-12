import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "../components/core/Button";
import Input from "../components/core/Input";
import { BackIcon } from "../components/core/icons";
//@ts-ignore
const ResetPassword = ({
  changePage,
}: {
  changePage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  //@ts-ignore
  const [loading, setLoading] = useState(false);
  const schema = yup.object().shape({
    password: yup
      .string()
      .max(25, "The password must be at most 25 characters long")
      .min(8, "The password must be at least 8 characters long")
      .required("Please provide the password"),
    "confirm password": yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Please provide the password"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: { "confirm password": string; password: string }) => {
    console.log(data);
  };
  return (
    <div className="w-[100%]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[100%] p-4 py-10 text-white"
      >
        <button onClick={() => changePage(0)}>
          <BackIcon />
        </button>
        <p className="text-white text-xl text-center">Forgot Password</p>
        <p>Enter your Email so as to reset the password</p>
        <Input
          label="Password"
          placeholder="Enter your Password"
          type="password"
          error={errors.password?.message}
          register={register}
        />
        <Input
          label="Confirm Password"
          placeholder="Retype your Password"
          type="password"
          error={errors.password?.message}
          register={register}
        />
        <div className="flex justify-between items-center mt-5">
          <div></div>
          <Button
            type="submit"
            background="#0C21C1"
            foreground="white"
            loading={loading}
            title={"Reset"}
          />
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
