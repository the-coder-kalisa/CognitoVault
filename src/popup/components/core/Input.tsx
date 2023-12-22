import React, { useState } from "react";
import OpenEye from "../../icons/openEye.svg";
import ClosedEye from "../../icons/closeEye.svg";

interface Props {
  label?: string;
  placeholder: string;
  error?: string;
  type?: string;
  register?: any;
  onChange?: (value: any) => void;
}

const Input: React.FC<Props> = ({
  label,
  placeholder,
  error,
  type,
  register,
  onChange,
}) => {
  const [showPw, setShowP] = useState(false);
  return (
    <div className="my-[6px] w-full">
      <p className="text-white capitalize mb-2 text-sm">
        {label != undefined && label}
      </p>
      {type !== "password" ? (
        <input
          {...{
            // check if register is defined
            ...(register && register(label?.toLowerCase())),
          }}
          type={type || "text"}
          className={`px-4 py-2 rounded-full border  outline-none w-full bg-gray-900 text-white ${
            error ? "border-red-500" : "border-[#0C21C1]"
          }`}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : (
        <div className="relative w-full ">
          <input
            {...register(label?.toLowerCase())}
            type={showPw ? "text" : "password"}
            className={`px-4 py-2 pr-10 rounded-full border  outline-none w-full bg-gray-900 text-white ${
              error ? "border-red-500" : "border-[#0C21C1]"
            }`}
            placeholder={placeholder}
          />
          <button
            type="button"
            className="absolute right-3 top-[23%]"
            onClick={() => setShowP(!showPw)}
          >
            {!showPw ? (
              <OpenEye className="h-5 w-5 stroke-white" />
            ) : (
              <ClosedEye className="h-5 w-5 stroke-white" />
            )}
          </button>
        </div>
      )}
      <p className="text-sm text-red-500 text-end pt-1">{error}</p>
    </div>
  );
};

export default Input;
