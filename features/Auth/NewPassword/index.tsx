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

export const UserSchema = z
  .object({
    id: z.string().optional(),
    newPassword: z.string().min(8),
    confirmationPassword: z.string().min(8),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmationPassword) {
      ctx.addIssue({
        path: ["confirmationPassword"],
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
      });
    }
  });

export type IUserSchema = z.infer<typeof UserSchema>;

const AuthNewPasswordFeature = () => {
  const form = useForm<IUserSchema>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      newPassword: "",
      confirmationPassword: "",
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
            src="/images/newpassword-img.jpg"
            alt="New Password Image"
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
              Enter Your New Password
            </h2>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((values) => mutate(values))}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="New Password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmationPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Confirmation Password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="px-4">
                  <Button
                    variant="accent"
                    type="submit"
                    className="w-full"
                    disabled={isPending}
                  >
                    {isPending ? "Loading..." : "Submit"}
                  </Button>
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

export default AuthNewPasswordFeature;
