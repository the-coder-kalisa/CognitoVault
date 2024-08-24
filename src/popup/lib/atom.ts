import { atom } from "recoil";
import { Iuser } from "../types/user";
import { Vault } from "@/types/vault";

export const userAtom = atom<Iuser | null>({
  key: "user",
  default: null,
});

export const pageAtom = atom<number>({
  key: "page",
  default: -1,
});

export const selectedVaultAtom = atom<Vault & { index: number } | null>({
  key: "selectedVault",
  default: null
});
