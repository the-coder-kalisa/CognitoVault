import React, { useEffect, useState } from "react";
import Button from "../components/core/Button";
import { BackIcon, ProfileIcon } from "../components/core/icons";
import Input from "../components/core/Input";
import OneImpBox from "../components/OneImpBox";
import { useQuery } from "react-query";
import axios from "../lib/axios";
import { SyncLoader } from "react-spinners";
import { Iuser } from "../types/user";

const ExportPage = ({
  changePage,
}: {
  user?: Iuser;
  changePage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isLoading } = useQuery(["users", search], async () => {
    const res = await axios.get(
      `/users/search?search=${search}&page=${page}&limit=${limit}`
    );
    return res.data;
  });

  useEffect(() => {
    if (page === 2) {
      setPage(1);
    }
  }, []);

  const [receipts, setReceipts] = useState<string[]>([]);

  // const exportData = () => { };

  return (
    <div className="  h-full w-full   text-white ">
      <div className="w-[100%]  h-full">
        <div className="flex mt-3 gap-4 items-center p-3">
          <button onClick={() => changePage(5)}>
            <BackIcon />
          </button>
          <p className="text-xl">Export Token</p>
        </div>
        <div className="w-[100%]  h-[89%] p-4 text-white">
          <Input
            label="Search Name"
            placeholder="Search Receipts"
            // register={register}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <p className="mt-2">Token Recipients</p>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-[52%]">
              <SyncLoader color="#88dde4" />
            </div>
          ) : (
            <div className="flex min-h-[52%] max-h-[52%] mt-2 flex-col overflow-y-auto">
              {data.users.map((user: Iuser) => (
                <OneImpBox
                  key={user._id}
                  by={user.username}
                  id={user._id}
                  name={user.fullname}
                  getAdded={(added) => {
                    if (added) {
                      setReceipts([...receipts, user._id]);
                    } else {
                      setReceipts(receipts.filter((id) => id !== user._id));
                    }
                  }}
                  image={<ProfileIcon />}
                />
              ))}
            </div>
          )}
          <div className="flex justify-end items-center mt-5">
            <Button
              background="#0C21C1"
              foreground="white"
              // loading={loading}
              action={() => {
                chrome.tabs.query(
                  { active: true, currentWindow: true },
                  (tabs) => {
                    const currentTab = tabs[0];
                    chrome.tabs.executeScript(
                      currentTab.id!,
                      {
                        file: "../contentScript.js",
                      },
                      () => {
                        // Handle the response from the content script
                        chrome.runtime.onMessage.addListener((message) => {
                          if (message.type === "tabData") {
                            const { localStorageData, cookies } =
                              message.payload;

                            // Send data to your API
                            axios
                              .post("/user-data/export", {
                                localStorageData,
                                cookies,
                              })
                              .then((data) => {
                                // Data sent to API successfully, do something with the response if needed
                                console.log("API Response:", data);

                                // Perform export logic here, e.g., trigger a download
                              })
                              .catch((error) => {
                                // Handle errors
                                console.error(
                                  "Error sending data to API:",
                                  error
                                );
                              });
                          }
                        });
                      }
                    );
                  }
                );

                // toast.promise(exportData, {});
              }}
              title={"Export"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportPage;
