"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DoctorCardScanner } from "@/components/doctor-card-scanner";

export default function Page() {
  const router = useRouter();
  const [cardScanned, setCardScanned] = useState(false);

  const handleCardScanned = () => {
    setCardScanned(true);
    router.push("/doctor/overview");
  };

  return (
    <>
      {!cardScanned && (
        <DoctorCardScanner onCardScanned={handleCardScanned} />
      )}
    </>
  );
}