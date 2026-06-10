'use client'

import { useState, useEffect } from 'react'
import { Menu,CalendarDays, Landmark, Loader2,ChevronRight, AlertCircle, Clock, Users, Zap, Heart, Pill, AlertTriangle, MapPin, Phone, Calendar, Droplet } from 'lucide-react'

import Link from 'next/link'
import Sidebar from './Sidebar'
import NoticeMarquee from './NoticeMarquee'

const API_BASE = "http://localhost:5000/api/v1/pa-profile";

export function HealthCardDashboard({profile}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  const InfoItem = ({ icon: Icon, label, value, color = "text-[#0b4f8a]" }) => (
  <div className="flex items-start gap-3">
    <Icon className={`w-5 h-5 mt-0.5 ${color} fill-current`} />
    <div className="grid grid-cols-[120px_1fr] items-center gap-4">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="text-xs font-semibold text-slate-800">{value}</p>
    </div>
  </div>
);
  

  const quickActions = [
    { icon: '✏️', label: 'New Prescription' },
    { icon: '🧪', label: 'Add Lab Test' },
    { icon: '🔗', label: 'Referral' },
    { icon: '📋', label: 'Print Summary' },
  ]

  const medicalConditions = [
    { name: 'Diabetes Mellitus (Type 2)', date: 'Diagnosed on 12 Jan 2021' },
    { name: 'Hypertension', date: 'Diagnosed on 20 Aug 2019' },
    { name: 'Hypothyroidism', date: 'Diagnosed on 05 Mar 2022' },
  ]

  const medications = [
    { name: 'Metformin 500mg', dose: '1+1+0 (After Meal)' },
    { name: 'Amlodipine 5mg', dose: '1+0+0 (After Meal)' },
    { name: 'Levothyroxine 50mg', dose: '1+0+0 (Before Breakfast)' },
  ]

  const allergies = [
    { name: 'Penicillin', reaction: 'Reaction: Severe Rash, Itching' },
  ]

  const labReports = [
    { test: 'FBS (Fasting Blood Sugar)', date: '10 Mar 2025' },
    { test: 'HbA1c', date: '10 Mar 2025' },
    { test: 'Serum Creatinine', date: '10 Mar 2025' },
  ]

  const prescriptions = [
    { drug: 'COVID-19 Vaccine', date: '12 Aug 2021' },
    { drug: 'Influenza Vaccine', date: '10 Nov 2022' },
    { drug: 'Hepatitis B', date: '20 Jul 2018' },
  ]

  const immunizations = [
    { vaccine: 'COVID-19 Vaccine', date: '12 Aug 2021' },
    { vaccine: 'Influenza Vaccine', date: '10 Nov 2022' },
    { vaccine: 'Hepatitis B', date: '20 Jul 2018' },
  ]

  const visitHistory = [
    { date: '10 Mar 2025', facility: 'Popular Medical College' },
    { date: '14 Jan 2025', facility: 'Popular Medical College' },
    { date: '20 Nov 2024', facility: 'Popular Medical College' },
  ]




  const formatHealthId = (value) => {
    if (!value) return "N/A";
    return value.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-GB").replaceAll("/", "-");
  };

  const getAge = (dob) => {
    if (!dob) return "";
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return `${age} Y`;
  };

  const formatMobile = (mobile) => {
    if (!mobile) return "N/A";
    return mobile.replace(/^(\d{5})(\d+)/, "$1-$2");
  };

 /*  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-10 flex items-center justify-center text-slate-600">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        Patient profile loading...
      </div>
    );
  } */

  /* if (error || !profile) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-6 font-semibold">
        {error || "Patient profile not found"}
      </div>
    );
  } */


  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 md:px-6 py-3 md:py-4 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2 md:gap-4 w-full sm:w-auto">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg flex-shrink-0"
            >
              <Menu className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 md:w-12 md:h-12  rounded-full flex items-center justify-center flex-shrink-0">
                <img alt="" src={"/logo.png"}/>
              </div>
              <div className="min-w-0">
                <h1 className="text-base md:text-lg font-bold text-gray-900">SMART</h1>
                <p className="text-xs text-gray-600">e-HEALTH CARD</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 md:gap-4 w-full sm:w-auto text-xs md:text-sm">
            <div className="hidden md:flex items-center gap-2 bg-green-50 px-3 md:px-4 py-2 rounded-lg flex-shrink-0">
              <div className="w-4 h-4 md:w-5 md:h-5 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs">✓</span>
              </div>
              <div className="text-xs md:text-sm">
                <p className="font-semibold text-gray-900">Card Verified Successfully</p>
                <p className="text-xs text-gray-600">Health ID: 1990 1234 5678 9012</p>
              </div>
            </div>

            <div className="text-right text-xs md:text-sm hidden sm:block">
              <p className="text-gray-600">Scanned At</p>
              <p className="font-semibold text-gray-900">
  {new Date().toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })}
