import React, { useState } from "react";
import OneImpBox from "../components/OneImpBox";
import BackIcon from "../icons/back.svg";
import { Iuser } from "../types/user";
import toast from "react-hot-toast";
import Button from "../components/core/Button";
import { useQuery } from "react-query";
import { get, push, ref } from "firebase/database";
import { auth, db } from "../lib/firebase";
import { SyncLoader } from "react-spinners";
import WebsiteIcon from "../icons/website.svg";
import { unsanitizeKey } from "../lib/util";
import { Vault } from "../types/vault";

const ImportPage = ({
  changePage,
}: {
  user?: Iuser;
  changePage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { data: vault, isLoading } = useQuery(
    "vault",
    async () => {
      const vaultRef = ref(db, `vault`);
      const vaultSnap = await get(vaultRef);
      const vaultData = vaultSnap.val();

      const vaultArray: any[] = [];

      for (const key in vaultData) {
        if (key !== auth.currentUser?.uid) {
          for (const key2 in vaultData[key]) {
            const url = `https://${unsanitizeKey(key2)}`;
            const receipts = vaultData[key][key2].receipts || [];
            let imported = vaultData[key][key2].imported || [];
            if (typeof imported === "object") {
              imported = Object.values(imported);
            }

            const check =
              receipts.includes(auth.currentUser?.email) &&
              !imported.includes(auth.currentUser?.email);

            if (check) {
              vaultArray.push({
                ...vaultData[key][key2],
                url,
                path: `vault/${key}/${key2}`,
              });
            }
          }
        }
      }

      return vaultArray;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const [vault_data, setVaultData] = useState<Vault[]>([]);

  const importVault = async () => {
    await Promise.all(
      vault_data.map(async (item) => {
        await Promise.all(
          item.cookies.map(async (cookie) => {
            console.log(cookie);
            return await chrome.cookies.set({
              url: item.url,
              name: cookie.name,
              value: cookie.value,
              domain: cookie.domain,
              path: cookie.path,
              secure: cookie.secure,
              httpOnly: cookie.httpOnly,
              expirationDate: cookie.expirationDate,
            });
          })
        );
        localStorage.setItem(item.url, JSON.stringify(item.localStorage || {}));
        await push(ref(db, item.path + "/imported"), auth.currentUser?.email);
      })
    );
  };

  return (
    <div className="  h-full w-full   text-white ">
      <div className="w-full   h-full">
        <div className="flex pt-5 gap-4  items-center p-3">
          <button onClick={() => changePage(5)}>
            <BackIcon className="h-5 w-5" />
          </button>
          <p className="text-xl">Import Vault</p>
        </div>
        <div className="p-4 h-[76%] overflow-y-auto">
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <SyncLoader color="#0C21C1" />
            </div>
          ) : (
            <div className="w-full h-full overflow-y-auto">
              {vault?.map((item) => {
                return (
                  <OneImpBox
                    name={item.url}
                    desc={`${item.receipts.length} receipts`}
                    image={<WebsiteIcon className="w-full h-full" />}
                    id={item.url}
                    getAdded={(added) => {
                      if (added) {
                        setVaultData([...vault_data, item]);
                      } else {
                        setVaultData(
                          vault_data.filter((vault_item) => {
                            return vault_item.url !== item.url;
                          })
                        );
                      }
                    }}
                    key={item.url}
                  />
                );
              })}
            </div>
          )}
        </div>
        <div className="flex justify-end mr-6">
          <Button
            background="#0C21C1"
            foreground="white"
            action={() => {
              toast.promise(importVault(), {
                loading: `Importing ${vault_data.length} vaults`,
                success: "Imported Data",
                error: (error) => {
                  console.log(error);
                  return error?.message || "Failed to Export Data";
                },
              });
            }}
            title={"Import"}
          />
        </div>
      </div>
    </div>
  );
};

export default ImportPage;
