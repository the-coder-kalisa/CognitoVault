import { useState } from "react";
import Logo from "../components/common/Logo";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { pageAtom, userAtom } from "../lib/atom";
import PrimaryButton from "@/components/common/primary-button";
import ProfileIcon from "@/icons/profile.svg";

const MainPage = () => {
  const setPage = useSetRecoilState(pageAtom);
  const [showingNav, setShowingNav] = useState(false);
  const user = useRecoilValue(userAtom);
  return (
    <div
      className="flex flex-col w-full items-center justify-center gap-5 relative text-white"
      onClick={() => showingNav && setShowingNav(false)}
    >
      <div className="flex text-[14px] flex-col items-center gap-2">
        <ProfileIcon className="h-14" />
        <div>@{user?.username}</div>
        <div>{user?.email}</div>
      </div>
      <div className="flex items-center justify-center gap-2">
        <PrimaryButton title="Import" onClick={() => setPage(5)} />
        <PrimaryButton title="Export" onClick={() => setPage(6)} />
      </div>
    </div>
  );
};

export default MainPage;
