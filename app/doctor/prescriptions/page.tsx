import Link from "next/link";
import { Download, Eye, Printer, Search } from "lucide-react";

export default function PrescriptionsPage() {
  const prescriptions = [
    {
      id: "RX-001",
      date: "10 Mar 2025",
      doctor: "Dr. Mahmud Hasan",
      hospital: "Popular Medical College",
      diagnosis: "Diabetes Follow-up",
      image: "/e-prescription.png",
    },
    {
      id: "RX-002",
      date: "14 Jan 2025",
      doctor: "Dr. Mahmud Hasan",
      hospital: "Popular Medical College",
      diagnosis: "Hypertension Review",
      image: "/e-prescription.png",
    },
    {
      id: "RX-003",
      date: "20 Nov 2024",
      doctor: "Dr. Mahmud Hasan",
      hospital: "Popular Medical College",
      diagnosis: "Routine Checkup",
      image: "/e-prescription.png",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5faf7] px-4 py-6 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 rounded-3xl bg-gradient-to-r from-[#01492a] to-emerald-700 p-6 md:p-8 text-white">
          <h1 className="text-2xl md:text-4xl font-bold">Prescriptions</h1>
          <p className="mt-2 text-sm text-emerald-50">
            Patient e-prescription records and printable documents
          </p>
        </div>

        <div className="mb-6 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              placeholder="Search prescription..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-4 outline-none focus:border-emerald-700"
            />
          </div>

          <Link
            href="/e-prescription.png"
            target="_blank"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#01492a] px-6 py-3 font-bold text-white hover:bg-emerald-900"
          >
            <Printer className="w-5 h-5" />
            Print Latest
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {prescriptions.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)]"
            >
              <div className="bg-emerald-50 p-4 border-b border-emerald-100">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="font-bold text-slate-800">{item.diagnosis}</h2>
                    <p className="text-xs text-slate-500 mt-1">{item.id}</p>
                  </div>

                  <span className="rounded-full bg-emerald-700 px-3 py-1 text-xs font-bold text-white">
                    {item.date}
                  </span>
                </div>

                <p className="mt-3 text-sm text-slate-600">{item.doctor}</p>
                <p className="text-xs text-slate-500">{item.hospital}</p>
              </div>

              <div className="p-4">
                <div className="h-[420px] overflow-hidden rounded-2xl border bg-slate-50">
                  <img
                    src={item.image}
                    alt="Prescription"
                    className="h-full w-full object-cover object-top"
                  />
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <Link
                    href={item.image}
                    target="_blank"
                    className="flex items-center justify-center gap-1 rounded-lg border border-slate-200 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </Link>

                  <Link
                    href={item.image}
                    download
                    className="flex items-center justify-center gap-1 rounded-lg border border-slate-200 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                  >
                    <Download className="w-4 h-4" />
                    Save
                  </Link>

                  <Link
                    href={item.image}
                    target="_blank"
                    className="flex items-center justify-center gap-1 rounded-lg bg-[#01492a] py-2 text-xs font-bold text-white hover:bg-emerald-900"
                  >
                    <Printer className="w-4 h-4" />
                    Print
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-emerald-100 bg-white p-4 text-center text-sm text-slate-500">
          🔒 Patient prescription data is confidential and protected.
        </div>
      </div>
    </div>
  );
}