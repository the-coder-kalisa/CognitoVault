import { useForm } from "react-hook-form";
import BackIcon from "../icons/back.svg";
import Logo from "../components/common/Logo";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useSetRecoilState } from "recoil";
import { pageAtom, userAtom } from "../lib/atom";
import PrimaryButton from "@/components/common/primary-button";
import { PasswordInput } from "@/components/ui/password-input";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSChema = z
  .object({
    email: z.string().email({ message: "This email is invali" }),
    password: z.string(),
  })
  .required();

const Login = () => {
  const setPage = useSetRecoilState(pageAtom);
  const form = useForm<z.infer<typeof loginSChema>>({
    resolver: zodResolver(loginSChema),
  });

  const setUser = useSetRecoilState(userAtom);

  const onSubmit = async (data: z.infer<typeof loginSChema>) => {
    toast.promise(signInWithEmailAndPassword(auth, data.email, data.password), {
      loading: "Signing in...",
      success: (userCredential) => {
        const user = userCredential.user;
        if (user) {
          // setUser({
          //   ...user,

          // })
          setPage(5);
        }
        return "Signed in successfully";
      },
      error: (err) => {
        return err.message;
      },
    });
  };
  return (
    <div className="w-[100%]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[100%] px-8 py-10 text-white"
        >
          <div className="flex mb-4 justify-center">
            <Logo />
          </div>
          <p className="text-white text-2xl font-semibold text-center my-2">
            Log In
          </p>
          <button className="mb-5 mt-3" onClick={() => setPage(0)}>
            <BackIcon className="h-5 w-5" />
          </button>
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
              <FormItem className="mt-2">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Password..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between my-2 text-sm">
            <div></div>
            <button
              onClick={() => setPage(3)}
              className="hover:scale-110 transition-all duration-300"
            >
              Forgot Password
            </button>
          </div>
          <div className="flex justify-end items-center mt-5">
            <PrimaryButton title="Login" type="submit" className="ml-auto" />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Login;
