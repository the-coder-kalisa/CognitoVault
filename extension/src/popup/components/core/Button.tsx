import React from "react";
import { ClipLoader } from "react-spinners";

interface Props {
  type?: "submit" | "reset" | "button" | undefined;
  title: string;
  background: string;
  foreground: string;
  action?: () => void;
  loading?: boolean;
}

const Button: React.FC<Props> = ({
  type,
  title,
  background,
  foreground,
  action,
  loading,
}) => {
  return !loading ? (
    <button
      type={type}
      onClick={action}
      style={{ background, color: foreground }}
      className="px-8 font-medium text-[14px] py-2 rounded-full"
    >
      {title}
    </button>
  ) : (
    <div
      style={{ background, color: foreground }}
      className="px-8 font-medium text-[14px] py-2 rounded-full"
    >
      <ClipLoader size={15} color="white" />
    </div>
  );
};

export default Button;
