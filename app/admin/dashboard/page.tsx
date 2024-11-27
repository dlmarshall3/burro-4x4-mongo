"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.admin;

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/login");
    }

    if (!isAdmin) {
      redirect("../client/dashboard");
    }
  }, [isAdmin, status]);

  return (
    <>
      {isAdmin && (
        <div className="flex flex-col">
          <Link href="/admin/add-vehicle">
            <button className="mb-4 w-3/4 rounded-full bg-[#006b78] p-2 text-white shadow-lg hover:bg-transparent hover:text-black hover:outline hover:outline-[#006b78] sm:w-1/2 lg:w-1/3">
              Add vehicle
            </button>
          </Link>
          <Link href="/admin/vehicles">
            <button className="mb-4 w-3/4 rounded-full bg-[#5d8075] p-2 text-white shadow-lg hover:bg-transparent hover:text-black hover:outline hover:outline-[#5d8075] sm:w-1/2 lg:w-1/3">
              Update vehicle
            </button>
          </Link>
          <Link href="/admin/register">
            <button className="w-3/4 rounded-full bg-[#749d2d] p-2 text-white shadow-lg hover:bg-transparent hover:text-black hover:outline hover:outline-[#749d2d] sm:w-1/2 lg:w-1/3">
              Add client
            </button>
          </Link>
        </div>
      )}
    </>
  );
}
