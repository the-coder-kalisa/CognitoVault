import Logo from "@/components/common/Logo";
import { getUserRef } from "@/database";
import { pageAtom, userAtom } from "@/lib/atom";
import { auth } from "@/lib/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import { signOut, updateEmail } from "firebase/auth";
import { set } from "firebase/database";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRecoilState, useSetRecoilState } from "recoil";
import { z } from "zod";
import BackIcon from "../icons/back.svg";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import PrimaryButton from "@/components/common/primary-button";

const settingsSchema = z.object({
  email: z.string().email({ message: "This email is invalid." }),
  fullname: z.string().min(3, {
    message: "The fullname must be greater than 3 characters.",
  }),
  username: z.string().min(3, {
    message: "The username must be greater than 3 characters.",
  }),
});

interface UpdateUser {
  fullname?: string;
  username?: string;
}

const Settings = () => {
  const setPage = useSetRecoilState(pageAtom);
  const [user, setUser] = useRecoilState(userAtom);

  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      email: user?.email!,
      fullname: user?.fullname,
      username: user?.username,
    },
  });

  const updateUserData = async (values: z.infer<typeof settingsSchema>) => {
    try {
      const { fullname, username, email } = values;
      const hasNameChanges =
        fullname !== user?.fullname || username !== user?.username;
      const hasEmailChange = email !== user?.email;

      if (hasNameChanges || hasEmailChange) {
        // Update user reference for name changes
        if (hasNameChanges) {
          await set(userRef, { fullname, username });
          setUser({ ...user!, fullname, username });
        }

        // Handle email change and sign out
        if (hasEmailChange) {
          await updateEmail(auth.currentUser!, email);
          toast("Logging out..."); // Show the logging out notification
          await signOut(auth);
          localStorage.clear();
          setPage(1);
          setUser(null);
        }

        return Promise.resolve("Updated User");
      } else {
        return Promise.reject("Please change some data.");
      }
    } catch (error: any) {
      return Promise.reject(error.message ?? "Something went wrong");
    }
  };

  const userRef = getUserRef(auth.currentUser!);

  const onSubmit = (values: z.infer<typeof settingsSchema>) => {
    toast.promise(updateUserData(values), {
      loading: "Updating...",
      error: (error) => error,
      success: "Your account was updated.",
    });
  };

  return (
    <div className="h-full w-full overflow-y-scroll">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full px-8 py-10 text-white"
        >
          <div className="flex mb-4 justify-center">
            <Logo />
          </div>
          <p className="text-white text-2xl font-semibold my-2 text-center">
            Settings
          </p>
          <button className="mb-3" onClick={() => setPage(4)}>
            <BackIcon className="h-5 w-5" />
          </button>
          <div className="flex gap-3 flex-col">
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fullname</FormLabel>
                  <FormControl>
                    <Input placeholder="Fullname..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-2">
              <FormLabel>Password</FormLabel>
              <button
                className="bg-slate-300 rounded-md px-2 py-1     text-black" 
                onClick={() => {
                  setPage(8);
                }}
              >
                Change Password
              </button>
            </div>
          </div>
          <div className="flex mt-3 justify-end w-full">
            <PrimaryButton title="Update" type="submit" />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Settings;
