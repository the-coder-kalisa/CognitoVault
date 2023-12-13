import React from "react";
import Logo from "../components/Logo";

const Landing = ({
  changePage,
}: {
  changePage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className="flex flex-col h-full w-full items-center justify-center gap-6">
      <Logo />
      <button
        onClick={() => changePage(1)}
        className="bg-blue-700 rounded-full px-10 py-3 text-white text-lg font-medium"
      >
        Login
      </button>
      <button
        onClick={() => changePage(2)}
        className="bg-blue-700 rounded-full px-10 py-3 text-white text-lg font-medium"
      >
        Signup
      </button>
    </div>
  );
};

export default Landing;
