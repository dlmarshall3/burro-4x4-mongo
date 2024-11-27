"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

import Loader from "../components/Loader";

export default function Home() {
  const { data: session, status } = useSession();
  const isAdmin = session?.user.admin;

  useEffect(() => {
    if (status === "unauthenticated" || session === null) {
      redirect("/login");
    }

    if (status === "authenticated") {
      if (isAdmin) {
        redirect("/admin/dashboard");
      }

      if (session?.user.initialLogin === true) {
        redirect("/client/change-password");
      }

      redirect("/client/dashboard");
    }
  }, [status, session]);

  return <Loader />;
}
