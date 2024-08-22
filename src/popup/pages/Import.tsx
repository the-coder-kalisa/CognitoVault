import React, { useState } from "react";
import OneImpBox from "../components/common/OneImpBox";
import BackIcon from "../icons/back.svg";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import {
  query,
  where,
  doc,
  updateDoc,
  arrayUnion,
  getDocs,
} from "firebase/firestore";
import { SyncLoader } from "react-spinners";
import WebsiteIcon from "../icons/website.svg";
import { unsanitizeKey } from "../lib/utils";
import { Vault } from "../types/vault";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { pageAtom, userAtom } from "../lib/atom";
import PrimaryButton from "@/components/common/primary-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { vaultsCollection } from "@/database";

const ImportPage = () => {
  const setPage = useSetRecoilState(pageAtom);
  const user = useRecoilValue(userAtom);
  const vaultsQuery = query(
    vaultsCollection,
    where("receipts", "array-contains", user?.uid),
    where("sharedBy", "!=", user?.email)
  );

  const {
    data: vaults,
    isLoading,
    refetch,
  } = useQuery<Vault[]>(
    "import-vaults",
    async () => {
      const vaults = await getDocs(vaultsQuery);

      return vaults.docs.map((vaultData) => {
        const vault = vaultData.data();
        const url = `https://${unsanitizeKey(vault.domain)}`;
        return {
          ...vault,
          url,
        } as Vault;
      });
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const [selectedVaults, setSelectedVaults] = useState<Vault[]>([]);

  const importVaults = async () => {
    await Promise.all(
      selectedVaults.map(async (item) => {
        await Promise.all(
          item.cookies.map(async (cookie) => {
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
        await updateDoc(doc(vaultsCollection), {
          imported: arrayUnion(user?.uid),
        });
      })
    );
    refetch();
  };

  const splitVaults = (vaults?: Vault[]) => {
    const notImported =
      vaults?.filter((vault) => {
        return !vault.imported.includes(user!.email!);
      }) ?? [];
    const imported =
      vaults?.filter((vault) => {
        return vault.imported.includes(user!.email!);
      }) ?? [];
    return [notImported, imported];
  };

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
                className="flex h-[21rem] right-0 flex-col relative"
              >
                {Number(notImported?.length) > 0 ? (
                  notImported.map((vault) => (
                    <OneImpBox
                      name={vault.url}
                      desc={`shared by ${vault.sharedBy}`}
                      image={<WebsiteIcon className="w-full h-full" />}
                      id={vault.url}
                      key={vault.url}
                      getAdded={(added) => {
                        if (added) {
                          setSelectedVaults([...selectedVaults, vault]);
                        } else {
                          setSelectedVaults((currentVaults) => {
                            return currentVaults.filter(
                              (currentVault) => currentVault !== vault
                            );
                          });
                        }
                      }}
                    />
                  ))
                ) : (
                  <div className="h-[18rem] w-full text-center justify-center flex items-center text-base font-medium">
                    There are no vaults which can be imported.
                  </div>
                )}
                <PrimaryButton
                  title="Import"
                  disabled={selectedVaults.length === 0}
                  className="w-[6rem] absolute bottom-0"
                  onClick={() => {
                    toast.promise(importVaults(), {
                      loading: "Importing vaults",
                      error: "Error importing Vaults",
                      success: "Vaults Imported",
                    });
                  }}
                />
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
