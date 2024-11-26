"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

import Loader from "../components/Loader";

export default function Home() {
  const { data: session, status } = useSession();
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      redirect("/login");
    }

    if (session?.user.admin === true) {
      redirect("/admin/dashboard");
    }

    if (session?.user.admin === false) {
      redirect("/client/dashboard");
    }

    setIsLoading(false);
  }, [status, session]);

  return <>{loading && <Loader />}</>;
}
