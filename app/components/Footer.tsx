'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { 
  BookOpen, 
  HelpCircle, 
  CreditCard, 
  FileText, 
  Brain,
  Server,
  Database,
  Network,
  Zap,
  Globe,
  Github,
  Twitter,
  Linkedin
} from 'lucide-react'

const quickLinks = [
  { name: 'Core Concepts', href: '/concepts', icon: BookOpen },
  { name: 'Q&A', href: '/qa', icon: HelpCircle },
  { name: 'Flashcards', href: '/flashcards', icon: CreditCard },
  { name: 'Practice Exams', href: '/exams', icon: FileText },
  { name: 'Study Guide', href: '/study-guide', icon: Brain },
]

const referenceLinks = [
  { name: 'EC2 Reference', href: '/reference/ec2', icon: Server },
  { name: 'S3 Reference', href: '/reference/s3', icon: Database },
  { name: 'VPC Reference', href: '/reference/vpc', icon: Network },
  { name: 'RDS Reference', href: '/reference/rds', icon: Database },
  { name: 'Lambda Reference', href: '/reference/lambda', icon: Zap },
  { name: 'Route 53 Reference', href: '/reference/route53', icon: Globe },
]

const socialLinks = [
  { name: 'GitHub', href: '#', icon: Github },
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'LinkedIn', href: '#', icon: Linkedin },
]

export default function Footer() {
  const router = useRouter()

  const handleLinkClick = (href: string) => {
    router.push(href)
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mr-3">
                <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Book cover */}
                  <rect x="4" y="6" width="20" height="20" rx="2" fill="#FF6B35" stroke="#E55A2B" stroke-width="1"/>
                  
                  {/* Book pages */}
                  <rect x="6" y="8" width="16" height="16" rx="1" fill="#FFFFFF"/>
                  
                  {/* Book spine */}
                  <rect x="4" y="6" width="2" height="20" fill="#E55A2B"/>
                  
                  {/* Book title lines */}
                  <rect x="8" y="12" width="12" height="1" fill="#FF6B35"/>
                  <rect x="8" y="15" width="8" height="1" fill="#FF6B35"/>
                  <rect x="8" y="18" width="10" height="1" fill="#FF6B35"/>
                  
                  {/* AWS cloud symbol */}
                  <path d="M20 10C21.5 10 22.5 11 22.5 12.5C22.5 14 21.5 15 20 15C18.5 15 17.5 14 17.5 12.5C17.5 11 18.5 10 20 10Z" fill="#FF6B35"/>
                  <path d="M18 12C19 12 19.5 12.5 19.5 13.5C19.5 14.5 19 15 18 15C17 15 16.5 14.5 16.5 13.5C16.5 12.5 17 12 18 12Z" fill="#FFFFFF"/>
                </svg>
              </div>
              <span className="text-xl font-bold">AWS Learning</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your comprehensive platform for AWS Solutions Architect Associate exam preparation.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-gray-400 hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => {
                const Icon = link.icon
                return (
                  <li key={link.name}>
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      className="flex items-center text-gray-400 hover:text-white transition-colors"
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {link.name}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Reference Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Reference Guides</h3>
            <ul className="space-y-2">
              {referenceLinks.map((link) => {
                const Icon = link.icon
                return (
                  <li key={link.name}>
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      className="flex items-center text-gray-400 hover:text-white transition-colors"
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {link.name}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Contact & Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact & Info</h3>
            <div className="space-y-2 text-gray-400">
              <p>Questions or feedback?</p>
              <p>We'd love to hear from you!</p>
              <div className="pt-2">
                <a 
                  href="mailto:contact@awslearning.com" 
                  className="text-orange-400 hover:text-orange-300 transition-colors"
                >
                  contact@awslearning.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            © 2024 AWS Learning Platform. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
} 