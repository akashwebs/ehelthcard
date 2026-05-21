import Link from "next/link";
import { ShieldAlert, Building2, BadgeCheck, Phone, MessageCircle } from "lucide-react";

export default function NotAccessPage() {
  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white border border-emerald-100 rounded-3xl shadow-[0_20px_60px_rgba(15,23,42,0.08)] overflow-hidden">
        <div className="bg-gradient-to-r from-[#01492a] via-emerald-800 to-[#01492a] p-8 text-white text-center">
          <div className="mx-auto w-20 h-20 rounded-full bg-white/15 border border-white/30 flex items-center justify-center mb-5">
            <ShieldAlert className="w-10 h-10" />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold">
            Access Restricted
          </h1>

          <p className="mt-2 text-sm md:text-base text-emerald-50">
            এই route-এ আপনার access নেই
          </p>
        </div>

        <div className="p-6 md:p-10">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full border border-emerald-200 bg-emerald-50 flex items-center justify-center">
              <img src="/logo.png" alt="Logo" className="w-14 h-14 object-contain" />
            </div>
          </div>

          <h2 className="text-center text-xl md:text-2xl font-bold text-slate-800">
            এই page access করার জন্য administration-এর সাথে যোগাযোগ করুন
          </h2>

          <p className="text-center text-slate-500 mt-3 leading-7">
            এই section শুধুমাত্র approved doctor account থেকে access করা যাবে।
            আপনার Doctor ID approve না হলে এই page দেখা যাবে না।
          </p>

          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
              <Building2 className="w-8 h-8 mx-auto text-emerald-700 mb-3" />
              <h3 className="font-bold text-slate-800">Administration</h3>
              <p className="text-xs text-slate-500 mt-2">
                Approval request submit করুন
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
              <BadgeCheck className="w-8 h-8 mx-auto text-emerald-700 mb-3" />
              <h3 className="font-bold text-slate-800">Doctor ID Required</h3>
              <p className="text-xs text-slate-500 mt-2">
                Verified Doctor ID প্রয়োজন
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
              <Phone className="w-8 h-8 mx-auto text-emerald-700 mb-3" />
              <h3 className="font-bold text-slate-800">Contact Support</h3>
              <p className="text-xs text-slate-500 mt-2">
                Help desk-এ যোগাযোগ করুন
              </p>
            </div>
          </div>

          <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center">
            <p className="text-sm font-semibold text-emerald-900">
              Government of the People’s Republic of Bangladesh
            </p>
            <p className="text-xs text-emerald-700 mt-1">
              Ministry of Health and Family Welfare
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
            <Link
              href="/"
              className="px-6 py-3 rounded-lg border border-slate-300 text-slate-700 font-bold text-center hover:bg-slate-50"
            >
              Back to Patient Overview
            </Link>

          

<Link
  href="https://wa.me/8801840262651"
  target="_blank"
  className="px-6 py-3 rounded-lg bg-[#01492a] text-white font-bold flex items-center justify-center gap-2 hover:bg-emerald-900"
>
  <MessageCircle className="w-5 h-5" />
  Contact Administration
</Link>
          </div>
        </div>
      </div>
    </div>
  );
}