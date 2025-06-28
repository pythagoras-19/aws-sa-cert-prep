'use client'

import React, { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Menu, 
  X, 
  BookOpen, 
  Server, 
  HelpCircle, 
  CreditCard, 
  FileText, 
  Brain, 
  Home,
  Database,
  Network,
  Zap,
  Globe,
  ChevronRight
} from 'lucide-react'

const navigationItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Core Concepts', href: '/concepts', icon: BookOpen },
  { name: 'EC2 Reference', href: '/reference/ec2', icon: Server },
  { name: 'S3 Reference', href: '/reference/s3', icon: Database },
  { name: 'VPC Reference', href: '/reference/vpc', icon: Network },
  { name: 'RDS Reference', href: '/reference/rds', icon: Database },
  { name: 'Lambda Reference', href: '/reference/lambda', icon: Zap },
  { name: 'Route 53 Reference', href: '/reference/route53', icon: Globe },
  { name: 'Q&A', href: '/qa', icon: HelpCircle },
  { name: 'Flashcards', href: '/flashcards', icon: CreditCard },
  { name: 'Practice Exams', href: '/exams', icon: FileText },
  { name: 'Study Guide', href: '/study-guide', icon: Brain },
]

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  const handleNavigation = (href: string) => {
    router.push(href)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center text-gray-700 hover:text-aws-orange"
          >
            {isOpen ? <X className="w-6 h-6 mr-2" /> : <Menu className="w-6 h-6 mr-2" />}
            {isOpen ? 'Close Menu' : 'Open Menu'}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ duration: 0.3 }}
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg lg:shadow-none transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-200">
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => handleNavigation('/')}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-aws-orange to-orange-600 rounded-lg flex items-center justify-center mr-3">
                <Server className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">AWS Learning</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">Navigate through sections</p>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                    pathname === item.href
                      ? 'bg-aws-orange text-white'
                      : 'text-gray-700 hover:text-aws-orange hover:bg-orange-50'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{item.name}</span>
                  {pathname === item.href && (
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  )}
                </button>
              )
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="bg-orange-50 rounded-lg p-3">
              <div className="flex items-center">
                <HelpCircle className="w-4 h-4 text-aws-orange mr-2" />
                <span className="text-sm text-aws-orange font-medium">Quick Tip</span>
              </div>
              <p className="text-xs text-orange-700 mt-1">
                Use the sidebar to navigate between different sections and AWS services.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
} 