'use client'

import { useEffect, useState } from 'react'
import { Smartphone, Zap, Shield, Check, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface DoctorCardScannerProps {
  onCardScanned: () => void
}

export function DoctorCardScanner({ onCardScanned }: DoctorCardScannerProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [scanComplete, setScanComplete] = useState(false)
 


  


  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      {/* Mobile Overlay */}
    {/* Verification Overlay */}

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <Shield className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Doctor Portal</h1>
          <p className="text-gray-600">Patient Card Verification System</p>
        </div>

        {/* Main Card */}
        <Card className="p-8 border-2 border-gray-200 shadow-lg mb-8">
          <div className="text-center">
            <div className="mb-6">
              <div className={`inline-flex items-center justify-center w-32 h-32 rounded-2xl transition-all duration-300 ${
                isScanning 
                  ? 'bg-blue-100 animate-pulse' 
                  : scanComplete 
                  ? 'bg-green-100' 
                  : 'bg-gray-100'
              }`}>
                <Smartphone className={`w-16 h-16 transition-all duration-300 ${
                  isScanning
                    ? 'text-blue-600 animate-bounce'
                    : scanComplete
                    ? 'text-green-600'
                    : 'text-gray-400'
                }`} />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {isScanning ? 'Scanning Card...' : scanComplete ? 'Card Verified!' : 'Ready to Scan'}
            </h2>
            
            <p className="text-gray-600 mb-6">
              {isScanning 
                ? 'Please hold the patient\'s e-Health card near the NFC reader...'
                : scanComplete
                ? 'Patient profile loaded successfully. Accessing secure health records...'
                : 'Tap the button below to scan the patient\'s Smart e-Health Card'}
            </p>

            {/* Status Indicator */}
            <div className="flex items-center justify-center gap-2 mb-6 p-3 bg-gray-50 rounded-lg">
              <div className={`w-3 h-3 rounded-full ${
                isScanning ? 'bg-blue-500 animate-pulse' : scanComplete ? 'bg-green-500' : 'bg-gray-400'
              }`} />
              <span className="text-sm text-gray-700">
                {isScanning ? 'Scanning in progress...' : scanComplete ? 'Verification complete' : 'Waiting for scan'}
              </span>
            </div>

            {/* Scan Button */}
            <Button
             
              className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white disabled:opacity-50 transition-all"
            >
              {isScanning ? 'Scanning...' : scanComplete ? 'Card Scanned ✓' : 'Scan Patient Card'}
            </Button>
          </div>
        </Card>

        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <Zap className="w-5 h-5 text-blue-600 mb-2" />
            <p className="text-xs md:text-sm font-semibold text-blue-900">Fast Access</p>
            <p className="text-xs text-blue-700 mt-1">Instant patient data</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <Shield className="w-5 h-5 text-green-600 mb-2" />
            <p className="text-xs md:text-sm font-semibold text-green-900">Secure</p>
            <p className="text-xs text-green-700 mt-1">Encrypted records</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <AlertCircle className="w-5 h-5 text-purple-600 mb-2" />
            <p className="text-xs md:text-sm font-semibold text-purple-900">Alerts</p>
            <p className="text-xs text-purple-700 mt-1">Allergy warnings</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <Check className="w-5 h-5 text-orange-600 mb-2" />
            <p className="text-xs md:text-sm font-semibold text-orange-900">Verified</p>
            <p className="text-xs text-orange-700 mt-1">NFC authenticated</p>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm">How it works:</h3>
          <ol className="space-y-2 text-xs text-gray-700">
            <li className="flex gap-2">
              <span className="font-bold text-green-600 flex-shrink-0">1.</span>
              <span>Patient presents Smart e-Health Card</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-green-600 flex-shrink-0">2.</span>
              <span>Click "Scan Patient Card" button</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-green-600 flex-shrink-0">3.</span>
              <span>System verifies and loads secure health records</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-green-600 flex-shrink-0">4.</span>
              <span>Access patient profile with role-based permissions</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}
