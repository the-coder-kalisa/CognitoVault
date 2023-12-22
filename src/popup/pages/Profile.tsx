import React, { useState } from "react";
import BackIcon from "../icons/back.svg";
import OneImpBox from "../components/OneImpBox";
import { Iuser } from "../types/user";

const ProfilePage = ({
  changePage,
}: {
  user?: Iuser;
  changePage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const userData = [
    { id: "1", icon: "icon-1", name: "GPT-3.5", by: "John Doe" },
    { id: "2", icon: "icon-2", name: "Netflix", by: "Jane Smith" },
    { id: "3", icon: "icon-3", name: "GitHub", by: "Bob Johnson" },
    { id: "4", icon: "icon-4", name: "Google", by: "Alice Williams" },
    { id: "1", icon: "icon-1", name: "GPT-3.5", by: "John Doe" },
    { id: "2", icon: "icon-2", name: "Netflix", by: "Jane Smith" },
    { id: "3", icon: "icon-3", name: "GitHub", by: "Bob Johnson" },
    { id: "4", icon: "icon-4", name: "Google", by: "Alice Williams" },
    { id: "1", icon: "icon-1", name: "GPT-3.5", by: "John Doe" },
    { id: "2", icon: "icon-2", name: "Netflix", by: "Jane Smith" },
    { id: "3", icon: "icon-3", name: "GitHub", by: "Bob Johnson" },
    { id: "4", icon: "icon-4", name: "Google", by: "Alice Williams" },
    { id: "1", icon: "icon-1", name: "GPT-3.5", by: "John Doe" },
    { id: "2", icon: "icon-2", name: "Netflix", by: "Jane Smith" },
    { id: "3", icon: "icon-3", name: "GitHub", by: "Bob Johnson" },
    { id: "4", icon: "icon-4", name: "Google", by: "Alice Williams" },
  ];
  return (
    <div className="  h-full w-full   text-white ">
      <div className="w-[100%]   h-full">
        <div className="flex gap-4 items-center p-3">
          <button onClick={() => changePage(5)}>
            <BackIcon className="h-5 w-5" />
          </button>
          <p className="text-xl">Your Profile</p>
        </div>
        <div className="h-[89%] overflow-y-auto p-4">
          <div className="h-[200px] flex items-center justify-center flex-col gap-2">
            <div className="w-20 h-20 bg-red-500 rounded-full"></div>
            <p className="text-lg">Mugisha Yves</p>
            <p className="text-gray-500 text-sm">mugishayves189000@gmail.com</p>
          </div>
          <div className="w-full flex justify-between my-2">
            <button
              onClick={() => activeTab != 0 && setActiveTab(0)}
              className={`w-[50%] py-2 transition-all duration-300 border-b ${
                activeTab === 0 ? " border-[#0C21C1]" : "border-gray-900"
              }`}
            >
              <p>Imported</p>
            </button>
            <button
              onClick={() => activeTab != 1 && setActiveTab(1)}
              className={`w-[50%] py-2 transition-all duration-300 border-b ${
                activeTab === 1 ? " border-[#0C21C1]" : "border-gray-900"
              }
              `}
            >
              <p>Exported</p>
            </button>
          </div>
          {activeTab === 0 ? (
            <div className="w-[100%] h-[70%]  ">
              {userData.map((oneUser) => {
                return (
                  <OneImpBox
                    key={oneUser.id}
                    by={oneUser.by}
                    image={oneUser.icon}
                    id={oneUser.id}
                    name={oneUser.name}
                    getAdded={(added) => {
                      console.log(added);
                    }}
                  />
                );
              })}
            </div>
          ) : (
            <div className="w-[100%] h-[70%] ">
              {userData.map((oneUser) => {
                return (
                  <OneImpBox
                    key={oneUser.id}
                    by={oneUser.by}
                    image={oneUser.icon}
                    id={oneUser.id}
                    name={oneUser.name}
                    getAdded={(added) => {
                      console.log(added);
                      ("");
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
