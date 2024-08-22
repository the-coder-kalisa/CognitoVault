import { useState } from "react";
import BackIcon from "../icons/back.svg";
import OneImpBox from "../components/common/OneImpBox";
import { useQuery } from "react-query";
import toast from "react-hot-toast";
import { auth, db } from "../lib/firebase";
import { TagsInput } from "react-tag-input-component";
import { get, ref, set } from "firebase/database";
import { sanitizeKey, unsanitizeKey } from "../lib/utils";
import { SyncLoader } from "react-spinners";
import WebsiteIcon from "../icons/website.svg";
import { Vault } from "../types/vault";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { pageAtom, userAtom } from "../lib/atom";
import PrimaryButton from "@/components/common/primary-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getVaultsRef } from "@/database";

const ExportPage = () => {
  const [receipts, setReceipts] = useState<string[]>([]);
  const user = useRecoilValue(userAtom);
  const vaultsRef = getVaultsRef(user!);

  const exportVault = async () => {
    try {
      if (receipts.length === 0) {
        return Promise.reject("No receipts");
      }

      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      const cookies = await chrome.cookies.getAll({ url: tab.url });
      const localStorage = await chrome.tabs.sendMessage(
        tab.id!,
        "get-local-storage"
      );

      if (!localStorage && cookies.length === 0) {
        return Promise.reject(
          "No Cookies and local storage data found for this current tab."
        );
      }

      // Sanitize the domain to make it Firebase key-friendly
      const sanitizedDomain = sanitizeKey(new URL(tab.url!).hostname);

      // Sanitize localStorage keys and values
      const sanitizedLocalStorage: Record<string, any> = Object.keys(
        localStorage
      ).reduce((acc, key) => {
        acc[sanitizeKey(key)] = localStorage[key];
        return acc;
      }, {} as Record<string, any>);

      // Set the sanitized domain and localStorage as the Firebase data
      await set(ref(db, `vaults/${user?.uid}/${sanitizedDomain}`), {
        cookies,
        localStorage: sanitizedLocalStorage,
        receipts,
        imported: [],
        sharedBy: user?.email,
      });

      return Promise.resolve(`Exported vault ${sanitizedDomain}`);
    } catch (error: any) {
      return Promise.reject(error?.message || "Failed to Export Data");
    }
  };

  const setPage = useSetRecoilState(pageAtom);

  const { data: vaults, isLoading } = useQuery(
    "export-vaults",
    async () => {
      const vaultsSnap = await get(vaultsRef);
      if (!vaultsSnap.exists()) {
        return [];
      }
      let vaultsData = vaultsSnap.val();
      let domains = Object.keys(vaultsData);
      let vaults: Vault[] = [];
      for (let i = 0; i < domains.length; i++) {
        let domain = unsanitizeKey(domains[i]);
        const url = `https://${domain}`;

        vaults.push({
          ...vaultsData[domains[i]],
          url,
        });
      }
      return vaults;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      onError: console.log,
    }
  );

  return (
    <div className="w-full h-full text-white flex flex-col">
      <div className="flex grow-0 shrink basis-auto gap-4 items-center px-3 pb-3 pt-5">
        <button onClick={() => setPage(4)}>
          <BackIcon className="h-5 w-5" />
        </button>
        <p className="text-xl">Export Vault</p>
      </div>
      <Tabs defaultValue="export" className="grow shrink basis-auto">
        <TabsList className="w-full flex mx-1 justify-between my-2">
          <TabsTrigger value="export">Export</TabsTrigger>
          <TabsTrigger value="exported">Exported</TabsTrigger>
        </TabsList>

        <div className="w-full  p-4 text-white">
          <TabsContent
            value="export"
            className="flex h-full flex-col justify-between"
          >
            <TagsInput
              value={receipts}
              onChange={(receipts: string[]) => {
                let newReceipt = receipts[receipts.length - 1];
                if (newReceipt === auth.currentUser?.email) {
                  receipts.pop();
                  toast.error("You cannot add your own email");
                }
                setReceipts(receipts);
                // setReceipts(receipts);
              }}
              name="email"
              classNames={{
                input: "border-0 bg-gray-900 w-full text-black bg-transparent",
                tag: "bg-blue-700 text-white",
              }}
              placeHolder="Enter Recepient's Email"
            />

            <div className="flex justify-end items-center mt-3">
              <PrimaryButton
                onClick={() => {
                  toast.promise(exportVault(), {
                    loading: "Exporting Data",
                    success: "Exported Data",
                    error: (error) => {
                      return error || "Failed to Export Data";
                    },
                  });
                }}
                title="Export"
              />
            </div>
          </TabsContent>

          <TabsContent
            value="exported"
            className="flex h-full overflow-y-auto flex-col"
          >
            {isLoading ? (
              <div className="flex h-full items-center justify-center">
                <SyncLoader color="#0C21C1" />
              </div>
            ) : Number(vaults?.length) > 0 ? (
              vaults?.map((item) => (
                <OneImpBox
                  name={item.url}
                  desc={`${item.receipts.length} receipts`}
                  image={<WebsiteIcon className="w-full h-full" />}
                  id={item.url}
                  key={item.url}
                  getAdded={(added) => {}}
                />
              ))
            ) : (
              <div className="h-[18rem] w-full text-center justify-center flex items-center text-base font-medium">
                You've not exported any vaults
              </div>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ExportPage;
