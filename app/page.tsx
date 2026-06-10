"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DoctorCardScanner } from "@/components/doctor-card-scanner";

export default function Page() {
  const router = useRouter();
  const [cardScanned, setCardScanned] = useState(false);


useEffect(() => {
  // Your side effect logic goes here
router.push("/doctor");
 
}, []);
  return (
   
      
        <div>
          <p> Please Wait..</p>
        </div>
     
  
  );
}