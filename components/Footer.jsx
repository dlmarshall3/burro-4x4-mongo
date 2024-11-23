"use client";

import { useRouter } from "next/navigation";

export default function FooterComponent() {
  const router = useRouter();

  function handleBackClick() {
    router.back();
  }

  return (
    <>
      <div className="mt-24 underline" onClick={handleBackClick}>
        Back
      </div>
    </>
  );
}
