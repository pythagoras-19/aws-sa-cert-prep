import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from './components/Navigation'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AWS Solutions Architect Associate - Learning Platform',
  description: 'Comprehensive learning platform for AWS Solutions Architect Associate exam preparation with concepts, Q&A, flashcards, and practice exams.',
  keywords: 'AWS, Solutions Architect, Associate, exam prep, cloud computing, learning platform',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/favicon.png', type: 'image/png' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
} 