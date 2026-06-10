"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, XCircle, RefreshCcw, AlertTriangle } from "lucide-react";
import { HealthCardDashboard } from "@/components/Qr-health-card-dashboard";

export default function DoctorProfileVerify({ profile, cardId }) {
  const [verifying, setVerifying] = useState(true);

  const isValidCard = Boolean(profile);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVerifying(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (verifying) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-md z-50 flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 text-center border border-emerald-100">
            <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-200 mx-auto flex items-center justify-center mb-6">
              <img src="/logo.png" alt="Logo" className="w-12 h-12" />
            </div>

            <div className="flex justify-center mb-6">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-emerald-100" />
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-700 animate-spin" />
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 mb-3">
              <ShieldCheck className="w-6 h-6 text-emerald-700" />
              <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                Card Verify করা হচ্ছে
              </h2>
            </div>

            <p className="text-slate-500 leading-7 text-sm">
              রোগীর Smart e-Health Card যাচাই করা হচ্ছে...
              <br />
              Card ID:{" "}
              <span className="font-semibold text-emerald-700">
                {cardId}
              </span>
            </p>

            <div className="mt-6 bg-emerald-50 border border-emerald-100 rounded-xl p-3">
              <p className="text-xs text-emerald-700 font-medium">
                Secure patient record checking...
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Ministry of Health & Family Welfare
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isValidCard) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-red-100 p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-red-50 border border-red-200 mx-auto flex items-center justify-center mb-6">
            <XCircle className="w-11 h-11 text-red-600" />
          </div>

          <h2 className="text-2xl font-bold text-slate-900">
            Card Verification Failed
          </h2>

          <p className="text-slate-500 mt-3 leading-7 text-sm">
            এই Card ID দিয়ে কোনো রোগীর তথ্য পাওয়া যায়নি।
            <br />
            Card ID:{" "}
            <span className="font-semibold text-red-600">
              {cardId}
            </span>
          </p>

          <div className="mt-6 bg-red-50 border border-red-100 rounded-xl p-4 text-left">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-700">
                  Invalid or Unregistered Card
                </p>
                <p className="text-xs text-red-600 mt-1 leading-5">
                  অনুগ্রহ করে সঠিক Smart e-Health Card scan করুন অথবা হাসপাতাল
                  প্রশাসনের সাথে যোগাযোগ করুন।
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => window.location.href = "/doctor"}
            className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700 transition"
          >
            <RefreshCcw className="w-4 h-4" />
            Scan Again
          </button>
        </div>
      </div>
    );
  }

  return <HealthCardDashboard profile={profile} />;
}