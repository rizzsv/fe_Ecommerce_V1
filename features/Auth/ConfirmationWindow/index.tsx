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
import { ConfirmCodeSchema, IConfirmCodeSchema } from "./schema";
import useConfirmCode from "./hook/useConfirmationWindow";
import useResendCode from "./hook/useResendCode";

const AuthConfirmationWindowFeature = () => {
  const form = useForm<IConfirmCodeSchema>({
    resolver: zodResolver(ConfirmCodeSchema),
    defaultValues: {
      confirmationCode: "",
    },
  });

  const { mutate, isPending } = useConfirmCode();
  const { mutate: resendCode, isPending: isResending } = useResendCode();

  const handleResend = () => {
    const email = localStorage.getItem("recoveryEmail");
    if (email) resendCode(email);
  };

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
                    <button
                      type="button"
                      onClick={handleResend}
                      className="text-blue-500 hover:underline disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      disabled={isResending}
                    >
                      {isResending ? "Resending..." : "Resend Now"}
                    </button>
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
