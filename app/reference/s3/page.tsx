'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Database, 
  Shield, 
  Globe, 
  Cloud, 
  Zap,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Target,
  AlertTriangle,
  CheckCircle,
  Info,
  Lock,
  Download,
  Upload,
  Archive
} from 'lucide-react'

const s3Features = [
  {
    category: 'Storage Classes',
    description: 'Different storage options for different use cases',
    icon: Archive,
    color: 'from-blue-500 to-blue-600',
    features: [
      {
        name: 'S3 Standard',
        description: 'High availability and durability for frequently accessed data',
        useCase: 'Web applications, content distribution, big data analytics',
        durability: '99.999999999% (11 9s)',
        availability: '99.99%',
        cost: 'Highest cost'
      },
      {
        name: 'S3 Standard-IA',
        description: 'Infrequent access storage for data accessed less frequently',
        useCase: 'Backup data, disaster recovery, long-term storage',
        durability: '99.999999999% (11 9s)',
        availability: '99.9%',
        cost: 'Lower cost than Standard'
      },
      {
        name: 'S3 One Zone-IA',
        description: 'Single AZ storage for infrequently accessed data',
        useCase: 'Secondary backup copies, easily recreated data',
        durability: '99.999999999% (11 9s)',
        availability: '99.5%',
        cost: '20% less than Standard-IA'
      },
      {
        name: 'S3 Glacier',
        description: 'Low-cost storage for long-term archival',
        useCase: 'Long-term backup, compliance archives',
        durability: '99.999999999% (11 9s)',
        availability: '99.9%',
        cost: 'Lowest cost, retrieval fees apply'
      },
      {
        name: 'S3 Glacier Deep Archive',
        description: 'Lowest cost storage for rarely accessed data',
        useCase: 'Long-term compliance, regulatory archives',
        durability: '99.999999999% (11 9s)',
        availability: '99.9%',
        cost: 'Lowest cost, highest retrieval fees'
      }
    ]
  },
  {
    category: 'Security Features',
    description: 'Built-in security and compliance capabilities',
    icon: Shield,
    color: 'from-green-500 to-green-600',
    features: [
      {
        name: 'Server-Side Encryption',
        description: 'Automatic encryption of data at rest',
        types: ['SSE-S3 (AWS managed keys)', 'SSE-KMS (KMS managed keys)', 'SSE-C (Customer provided keys)'],
        default: 'Enabled by default'
      },
      {
        name: 'Bucket Policies',
        description: 'JSON-based access control policies',
        capabilities: ['Allow/Deny access', 'Cross-account access', 'Conditional access'],
        scope: 'Bucket and object level'
      },
      {
        name: 'IAM Policies',
        description: 'User and role-based access control',
        integration: 'Works with AWS IAM',
        granularity: 'Fine-grained permissions'
      },
      {
        name: 'Access Control Lists',
        description: 'Legacy access control mechanism',
        limitation: 'Limited to 100 grants per bucket/object',
        recommendation: 'Use bucket policies instead'
      },
      {
        name: 'VPC Endpoints',
        description: 'Private connection to S3 from VPC',
        benefit: 'No internet gateway required',
        security: 'Enhanced network security'
      }
    ]
  },
  {
    category: 'Data Management',
    description: 'Tools for managing and organizing your data',
    icon: Cloud,
    color: 'from-purple-500 to-purple-600',
    features: [
      {
        name: 'Lifecycle Policies',
        description: 'Automated data lifecycle management',
        actions: ['Transition between storage classes', 'Delete objects after expiration', 'Delete incomplete multipart uploads'],
        automation: 'Fully automated'
      },
      {
        name: 'Cross-Region Replication',
        description: 'Automatic replication to different regions',
        useCase: 'Compliance, disaster recovery, latency reduction',
        requirements: 'Versioning must be enabled on source bucket'
      },
      {
        name: 'Object Versioning',
        description: 'Keep multiple versions of objects',
        benefit: 'Protect against accidental deletion',
        cost: 'Additional storage costs for versions'
      },
      {
        name: 'Object Lock',
        description: 'Prevent object deletion for compliance',
        modes: ['Governance mode', 'Compliance mode'],
        useCase: 'WORM (Write Once Read Many) compliance'
      },
      {
        name: 'S3 Batch Operations',
        description: 'Perform operations on millions of objects',
        operations: ['Copy objects', 'Invoke Lambda functions', 'Replace object tags'],
        efficiency: 'High-throughput processing'
      }
    ]
  },
  {
    category: 'Performance & Optimization',
    description: 'Maximize performance and reduce costs',
    icon: Zap,
    color: 'from-orange-500 to-orange-600',
    features: [
      {
        name: 'S3 Transfer Acceleration',
        description: 'Fast, secure file transfers over long distances',
        benefit: 'Up to 10x faster uploads',
        useCase: 'Global file uploads, content distribution'
      },
      {
        name: 'S3 Select',
        description: 'Retrieve only the data you need',
        benefit: 'Reduce data transfer and processing costs',
        formats: 'CSV, JSON, Parquet'
      },
      {
        name: 'S3 Glacier Select',
        description: 'Query data stored in Glacier',
        benefit: 'Query without restoring entire objects',
        formats: 'CSV, JSON'
      },
      {
        name: 'Multipart Upload',
        description: 'Upload large objects in parts',
        benefit: 'Improved upload reliability and performance',
        threshold: 'Recommended for objects > 100 MB'
      },
      {
        name: 'S3 Intelligent Tiering',
        description: 'Automatically optimize storage costs',
        benefit: 'No retrieval fees, automatic optimization',
        monitoring: 'Monthly monitoring fee'
      }
    ]
  }
]

