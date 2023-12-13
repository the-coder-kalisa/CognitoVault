import React, { useState } from "react";
import OneImpBox from "../components/OneImpBox";
import clsx from "clsx";
import { BackIcon } from "../components/core/icons";

//@ts-ignore
const ImportPage = ({
  changePage,
}: {
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
      <div className="w-full  p-4 h-full">
        <div className="flex gap-4 items-center">
          <button onClick={() => changePage(5)}>
            <BackIcon />
          </button>
          <p>Import Token</p>
        </div>
        <input
          type="text"
          placeholder="Search Token"
          className="bg-gray-900 px-4 py-2 w-full rounded-full text-white border border-[#0C21C1] my-2"
        />
        <div className="w-full flex justify-between my-2">
          <button
            onClick={() => activeTab != 0 && setActiveTab(0)}
            className={clsx(
              "w-[50%] py-2   transition-all duration-300 border-b",
              activeTab === 0 ? " border-[#0C21C1]" : "border-gray-900"
            )}
          >
            <p>All</p>
          </button>
          <button
            onClick={() => activeTab != 1 && setActiveTab(1)}
            className={clsx(
              "w-[50%] py-2  transition-all duration-300 border-b",
              activeTab === 1 ? " border-[#0C21C1]" : "border-gray-900"
            )}
          >
            <p>Invited</p>
          </button>
        </div>
        {activeTab === 0 ? (
          <div className="w-[100%] h-[70%] overflow-y-auto ">
            {userData.map((oneUser) => {
              return (
                <OneImpBox
                  key={oneUser.id}
                  by={oneUser.by}
                  icon={oneUser.icon}
                  id={oneUser.id}
                  name={oneUser.name}
                />
              );
            })}
          </div>
        ) : (
          <div className="w-[100%] h-[70%] overflow-y-auto">
            {userData.map((oneUser) => {
              return (
                <OneImpBox
                  key={oneUser.id}
                  by={oneUser.by}
                  icon={oneUser.icon}
                  id={oneUser.id}
                  name={oneUser.name}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportPage;
