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
import { signIn } from "next-auth/react";
import { SignInSchema, ISignInSchema } from "./schema";
import useSignIn from "./hook/useSignIn";

const AuthSignInFeature = () => {
  const form = useForm<ISignInSchema>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      identity: "",
      password: "",
    },
  });

  const { mutate, isPending } = useSignIn();

  return (
    <main className="h-screen flex justify-center items-center">
      <div className="flex border border-[#DBDBDB] rounded-tr-[30px] rounded-br-[30px] w-full max-w-7xl h-[85vh]">
        <div className="w-1/2">
          <Image
            src="/images/signin-img.jpg"
            alt="Signin Image"
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
              Sign In To FASCO
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
              <Button variant="outline">
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
              <form
                onSubmit={form.handleSubmit((values) => mutate(values))}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="identity"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Email or Username"
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

                <div className="px-4">
                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Loading..." : "Sign In"}
                  </Button>
                </div>
              </form>
            </Form>

            <div className="px-4 py-3">
              <Button variant="outline" className="w-full" asChild>
                <a href="/auth/sign-up" className="text-blue-500">
                  Register Now
                </a>
              </Button>
              <div className="flex justify-end">
                <Link
                  href="/auth/forget-password"
                  className="text-blue-500 font-bold text-sm hover:underline"
                >
                  Forget Password?
                </Link>
              </div>
            </div>
          </div>

          <p className="pr-14 pb-4 text-sm font-normal text-right">
            FASCO Terms & Conditions
          </p>
        </div>
      </div>
    </main>
  );
};

export default AuthSignInFeature;
