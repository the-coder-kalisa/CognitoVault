import React, { useState } from "react";
import Button from "../components/core/Button";

//@ts-ignore
const MainPage = ({
  changePage,
}: {
  changePage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [showingNav, setShowingNav] = useState(false);
  return (
    <div
      className="flex flex-col  h-full w-full items-center justify-center gap-5 relative text-white"
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
      <div className="fixed p-2 top-0 left-0 w-[100%]">
        <div className="flex justify-between">
          <div className="m-2 p-2 px-3 border border-[#0C21C1] rounded-full">
            <p className="text-[#0C21C1] text-xl">C</p>
          </div>
          <div className="flex gap-2 items-center">
            <p>Mugisha Yves</p>
            <div
              className="bg-red-500 w-10 h-10 rounded-full cursor-pointer"
              onClick={() => setShowingNav(true)}
            ></div>
          </div>
        </div>
      </div>
      {/* <div className="absolute top-0 left-0">

      </div>
      <div className="absolute top-0 right-0 p-2 ">

      </div> */}
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
