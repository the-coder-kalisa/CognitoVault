import React, { useEffect, useState } from "react";
import Button from "../components/core/Button";
import BackIcon from "../icons/back.svg";
import ProfileIcon from "../icons/profile.svg";
import Input from "../components/core/Input";
import OneImpBox from "../components/OneImpBox";
import { useQuery } from "react-query";
import axios from "../lib/axios";
import { SyncLoader } from "react-spinners";
import { Iuser } from "../types/user";
import toast from "react-hot-toast";

const ExportPage = ({
  changePage,
}: {
  user?: Iuser;
  changePage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isLoading } = useQuery(
    ["users", search],
    async () => {
      const res = await axios.get(
        `/users/search?search=${search}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (page === 2) {
      setPage(1);
    }
  }, []);

  const [receipts, setReceipts] = useState<string[]>([]);

  const exportData = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const [tab] = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        });
        const cookies = await chrome.cookies.getAll({
          url: tab.url,
        });
        const localStorage = await chrome.tabs.sendMessage(
          tab.id!,
          "get-local-storage"
        );
        const res = await axios.post(
          "/user-data/export",
          {
            cookies,
            localStorage,
            receipts,
            url: tab.url,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage?.token}`,
            },
          }
        );
        resolve(res.data);
      } catch (error) {
        reject(error);
      }
    });
  };

  return (
    <div className="  h-full w-full   text-white ">
      <div className="w-[100%]  h-full">
        <div className="flex h-[11%] gap-4 items-center px-3 pb-3 pt-5">
          <button onClick={() => changePage(5)}>
            <BackIcon className="h-5 w-5" />
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
                toast.promise(exportData(), {
                  loading: "Exporting Data",
                  success: "Exported Data",
                  error: (error) => {
                    return "Failed to Export Data";
                  },
                });
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
