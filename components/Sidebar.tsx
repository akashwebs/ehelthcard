"use client"
import React from 'react'
import { usePathname } from "next/navigation";
import Link from 'next/link'
import { Menu,CalendarDays,
  
  Landmark, ChevronRight, AlertCircle, Clock, Users, Zap, Heart, Pill, AlertTriangle, MapPin, Phone, Calendar, Droplet } from 'lucide-react'

function Sidebar() {
 const pathname = usePathname();

    const menuItems = [
  { icon: "👤", label: "Patient Overview", href: "/doctor/overview" },
  { icon: "📋", label: "Medical History", href: "/doctor/medical-history" },
  { icon: "💊", label: "Prescriptions", href: "/doctor/prescriptions" },
  { icon: "🧬", label: "Lab Reports", href: "/doctor/lab-reports" },
  { icon: "💉", label: "Immunization", href: "/doctor/immunization" },
  { icon: "🚨", label: "Allergies", href: "/doctor/allergies" },
  { icon: "❤️", label: "Vitals History", href: "/doctor/vitals-history" },
  { icon: "📄", label: "Documents", href: "/doctor/documents" },
  { icon: "📅", label: "Visit History", href: "/doctor/visit-history" },
];
    
  return (
       <div className="space-y-2">
      {menuItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`w-full flex items-center gap-3 px-2 md:px-3 py-2 md:py-3 rounded-lg font-medium transition-all text-sm md:text-base

            ${
              isActive
                ? "bg-[#01492a] text-white shadow-md"
                : "text-gray-700 hover:bg-[#01492a] hover:text-white"
            }`}
          >
            <span className="text-base md:text-sm flex-shrink-0">
              {item.icon}
            </span>

            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  )
}

export default Sidebar