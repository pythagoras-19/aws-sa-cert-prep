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
        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              AWS Solutions Architect
              <span className="block text-2xl md:text-3xl font-normal mt-2">
                Associate Exam Prep
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Master the core concepts, practice with real exam questions, and build confidence 
              with our comprehensive learning platform.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                className="btn-secondary text-lg px-8 py-3"
                onClick={() => handleFeatureClick('/concepts')}
              >
                Start Learning
              </button>
              <button 
                className="bg-white text-aws-orange font-semibold py-3 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors"
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
                  }
                }}
              >
                <div className={`w-16 h-16 mx-auto mb-3 rounded-lg flex items-center justify-center ${service.color} group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-8 h-8" />
                </div>
                <p className="font-semibold text-gray-900">{service.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Your Complete Learning Experience
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to pass the AWS Solutions Architect Associate exam in one place.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setHoveredFeature(index)}
                onHoverEnd={() => setHoveredFeature(null)}
                className="group cursor-pointer"
                onClick={() => handleFeatureClick(feature.href)}
              >
                <div className="card h-full relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${feature.color} opacity-10 rounded-bl-full transition-opacity duration-300 group-hover:opacity-20`} />
                  
                  <div className="relative z-10">
                    <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">
                      {feature.description}
                    </p>
                    
                    <div className="flex items-center text-aws-orange font-semibold group-hover:translate-x-1 transition-transform">
                      Explore
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-aws-blue text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-lg">Practice Questions</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-lg">Core Concepts</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="text-4xl font-bold mb-2">10+</div>
              <div className="text-lg">Practice Exams</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ready to Start Your AWS Journey?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of learners who have successfully passed the AWS Solutions Architect Associate exam.
            </p>
            <button 
              className="btn-primary text-lg px-8 py-3"
              onClick={() => handleFeatureClick('/concepts')}
            >
              Get Started Now
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 