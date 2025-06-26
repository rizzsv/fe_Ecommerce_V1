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
  confirmationCode: z.string().min(2),
});

export type IUserSchema = z.infer<typeof UserSchema>;

const AuthConfirmationWindowFeature = () => {
  const form = useForm<IUserSchema>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      confirmationCode: "",
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
            src="/images/confirmationcode-img.jpg"
            alt="Confrimation Code Image"
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
              Enter The Confirmation Code
            </h2>

            <Form {...form}>
              <form onSubmit={form.handleSubmit((values) => mutate(values))}>
                <FormField
                  control={form.control}
                  name="confirmationCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Confirmation Code"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="px-4 pt-4 space-y-1.5">
                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Loading..." : "Recover Account"}
                  </Button>
                  <div className="flex justify-center items-center gap-1 font-normal text-sm leading-10 tracking-[8%]">
                    <span>Didn’t receive Confirmation Code?</span>
                    <Link href="/auth/sign-in" className="text-blue-500">
                      Resend Now
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

export default AuthConfirmationWindowFeature;