</p>
            </div>

            {/* <button className="p-2 hover:bg-gray-100 rounded-lg flex-shrink-0 ml-auto sm:ml-0">
              <span className="text-lg md:text-xl">⋮</span>
            </button> */}
          </div>
        </div>
      </div>
      <div className="px-4 md:px-6 py-3">
   <NoticeMarquee />
</div>

      <div className="flex flex-col lg:flex-row gap-4 md:gap-6 px-4 md:px-6 py-4 md:py-6 max-w-full">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed lg:relative top-[3.5rem] left-0 h-[calc(100vh-3.5rem)] lg:top-0 lg:h-auto w-56 flex flex-col gap-4 md:gap-6 transition-transform duration-300 lg:translate-x-0 z-30 overflow-y-auto bg-white p-4 md:p-5 border-r border-gray-200 lg:border-r-0`}
        >
          {/* Navigation Menu */}
          <Sidebar/>

          {/* Quick Actions */}
          <div className="border-t border-gray-200 pt-4 md:pt-5">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm md:text-base px-1">Quick Actions</h3>
            <div className="space-y-2">
              {quickActions.map((action, idx) => (
                <button
                  key={idx}
                  className="w-full flex items-center gap-3 px-3 md:px-4 py-2 text-gray-700 hover:bg-[#01492a] hover:text-white rounded-lg transition-colors text-xs md:text-sm"
                >
                  <span className="text-base md:text-lg flex-shrink-0">{action.icon}</span>
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* Patient Info Card */}
           <div className="w-full rounded-2xl bg-white p-3 shadow-[0_8px_30px_rgba(15,23,42,0.08)] border border-slate-100">
       <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-5 md:p-7">
      <div className="grid grid-cols-1 lg:grid-cols-[170px_1fr_360px] gap-6 items-center">
        {/* Patient Photo */}
        <div className="w-[150px] h-[170px] rounded-xl overflow-hidden border border-slate-100 bg-slate-100 shadow-sm mx-auto lg:mx-0">
          <img
            src={profile.profileImage || "/profile.jpg"}
            alt={profile.fullName || "Patient"}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Patient Details */}
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <h2 className="text-3xl font-bold text-slate-800">
              {profile.fullName}
            </h2>

            <span
              className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                profile.cardStatus === "active"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {profile.cardStatus}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
            <InfoItem
              icon={CalendarDays}
              label="Health ID"
              value={formatHealthId(profile.healthId)}
            />

            <InfoItem
              icon={Droplet}
              label="Blood Group"
              value={profile.bloodGroup || "N/A"}
              color="text-red-600"
            />

            <InfoItem
              icon={CalendarDays}
              label="Date of Birth"
              value={`${formatDate(profile.dateOfBirth)} (${getAge(
                profile.dateOfBirth
              )})`}
            />

            <InfoItem
              icon={Phone}
              label="Mobile"
              value={formatMobile(profile.mobile)}
            />

            <InfoItem icon={Users} label="Gender" value={profile.gender} />

            <InfoItem
              icon={MapPin}
              label="Address"
              value={profile.address || "N/A"}
              color="text-emerald-700"
            />
          </div>
        </div>

        {/* Government Box */}
        <div className="rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-emerald-100 p-5 min-h-[190px] border border-emerald-100">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-white border border-emerald-200 flex items-center justify-center shadow-sm overflow-hidden">
              <img alt="Govt Logo" src="/logo.png" className="w-12 h-12 object-contain" />
            </div>

            <div>
              <p className="text-sm font-bold text-slate-800 leading-tight">
                Government of the
              </p>
              <p className="text-sm font-bold text-slate-800 leading-tight">
                People’s Republic of Bangladesh
              </p>
              <p className="text-xs font-semibold text-emerald-700 mt-1">
                Ministry of Health and Family Welfare
              </p>
            </div>
          </div>

          <div className="grid grid-cols-[1fr_1px_1fr] gap-5 mt-7 items-center">
            <div>
              <p className="text-sm font-semibold text-emerald-700">
                Issue Date
              </p>
              <p className="text-sm font-bold text-slate-800 mt-1">
                {formatDate(profile.issueDate)}
              </p>

              <p className="text-sm font-semibold text-emerald-700 mt-4">
                Valid Date
              </p>
              <p className="text-sm font-bold text-slate-800 mt-1">
                {formatDate(profile.validDate)}
              </p>
            </div>

            <div className="bg-slate-300 h-full" />

            <div className="flex flex-col gap-3">
              <Link
                href={`/doctor/prescriptions?patientId=${profile._id}`}
                className="inline-flex items-center justify-center px-5 py-3 bg-green-700 text-white text-sm font-bold rounded-lg hover:bg-green-800 transition-all duration-300"
              >
                View All Prescription
              </Link>

              <p className="text-xs text-slate-500 text-center">
                NID: {profile.nidNumber || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>

          {/* Alert Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 md:p-4">
              <div className="flex items-start gap-2 md:gap-3">
                <div className="flex-shrink-0 mt-1">
                  <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-red-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-red-900">Allergy Alert</p>
                  <p className="text-xs md:text-sm font-bold text-red-600 mt-1">Penicillin</p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 md:p-4">
              <div className="flex items-start gap-2 md:gap-3">
                <div className="flex-shrink-0 mt-1">
                  <Clock className="w-4 h-4 md:w-5 md:h-5 text-orange-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-orange-900">Chronic Condition</p>
                  <p className="text-xs md:text-sm font-bold text-orange-600 mt-1">Diabetes, Hypertension</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 md:p-4">
              <div className="flex items-start gap-2 md:gap-3">
                <div className="flex-shrink-0 mt-1">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-blue-900">Last Visit</p>
                  <p className="text-xs md:text-sm font-bold text-blue-600 mt-1">10 Mar 2025</p>
                </div>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-200 rounded-lg p-3 md:p-4">
              <div className="flex items-start gap-2 md:gap-3">
                <div className="flex-shrink-0 mt-1">
                  <Users className="w-4 h-4 md:w-5 md:h-5 text-teal-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-teal-900">Total Visits</p>
                  <p className="text-xs md:text-sm font-bold text-teal-600 mt-1">12</p>
                </div>
              </div>
            </div>
          </div>

          {/* Four Column Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-4 md:mb-6">
            {/* Medical Conditions */}
            <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200">
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <div className="w-5 h-5 md:w-6 md:h-6 bg-green-600 rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs md:text-sm">✓</span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm md:text-base">Medical Conditions</h3>
              </div>
              <div className="space-y-2 md:space-y-3">
                {medicalConditions.map((condition, idx) => (
                  <div key={idx} className="pl-4 md:pl-6 pb-2 md:pb-3 border-l-2 border-gray-200 last:pb-0 last:border-l-0">
                    <p className="font-semibold text-gray-900 text-xs md:text-sm">{condition.name}</p>
                    <p className="text-xs text-gray-600">{condition.date}</p>
                  </div>
                ))}
              </div>
              <button  className="w-full mt-3 md:mt-4 text-teal-700 font-semibold text-xs md:text-sm flex items-center justify-between hover:text-teal-800">
                      <Link
  href="/doctor/Conditions">View All Conditions</Link>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Current Medications */}
            <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200">
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <div className="w-5 h-5 md:w-6 md:h-6 bg-green-600 rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs md:text-sm">💊</span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm md:text-base">Current Medications</h3>
              </div>
              <div className="space-y-2 md:space-y-3">
                {medications.map((med, idx) => (
                  <div key={idx} className="pl-4 md:pl-6 pb-2 md:pb-3 border-l-2 border-gray-200 last:pb-0 last:border-l-0">
                    <p className="font-semibold text-gray-900 text-xs md:text-sm">{med.name}</p>
                    <p className="text-xs text-gray-600">{med.dose}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-3 md:mt-4 text-green-600 font-semibold text-xs md:text-sm flex items-center justify-between hover:text-green-700">
                       <Link
  href="/doctor/Medications">View All Medications</Link>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Allergies */}
            <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200">
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <div className="w-5 h-5 md:w-6 md:h-6 bg-red-500 rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs md:text-sm">✕</span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm md:text-base">Allergies</h3>
              </div>
              <div className="space-y-2 md:space-y-3">
                {allergies.map((allergy, idx) => (
                  <div key={idx} className="pl-4 md:pl-6 pb-2 md:pb-3">
                    <p className="font-semibold text-red-600 text-xs md:text-sm">{allergy.name}</p>
                    <p className="text-xs text-red-500">{allergy.reaction}</p>
                  </div>
                ))}
                <p className="text-xs text-gray-600 pl-4 md:pl-6">No other known allergies</p>
              </div>
              <button className="w-full mt-3 md:mt-4 text-red-500 font-semibold text-xs md:text-sm flex items-center justify-between hover:text-red-600">
                       <Link
  href="/doctor/Allergies">View All Allergies</Link>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Vitals Latest */}
            <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200">
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <div className="w-5 h-5 md:w-6 md:h-6 bg-teal-700 rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs md:text-sm">✓</span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm md:text-base">Vitals (Latest)</h3>
              </div>
              <div className="space-y-2 md:space-y-3">
                <div>
                  <p className="text-xs text-gray-600">Blood Pressure</p>
                  <p className="text-xs md:text-sm font-semibold text-gray-900">120/80 mmHg</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Blood Sugar (Fasting)</p>
                  <p className="text-xs md:text-sm font-semibold text-gray-900">110 mg/dL</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Pulse</p>
                  <p className="text-xs md:text-sm font-semibold text-gray-900">78 /min</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Weight</p>
                  <p className="text-xs md:text-sm font-semibold text-gray-900">70 kg</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Height</p>
                  <p className="text-xs md:text-sm font-semibold text-gray-900">170 cm</p>
                </div>
              </div>
              <button className="w-full mt-3 md:mt-4 text-teal-700 font-semibold text-xs md:text-sm flex items-center justify-between hover:text-teal-800">
                <Link
  href="/doctor/Vitals">View All Vitals</Link>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Recent Reports Tables */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-4 md:mb-6">
            {/* Recent Lab Reports */}
            <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-3 md:mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-blue-500 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs md:text-sm">🔬</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm md:text-base">Recent Lab Reports</h3>
                </div>
                <Link
  href="/doctor/Reports">
                <button className="text-blue-600 font-semibold text-xs md:text-sm hover:text-blue-700 text-left">View All</button>
                </Link>
              </div>
              <div className="space-y-2 md:space-y-3">
                {labReports.map((report, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2 py-2 border-b border-gray-100 last:border-b-0 text-xs md:text-sm">
                    <p className="text-gray-900">{report.test}</p>
                    <p className="text-gray-600">{report.date}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Prescriptions */}
            <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-3 md:mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-purple-500 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs md:text-sm">📝</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm md:text-base">Recent Prescriptions</h3>
                </div>
                <Link
  href="/doctor/RecentPrescriptions">
                <button className="text-purple-600 font-semibold text-xs md:text-sm hover:text-purple-700 text-left">View All</button>
                </Link>
              </div>
              <div className="space-y-2 md:space-y-3">
                {prescriptions.map((prescription, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2 py-2 border-b border-gray-100 last:border-b-0 text-xs md:text-sm">
                    <div className="min-w-0">
                      <p className="text-gray-900">{prescription.drug}</p>
                      <p className="text-gray-600">Dr. Mahmud Hasan</p>
                    </div>
                    <p className="text-gray-600">{prescription.date}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Immunization */}
            <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-3 md:mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-orange-500 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs md:text-sm">💉</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm md:text-base">Immunization</h3>
                </div>
                <Link
  href="/doctor/immunization">
                <button className="text-orange-600 font-semibold text-xs md:text-sm hover:text-orange-700 text-left">View All</button>
                </Link>
              </div>
              <div className="space-y-2 md:space-y-3">
                {immunizations.map((imm, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2 py-2 border-b border-gray-100 last:border-b-0 text-xs md:text-sm">
                    <p className="text-gray-900">{imm.vaccine}</p>
                    <p className="text-gray-600">{imm.date}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Visit History */}
            <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-3 md:mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-green-600 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs md:text-sm">📅</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm md:text-base">Visit History</h3>
                </div>
                 <Link
  href="/doctor/history">
                <button className="text-green-600 font-semibold text-xs md:text-sm hover:text-green-700 text-left">View All</button>
                </Link>
              </div>
              <div className="space-y-2 md:space-y-3">
                {visitHistory.map((visit, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2 py-2 border-b border-gray-100 last:border-b-0 text-xs md:text-sm">
                    <div className="min-w-0">
                      <p className="text-gray-900">{visit.date}</p>
                      <p className="text-gray-600">{visit.facility}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-white rounded-lg p-3 md:p-4 border border-gray-200 text-center">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 text-gray-600 text-xs md:text-sm">
              <span className="text-base md:text-lg">🔒</span>
              <p>This is a secure system. Patient data is confidential and protected.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
