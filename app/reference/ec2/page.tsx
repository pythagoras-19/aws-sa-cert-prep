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
  Lock
} from 'lucide-react'

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

const examTips = [
  {
    category: 'Instance Types',
    tips: [
      'Understand the difference between instance families (T, M, C, R, I, D)',
      'T instances are burstable - they can burst CPU when needed',
      'M instances provide a balance of compute, memory, and networking',
      'C instances are optimized for compute-intensive workloads',
      'R instances are optimized for memory-intensive applications',
      'I and D instances are optimized for storage-intensive workloads'
    ]
  },
  {
    category: 'Pricing',
    tips: [
      'On-Demand: Highest cost, most flexible',
      'Reserved: 1-3 year commitment, significant savings',
      'Spot: Up to 90% discount, but can be terminated',
      'Savings Plans: Flexible pricing model for consistent usage',
      'Dedicated Hosts: Physical servers for compliance requirements'
    ]
  },
  {
    category: 'Networking',
    tips: [
      'Security Groups are stateful (return traffic is automatically allowed)',
      'Network ACLs are stateless (you must explicitly allow return traffic)',
      'Elastic IP addresses are static and can be moved between instances',
      'Instance metadata service (IMDS) provides instance information',
      'VPC endpoints allow private communication with AWS services'
    ]
  },
  {
    category: 'Storage',
    tips: [
      'EBS volumes are network-attached storage',
      'Instance Store is physically attached to the host (ephemeral)',
      'EBS volumes can be encrypted at rest',
      'EBS snapshots are incremental and stored in S3',
      'EBS volumes can be resized (only increase, not decrease)'
    ]
  }
]

const commonScenarios = [
  {
    scenario: 'High-traffic web application',
    solution: 'Use Auto Scaling Group with Application Load Balancer. Use M6i instances for balanced performance.',
    architecture: 'ALB → Auto Scaling Group → M6i instances across multiple AZs'
  },
  {
    scenario: 'Database server',
    solution: 'Use R6i instances for memory optimization. Use EBS gp3 volumes for storage. Deploy in private subnets.',
    architecture: 'R6i instance in private subnet → EBS gp3 volumes → Security Groups for database access'
  },
  {
    scenario: 'Batch processing workload',
    solution: 'Use Spot instances for cost optimization. Use C6i instances for compute optimization. Implement fault tolerance.',
    architecture: 'Spot Fleet → C6i instances → S3 for input/output → CloudWatch for monitoring'
  },
  {
    scenario: 'Development environment',
    solution: 'Use T3 instances for cost-effective development. Use user data scripts for automation.',
    architecture: 'T3 instances → EBS gp2 volumes → Security Groups → IAM roles for AWS access'
  }
]

