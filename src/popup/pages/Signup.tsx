import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import BackIcon from "../icons/back.svg";
import Logo from "../components/common/Logo";
import { auth } from "../lib/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { set } from "firebase/database";
import toast from "react-hot-toast";
import { useSetRecoilState } from "recoil";
import { pageAtom, userAtom } from "../lib/atom";
import { getUserRef } from "../database";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import PrimaryButton from "@/components/common/primary-button";

const signupSchema = z
  .object({
    fullname: z.string().min(3, {
      message: "The fullname must be greater than 3 characters.",
    }),
    username: z.string().min(3, {
      message: "The username must be greater than 3 characters.",
    }),
    email: z.string().email({ message: "This email is invalid." }),
    password: z
      .string()
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,20}$/,
        {
          message:
            "The password must be 8-20 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character from @$!%*?&#^.",
        }
      ),
    confirmPassword: z.string(),
  })
  .required()
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const Signup = () => {
  const setPage = useSetRecoilState(pageAtom);

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
  });

  const createUser = async (values: z.infer<typeof signupSchema>) => {
    const userCrendential = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    await sendEmailVerification(userCrendential.user);
    const userRef = getUserRef(userCrendential.user);
    await set(userRef, {
      fullname: values.fullname,
      username: values.username,
    })
    localStorage.clear();
    await auth.signOut();
  };
  const onSubmit = async (values: z.infer<typeof signupSchema>) => {
    toast.promise<void>(createUser(values), {
      loading: "Signing up...",
      success: "Email verification link set",
      error: (error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            return "Email already in use";
          case "auth/invalid-email":
            return "Invalid email";
          case "auth/weak-password":
            return "Weak password";
          default:
            return "Something went wrong";
        }
      },
    });
  };

  return (
    <div className="w-full h-full overflow-y-scroll">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full px-8 py-10 text-white"
        >
          <div className="flex mb-4 justify-center">
            <Logo />
          </div>
          <p className="text-white text-2xl font-semibold my-2 text-center">
            Sign Up
          </p>
          <button className="mb-3" onClick={() => setPage(0)}>
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

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Password..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="Confirm Password..."
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex mt-3 justify-end w-full">
            <PrimaryButton title="Signup" type="submit" />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Signup;
