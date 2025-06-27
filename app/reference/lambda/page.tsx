'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Zap, 
  Clock, 
  DollarSign, 
  BookOpen, 
  Code,
  Database,
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
  Play
} from 'lucide-react'

export default function LambdaReferencePage() {
  const [activeSection, setActiveSection] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const sections = [
    { id: 'overview', label: 'Overview', icon: Zap },
    { id: 'runtimes', label: 'Runtime Environments', icon: Code },
    { id: 'pricing', label: 'Pricing Model', icon: DollarSign },
    { id: 'limits', label: 'Limits & Quotas', icon: AlertTriangle },
    { id: 'exam-tips', label: 'Exam Tips', icon: BookOpen }
  ]

  const runtimeEnvironments = [
    {
      runtime: 'Node.js',
      versions: ['18.x', '20.x'],
      icon: Code,
      color: 'from-green-500 to-green-600',
      description: 'JavaScript runtime for serverless applications',
      useCases: ['Web APIs', 'Microservices', 'Event processing'],
      maxMemory: '10,240 MB',
      maxTimeout: '15 minutes'
    },
    {
      runtime: 'Python',
      versions: ['3.9', '3.10', '3.11', '3.12'],
      icon: Code,
      color: 'from-blue-500 to-blue-600',
      description: 'Python runtime for data processing and ML',
      useCases: ['Data processing', 'Machine Learning', 'Automation'],
      maxMemory: '10,240 MB',
      maxTimeout: '15 minutes'
    },
    {
      runtime: 'Java',
      versions: ['8', '11', '17', '21'],
      icon: Code,
      color: 'from-orange-500 to-orange-600',
      description: 'Enterprise Java applications',
      useCases: ['Enterprise apps', 'Spring Boot', 'Legacy systems'],
      maxMemory: '10,240 MB',
      maxTimeout: '15 minutes'
    },
    {
      runtime: 'Go',
      versions: ['1.x'],
      icon: Code,
      color: 'from-cyan-500 to-cyan-600',
      description: 'High-performance Go applications',
      useCases: ['High-performance APIs', 'Microservices', 'CLI tools'],
      maxMemory: '10,240 MB',
      maxTimeout: '15 minutes'
    },
    {
      runtime: 'Ruby',
      versions: ['3.2'],
      icon: Code,
      color: 'from-red-500 to-red-600',
      description: 'Ruby applications and scripts',
      useCases: ['Web applications', 'Scripts', 'Rails apps'],
      maxMemory: '10,240 MB',
      maxTimeout: '15 minutes'
    },
    {
      runtime: 'Custom Runtime',
      versions: ['Any'],
      icon: Code,
      color: 'from-purple-500 to-purple-600',
      description: 'Bring your own runtime',
      useCases: ['Custom languages', 'Specialized tools', 'Legacy code'],
      maxMemory: '10,240 MB',
      maxTimeout: '15 minutes'
    }
  ]

  const pricingComponents = [
    {
      component: 'Request Pricing',
      description: 'Pay per request',
      icon: Target,
      color: 'from-blue-500 to-blue-600',
      details: [
        'First 1M requests per month: Free',
        'Additional requests: $0.20 per 1M requests'
      ],
      notes: 'Each request to your function counts, regardless of duration'
    },
    {
      component: 'Compute Pricing',
      description: 'Pay for compute time',
      icon: Cpu,
      color: 'from-green-500 to-green-600',
      details: [
        'First 400,000 GB-seconds per month: Free',
        'Additional GB-seconds: $0.0000166667 per GB-second'
      ],
      notes: 'GB-seconds = Memory allocated × Execution time in seconds'
    },
    {
      component: 'Provisioned Concurrency',
      description: 'Pre-warmed execution environments',
      icon: Clock,
      color: 'from-orange-500 to-orange-600',
      details: [
        '$0.0000041667 per GB-second',
        'Charged for allocated memory, not execution time'
      ],
      notes: 'Eliminates cold starts but costs more than on-demand'
    }
  ]

  const limits = [
    {
      category: 'Function Configuration',
      icon: Settings,
      limits: [
        { name: 'Memory Allocation', value: '128 MB to 10,240 MB', note: 'In 1 MB increments' },
        { name: 'Timeout', value: '15 minutes maximum', note: 'Default is 3 seconds' },
        { name: 'Environment Variables', value: '4 KB total', note: 'All environment variables combined' },
        { name: 'Temporary Storage', value: '512 MB', note: '/tmp directory' }
      ]
    },
    {
      category: 'Deployment',
      icon: Upload,
      limits: [
        { name: 'Deployment Package', value: '50 MB zipped, 250 MB unzipped', note: 'Direct upload limit' },
        { name: 'Deployment Package (S3)', value: '250 MB zipped, 500 MB unzipped', note: 'Via S3' },
        { name: 'Layers', value: '5 layers per function', note: 'Each layer up to 250 MB' },
        { name: 'Function Code', value: '250 MB unzipped', note: 'Total unzipped size' }
      ]
    },
    {
      category: 'Execution',
      icon: Play,
      limits: [
        { name: 'Concurrent Executions', value: '1,000 per region (default)', note: 'Can be increased via support' },
        { name: 'Invocation Payload', value: '6 MB synchronous, 256 KB asynchronous', note: 'Request/response size' },
        { name: 'Event Source Mapping', value: '5 per function', note: 'For stream-based sources' },
        { name: 'Dead Letter Queue', value: '1 per function', note: 'For failed executions' }
      ]
    }
  ]

  const examTips = [
    {
      tip: "Cold Start vs Warm Start",
      description: "Cold starts occur when a new execution environment is created. Warm starts reuse existing environments.",
      importance: "High",
      icon: Zap
    },
    {
      tip: "Memory Allocation Affects Performance",
      description: "More memory = more CPU power. Lambda allocates CPU proportionally to memory.",
      importance: "High",
      icon: Cpu
    },
    {
      tip: "Timeout Configuration",
      description: "Default timeout is 3 seconds. Maximum is 15 minutes. Set appropriate timeouts for your use case.",
      importance: "Medium",
      icon: Clock
    },
    {
      tip: "Event Source Mapping",
      description: "Used for stream-based sources like Kinesis, DynamoDB Streams, SQS. Polls for records automatically.",
      importance: "High",
      icon: Database
    },
    {
      tip: "VPC Configuration",
      description: "Lambda functions run outside VPC by default. VPC access adds cold start latency.",
      importance: "Medium",
      icon: Network
    },
    {
      tip: "Error Handling",
      description: "Use Dead Letter Queues for failed executions. Implement proper error handling in your code.",
      importance: "Medium",
      icon: AlertTriangle
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-600 to-yellow-800 text-white">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <Zap className="w-12 h-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">Lambda Reference Guide</h1>
            </div>
            <p className="text-xl max-w-3xl mx-auto">
              Complete reference for AWS Lambda - serverless compute service for event-driven applications
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center text-gray-700 hover:text-yellow-600"
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
              <h2 className="text-lg font-semibold text-gray-900">Lambda Topics</h2>
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
                        ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Lambda Overview</h2>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">What is AWS Lambda?</h3>
                      <p className="text-gray-700 mb-4">
                        AWS Lambda is a serverless compute service that runs your code in response to events and automatically manages the underlying compute resources.
                      </p>
                      <p className="text-gray-700 mb-4">
                        You can use Lambda to extend other AWS services with custom logic, or create your own backend services that operate at AWS scale, performance, and security.
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-3">Key Benefits</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>No servers to manage</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Continuous scaling</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Subsecond metering</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>High availability</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Common Use Cases</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <Database className="w-8 h-8 text-blue-500 mb-3" />
                        <h4 className="font-semibold text-gray-900 mb-2">Data Processing</h4>
                        <p className="text-gray-600">Process data from S3, DynamoDB, Kinesis streams</p>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <Globe className="w-8 h-8 text-green-500 mb-3" />
                        <h4 className="font-semibold text-gray-900 mb-2">Web Applications</h4>
                        <p className="text-gray-600">Build APIs and web backends</p>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <Server className="w-8 h-8 text-purple-500 mb-3" />
                        <h4 className="font-semibold text-gray-900 mb-2">IoT Backends</h4>
                        <p className="text-gray-600">Process IoT device data</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Runtime Environments Section */}
            {activeSection === 'runtimes' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Runtime Environments</h2>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {runtimeEnvironments.map((runtime, index) => {
                      const Icon = runtime.icon
                      return (
                        <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${runtime.color} text-white mb-4`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{runtime.runtime}</h3>
                          <p className="text-gray-600 mb-3">{runtime.description}</p>
                          
                          <div className="space-y-2">
                            <div>
                              <span className="text-sm font-medium text-gray-700">Versions:</span>
                              <p className="text-sm text-gray-600">{runtime.versions.join(', ')}</p>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-700">Use Cases:</span>
                              <ul className="text-sm text-gray-600 list-disc list-inside">
                                {runtime.useCases.map((useCase, i) => (
                                  <li key={i}>{useCase}</li>
                                ))}
                              </ul>
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

                  <div className="mt-8 bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing Example</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Scenario:</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• 1M requests per month</li>
                          <li>• 128 MB memory allocation</li>
                          <li>• 100ms average duration</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Cost Calculation:</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Requests: Free (within free tier)</li>
                          <li>• Compute: Free (within free tier)</li>
                          <li>• <strong>Total: $0.00</strong></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Limits Section */}
            {activeSection === 'limits' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Limits & Quotas</h2>
                  
                  <div className="space-y-8">
                    {limits.map((category, index) => {
                      const Icon = category.icon
                      return (
                        <div key={index} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex items-center mb-4">
                            <Icon className="w-6 h-6 text-yellow-600 mr-3" />
                            <h3 className="text-xl font-semibold text-gray-900">{category.category}</h3>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-4">
                            {category.limits.map((limit, i) => (
                              <div key={i} className="bg-gray-50 p-4 rounded">
                                <div className="flex justify-between items-start mb-2">
                                  <span className="font-medium text-gray-900">{limit.name}</span>
                                  <span className="text-sm font-semibold text-yellow-600">{limit.value}</span>
                                </div>
                                <p className="text-sm text-gray-600">{limit.note}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    })}
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
