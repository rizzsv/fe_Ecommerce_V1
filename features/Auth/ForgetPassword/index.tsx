"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { axiosInstanceToken } from "@/lib/axios";
import { toast } from "sonner";
import { setCookie } from "@/lib/utils";
import Link from "next/link";

export const UserSchema = z.object({
  id: z.string().optional(),
  email: z.string().email(),
  username: z.string().min(3).max(20),
  phoneNum: z.string().min(10).max(15),
});

export type IUserSchema = z.infer<typeof UserSchema>;

const AuthForgetPasswordFeature = () => {
  const form = useForm<IUserSchema>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      email: "",
      username: "",
      phoneNum: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: IUserSchema) => {
      const response = await axiosInstanceToken.post(
        "/v1/api/auth/login",
        values
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      setCookie(data.data.token);
      window.location.href = "/dashboard";
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

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
              <form onSubmit={form.handleSubmit((values) => mutate(values))}>
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
  );
};

export default AuthForgetPasswordFeature;
