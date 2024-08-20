import { ref } from "firebase/database";
import { auth, db } from "../lib/firebase";
import { User } from "firebase/auth";
import { Iuser } from "@/types/user";

export const getUserRef = (user: User) => ref(db, `users/${user?.uid}`);

export const getVaultsRef = (user: Iuser) => ref(db, `vaults/${user.uid}`);
