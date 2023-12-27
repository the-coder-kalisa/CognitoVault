import React, { useEffect, useState } from "react";
import Button from "../components/core/Button";
import BackIcon from "../icons/back.svg";
import OneImpBox from "../components/OneImpBox";
import { useQuery } from "react-query";
import { Iuser } from "../types/user";
import toast from "react-hot-toast";
import { auth, db } from "../lib/firebase";
import { TagsInput } from "react-tag-input-component";
import { get, ref, set } from "firebase/database";
import {
  fetchOpenGraphMetadata,
  sanitizeKey,
  unsanitizeKey,
} from "../lib/util";

const ExportPage = ({
  changePage,
}: {
  user?: Iuser;
  changePage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [receipts, setReceipts] = useState([]);
  const exportData = () => {
    return new Promise(async (resolve, reject) => {
      try {
        if (receipts.length === 0) {
          reject("No receipts");
        }

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

        // Sanitize the domain to make it Firebase key-friendly
        const sanitizedDomain = sanitizeKey(new URL(tab.url!).hostname);

        // Sanitize localStorage keys and values
        const sanitizedLocalStorage: Record<string, any> = {};
        for (const key in localStorage) {
          sanitizedLocalStorage[sanitizeKey(key)] = localStorage[key];
        }

        // Setting the sanitized domain and localStorage as the Firebase data
        set(ref(db, `vault/${auth.currentUser?.uid}/${sanitizedDomain}`), {
          cookies,
          localStorage: sanitizedLocalStorage,
          receipts,
        })
          .then(() => {
            resolve("Exported Data");
          })
          .catch((error) => {
            reject(error?.message || "Failed to Export Data");
          });
      } catch (error: any) {
        reject(error?.message || "Failed to Export Data");
      }
    });
  };

  const { data: vault, isLoading } = useQuery(
    "vault",
    async () => {
      const vaultRef = ref(db, `vault/${auth.currentUser?.uid}`);
      const vaultSnap = await get(vaultRef);
      let vaultData = vaultSnap.val();
      let domains = Object.keys(vaultData);
      let vault = [];
      for (let i = 0; i < domains.length; i++) {
        let domain = unsanitizeKey(domains[i]);
        const url = `https://${domain}`;
        const metadata = await fetchOpenGraphMetadata(url);
        vault.push({
          ...metadata,
          ...vaultData[domains[i]],
        });
      }
      return vault;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
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

        <div className="w-full h-[76%] flex flex-col justify-between p-4 text-white">
          {activeTab === 0 ? (
            <>
              <TagsInput
                value={receipts}
                onChange={(e: any) => setReceipts(e)}
                name="email"
                classNames={{
                  input:
                    "border-0 bg-gray-900 w-full text-black bg-transparent",
                  tag: "bg-blue-700 text-white",
                }}
                placeHolder="Enter Recepient's Email"
              />

              <div className="flex justify-end items-center ">
                <Button
                  background="#0C21C1"
                  foreground="white"
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
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExportPage;