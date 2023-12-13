import React, { useState } from "react";
import Button from "../components/core/Button";
import Logo from "../assets/logo.png";

const MainPage = ({
  changePage,
}: {
  changePage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [showingNav, setShowingNav] = useState(false);
  return (
    <div
      className="flex flex-col h-full w-full items-center justify-center gap-5 relative text-white"
      onClick={() => showingNav && setShowingNav(false)}
    >
      {showingNav && (
        <div className="absolute w-[200px] top-16 right-1 shadow-sm shadow-white p-2 transition-all duration-300 rounded-md">
          <button
            onClick={() => changePage(8)}
            className="py-1 px-4 hover:scale-110 w-full text-left"
          >
            Profile
          </button>
          <button
            onClick={() => changePage(1)}
            className="py-1 px-4 hover:scale-110 w-full text-left"
          >
            Logout
          </button>
        </div>
      )}

      <div className="flex flex-col items-center gap-3">
        <img src={Logo} className="h-8" />
        <div>@Giovanni</div>
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
