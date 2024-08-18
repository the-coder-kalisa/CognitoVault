import { ref } from "firebase/database";
import { db } from "../lib/firebase";
import { User } from "firebase/auth";

export const getUserRef = (user: User) => ref(db, `users/${user.uid}`);