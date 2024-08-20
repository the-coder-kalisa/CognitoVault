import React, { useState } from "react";
import OneImpBox from "../components/common/OneImpBox";
import BackIcon from "../icons/back.svg";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { get, push, ref } from "firebase/database";
import { auth, db } from "../lib/firebase";
import { SyncLoader } from "react-spinners";
import WebsiteIcon from "../icons/website.svg";
import { unsanitizeKey } from "../lib/utils";
import { Vault } from "../types/vault";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { pageAtom, userAtom } from "../lib/atom";
import PrimaryButton from "@/components/common/primary-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ImportPage = () => {
  const setPage = useSetRecoilState(pageAtom);
  const { data: vaults, isLoading } = useQuery<Vault[]>(
    "import-vaults",
    async () => {
      const vaultRef = ref(db, `vaults`);
      const vaultSnap = await get(vaultRef);
      const vaultData = vaultSnap.val();

      const vaultArray: Vault[] = [];

      for (const userId in vaultData) {
        if (userId !== auth.currentUser?.uid) {
          for (const sanitizedDomain in vaultData[userId]) {
            const url = `https://${unsanitizeKey(sanitizedDomain)}`;
            const receipts = vaultData[userId][sanitizedDomain].receipts || [];
            if (receipts.includes(auth.currentUser?.email)) {
              vaultArray.push({
                ...vaultData[userId][sanitizedDomain],
                url,
                path: `vault/${userId}/${sanitizedDomain}`,
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

  const user = useRecoilValue(userAtom);

  const splitVaults = (vaults?: Vault[]) => {
    const notImported = vaults?.filter((vault) => {
      return !vault.imported?.includes(user!.uid)
    }) ?? [];
    const imported = vaults?.filter((vault) => {
      return vault.imported?.includes(user!.uid)
    }) ?? [];
    return [notImported, imported]
  }

  const [notImported, imported] = splitVaults(vaults);

  return (
    <div className="h-full w-full text-white flex flex-col">
      <div className="flex pt-5 gap-4 grow-0 shrink basis-auto items-center p-3">
        <button onClick={() => setPage(4)}>
          <BackIcon className="h-5 w-5" />
        </button>
        <p className="text-xl">Import Vault</p>
      </div>
      <Tabs defaultValue="import" className="grow shrink basis-auto">
        <TabsList className="w-full flex mx-1 justify-between my-2">
          <TabsTrigger value="import">Not Imported</TabsTrigger>
          <TabsTrigger value="imported">Imported</TabsTrigger>
        </TabsList>

        <div className="w-full p-4 text-white">
          {isLoading ? (
            <div className="flex h-[18rem] items-center justify-center">
              <SyncLoader color="#0C21C1" />
            </div>
          ) : (
            <>
              <TabsContent
                value="import"
                className="flex h-full flex-col justify-between relative"
              >
                {Number(notImported?.length) > 0 ? (
                  notImported
                    .map((item) => (
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
                    There are no vaults which can be imported.
                  </div>
                )}
                
              </TabsContent>

              <TabsContent
                value="imported"
                className="flex h-full overflow-y-auto flex-col"
              >
                {Number(imported?.length) > 0 ? (
                  imported
                    ?.filter((item) => item)
                    .map((item) => (
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
                    You've not imported any vaults.
                  </div>
                )}
              </TabsContent>
            </>
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default ImportPage;
