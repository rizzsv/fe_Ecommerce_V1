"use client";

import React, { useState } from "react";
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
import { signIn } from "next-auth/react";
import { SignUpSchema, ISignUpSchema } from "./schema";
import useSignUp from "./hook/useSignUp";
import SignUpWithEmailModal from "@/components/common/SignUpEmailModal";

const AuthSignUpFeature = () => {
  const [isEmailModalOpen, setEmailModalOpen] = useState(false);

  const form = useForm<ISignUpSchema>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      phoneNum: "",
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useSignUp();

  return (
    <>
      <main className="h-screen flex justify-center items-center">
        <div className="flex border border-[#DBDBDB] rounded-tr-[30px] rounded-br-[30px] w-full max-w-7xl h-[85vh]">
          <div className="w-1/2">
            <Image
              src="/images/signup-img.jpg"
              alt="Signup Image"
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
              <h2 className="font-normal text-2xl leading-10 tracking-normal">
                Create Account
              </h2>
              <div className="flex justify-between items-center pt-2">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => signIn("google", { callbackUrl: "/" })}
                >
                  <Image
                    src="/images/google-img.png"
                    alt="Google Icon"
                    width={20}
                    height={20}
                  />{" "}
                  Sign up with Google
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setEmailModalOpen(true)}
                >
                  <Image
                    src="/images/gmail-img.png"
                    alt="Gmail Icon"
                    width={20}
                    height={20}
                  />{" "}
                  Sign up with Email
                </Button>
              </div>

              <div className="text-muted-foreground text-xl font-bold leading-10 tracking-[0.08em] py-10 text-center">
                — OR —
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit((values) => mutate(values))}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
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
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Password"
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="px-4 pt-4 space-y-1.5">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isPending}
                    >
                      {isPending ? "Loading..." : "Create Account"}
                    </Button>
                    <div className="flex justify-center items-center gap-1 font-normal text-sm leading-10 tracking-[8%]">
                      <span>Already have an account?</span>
                      <Link href="/auth/sign-in" className="text-blue-500">
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

      <SignUpWithEmailModal
        open={isEmailModalOpen}
        setOpen={setEmailModalOpen}
      />
    </>
  );
};

export default AuthSignUpFeature;
