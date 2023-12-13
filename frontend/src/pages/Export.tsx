import React, { useState } from "react";
import Button from "../components/core/Button";
import { BackIcon } from "../components/core/icons";
import Input from "../components/core/Input";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import OneImpBox from "../components/OneImpBox";

const ExportPage = ({
  changePage,
}: {
  changePage: React.Dispatch<React.SetStateAction<number>>;
}) => {
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
    setLoading(true)
    console.log(data);
    setLoading(false)
  };
  const users = [
    {
      id: "1",
      username: "Giovanni",
      fullname: "KALISA INEZA Giovanni",
    },
    {
      id: "1",
      username: "Giovanni",
      fullname: "KALISA INEZA Giovanni",
    },    {
      id: "1",
      username: "Giovanni",
      fullname: "KALISA INEZA Giovanni",
    },
    {
      id: "1",
      username: "Giovanni",
      fullname: "KALISA INEZA Giovanni",
    },
    {
      id: "1",
      username: "Giovanni",
      fullname: "KALISA INEZA Giovanni",
    },    {
      id: "1",
      username: "Giovanni",
      fullname: "KALISA INEZA Giovanni",
    },
  ];
  
  return (
    <div className="  h-full w-full   text-white ">
      <div className="w-[100%]  h-full">
        <div className="flex mt-3 gap-4 items-center p-3">
          <button onClick={() => changePage(5)}>
            <BackIcon />
          </button>
          <p className="text-xl">Export Token</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[100%]  h-[89%] p-4 text-white"
        >
          <Input
            label="Search Name"
            placeholder="Search Receipts"
            error={errors.name?.message}
            register={register}
          />
          <p className="mt-2">Token Recipients</p>
          <div className="flex max-h-[52%] mt-2 flex-col overflow-y-auto">
            {users.map((user) => (
              <OneImpBox
                key={user.id}
                by={user.username}
                id={user.id}
                name={user.fullname}
                image=""
              />
            ))}
          </div>
          <div className="flex justify-end items-center mt-5">
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
