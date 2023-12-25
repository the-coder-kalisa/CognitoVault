import React, { useState } from "react";
import Button from "../components/core/Button";
import Logo from "../components/Logo";
import { Iuser } from "../types/user";

const MainPage = ({
  changePage,
}: {
  changePage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [showingNav, setShowingNav] = useState(false);

  return (
    <div
      className="flex flex-col w-full items-center justify-center gap-5 relative text-white"
      onClick={() => showingNav && setShowingNav(false)}
    >
      
      <div className="flex text-[14px] flex-col items-center gap-2">
        <Logo />
        {/* <div>@{user?.username}</div>
        <div>{user?.fullname}</div> */}
      </div>

      <Button
        background="#0C21C1"
        foreground="white"
        // loading={loading}
        title={"Import"}
        action={() => changePage(6)}
      />
      <Button
        background="#0C21C1"
        foreground="white"
        // loading={loading}
        title={"Export"}
        action={() => changePage(7)}
      />
    </div>
  );
};

export default MainPage;
