import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: {
    default: "SMART e-Health Card",
    template: "%s | SMART e-Health Card",
  },

  description:
    "SMART e-Health Card is a secure digital healthcare platform for managing patient records, prescriptions, medical history, lab reports, and health services.",

  keywords: [
    "e-Health",
    "Health Card",
    "Medical Records",
    "Digital Healthcare",
    "Patient Management",
    "Prescription",
    "Bangladesh Health",
    "SMART Health Card",
  ],

  applicationName: "SMART e-Health Card",

  authors: [
    {
      name: "Softriple",
    },
  ],

  creator: "Softriple",
  publisher: "Softriple",

  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },

  openGraph: {
    title: "SMART e-Health Card",
    description:
      "Secure healthcare platform for prescriptions, patient history and medical records.",
    type: "website",
    siteName: "SMART e-Health Card",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
