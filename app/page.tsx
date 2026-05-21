'use client'

import { useState } from 'react'
import { DoctorCardScanner } from '@/components/doctor-card-scanner'
import { HealthCardDashboard } from '@/components/health-card-dashboard'

export default function Page() {
  const [cardScanned, setCardScanned] = useState(false)

  return (
    <>
       {!cardScanned ? (
        <DoctorCardScanner onCardScanned={() => setCardScanned(true)} />
      ) : (
        <HealthCardDashboard />
      )} 
      {/* <HealthCardDashboard /> */}
    </>
  )
}
