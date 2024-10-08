import { useState } from "react";
import VaultBox from "../components/common/vault-box";
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
  collection,
} from "firebase/firestore";
import { SyncLoader } from "react-spinners";
import WebsiteIcon from "../icons/website.svg";
import { unsanitizeKey } from "../lib/utils";
import { Vault } from "../types/vault";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { pageAtom, userAtom } from "../lib/atom";
import PrimaryButton from "@/components/common/primary-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/lib/firebase";

const ImportPage = () => {
  // Set page navigation state
  const setPage = useSetRecoilState(pageAtom);

  // Retrieve user information from Recoil state
  const user = useRecoilValue(userAtom);

  // State to track the selected vaults for import
  const [selectedVaults, setSelectedVaults] = useState<Vault[]>([]);

  // Query to fetch vaults where the user has receipts but hasn't shared
  const vaultsQuery = query(
    collection(db, "vaults"),
    where("receipts", "array-contains", user?.email),
    where("sharedBy", "!=", user?.email)
  );

  // Fetch vaults using React Query
  const { data: vaults, isLoading, refetch } = useQuery<Vault[]>(
    "import-vaults",
    async () => {
      // Fetch documents from Firestore
      const vaultsSnapshot = await getDocs(vaultsQuery);

      // Map over the documents to create vault objects
      return vaultsSnapshot.docs.map((vaultData) => {
        const vault = vaultData.data();
        // Construct the URL for the vault
        const url = `https://${unsanitizeKey(vault.domain)}`;
        return {
          ...vault,
          id: vaultData.id,
          url,
        } as Vault;
      });
    },
    {
      refetchOnMount: false,  // Disable refetch on mount
      refetchOnWindowFocus: false,  // Disable refetch on window focus
    }
  );

  // Function to import selected vaults
  const importVaults = async () => {
    try {
      // Process each selected vault
      await Promise.all(
        selectedVaults.map(async (vault) => {
          // Set cookies for the vault
          await Promise.all(
            vault.cookies.map(async (cookie) => {
              return await chrome.cookies.set({
                url: vault.url,
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
          // Store local storage data
          localStorage.setItem(
            vault.url,
            JSON.stringify(vault.localStorage || {})
          );
          // Update Firestore to mark the vault as imported
          await updateDoc(doc(db, "vaults", vault.id), {
            imported: arrayUnion(user?.email),
          });
        })
      );
      // Refetch vaults to update the list
      refetch();
    } catch (error) {
      console.error("Error importing vaults: ", error);
    }
  };

  // Function to split vaults into imported and not imported
  const splitVaults = (vaults?: Vault[]) => {
    const notImported =
      vaults?.filter((vault) => !vault.imported.includes(user!.email!)) ?? [];
    const imported =
      vaults?.filter((vault) => vault.imported.includes(user!.email!)) ?? [];
    return [notImported, imported];
  };

  const [notImported, imported] = splitVaults(vaults);

  return (
    <div className="h-full w-full text-white flex flex-col">
      <div className="flex pt-5 gap-4 grow-0 shrink basis-auto items-center p-3">
        <button onClick={() => {
          setPage(4) // navigate to main page
        }}>
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
                className="flex right-0 flex-col relative"
              >
                <div className="h-[21rem]">
                  {Number(notImported?.length) > 0 ? (
                    notImported.map((vault, index) => (
                      <VaultBox
                        index={index}
                        name={vault.url}
                        desc={`shared by ${vault.sharedBy}`}
                        image={<WebsiteIcon className="w-full h-full" />}
                        id={vault.url}
                        key={vault.url}
                        getAdded={(added) => {
                          if (added) {
                            // Add vault to selectedVaults
                            setSelectedVaults([...selectedVaults, vault]);
                          } else {
                            // Remove vault from selectedVaults
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
                    <div className="h-full w-full text-center justify-center flex items-center text-base font-medium">
                      No vaults which can be imported.
                    </div>
                  )}
                </div>
                <PrimaryButton
                  title="Import"
                  disabled={selectedVaults.length === 0}  // Disable button if no vaults selected
                  className="w-[7rem] right-0 absolute bottom-0"
                  onClick={() => {
                    // Show toast notification while importing vaults
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
                    .map((vault, index) => (
                      <VaultBox
                        index={index}
                        name={vault.url}
                        desc={`${vault.receipts.length} receipts`}
                        image={<WebsiteIcon className="w-full h-full" />}
                        id={vault.url}
                        key={vault.url}
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
