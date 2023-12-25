import { User } from "firebase/auth";

export interface Iuser extends User {
  fullname: string;
  username: string;
  email: string;
  password: string;
}
