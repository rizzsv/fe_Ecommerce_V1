"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { ForgetPasswordSchema, IForgetPasswordSchema } from "./schema";
import useForgetPassword from "./hook/useForgetPassword";

const AuthForgetPasswordFeature = () => {
  const form = useForm<IForgetPasswordSchema>({
    resolver: zodResolver(ForgetPasswordSchema),
    defaultValues: {
      email: "",
      username: "",
      phoneNum: "",
    },
  });

  const { mutate, isPending } = useForgetPassword();

  return (
    <main className="h-screen flex justify-center items-center">
      <div className="flex border border-[#DBDBDB] rounded-tr-[30px] rounded-br-[30px] w-full max-w-7xl h-[85vh]">
        <div className="w-1/2">
          <Image
            src="/images/forgetpassword-img.jpg"
            alt="Forget Password Image"
            width={949}
            height={1077}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        <div className="w-1/2 flex flex-col">
          <h1 className="font-spaceGrotesk font-normal text-4xl leading-[100%] tracking-normal text-[#484848] pl-28 pt-10">
            FASCO
          </h1>

          <div className="px-28 flex-grow flex flex-col justify-center">
            <h2 className="font-normal text-2xl leading-10 tracking-normal pb-10">
              Forget Password
            </h2>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((values) => {
                  localStorage.setItem("recoveryEmail", values.email);
                  localStorage.setItem("recoveryUsername", values.username);
                  localStorage.setItem("recoveryPhoneNum", values.phoneNum);
                  mutate(values);
                })}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Email Address"
                            type="email"
                            {...field}
                          />
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
                        <FormControl>
                          <Input
                            placeholder="Username"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="phoneNum"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Phone Number"
                          type="tel"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="px-4 pt-4 space-y-1.5">
                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Loading..." : "Send Confirmation Code"}
                  </Button>
                  <div className="flex justify-center items-center gap-1 font-normal text-sm leading-10 tracking-[8%]">
                    <span>Already have an account?</span>
                    <Link
                      href="/auth/sign-in"
                      className="text-blue-500 hover:underline"
                    >
                      Login
                    </Link>
                  </div>
                </div>
              </form>
            </Form>
          </div>

          <p className="pr-14 pb-4 text-sm font-normal text-right">
            FASCO Terms & Conditions
          </p>
        </div>
      </div>
    </main>
  );
};

export default AuthForgetPasswordFeature;
