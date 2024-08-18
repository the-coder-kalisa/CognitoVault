import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import BackIcon from "../icons/back.svg";
import { useSetRecoilState } from "recoil";
import { pageAtom } from "../lib/atom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PrimaryButton from "@/components/common/primary-button";
import Logo from "@/components/common/Logo";

const forgotSchema = z.object({
  email: z.string().email({ message: "This email is invali" }),
});

const ForgotPassword = () => {
  const setPage = useSetRecoilState(pageAtom);
  const form = useForm<z.infer<typeof forgotSchema>>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = (data: z.infer<typeof forgotSchema>) => {
    console.log(data);
  };
  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full p-4 py-10 text-white"
        >
          <div className="flex mb-4 justify-center">
            <Logo />
          </div>
          <p className="text-white text-xl text-center">Forgot Password</p>
          <button onClick={() => setPage(0)}>
            <BackIcon className="h-5 w-5" />
          </button>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Fullname..." {...field} />
                </FormControl>
                <FormDescription>
                  Enter your Email so as to reset the password
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end mt-3">
            <PrimaryButton type="submit" title="Reset" />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPassword;
