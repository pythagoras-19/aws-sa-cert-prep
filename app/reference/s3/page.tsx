'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Database, 
  Clock, 
  DollarSign, 
  BookOpen, 
  Code,
  Globe,
  Lock,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Info,
  Cpu,
  HardDrive,
  Network,
  Shield,
  Target,
  Server,
  Settings,
  Upload,
  Play,
  MapPin,
  Activity,
  Zap,
  FileText,
  Search,
  Scale,
  Archive,
  Snowflake
} from 'lucide-react'

export default function S3ReferencePage() {
  const [activeSection, setActiveSection] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const sections = [
    { id: 'overview', label: 'Overview', icon: Database },
    { id: 'storage-classes', label: 'Storage Classes', icon: HardDrive },
    { id: 'features', label: 'Features', icon: Shield },
    { id: 'pricing', label: 'Pricing Model', icon: DollarSign },
    { id: 'exam-tips', label: 'Exam Tips', icon: BookOpen }
  ]

  const storageClasses = [
    {
      class: 'S3 Standard',
      description: 'General-purpose storage for frequently accessed data',
      icon: Database,
      color: 'from-blue-500 to-blue-600',
      availability: '99.99%',
      durability: '99.999999999% (11 9s)',
      access: 'Milliseconds',
      useCase: 'Frequently accessed data, websites, content distribution',
      cost: 'Highest'
    },
    {
      class: 'S3 Intelligent-Tiering',
      description: 'Automatically moves data to most cost-effective tier',
      icon: Activity,
      color: 'from-green-500 to-green-600',
      availability: '99.9%',
      durability: '99.999999999% (11 9s)',
      access: 'Milliseconds to hours',
      useCase: 'Data with unknown or changing access patterns',
      cost: 'Variable'
    },
    {
      class: 'S3 Standard-IA',
      description: 'Infrequent access storage for long-lived data',
      icon: Clock,
      color: 'from-orange-500 to-orange-600',
      availability: '99.9%',
      durability: '99.999999999% (11 9s)',
      access: 'Milliseconds',
      useCase: 'Long-term storage, backups, disaster recovery',
      cost: 'Lower than Standard'
    },
    {
      class: 'S3 One Zone-IA',
      description: 'Single AZ storage for infrequently accessed data',
      icon: MapPin,
      color: 'from-red-500 to-red-600',
      availability: '99.5%',
      durability: '99.999999999% (11 9s)',
      access: 'Milliseconds',
      useCase: 'Secondary backups, easily recreatable data',
      cost: '20% less than Standard-IA'
    },
    {
      class: 'S3 Glacier',
      description: 'Long-term archival storage',
      icon: Archive,
      color: 'from-purple-500 to-purple-600',
      availability: '99.9%',
      durability: '99.999999999% (11 9s)',
      access: 'Minutes to hours',
      useCase: 'Long-term archives, compliance data',
      cost: 'Very low'
    },
    {
      class: 'S3 Glacier Deep Archive',
      description: 'Lowest-cost storage for long-term retention',
      icon: Snowflake,
      color: 'from-indigo-500 to-indigo-600',
      availability: '99.9%',
      durability: '99.999999999% (11 9s)',
      access: 'Hours',
      useCase: 'Long-term retention, regulatory compliance',
      cost: 'Lowest'
    }
  ]

  const features = [
    {
      feature: 'Versioning',
      description: 'Keep multiple versions of objects',
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      benefits: [
        'Protect against accidental deletion',
        'Preserve, retrieve, and restore every version',
        'Roll back to previous versions'
      ],
      useCase: 'Data protection and compliance'
    },
    {
      feature: 'Lifecycle Management',
      description: 'Automatically transition objects between storage classes',
      icon: Activity,
      color: 'from-green-500 to-green-600',
      benefits: [
        'Reduce storage costs automatically',
        'Move data to appropriate storage class',
        'Delete objects when no longer needed'
      ],
      useCase: 'Cost optimization and data management'
    },
    {
      feature: 'Cross-Region Replication',
      description: 'Replicate objects across AWS regions',
      icon: Globe,
      color: 'from-orange-500 to-orange-600',
      benefits: [
        'Meet compliance requirements',
        'Reduce latency for global users',
        'Disaster recovery protection'
      ],
      useCase: 'Global applications and compliance'
    },
    {
      feature: 'Server-Side Encryption',
      description: 'Encrypt data at rest',
      icon: Lock,
      color: 'from-purple-500 to-purple-600',
      benefits: [
        'AES-256 encryption by default',
        'Compliance with security standards',
        'No additional cost'
      ],
      useCase: 'Security and compliance requirements'
    },
    {
      feature: 'Access Control',
      description: 'Control access to S3 resources',
      icon: Shield,
      color: 'from-red-500 to-red-600',
      benefits: [
        'Bucket policies and ACLs',
        'IAM integration',
        'Fine-grained access control'
      ],
      useCase: 'Security and access management'
    },
    {
      feature: 'Event Notifications',
      description: 'Trigger actions when objects change',
      icon: Zap,
      color: 'from-yellow-500 to-yellow-600',
      benefits: [
        'Integrate with Lambda, SQS, SNS',
        'Automate workflows',
        'Real-time processing'
      ],
      useCase: 'Event-driven architectures'
    }
  ]

  const pricingComponents = [
    {
      component: 'Storage Pricing',
      description: 'Pay for data stored',
      icon: HardDrive,
      color: 'from-blue-500 to-blue-600',
      details: [
        'Standard: $0.023 per GB',
        'Standard-IA: $0.0125 per GB',
        'One Zone-IA: $0.01 per GB',
        'Glacier: $0.004 per GB',
        'Deep Archive: $0.00099 per GB'
      ],
      notes: 'Prices vary by region and storage class'
    },
    {
      component: 'Request Pricing',
      description: 'Pay for API requests',
      icon: Network,
      color: 'from-green-500 to-green-600',
      details: [
        'GET requests: $0.0004 per 1,000',
        'PUT requests: $0.005 per 1,000',
        'POST requests: $0.005 per 1,000',
        'DELETE requests: Free'
      ],
      notes: 'Additional charges for data transfer out'
    },
    {
      component: 'Data Transfer',
      description: 'Pay for data transferred out',
      icon: Globe,
      color: 'from-orange-500 to-orange-600',
      details: [
        'First 1 GB/month: Free',
        '1-10 TB/month: $0.09 per GB',
        '10-50 TB/month: $0.085 per GB',
        '50+ TB/month: $0.07 per GB'
      ],
      notes: 'Data transfer in is always free'
    }
  ]

  const examTips = [
    {
      tip: "Storage Class Selection",
      description: "Choose storage class based on access patterns, not just cost. Consider availability, durability, and retrieval time requirements.",
      importance: "High",
      icon: HardDrive
    },
    {
      tip: "Consistency Model",
      description: "S3 provides strong consistency for new objects and eventual consistency for overwrites and deletes.",
      importance: "High",
      icon: Database
    },
    {
      tip: "Lifecycle Policies",
      description: "Use lifecycle policies to automatically transition objects to cheaper storage classes and delete old versions.",
      importance: "Medium",
      icon: Activity
    },
    {
      tip: "Cross-Region Replication",
      description: "CRR is asynchronous and requires versioning to be enabled. It replicates only new objects, not existing ones.",
      importance: "Medium",
      icon: Globe
    },
    {
      tip: "Bucket Naming",
      description: "Bucket names must be globally unique, 3-63 characters long, and contain only lowercase letters, numbers, hyphens, and dots.",
      importance: "Medium",
      icon: Settings
    },
    {
      tip: "Encryption",
      description: "S3 encrypts all objects by default using SSE-S3. You can also use SSE-KMS or SSE-C for additional control.",
      importance: "High",
      icon: Lock
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <Database className="w-12 h-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">S3 Reference Guide</h1>
            </div>
            <p className="text-xl max-w-3xl mx-auto">
              Complete reference for Amazon Simple Storage Service (S3) - scalable object storage for the cloud
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center text-gray-700 hover:text-blue-600"
          >
            {sidebarOpen ? <X className="w-6 h-6 mr-2" /> : <Menu className="w-6 h-6 mr-2" />}
            {sidebarOpen ? 'Close Menu' : 'Open Menu'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: sidebarOpen ? 0 : -300 }}
          transition={{ duration: 0.3 }}
          className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg lg:shadow-none transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
        >
          <div className="h-full flex flex-col">
            {/* Sidebar Header */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">S3 Topics</h2>
              <p className="text-sm text-gray-600 mt-1">Navigate through sections</p>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 p-4 space-y-2">
              {sections.map((section) => {
                const Icon = section.icon
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    <span className="font-medium">{section.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </motion.div>

        {/* Content Area */}
        <div className="flex-1 lg:ml-0">
          <div className="container mx-auto px-4 py-8">
            {/* Overview Section */}
            {activeSection === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">S3 Overview</h2>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">What is Amazon S3?</h3>
                      <p className="text-gray-700 mb-4">
                        Amazon Simple Storage Service (S3) is an object storage service that offers industry-leading scalability, data availability, security, and performance.
                      </p>
                      <p className="text-gray-700 mb-4">
                        S3 is designed for 99.999999999% (11 9s) of durability and stores data for millions of applications for companies all around the world.
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-3">Key Benefits</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>99.999999999% durability</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>99.99% availability</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Unlimited storage</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Multiple storage classes</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Common Use Cases</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <Database className="w-8 h-8 text-blue-500 mb-3" />
                        <h4 className="font-semibold text-gray-900 mb-2">Data Storage</h4>
                        <p className="text-gray-600">Store and retrieve any amount of data</p>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <Globe className="w-8 h-8 text-green-500 mb-3" />
                        <h4 className="font-semibold text-gray-900 mb-2">Content Distribution</h4>
                        <p className="text-gray-600">Host static websites and media files</p>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <Archive className="w-8 h-8 text-purple-500 mb-3" />
                        <h4 className="font-semibold text-gray-900 mb-2">Backup & Archive</h4>
                        <p className="text-gray-600">Long-term data retention and backup</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Storage Classes Section */}
            {activeSection === 'storage-classes' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Storage Classes</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {storageClasses.map((storageClass, index) => {
                      const Icon = storageClass.icon
                      return (
                        <div key={index} className="border border-gray-200 rounded-lg p-6">
                          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${storageClass.color} text-white mb-4`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{storageClass.class}</h3>
                          <p className="text-gray-600 mb-4">{storageClass.description}</p>
                          
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-medium text-gray-700">Availability:</span>
                                <p className="text-gray-600">{storageClass.availability}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">Durability:</span>
                                <p className="text-gray-600">{storageClass.durability}</p>
                              </div>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Access Time:</span>
                              <p className="text-gray-600">{storageClass.access}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Use Case:</span>
                              <p className="text-gray-600">{storageClass.useCase}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded">
                              <span className="font-medium text-gray-700">Cost:</span>
                              <p className="text-gray-600">{storageClass.cost}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Features Section */}
            {activeSection === 'features' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">S3 Features</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {features.map((feature, index) => {
                      const Icon = feature.icon
                      return (
                        <div key={index} className="border border-gray-200 rounded-lg p-6">
                          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} text-white mb-4`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.feature}</h3>
                          <p className="text-gray-600 mb-4">{feature.description}</p>
                          
                          <div className="space-y-3">
                            <div>
                              <span className="font-medium text-gray-700">Benefits:</span>
                              <ul className="text-sm text-gray-600 list-disc list-inside mt-1">
                                {feature.benefits.map((benefit, i) => (
                                  <li key={i}>{benefit}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="bg-gray-50 p-3 rounded">
                              <span className="font-medium text-gray-700">Use Case:</span>
                              <p className="text-gray-600">{feature.useCase}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Pricing Section */}
            {activeSection === 'pricing' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Pricing Model</h2>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    {pricingComponents.map((component, index) => {
                      const Icon = component.icon
                      return (
                        <div key={index} className="border border-gray-200 rounded-lg p-6">
                          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${component.color} text-white mb-4`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{component.component}</h3>
                          <p className="text-gray-600 mb-4">{component.description}</p>
                          
                          <ul className="space-y-2 mb-4">
                            {component.details.map((detail, i) => (
                              <li key={i} className="text-sm text-gray-700 flex items-start">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                          
                          <div className="bg-gray-50 p-3 rounded">
                            <p className="text-xs text-gray-600">{component.notes}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="mt-8 bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing Example</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Scenario:</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• 100 GB stored in S3 Standard</li>
                          <li>• 10,000 GET requests per month</li>
                          <li>• 1,000 PUT requests per month</li>
                          <li>• 50 GB data transfer out</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Cost Calculation:</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Storage: $2.30</li>
                          <li>• GET requests: $0.004</li>
                          <li>• PUT requests: $0.005</li>
                          <li>• Data transfer: $4.41</li>
                          <li>• <strong>Total: $6.72/month</strong></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Exam Tips Section */}
            {activeSection === 'exam-tips' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Exam Tips</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {examTips.map((tip, index) => {
                      const Icon = tip.icon
                      return (
                        <div key={index} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex items-start">
                            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${
                              tip.importance === 'High' ? 'bg-red-100 text-red-600' :
                              tip.importance === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                              'bg-green-100 text-green-600'
                            } mr-4 flex-shrink-0`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center mb-2">
                                <h3 className="text-lg font-semibold text-gray-900">{tip.tip}</h3>
                                <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
                                  tip.importance === 'High' ? 'bg-red-100 text-red-700' :
                                  tip.importance === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-green-100 text-green-700'
                                }`}>
                                  {tip.importance}
                                </span>
                              </div>
                              <p className="text-gray-700">{tip.description}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 