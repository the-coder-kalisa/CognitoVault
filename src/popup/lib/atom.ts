import { atom } from "recoil";
import { Iuser } from "../types/user";
import { Vault } from "@/types/vault";

// Atom to store the current user state, which can be an Iuser object or null
export const userAtom = atom<Iuser | null>({
  key: "user", // Unique key for this atom
  default: null, // Default value when no user is logged in
});

// Atom to store the current page index or identifier
export const pageAtom = atom<number>({
  key: "page", // Unique key for this atom
  default: -1, // Default value indicating no page or uninitialized state
});

// Atom to store the selected vault along with its index, or null if none is selected
export const selectedVaultAtom = atom<(Vault & { index: number }) | null>({
  key: "selectedVault", // Unique key for this atom
  default: null, // Default value when no vault is selected
});
