import React from "react";

const Landing = ({
  changePage,
}: {
  changePage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className="flex h-full w-full items-center justify-center gap-5">
      <button
        onClick={() => changePage(1)}
        className="bg-blue-600 rounded-md px-4 py-2 text-white text-base"
      >
        Login
      </button>
      <button
        onClick={() => changePage(2)}
        className="bg-blue-600 rounded-md px-4 py-2 text-white text-base"
      >
        Signup
      </button>
    </div>
  );
};

export default Landing;
