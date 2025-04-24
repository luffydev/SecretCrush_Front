import type { Metadata } from 'next'
import './globals.css'

import { ToastProvider } from "@/lib/toast-context"; // Importe ton ToastProvider

export const metadata: Metadata = {
  title: 'SecretCrush',
  description: 'Sois toi-même, sans filtre',
  manifest: '/manifest.json',
  viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
  icons: {
    apple: '/icons/icon-192x192.png',
  }
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className="dark">
      <body>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  )
}