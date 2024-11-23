"use client";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    redirect("/login");
  }

  if (session?.user.admin) redirect("/admin/dashboard");

  redirect("/client/dashboard");
}
