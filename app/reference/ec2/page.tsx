'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Server, 
  Cpu, 
  HardDrive, 
  Network, 
  Shield,
  DollarSign,
  Clock,
  Zap,
  AlertTriangle,
  CheckCircle,
  Info,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Target,
  Database,
  Globe,
  Lock,
  Menu,
  X
} from 'lucide-react'

export default function EC2ReferencePage() {
  const [activeSection, setActiveSection] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const sections = [
    { id: 'overview', label: 'Overview', icon: Server },
    { id: 'instances', label: 'Instance Types', icon: Cpu },
    { id: 'pricing', label: 'Pricing Models', icon: DollarSign },
    { id: 'exam-tips', label: 'Exam Tips', icon: BookOpen }
  ]

  const instanceTypes = [
    {
      category: 'General Purpose',
      description: 'Balanced compute, memory, and networking',
      icon: Cpu,
      color: 'from-blue-500 to-blue-600',
      instances: [
        { name: 't3.nano', vCPU: 2, memory: '0.5 GiB', network: 'Up to 5 Gbps', useCase: 'Low-latency interactive applications' },
        { name: 't3.micro', vCPU: 2, memory: '1 GiB', network: 'Up to 5 Gbps', useCase: 'Web servers, small databases' },
        { name: 't3.small', vCPU: 2, memory: '2 GiB', network: 'Up to 5 Gbps', useCase: 'Web applications, development' },
        { name: 'm6i.large', vCPU: 2, memory: '8 GiB', network: 'Up to 12.5 Gbps', useCase: 'Application servers, small databases' },
        { name: 'm6i.xlarge', vCPU: 4, memory: '16 GiB', network: 'Up to 12.5 Gbps', useCase: 'Medium databases, caching fleets' }
      ]
    },
    {
      category: 'Compute Optimized',
      description: 'High-performance processors',
      icon: Zap,
      color: 'from-orange-500 to-red-500',
      instances: [
        { name: 'c6i.large', vCPU: 2, memory: '4 GiB', network: 'Up to 12.5 Gbps', useCase: 'High-traffic web servers' },
        { name: 'c6i.xlarge', vCPU: 4, memory: '8 GiB', network: 'Up to 12.5 Gbps', useCase: 'Batch processing, media transcoding' },
        { name: 'c6i.2xlarge', vCPU: 8, memory: '16 GiB', network: 'Up to 12.5 Gbps', useCase: 'High-performance web servers' }
      ]
    },
    {
      category: 'Memory Optimized',
      description: 'Large memory for high-performance databases',
      icon: Database,
      color: 'from-purple-500 to-purple-600',
      instances: [
        { name: 'r6i.large', vCPU: 2, memory: '16 GiB', network: 'Up to 12.5 Gbps', useCase: 'High-performance databases' },
        { name: 'r6i.xlarge', vCPU: 4, memory: '32 GiB', network: 'Up to 12.5 Gbps', useCase: 'Large in-memory databases' },
        { name: 'r6i.2xlarge', vCPU: 8, memory: '64 GiB', network: 'Up to 12.5 Gbps', useCase: 'SAP HANA, large databases' }
      ]
    },
    {
      category: 'Storage Optimized',
      description: 'High, sequential read/write access to large datasets',
      icon: HardDrive,
      color: 'from-green-500 to-green-600',
      instances: [
        { name: 'i3.large', vCPU: 2, memory: '15.25 GiB', storage: '1x 475 GB NVMe SSD', useCase: 'NoSQL databases, data warehousing' },
        { name: 'i3.xlarge', vCPU: 4, memory: '30.5 GiB', storage: '1x 950 GB NVMe SSD', useCase: 'High-frequency online transaction processing' },
        { name: 'd2.xlarge', vCPU: 4, memory: '30.5 GiB', storage: '3x 2 TB HDD', useCase: 'Massive parallel processing data warehouse' }
      ]
    }
  ]

  const pricingModels = [
    {
      type: 'On-Demand',
      description: 'Pay for compute capacity by the hour or second',
      icon: Clock,
      color: 'from-blue-500 to-blue-600',
      pros: [
        'No upfront payment',
        'No long-term commitment',
        'Flexible and scalable'
      ],
      cons: [
        'Highest cost per hour',
        'No volume discounts'
      ],
      bestFor: 'Short-term, irregular workloads'
    },
    {
      type: 'Reserved Instances',
      description: 'Significant discount for 1 or 3-year commitment',
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      pros: [
        'Up to 72% discount vs On-Demand',
        'Predictable costs',
        'Capacity reservation'
      ],
      cons: [
        'Long-term commitment',
        'Upfront payment required',
        'Less flexibility'
      ],
      bestFor: 'Steady-state applications'
    },
    {
      type: 'Spot Instances',
      description: 'Use spare EC2 capacity at up to 90% discount',
      icon: Target,
      color: 'from-orange-500 to-orange-600',
      pros: [
        'Up to 90% discount',
        'Same performance as On-Demand',
        'Good for fault-tolerant workloads'
      ],
      cons: [
        'Can be terminated with 2-minute notice',
        'Not suitable for critical workloads',
        'Variable availability'
      ],
      bestFor: 'Batch processing, data analysis'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-800 text-white">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <Server className="w-12 h-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">EC2 Reference Guide</h1>
            </div>
            <p className="text-xl max-w-3xl mx-auto">
              Complete reference for Amazon Elastic Compute Cloud (EC2) - the foundation of AWS compute services
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center text-gray-700 hover:text-orange-600"
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
              <h2 className="text-lg font-semibold text-gray-900">EC2 Topics</h2>
              <p className="text-sm text-gray-600 mt-1">Navigate through sections</p>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 p-4 space-y-2">
              {sections.map((section) => {
                const Icon = section.icon
                return (
                  <button
                    key={section.id}
                    onClick={() => {
                      setActiveSection(section.id)
                      if (window.innerWidth < 1024) {
                        setSidebarOpen(false)
                      }
                    }}
                    className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-all ${
                      activeSection === section.id
                        ? 'bg-orange-100 text-orange-700 border border-orange-200'
                        : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    <span className="font-medium">{section.label}</span>
                    {activeSection === section.id && (
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
                  <Info className="w-4 h-4 text-orange-600 mr-2" />
                  <span className="text-sm text-orange-800 font-medium">Quick Tip</span>
                </div>
                <p className="text-xs text-orange-700 mt-1">
                  Use the sidebar to navigate between different EC2 topics and concepts.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              {/* Section Header */}
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                {(() => {
                  const section = sections.find(s => s.id === activeSection)
                  const Icon = section?.icon
                  return (
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                        {Icon && <Icon className="w-6 h-6 text-orange-600" />}
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900">{section?.label}</h2>
                        <p className="text-gray-600 mt-1">
                          {activeSection === 'overview' && 'Learn about EC2 fundamentals and architecture'}
                          {activeSection === 'instances' && 'Explore different EC2 instance types and their use cases'}
                          {activeSection === 'pricing' && 'Understand EC2 pricing models and cost optimization'}
                          {activeSection === 'exam-tips' && 'Key concepts and tips for the AWS exam'}
                        </p>
                      </div>
                    </div>
                  )
                })()}
              </motion.div>

              {/* Content */}
              <motion.div
                key={activeSection}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {/* Overview Section */}
                {activeSection === 'overview' && (
                  <div className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">What is EC2?</h3>
                        <p className="text-lg text-gray-700 mb-6">
                          Amazon Elastic Compute Cloud (EC2) provides scalable computing capacity in the AWS cloud.
                        </p>
                        
                        <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-6">
                          <div className="flex">
                            <Info className="w-5 h-5 text-orange-400 mr-2 mt-0.5" />
                            <div>
                              <p className="text-orange-800 font-medium">Key Concept</p>
                              <p className="text-orange-700">EC2 allows you to launch virtual servers with different configurations and operating systems, providing complete control over your computing resources.</p>
                            </div>
                          </div>
                        </div>

                        <h4 className="text-xl font-semibold text-gray-900 mb-4">EC2 Benefits</h4>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Scalable computing capacity</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Multiple instance types for different workloads</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Auto Scaling for automatic capacity management</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Built-in security with VPC and IAM integration</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-xl font-semibold text-gray-900 mb-4">EC2 Architecture</h4>
                        <div className="bg-white rounded-lg shadow-md p-6 border">
                          <div className="space-y-4">
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                              <span className="text-sm font-medium">EC2 Instance</span>
                            </div>
                            <div className="ml-6 space-y-2">
                              <div className="flex items-center">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                                <span className="text-sm">EBS Volumes (Storage)</span>
                              </div>
                              <div className="flex items-center">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                <span className="text-sm">Security Groups (Firewall)</span>
                              </div>
                              <div className="flex items-center">
                                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                                <span className="text-sm">VPC (Network)</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                          <div className="flex">
                            <AlertTriangle className="w-5 h-5 text-yellow-400 mr-2 mt-0.5" />
                            <div>
                              <p className="text-yellow-800 font-medium">Exam Focus</p>
                              <p className="text-yellow-700">EC2 is heavily tested on the exam. Focus on instance types, pricing models, and security features.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                      <div className="bg-white rounded-lg shadow-md p-6 border text-center">
                        <Cpu className="w-12 h-12 mx-auto mb-4 text-orange-600" />
                        <h3 className="text-xl font-bold mb-2">Virtual Servers</h3>
                        <p className="text-gray-600">Launch virtual servers with different configurations and operating systems.</p>
                      </div>
                      <div className="bg-white rounded-lg shadow-md p-6 border text-center">
                        <Zap className="w-12 h-12 mx-auto mb-4 text-orange-600" />
                        <h3 className="text-xl font-bold mb-2">Auto Scaling</h3>
                        <p className="text-gray-600">Automatically scale your application up or down based on demand.</p>
                      </div>
                      <div className="bg-white rounded-lg shadow-md p-6 border text-center">
                        <Shield className="w-12 h-12 mx-auto mb-4 text-orange-600" />
                        <h3 className="text-xl font-bold mb-2">Security</h3>
                        <p className="text-gray-600">Built-in security features with VPC, security groups, and IAM integration.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Instance Types Section */}
                {activeSection === 'instances' && (
                  <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Instance Types</h3>
                    
                    <div className="space-y-8">
                      {instanceTypes.map((category, index) => (
                        <div key={category.category} className="bg-white rounded-lg shadow-md p-6 border">
                          <div className="flex items-center mb-6">
                            <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mr-4`}>
                              <category.icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h4 className="text-2xl font-bold text-gray-900">{category.category}</h4>
                              <p className="text-gray-600">{category.description}</p>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {category.instances.map((instance) => (
                              <div key={instance.name} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <h5 className="font-bold text-lg text-gray-900 mb-2">{instance.name}</h5>
                                <div className="space-y-2 text-sm text-gray-600">
                                  <div className="flex justify-between">
                                    <span>vCPU:</span>
                                    <span className="font-semibold">{instance.vCPU}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Memory:</span>
                                    <span className="font-semibold">{instance.memory}</span>
                                  </div>
                                  {'network' in instance && (
                                    <div className="flex justify-between">
                                      <span>Network:</span>
                                      <span className="font-semibold">{instance.network}</span>
                                    </div>
                                  )}
                                  {'storage' in instance && (
                                    <div className="flex justify-between">
                                      <span>Storage:</span>
                                      <span className="font-semibold">{instance.storage}</span>
                                    </div>
                                  )}
                                </div>
                                <div className="mt-3 pt-3 border-t border-gray-200">
                                  <p className="text-xs text-gray-500">{instance.useCase}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pricing Section */}
                {activeSection === 'pricing' && (
                  <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Pricing Models</h3>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                      {pricingModels.map((model) => (
                        <div key={model.type} className="bg-white rounded-lg shadow-md p-6 border">
                          <div className={`w-12 h-12 bg-gradient-to-r ${model.color} rounded-lg flex items-center justify-center mb-4`}>
                            <model.icon className="w-6 h-6 text-white" />
                          </div>
                          <h4 className="text-xl font-bold text-gray-900 mb-2">{model.type}</h4>
                          <p className="text-gray-600 mb-4">{model.description}</p>
                          
                          <div className="space-y-4">
                            <div>
                              <h5 className="font-semibold text-green-700 mb-2">Pros:</h5>
                              <ul className="text-sm text-gray-600 space-y-1">
                                {model.pros.map((pro, index) => (
                                  <li key={index} className="flex items-start">
                                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                    {pro}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-semibold text-red-700 mb-2">Cons:</h5>
                              <ul className="text-sm text-gray-600 space-y-1">
                                {model.cons.map((con, index) => (
                                  <li key={index} className="flex items-start">
                                    <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                                    {con}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="p-3 bg-gray-50 rounded">
                              <p className="text-sm font-medium text-gray-800">Best for:</p>
                              <p className="text-sm text-gray-600">{model.bestFor}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Exam Tips Section */}
                {activeSection === 'exam-tips' && (
                  <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">EC2 Exam Tips</h3>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
                          <h4 className="text-xl font-semibold text-yellow-800 mb-4 flex items-center">
                            <AlertTriangle className="w-5 h-5 mr-2" />
                            Key Concepts to Master
                          </h4>
                          <ul className="space-y-3">
                            <li className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span>Instance types and their use cases</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span>Pricing models (On-Demand, Reserved, Spot)</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span>Security groups and network ACLs</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span>EBS volume types and use cases</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span>Auto Scaling and Load Balancing</span>
                            </li>
                          </ul>
                        </div>

                        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded">
                          <h4 className="text-xl font-semibold text-blue-800 mb-4">Common Exam Questions</h4>
                          <div className="space-y-4">
                            <div className="p-3 bg-white rounded">
                              <p className="font-medium text-sm">"When should you use Spot instances?"</p>
                              <p className="text-sm text-gray-600 mt-1">Answer: For fault-tolerant, flexible workloads that can handle interruptions</p>
                            </div>
                            <div className="p-3 bg-white rounded">
                              <p className="font-medium text-sm">"What's the difference between T3 and M6i instances?"</p>
                              <p className="text-sm text-gray-600 mt-1">Answer: T3 are burstable, M6i are general purpose with consistent performance</p>
                            </div>
                            <div className="p-3 bg-white rounded">
                              <p className="font-medium text-sm">"How do security groups work?"</p>
                              <p className="text-sm text-gray-600 mt-1">Answer: Stateful firewalls that control inbound and outbound traffic at the instance level</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded">
                          <h4 className="text-xl font-semibold text-green-800 mb-4">Service Limits to Remember</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center p-2 bg-white rounded">
                              <span className="text-sm">Instances per region</span>
                              <span className="font-medium">20 per type</span>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-white rounded">
                              <span className="text-sm">EBS volumes per instance</span>
                              <span className="font-medium">27</span>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-white rounded">
                              <span className="text-sm">Security groups per instance</span>
                              <span className="font-medium">5</span>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-white rounded">
                              <span className="text-sm">EBS volume size</span>
                              <span className="font-medium">1 GB - 16 TB</span>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-white rounded">
                              <span className="text-sm">Spot instance interruption</span>
                              <span className="font-medium">2-minute notice</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded">
                          <h4 className="text-xl font-semibold text-purple-800 mb-4">Troubleshooting Tips</h4>
                          <div className="space-y-3">
                            <div className="p-3 bg-white rounded">
                              <p className="font-medium text-sm text-purple-800">Connectivity Issues</p>
                              <ul className="text-sm text-purple-700 mt-1 space-y-1">
                                <li>• Check security groups</li>
                                <li>• Verify VPC configuration</li>
                                <li>• Test network connectivity</li>
                                <li>• Review route tables</li>
                              </ul>
                            </div>
                            <div className="p-3 bg-white rounded">
                              <p className="font-medium text-sm text-purple-800">Performance Issues</p>
                              <ul className="text-sm text-purple-700 mt-1 space-y-1">
                                <li>• Monitor CloudWatch metrics</li>
                                <li>• Check EBS volume performance</li>
                                <li>• Review instance type sizing</li>
                                <li>• Analyze CPU and memory usage</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 