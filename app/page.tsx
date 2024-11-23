"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    redirect("/login");
  }

  if (session?.user.admin === true) redirect("/admin/dashboard");

  if(session?.user.admin === false) redirect('/client/dashboard')
}
