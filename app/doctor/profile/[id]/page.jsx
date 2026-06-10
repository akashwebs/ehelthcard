import DoctorProfileVerify from "../../../../components/DoctorCardScanner";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export default async function Page({ params }) {
  const { id } = await params;

  let profile = null;

  if (id && API_BASE) {
    const res = await fetch(`${API_BASE}/pa-profile/qr-view/${id}`, {
      cache: "no-store",
    });

    const result = await res.json().catch(() => null);

    profile =
      res.ok && result?.status === "success" && result?.data
        ? result.data
        : null;
  }

  return <DoctorProfileVerify profile={profile} cardId={id} />;
}