'use client';

import Image from "next/image";
import Link from "next/link";

export default function HeaderComponent() {

  return (
    <div className="flex flex-row items-center justify-between pl-4 py-4 bg-[#99a285] rounded-t-lg">
      <Link href="/" className="flex flex-row items-center">
        <Image src={"/logo.png"} width={120} height={120} alt="Burro 4x" />
      </Link>
      {/* {user && (
        <Link href={"/api/auth/logout"}>
          <h2 className="text-xl mr-12">Logout</h2>
        </Link>
      )} */}
    </div>
  );
}
