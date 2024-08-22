import { User } from "firebase/auth";
import { db } from "../lib/firebase";
import { collection } from "firebase/firestore";

export const vaultsCollection = collection(db, "vaults");