const examTips = [
  {
    category: 'Storage Classes',
    tips: [
      'S3 Standard: 99.99% availability, highest cost',
      'S3 Standard-IA: 99.9% availability, lower cost, minimum 30 days',
      'S3 One Zone-IA: Single AZ, 20% cheaper than Standard-IA',
      'S3 Glacier: 3-5 hours retrieval, lowest cost',
      'S3 Glacier Deep Archive: 12-48 hours retrieval, lowest cost'
    ]
  },
  {
    category: 'Security',
    tips: [
      'Server-side encryption is enabled by default',
      'Bucket policies are more powerful than ACLs',
      'IAM policies can be attached to users, groups, or roles',
      'VPC endpoints provide private access to S3',
      'Object Lock provides WORM compliance'
    ]
  },
  {
    category: 'Data Management',
    tips: [
      'Lifecycle policies can transition objects between storage classes',
      'Cross-region replication requires versioning to be enabled',
      'Object versioning protects against accidental deletion',
      'S3 Batch Operations can process millions of objects',
      'S3 Select reduces data transfer costs'
    ]
  },
  {
    category: 'Performance',
    tips: [
      'Transfer Acceleration uses CloudFront edge locations',
      'Multipart upload is recommended for objects > 100 MB',
      'S3 Intelligent Tiering has no retrieval fees',
      'S3 Select supports CSV, JSON, and Parquet formats',
      'Glacier Select allows querying without full restore'
    ]
  }
]

const commonScenarios = [
  {
    scenario: 'Static website hosting',
    solution: 'Use S3 Standard storage class, enable static website hosting, configure bucket policy for public read access.',
    architecture: 'S3 Bucket → Static Website Hosting → CloudFront (optional) → Route 53'
  },
  {
    scenario: 'Data lake for analytics',
    solution: 'Use S3 Standard for hot data, S3 Standard-IA for warm data, S3 Glacier for cold data. Enable S3 Select for querying.',
    architecture: 'S3 Standard → S3 Standard-IA → S3 Glacier → Athena/Redshift'
  },
  {
    scenario: 'Backup and disaster recovery',
    solution: 'Use S3 Standard-IA for backup storage, enable cross-region replication, implement lifecycle policies for cost optimization.',
    architecture: 'Source → S3 Standard-IA → Cross-Region Replication → S3 Glacier'
  },
  {
    scenario: 'Content distribution',
    solution: 'Use S3 Standard storage, enable Transfer Acceleration for global uploads, integrate with CloudFront for global distribution.',
    architecture: 'S3 Standard → Transfer Acceleration → CloudFront → Global Users'
  }
]

