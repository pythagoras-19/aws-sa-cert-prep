'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  BookOpen, 
  HelpCircle, 
  CreditCard, 
  FileText, 
  Brain, 
  Trophy,
  ChevronRight,
  Cloud,
  Server,
  Database,
  Shield,
  Globe
} from 'lucide-react'

const features = [
  {
    icon: BookOpen,
    title: 'Core Concepts',
    description: 'Learn fundamental AWS services and architectural patterns',
    href: '/concepts',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Server,
    title: 'EC2 Reference',
    description: 'Comprehensive guide to Amazon Elastic Compute Cloud',
    href: '/reference/ec2',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: HelpCircle,
    title: 'Q&A Section',
    description: 'Test your knowledge with detailed explanations',
    href: '/qa',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: CreditCard,
    title: 'Flashcards',
    description: 'Quick review with interactive flashcards',
    href: '/flashcards',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: FileText,
    title: 'Practice Exams',
    description: 'Simulate real exam conditions',
    href: '/exams',
    color: 'from-red-500 to-red-600'
  },
  {
    icon: Brain,
    title: 'Study Guide',
    description: 'Comprehensive reference materials',
    href: '/study-guide',
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    icon: Trophy,
    title: 'Progress Tracking',
    description: 'Monitor your learning journey',
    href: '/progress',
    color: 'from-indigo-500 to-indigo-600'
  }
]

const awsServices = [
  { name: 'EC2', icon: Server, color: 'bg-orange-100 text-orange-600' },
  { name: 'S3', icon: Database, color: 'bg-blue-100 text-blue-600' },
  { name: 'VPC', icon: Shield, color: 'bg-green-100 text-green-600' },
  { name: 'RDS', icon: Database, color: 'bg-purple-100 text-purple-600' },
  { name: 'Lambda', icon: Cloud, color: 'bg-yellow-100 text-yellow-600' },
  { name: 'Route 53', icon: Globe, color: 'bg-red-100 text-red-600' },
]

export default function Home() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const router = useRouter()

  const handleFeatureClick = (href: string) => {
    router.push(href)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg text-white">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Book Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-4"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Book cover */}
                  <rect x="4" y="6" width="20" height="20" rx="2" fill="#FF6B35" stroke="#E55A2B" strokeWidth="1"/>
                  
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
            </motion.div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              AWS Solutions Architect
              <span className="block text-lg md:text-xl font-normal mt-1">
                Associate Exam Prep
              </span>
            </h1>
            <p className="text-base md:text-lg mb-4 max-w-3xl mx-auto">
              Master the core concepts, practice with real exam questions, and build confidence 
              with our comprehensive learning platform.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                className="btn-secondary text-base px-6 py-2"
                onClick={() => handleFeatureClick('/concepts')}
              >
                Start Learning
              </button>
              <button 
                className="bg-white text-aws-orange font-semibold py-2 px-6 rounded-lg text-base hover:bg-gray-100 transition-colors"
                onClick={() => handleFeatureClick('/exams')}
              >
                Take Practice Exam
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AWS Services Preview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Core AWS Services You'll Master
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From compute and storage to networking and security, learn the essential services 
              that power modern cloud architectures.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {awsServices.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group cursor-pointer"
                onClick={() => {
                  if (service.name === 'EC2') {
                    handleFeatureClick('/reference/ec2')
                  } else if (service.name === 'S3') {
                    handleFeatureClick('/reference/s3')
                  } else if (service.name === 'VPC') {
                    handleFeatureClick('/reference/vpc')
                  } else if (service.name === 'RDS') {
                    handleFeatureClick('/reference/rds')
                  } else if (service.name === 'Lambda') {
                    handleFeatureClick('/reference/lambda')
                  } else if (service.name === 'Route 53') {
                    handleFeatureClick('/reference/route53')
                  }
                }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 group-hover:scale-110 transition-transform ${service.color}`}>
                  <service.icon className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-aws-orange transition-colors">
                  {service.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive study materials, interactive practice, and progress tracking 
              to help you pass the AWS Solutions Architect Associate exam.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
                onClick={() => handleFeatureClick(feature.href)}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 bg-gradient-to-r ${feature.color}`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-aws-orange transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {feature.description}
                </p>
                <div className="flex items-center text-aws-orange font-medium group-hover:translate-x-1 transition-transform">
                  <span>Learn More</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 