"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

import Loader from "../components/Loader";

export default function Home() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      redirect("/login");
    }

    if (session?.user.admin === true) {
      redirect("/admin/dashboard");
    }

    if (session?.user.initialLogin === false) {
      // redirect to new password screen
    }

    redirect("/client/dashboard");
  }, [status, session]);

  return <Loader />;
}
