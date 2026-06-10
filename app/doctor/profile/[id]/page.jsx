import { notFound } from "next/navigation";
import { HealthCardDashboard } from "@/components/Qr-health-card-dashboard";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export default async function Page({ params }) {
  const { id } = await params; // <-- await দিতে হবে

  const res = await fetch(
    `${API_BASE}/pa-profile/qr-view/${id}`,
    {
      cache: "no-store",
    }
  );

  const result = await res.json();

  if (!res.ok || result.status !== "success") {
    notFound();
  }

  return (
    <HealthCardDashboard
      profile={result.data}
    />
  );
}