export default function S3ReferencePage() {
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
              <Database className="w-12 h-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">
                S3 Reference Guide
              </h1>
            </div>
            <p className="text-xl max-w-3xl mx-auto">
              Complete reference for Amazon Simple Storage Service (S3) - the foundation of AWS storage services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {['overview', 'storage-classes', 'security', 'data-management', 'performance', 'exam-tips'].map((section) => (
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
                <h2 className="text-3xl font-bold text-gray-900 mb-4">S3 Overview</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Amazon S3 is an object storage service that offers industry-leading scalability, data availability, security, and performance.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="card text-center">
                  <Database className="w-12 h-12 mx-auto mb-4 text-aws-orange" />
                  <h3 className="text-xl font-bold mb-2">Object Storage</h3>
                  <p className="text-gray-600">Store and retrieve any amount of data from anywhere on the web.</p>
                </div>
                <div className="card text-center">
                  <Shield className="w-12 h-12 mx-auto mb-4 text-aws-orange" />
                  <h3 className="text-xl font-bold mb-2">Security</h3>
                  <p className="text-gray-600">Built-in security features with encryption, access controls, and compliance.</p>
                </div>
                <div className="card text-center">
                  <Zap className="w-12 h-12 mx-auto mb-4 text-aws-orange" />
                  <h3 className="text-xl font-bold mb-2">Performance</h3>
                  <p className="text-gray-600">High performance with Transfer Acceleration and intelligent tiering.</p>
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
                    <h4 className="font-semibold text-gray-900 mb-3">Storage</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                        99.999999999% (11 9s) durability
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                        Multiple storage classes for cost optimization
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                        Unlimited storage capacity
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Security</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                        Server-side encryption by default
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                        Fine-grained access controls
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                        Compliance and audit capabilities
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Storage Classes Section */}
          {expandedSection === 'storage-classes' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Storage Classes</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Choose the right storage class based on your access patterns and cost requirements.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {s3Features[0].features.map((feature, index) => (
                  <div key={feature.name} className="card">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.name}</h3>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">Use Case:</h4>
                        <p className="text-sm text-gray-600">{feature.useCase}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Durability:</h4>
                        <p className="text-sm text-gray-600">{feature.durability}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Availability:</h4>
                        <p className="text-sm text-gray-600">{feature.availability}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Cost:</h4>
                        <p className="text-sm text-gray-600">{feature.cost}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Security Section */}
          {expandedSection === 'security' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Security Features</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Comprehensive security features to protect your data and control access.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {s3Features[1].features.map((feature, index) => (
                  <div key={feature.name} className="card">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.name}</h3>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    
                    <div className="space-y-3">
                      {feature.types && (
                        <div>
                          <h4 className="font-semibold text-gray-900">Types:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {feature.types.map((type, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="w-1 h-1 bg-aws-orange rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                {type}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {feature.capabilities && (
                        <div>
                          <h4 className="font-semibold text-gray-900">Capabilities:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {feature.capabilities.map((cap, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="w-1 h-1 bg-aws-orange rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                {cap}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {feature.default && (
                        <div>
                          <h4 className="font-semibold text-gray-900">Default:</h4>
                          <p className="text-sm text-gray-600">{feature.default}</p>
                        </div>
                      )}
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
              Test your S3 knowledge with our interactive practice questions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <button className="btn-primary text-lg py-4 flex items-center justify-center">
              <BookOpen className="w-5 h-5 mr-2" />
              S3 Practice Questions
            </button>
            <button className="btn-secondary text-lg py-4 flex items-center justify-center">
              <Target className="w-5 h-5 mr-2" />
              Storage Class Quiz
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