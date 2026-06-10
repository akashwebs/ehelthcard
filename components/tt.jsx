"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Droplet,
  Phone,
  Users,
  MapPin,
  Loader2,
} from "lucide-react";

const API_BASE = "http://localhost:5000/api/v1/pa-profile";

export default function PatientProfileCard({ id }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/qr-view/${id}`, {
          cache: "no-store",
        });

        const result = await res.json();

        if (!res.ok || result.status !== "success") {
          throw new Error(result.message || "Profile not found");
        }

        setProfile(result.data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

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

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-10 flex items-center justify-center text-slate-600">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        Patient profile loading...
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-6 font-semibold">
        {error || "Patient profile not found"}
      </div>
    );
  }

  return (
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
  );
}

function InfoItem({ icon: Icon, label, value, color = "text-slate-800" }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-emerald-700" />
      </div>

      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
          {label}
        </p>
        <p className={`text-sm md:text-base font-bold mt-1 ${color}`}>
          {value || "N/A"}
        </p>
      </div>
    </div>
  );
}