export default function EC2ReferencePage() {
  const [expandedSection, setExpandedSection] = useState<string | null>('overview')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="aws-gradient text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <Server className="w-12 h-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">
                EC2 Reference Guide
              </h1>
            </div>
            <p className="text-xl max-w-3xl mx-auto">
              Complete reference for Amazon Elastic Compute Cloud (EC2) - the foundation of AWS compute services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {['overview', 'instances', 'pricing', 'exam-tips'].map((section) => (
              <button
                key={section}
                onClick={() => setExpandedSection(section)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  expandedSection === section
                    ? 'bg-aws-orange text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          
          {/* Overview Section */}
          {expandedSection === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">EC2 Overview</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Amazon Elastic Compute Cloud (EC2) provides scalable computing capacity in the AWS cloud.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="card text-center">
                  <Cpu className="w-12 h-12 mx-auto mb-4 text-aws-orange" />
                  <h3 className="text-xl font-bold mb-2">Virtual Servers</h3>
                  <p className="text-gray-600">Launch virtual servers with different configurations and operating systems.</p>
                </div>
                <div className="card text-center">
                  <Zap className="w-12 h-12 mx-auto mb-4 text-aws-orange" />
                  <h3 className="text-xl font-bold mb-2">Auto Scaling</h3>
                  <p className="text-gray-600">Automatically scale your application up or down based on demand.</p>
                </div>
                <div className="card text-center">
                  <Shield className="w-12 h-12 mx-auto mb-4 text-aws-orange" />
                  <h3 className="text-xl font-bold mb-2">Security</h3>
                  <p className="text-gray-600">Built-in security features with VPC, security groups, and IAM integration.</p>
                </div>
              </div>

              {/* Key Features */}
              <div className="card">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Info className="w-6 h-6 mr-2 text-aws-orange" />
                  Key Features
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Compute</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                        Multiple instance types for different workloads
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                        Auto Scaling for automatic capacity management
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                        Load balancing for high availability
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Storage</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                        EBS volumes for persistent block storage
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                        Instance Store for temporary storage
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                        EBS snapshots for backup and recovery
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Instance Types Section */}
          {expandedSection === 'instances' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Instance Types</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Choose the right instance type based on your workload requirements.
                </p>
              </div>

              <div className="space-y-8">
                {instanceTypes.map((category, index) => (
                  <div key={category.category} className="card">
                    <div className="flex items-center mb-6">
                      <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mr-4`}>
                        <category.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{category.category}</h3>
                        <p className="text-gray-600">{category.description}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.instances.map((instance) => (
                        <div key={instance.name} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <h4 className="font-bold text-lg text-gray-900 mb-2">{instance.name}</h4>
                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex justify-between">
                              <span>vCPU:</span>
                              <span className="font-semibold">{instance.vCPU}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Memory:</span>
                              <span className="font-semibold">{instance.memory}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Network:</span>
                              <span className="font-semibold">{instance.network}</span>
                            </div>
                            {instance.storage && (
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
            </motion.div>
          )}

          {/* Pricing Section */}
          {expandedSection === 'pricing' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Pricing Models</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Choose the right pricing model to optimize costs for your workload.
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {pricingModels.map((model) => (
                  <div key={model.type} className="card">
                    <div className={`w-12 h-12 bg-gradient-to-r ${model.color} rounded-lg flex items-center justify-center mb-4`}>
                      <model.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{model.type}</h3>
                    <p className="text-gray-600 mb-4">{model.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                        Pros
                      </h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        {model.pros.map((pro, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-1 h-1 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-1 text-orange-500" />
                        Cons
                      </h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        {model.cons.map((con, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-1 h-1 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-2">Best For</h4>
                      <p className="text-sm text-gray-600">{model.bestFor}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Exam Tips Section */}
          {expandedSection === 'exam-tips' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Exam Tips</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Key concepts and tips to remember for the AWS Solutions Architect Associate exam.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {examTips.map((category) => (
                  <div key={category.category} className="card">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <BookOpen className="w-5 h-5 mr-2 text-aws-orange" />
                      {category.category}
                    </h3>
                    <ul className="space-y-3">
                      {category.tips.map((tip, index) => (
                        <li key={index} className="flex items-start text-gray-700">
                          <span className="w-2 h-2 bg-aws-orange rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Common Scenarios */}
              <div className="card">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Target className="w-6 h-6 mr-2 text-aws-orange" />
                  Common Scenarios
                </h3>
                <div className="space-y-6">
                  {commonScenarios.map((scenario, index) => (
                    <div key={index} className="border-l-4 border-aws-orange pl-4">
                      <h4 className="font-bold text-gray-900 mb-2">{scenario.scenario}</h4>
                      <p className="text-gray-600 mb-2">{scenario.solution}</p>
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <p className="text-sm font-mono text-gray-700">{scenario.architecture}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Practice?</h2>
            <p className="text-lg text-gray-600">
              Test your EC2 knowledge with our interactive practice questions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <button className="btn-primary text-lg py-4 flex items-center justify-center">
              <BookOpen className="w-5 h-5 mr-2" />
              EC2 Practice Questions
            </button>
            <button className="btn-secondary text-lg py-4 flex items-center justify-center">
              <Target className="w-5 h-5 mr-2" />
              Instance Type Quiz
            </button>
            <button className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-4 px-6 rounded-lg text-lg transition-colors flex items-center justify-center">
              <ExternalLink className="w-5 h-5 mr-2" />
              AWS Documentation
            </button>
          </div>
        </div>
      </section>
    </div>
  )
} 