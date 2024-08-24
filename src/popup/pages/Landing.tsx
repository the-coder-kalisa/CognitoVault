import React from "react";
import Logo from "../components/common/Logo";
import { useSetRecoilState } from "recoil";
import { pageAtom } from "../lib/atom";
import PrimaryButton from "@/components/common/primary-button";

const Landing = () => {
  const setPage = useSetRecoilState(pageAtom); // Set page navigation state

  return (
    <div className="flex flex-col h-full w-full items-center justify-center gap-6">
      <Logo />
      <PrimaryButton
        onClick={() => {
          setPage(1); // Navigate to Login page
        }}
        className="bg-blue-700 rounded-full px-8 py-[10px] text-white text-lg font-medium"
        title="Login"
      />
      <PrimaryButton
        onClick={() => {
          setPage(2); // Navigate to Signup Page
        }}
        className="bg-blue-700 rounded-full px-8 py-[10px] text-white text-lg font-medium"
        title="Signup"
      />
    </div>
  );
};

export default Landing;
