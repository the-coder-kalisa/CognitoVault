import { atom } from "recoil";
import { Iuser } from "../types/user";

export const userAtom = atom<Iuser|null>({
  key: "user",
  default: null,
});

export const pageAtom = atom<number>({
  key: "page",
  default: -1,
});
