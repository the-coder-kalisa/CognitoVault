import React, { useEffect, useState } from "react";
import Button from "../components/core/Button";
import BackIcon from "../icons/back.svg";
import ProfileIcon from "../icons/profile.svg";
import Input from "../components/core/Input";
import OneImpBox from "../components/OneImpBox";
import { useQuery } from "react-query";
import { SyncLoader } from "react-spinners";
import { Iuser } from "../types/user";
import toast from "react-hot-toast";
import { db } from "../lib/firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

const ExportPage = ({
  changePage,
}: {
  user?: Iuser;
  changePage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [userSearch, setUserSearch] = useState("");
  const [vaultSearch, setVaultSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data: users, isLoading: isLoadingUsers } = useQuery(
    ["users", userSearch],
    async () => {
      const usersRef = collection(db, "users");
      const q = query(
        usersRef,
        where("username", ">=", userSearch),
        where("username", "<", userSearch + "\uf8ff"),
      );
      const querySnapshot = await getDocs(q);
      const users: Iuser[] = [];
      console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        users.push(doc.data() as Iuser);
      });
      return users;
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
  const [activeTab, setActiveTab] = useState(0);

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

        if (cookies.length === 0) {
          reject("No cookies found");
        }

        const localStorage = await chrome.tabs.sendMessage(
          tab.id!,
          "get-local-storage"
        );

        if (!localStorage) {
          reject("No local storage");
        }

        addDoc(collection(db, "vault"), {
          cookies,
          localStorage,
          receipts,
        });

        resolve("Exported Data");
      } catch (error) {
        console.log(error);
        // reject(error);
      }
    });
  };

  const { data: vaults, isLoading: isLoadingVaults } = useQuery(
    ["vaults", vaultSearch],
    async () => {},
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      enabled: activeTab === 1,
    }
  );

  return (
    <div className="w-full h-full text-white ">
      <div className="w-full h-full">
        <div className="flex gap-4 items-center px-3 pb-3 pt-5">
          <button onClick={() => changePage(5)}>
            <BackIcon className="h-5 w-5" />
          </button>
          <p className="text-xl">Export Token</p>
        </div>
        <div className="w-full flex mx-1 justify-between my-2">
          <button
            onClick={() => activeTab != 0 && setActiveTab(0)}
            className={`w-1/2 py-2 transition-all text-base font-semibold duration-300 border-b 
                ${activeTab === 0 ? "border-[#0C21C1]" : "border-gray-900"}
              `}
          >
            Export
          </button>
          <button
            onClick={() => activeTab != 1 && setActiveTab(1)}
            className={`w-1/2 py-2 text-base font-semibold transition-all duration-300 border-b ${
              activeTab === 1 ? "border-[#0C21C1]" : "border-gray-900"
            }`}
          >
            Exported
          </button>
        </div>
        <div className="w-full h-[76%] p-4 text-white">
          <Input
            label="Search Name"
            placeholder="Search Receipts"
            // register={register}
            onChange={(e) => {
              setUserSearch(e.target.value);
            }}
          />
          <p className="mt-2">Recipients</p>
          {isLoadingUsers ? (
            <div className="flex flex-col items-center justify-center min-h-[52%]">
              <SyncLoader color="#88dde4" />
            </div>
          ) : (
            <div className="flex mt-2 flex-col overflow-y-auto">
              {users?.map((user: Iuser) => (
                <OneImpBox
                  key={user.uid}
                  by={user.username}
                  id={user.uid}
                  name={user.fullname}
                  getAdded={(added) => {
                    if (added) {
                      setReceipts([...receipts, user.uid]);
                    } else {
                      setReceipts(receipts.filter((id) => id !== user.uid));
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
                    return error || "Failed to Export Data";
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
