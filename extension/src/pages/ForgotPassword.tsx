import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "../components/core/Button";
import Input from "../components/core/Input";
import { BackIcon } from "../components/core/icons";
//@ts-ignore
const ForgotPassword = ({
  changePage,
}: {
  changePage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  //@ts-ignore
  const [loading, setLoading] = useState(false);
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Please provide a valid email")
      .required(`Please provider your email `),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: any) => {
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
          label="Email"
          placeholder="Enter your Email"
          error={errors.email?.message}
          register={register}
        />
        <div className="flex justify-between items-center mt-5">
          <div></div>
          <Button
            type="submit"
            background="#0C21C1"
            foreground="white"
            loading={loading}
            title={"Next"}
            action={() => changePage(4)}
          />
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
