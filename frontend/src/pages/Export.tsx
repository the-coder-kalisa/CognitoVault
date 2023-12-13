import React, { useState } from "react";
import Button from "../components/core/Button";
import { BackIcon } from "../components/core/icons";
import Input from "../components/core/Input";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
//@ts-ignore
const ExportPage = ({
  changePage,
}: {
  changePage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  //@ts-ignore
  const [loading, setLoading] = useState(false);
  const schema = yup.object().shape({
    name: yup.string().required("Please provide the name for the token"),
    users: yup.array().of(yup.string()),
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
    <div className="  h-full w-full   text-white ">
      <div className="w-[100%]  p-4 h-full">
        <div className="flex gap-4 items-center">
          <button onClick={() => changePage(5)}>
            <BackIcon />
          </button>
          <p>Export Token</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[100%]  text-white"
        >
          <Input
            label="Name"
            placeholder="Enter the name for this token"
            error={errors.name?.message}
            register={register}
          />
          <p>Token Recipients</p>
          
          <div className="flex justify-between items-center mt-5">
            <div></div>
            <Button
              type="submit"
              background="#0C21C1"
              foreground="white"
              loading={loading}
              title={"Export"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExportPage;
