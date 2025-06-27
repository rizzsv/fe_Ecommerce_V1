"use client";

import { CheckCircle } from "lucide-react";
import Link from "next/link";

const VerifyEmail = () => {
  return (
    <main className="h-screen flex justify-center items-center bg-white px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <CheckCircle className="mx-auto text-green-500" size={60} />
        <h1 className="text-2xl font-semibold">Periksa Email Kamu</h1>
        <p className="text-muted-foreground text-sm">
          Kami telah mengirimkan link login ke email kamu. Silakan buka inbox
          dan klik link tersebut untuk melanjutkan.
        </p>
        <Link href="/auth/sign-in" className="text-blue-500 underline text-sm">
          Kembali ke halaman login
        </Link>
      </div>
    </main>
  );
};

export default VerifyEmail;
