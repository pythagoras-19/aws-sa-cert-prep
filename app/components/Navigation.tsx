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

const referenceItems = [
  { name: 'EC2', href: '/reference/ec2', icon: Server },
  { name: 'S3', href: '/reference/s3', icon: Database },
  { name: 'VPC', href: '/reference/vpc', icon: Network },
  { name: 'RDS', href: '/reference/rds', icon: Database },
  { name: 'Lambda', href: '/reference/lambda', icon: Zap },
  { name: 'Route 53', href: '/reference/route53', icon: Globe },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const isReferencePage = pathname.startsWith('/reference/')
  const currentService = referenceItems.find(item => pathname === item.href)

  const handleNavigation = (href: string) => {
    router.push(href)
    setIsOpen(false)
  }

  // Top Bar Navigation (for reference pages)
  if (isReferencePage) {
    return (
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Back Button */}
            <div className="flex items-center space-x-4">
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => handleNavigation('/')}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-aws-orange to-orange-600 rounded-lg flex items-center justify-center mr-3">
                  <Server className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">AWS Learning</span>
              </div>
              
              <div className="hidden md:flex items-center space-x-2 text-gray-500">
                <ChevronRight className="w-4 h-4" />
                <span className="text-sm">Reference</span>
                <ChevronRight className="w-4 h-4" />
                {currentService && (
                  <span className="text-sm font-medium text-gray-900">{currentService.name}</span>
                )}
              </div>
            </div>

            {/* Reference Service Navigation */}
            <div className="hidden md:flex space-x-2">
              {referenceItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.href)}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      pathname === item.href
                        ? 'bg-aws-orange text-white'
                        : 'text-gray-700 hover:text-aws-orange hover:bg-orange-50'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </button>
                )
              })}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-aws-orange focus:outline-none"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-gray-200"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {referenceItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.name}
                      onClick={() => handleNavigation(item.href)}
                      className={`flex items-center w-full px-3 py-2 rounded-md text-base font-medium transition-colors ${
                        pathname === item.href
                          ? 'bg-aws-orange text-white'
                          : 'text-gray-700 hover:text-aws-orange hover:bg-orange-50'
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {item.name}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}
        </div>
      </nav>
    )
  }

  // Simple header for non-reference pages (since sidebar handles navigation)
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => handleNavigation('/')}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-aws-orange to-orange-600 rounded-lg flex items-center justify-center mr-3">
              <Server className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">AWS Learning</span>
          </div>

          {/* Page Title */}
          <div className="hidden md:block">
            <h1 className="text-lg font-semibold text-gray-900">
              {pathname === '/' && 'Home'}
              {pathname === '/concepts' && 'Core Concepts'}
              {pathname === '/qa' && 'Q&A'}
              {pathname === '/flashcards' && 'Flashcards'}
              {pathname === '/exams' && 'Practice Exams'}
              {pathname === '/study-guide' && 'Study Guide'}
            </h1>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-aws-orange focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
} 