import React, { useState } from "react";
import OneImpBox from "../components/OneImpBox";
import clsx from "clsx";
import { BackIcon } from "../components/core/icons";
import { Iuser } from "../types/user";

const ImportPage = ({
  changePage,
}: {
  user?: Iuser;
  changePage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const userData = [
    { id: "1", image: "icon-1", name: "GPT-3.5", by: "John Doe" },
    { id: "2", image: "icon-2", name: "Netflix", by: "Jane Smith" },
    { id: "3", image: "icon-3", name: "GitHub", by: "Bob Johnson" },
    { id: "4", image: "icon-4", name: "Google", by: "Alice Williams" },
    { id: "1", image: "icon-1", name: "GPT-3.5", by: "John Doe" },
    { id: "2", image: "icon-2", name: "Netflix", by: "Jane Smith" },
    { id: "3", image: "icon-3", name: "GitHub", by: "Bob Johnson" },
    { id: "4", image: "icon-4", name: "Google", by: "Alice Williams" },
    { id: "1", image: "icon-1", name: "GPT-3.5", by: "John Doe" },
    { id: "2", image: "icon-2", name: "Netflix", by: "Jane Smith" },
    { id: "3", image: "icon-3", name: "GitHub", by: "Bob Johnson" },
    { id: "4", image: "icon-4", name: "Google", by: "Alice Williams" },
    { id: "1", image: "icon-1", name: "GPT-3.5", by: "John Doe" },
    { id: "2", image: "icon-2", name: "Netflix", by: "Jane Smith" },
    { id: "3", image: "icon-3", name: "GitHub", by: "Bob Johnson" },
    { id: "4", image: "icon-4", name: "Google", by: "Alice Williams" },
  ];

  return (
    <div className="  h-full w-full   text-white ">
      <div className="w-full   h-full">
        <div className="flex mt-3 gap-4  items-center p-3">
          <button onClick={() => changePage(5)}>
            <BackIcon />
          </button>
          <p className="text-xl">Import Token</p>
        </div>
        <div className="p-4 max-h-[80%] overflow-y-auto">
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
              <p>Global</p>
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
            <div className="w-full max-h-[13.5rem] overflow-y-auto ">
              {userData.map((oneUser) => {
                return (
                  <OneImpBox
                    key={oneUser.id}
                    by={oneUser.by}
                    image={oneUser.image}
                    id={oneUser.id}
                    name={oneUser.name}
                    getAdded={(added: boolean) => {
                      console.log(added)
                    }}
                  />
                );
              })}
            </div>
          ) : (
            <div className="w-[100%] max-h-[13.5rem] overflow-y-auto">
              {userData.map((oneUser) => {
                return (
                  <OneImpBox
                    key={oneUser.id}
                    by={oneUser.by}
                    image={oneUser.image}
                    id={oneUser.id}
                    name={oneUser.name}
                    getAdded={(added: boolean) => {
                      console.log(added)
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>
        <div className="flex justify-end mr-6">
          <button className="bg-blue-700 rounded-full px-10 py-3 text-white text-lg font-medium">
            Import
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportPage;
