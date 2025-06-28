'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import TopicsBar from '../../components/TopicsBar'
import { 
  Database, 
  Shield, 
  Zap, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  Info,
  ArrowRight,
  BookOpen,
  Target,
  Users,
  Lock,
  Menu,
  X,
  ChevronRight
} from 'lucide-react'

export default function RDSReferencePage() {
  const [activeSection, setActiveSection] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const sections = [
    { id: 'overview', label: 'Overview', icon: Database },
    { id: 'engines', label: 'Database Engines', icon: Zap },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'performance', label: 'Performance', icon: Clock },
    { id: 'scenarios', label: 'Scenarios', icon: Target },
    { id: 'exam-tips', label: 'Exam Tips', icon: BookOpen }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <Database className="w-12 h-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">RDS Reference Guide</h1>
            </div>
            <p className="text-xl max-w-3xl mx-auto">
              Comprehensive guide to Amazon Relational Database Service (RDS) for the AWS Solutions Architect Associate exam
            </p>
          </motion.div>
        </div>
      </div>

      {/* Topics Bar */}
      <TopicsBar
        topics={sections}
        activeTopic={activeSection}
        onTopicChange={setActiveSection}
        title="RDS Reference"
      />

      {/* Main Content */}
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
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    {Icon && <Icon className="w-6 h-6 text-purple-600" />}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">{section?.label}</h2>
                    <p className="text-gray-600 mt-1">
                      {activeSection === 'overview' && 'Learn about RDS fundamentals and architecture'}
                      {activeSection === 'engines' && 'Explore supported database engines and their features'}
                      {activeSection === 'security' && 'Understand RDS security features and best practices'}
                      {activeSection === 'performance' && 'Optimize RDS performance and scalability'}
                      {activeSection === 'scenarios' && 'Real-world scenarios and use cases'}
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
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">What is RDS?</h3>
                    <p className="text-lg text-gray-700 mb-6">
                      Amazon RDS is a managed relational database service that makes it easy to set up, operate, and scale relational databases in the cloud.
                    </p>
                    
                    <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-6">
                      <div className="flex">
                        <Info className="w-5 h-5 text-purple-400 mr-2 mt-0.5" />
                        <div>
                          <p className="text-purple-800 font-medium">Key Concept</p>
                          <p className="text-purple-700">RDS handles database administration tasks like provisioning, patching, backup, recovery, failure detection, and repair.</p>
                        </div>
                      </div>
                    </div>

                    <h4 className="text-xl font-semibold text-gray-900 mb-4">RDS Benefits</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Automated database administration</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>High availability with Multi-AZ deployments</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Automated backups and point-in-time recovery</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Security features and compliance</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">RDS Architecture</h4>
                    <div className="bg-white rounded-lg shadow-md p-6 border">
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                          <span className="text-sm font-medium">Primary DB Instance</span>
                        </div>
                        <div className="ml-6 space-y-2">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            <span className="text-sm">Multi-AZ Standby</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                            <span className="text-sm">Read Replicas</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                            <span className="text-sm">Automated Backups</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                      <div className="flex">
                        <AlertTriangle className="w-5 h-5 text-yellow-400 mr-2 mt-0.5" />
                        <div>
                          <p className="text-yellow-800 font-medium">Exam Focus</p>
                          <p className="text-yellow-700">RDS is heavily tested on the exam. Focus on Multi-AZ vs Read Replicas, backup strategies, and security features.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Database Engines Section */}
            {activeSection === 'engines' && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Supported Database Engines</h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow-md p-6 border">
                      <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <Database className="w-5 h-5 mr-2 text-blue-600" />
                        MySQL
                      </h4>
                      <p className="text-gray-700 mb-4">
                        Popular open-source relational database with versions 5.7 and 8.0.
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Versions</span>
                          <span className="text-gray-600">5.7, 8.0</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Storage</span>
                          <span className="text-gray-600">Up to 64 TB</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Multi-AZ</span>
                          <span className="text-gray-600">Synchronous replication</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 border">
                      <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <Database className="w-5 h-5 mr-2 text-green-600" />
                        PostgreSQL
                      </h4>
                      <p className="text-gray-700 mb-4">
                        Advanced open-source database with versions 10 through 15.
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Versions</span>
                          <span className="text-gray-600">10, 11, 12, 13, 14, 15</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Storage</span>
                          <span className="text-gray-600">Up to 64 TB</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Multi-AZ</span>
                          <span className="text-gray-600">Synchronous replication</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow-md p-6 border">
                      <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <Database className="w-5 h-5 mr-2 text-orange-600" />
                        MariaDB
                      </h4>
                      <p className="text-gray-700 mb-4">
                        MySQL-compatible database with versions 10.3 through 10.6.
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Versions</span>
                          <span className="text-gray-600">10.3, 10.4, 10.5, 10.6</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Storage</span>
                          <span className="text-gray-600">Up to 64 TB</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Multi-AZ</span>
                          <span className="text-gray-600">Synchronous replication</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 border">
                      <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <Database className="w-5 h-5 mr-2 text-red-600" />
                        Oracle
                      </h4>
                      <p className="text-gray-700 mb-4">
                        Enterprise database with versions 12c, 19c, and 21c.
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Versions</span>
                          <span className="text-gray-600">12c, 19c, 21c</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Storage</span>
                          <span className="text-gray-600">Up to 64 TB</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Multi-AZ</span>
                          <span className="text-gray-600">Synchronous replication</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 border">
                      <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <Database className="w-5 h-5 mr-2 text-purple-600" />
                        SQL Server
                      </h4>
                      <p className="text-gray-700 mb-4">
                        Microsoft SQL Server with versions 2012 through 2019.
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Versions</span>
                          <span className="text-gray-600">2012, 2014, 2016, 2017, 2019</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Storage</span>
                          <span className="text-gray-600">Up to 64 TB</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Multi-AZ</span>
                          <span className="text-gray-600">Synchronous replication</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Section */}
            {activeSection === 'security' && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">RDS Security</h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="bg-white rounded-lg shadow-md p-6 border mb-6">
                      <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <Shield className="w-5 h-5 mr-2 text-green-600" />
                        Encryption
                      </h4>
                      <p className="text-gray-700 mb-4">
                        RDS provides encryption at rest and in transit for enhanced security.
                      </p>
                      <div className="space-y-3">
                        <div className="p-3 bg-green-50 rounded">
                          <p className="font-medium text-sm text-green-800">Encryption at Rest</p>
                          <ul className="text-sm text-green-700 mt-1 space-y-1">
                            <li>• Uses AWS KMS</li>
                            <li>• Encrypts data, logs, backups, snapshots</li>
                            <li>• Cannot be disabled once enabled</li>
                          </ul>
                        </div>
                        <div className="p-3 bg-blue-50 rounded">
                          <p className="font-medium text-sm text-blue-800">Encryption in Transit</p>
                          <ul className="text-sm text-blue-700 mt-1 space-y-1">
                            <li>• SSL/TLS connections</li>
                            <li>• Required for Multi-AZ</li>
                            <li>• Can be enforced</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 border">
                      <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <Lock className="w-5 h-5 mr-2 text-red-600" />
                        Network Security
                      </h4>
                      <p className="text-gray-700 mb-4">
                        RDS instances are deployed in VPC subnets with security group protection.
                      </p>
                      <div className="space-y-3">
                        <div className="p-3 bg-gray-50 rounded">
                          <p className="font-medium text-sm">Security Features:</p>
                          <ul className="text-sm text-gray-600 mt-1 space-y-1">
                            <li>• VPC isolation</li>
                            <li>• Security groups</li>
                            <li>• Network ACLs</li>
                            <li>• Private subnets</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="bg-white rounded-lg shadow-md p-6 border mb-6">
                      <h4 className="text-xl font-semibold text-gray-900 mb-4">IAM Database Authentication</h4>
                      <p className="text-gray-700 mb-4">
                        Use IAM roles and policies to control database access without managing passwords.
                      </p>
                      <div className="space-y-3">
                        <div className="p-3 bg-purple-50 rounded">
                          <p className="text-sm font-medium text-purple-800">Benefits:</p>
                          <ul className="text-sm text-purple-700 mt-1 space-y-1">
                            <li>• No password management</li>
                            <li>• Centralized access control</li>
                            <li>• Temporary credentials</li>
                            <li>• Fine-grained permissions</li>
                          </ul>
                        </div>
                        <div className="p-3 bg-orange-50 rounded">
                          <p className="text-sm font-medium text-orange-800">Supported Engines:</p>
                          <ul className="text-sm text-orange-700 mt-1 space-y-1">
                            <li>• MySQL 5.7+</li>
                            <li>• PostgreSQL 9.4+</li>
                            <li>• MariaDB 10.2+</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 border">
                      <h4 className="text-xl font-semibold text-gray-900 mb-4">Parameter Groups</h4>
                      <p className="text-gray-700 mb-4">
                        Control database engine configuration parameters for security and performance.
                      </p>
                      <div className="space-y-3">
                        <div className="p-3 bg-blue-50 rounded">
                          <p className="text-sm font-medium text-blue-800">Security Parameters:</p>
                          <ul className="text-sm text-blue-700 mt-1 space-y-1">
                            <li>• SSL requirements</li>
                            <li>• Password policies</li>
                            <li>• Connection limits</li>
                            <li>• Audit logging</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Performance Section */}
            {activeSection === 'performance' && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">RDS Performance</h3>
                
                <div className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-lg shadow-md p-6 border">
                      <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <Zap className="w-5 h-5 mr-2 text-blue-600" />
                        Multi-AZ Deployments
                      </h4>
                      <p className="text-gray-700 mb-4">
                        Synchronous replication to a standby instance in a different Availability Zone.
                      </p>
                      <div className="space-y-3">
                        <div className="p-3 bg-blue-50 rounded">
                          <p className="text-sm font-medium text-blue-800">Benefits:</p>
                          <ul className="text-sm text-blue-700 mt-1 space-y-1">
                            <li>• High availability</li>
                            <li>• Automatic failover</li>
                            <li>• Data durability</li>
                            <li>• Maintenance windows</li>
                          </ul>
                        </div>
                        <div className="p-3 bg-orange-50 rounded">
                          <p className="text-sm font-medium text-orange-800">Use Cases:</p>
                          <ul className="text-sm text-orange-700 mt-1 space-y-1">
                            <li>• Production workloads</li>
                            <li>• Critical applications</li>
                            <li>• Compliance requirements</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 border">
                      <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <Users className="w-5 h-5 mr-2 text-green-600" />
                        Read Replicas
                      </h4>
                      <p className="text-gray-700 mb-4">
                        Asynchronous replication to offload read traffic from the primary instance.
                      </p>
                      <div className="space-y-3">
                        <div className="p-3 bg-green-50 rounded">
                          <p className="text-sm font-medium text-green-800">Benefits:</p>
                          <ul className="text-sm text-green-700 mt-1 space-y-1">
                            <li>• Read scaling</li>
                            <li>• Reduced primary load</li>
                            <li>• Cross-region replication</li>
                            <li>• Disaster recovery</li>
                          </ul>
                        </div>
                        <div className="p-3 bg-red-50 rounded">
                          <p className="text-sm font-medium text-red-800">Limitations:</p>
                          <ul className="text-sm text-red-700 mt-1 space-y-1">
                            <li>• Eventual consistency</li>
                            <li>• No automatic failover</li>
                            <li>• Replication lag</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-lg shadow-md p-6 border">
                      <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-purple-600" />
                        Performance Insights
                      </h4>
                      <p className="text-gray-700 mb-4">
                        Monitor database load and identify performance bottlenecks in real-time.
                      </p>
                      <div className="space-y-3">
                        <div className="p-3 bg-purple-50 rounded">
                          <p className="text-sm font-medium text-purple-800">Features:</p>
                          <ul className="text-sm text-purple-700 mt-1 space-y-1">
                            <li>• Real-time monitoring</li>
                            <li>• SQL query analysis</li>
                            <li>• Wait state analysis</li>
                            <li>• Historical data</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 border">
                      <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <Database className="w-5 h-5 mr-2 text-yellow-600" />
                        Storage Optimization
                      </h4>
                      <p className="text-gray-700 mb-4">
                        Optimize storage performance and costs with different storage types.
                      </p>
                      <div className="space-y-3">
                        <div className="p-3 bg-yellow-50 rounded">
                          <p className="text-sm font-medium text-yellow-800">Storage Types:</p>
                          <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                            <li>• General Purpose SSD (gp2/gp3)</li>
                            <li>• Provisioned IOPS SSD (io1)</li>
                            <li>• Magnetic (legacy)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Scenarios Section */}
            {activeSection === 'scenarios' && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Common RDS Scenarios</h3>
                
                <div className="space-y-8">
                  <div className="bg-white rounded-lg shadow-md p-6 border">
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Scenario 1: High Availability Setup</h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-gray-700 mb-4">
                          Design a highly available database solution for a critical application with 99.9% uptime requirements.
                        </p>
                        <div className="space-y-3">
                          <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                            <p className="font-medium text-blue-800">Multi-AZ Deployment</p>
                            <ul className="text-sm text-blue-700 mt-1 space-y-1">
                              <li>• Primary in AZ-A, Standby in AZ-B</li>
                              <li>• Synchronous replication</li>
                              <li>• Automatic failover</li>
                              <li>• 99.95% availability SLA</li>
                            </ul>
                          </div>
                          <div className="p-3 bg-green-50 rounded border-l-4 border-green-400">
                            <p className="font-medium text-green-800">Backup Strategy</p>
                            <ul className="text-sm text-green-700 mt-1 space-y-1">
                              <li>• Automated backups (7 days)</li>
                              <li>• Point-in-time recovery</li>
                              <li>• Cross-region snapshots</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded">
                        <h5 className="font-semibold mb-3">Architecture</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center">
                            <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                            <span>Primary DB (AZ-A)</span>
                          </div>
                          <div className="flex items-center ml-4">
                            <ArrowRight className="w-4 h-4 mx-2" />
                            <span>Synchronous Replication</span>
                          </div>
                          <div className="flex items-center ml-4">
                            <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                            <span>Standby DB (AZ-B)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6 border">
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Scenario 2: Read Scaling</h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-gray-700 mb-4">
                          Scale read performance for a web application with heavy read traffic and occasional writes.
                        </p>
                        <div className="space-y-3">
                          <div className="p-3 bg-purple-50 rounded border-l-4 border-purple-400">
                            <p className="font-medium text-purple-800">Read Replicas</p>
                            <ul className="text-sm text-purple-700 mt-1 space-y-1">
                              <li>• Multiple read replicas</li>
                              <li>• Load balancer distribution</li>
                              <li>• Asynchronous replication</li>
                              <li>• Cross-region for global apps</li>
                            </ul>
                          </div>
                          <div className="p-3 bg-orange-50 rounded border-l-4 border-orange-400">
                            <p className="font-medium text-orange-800">Application Logic</p>
                            <ul className="text-sm text-orange-700 mt-1 space-y-1">
                              <li>• Writes to primary</li>
                              <li>• Reads from replicas</li>
                              <li>• Health checks</li>
                              <li>• Failover handling</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded">
                        <h5 className="font-semibold mb-3">Traffic Flow</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center">
                            <span>Web App</span>
                            <ArrowRight className="w-4 h-4 mx-2" />
                            <span>Load Balancer</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 ml-4">
                            <div className="text-center">
                              <div className="w-3 h-3 bg-blue-400 rounded mx-auto mb-1"></div>
                              <span>Primary</span>
                            </div>
                            <div className="text-center">
                              <div className="w-3 h-3 bg-green-400 rounded mx-auto mb-1"></div>
                              <span>Replica 1</span>
                            </div>
                            <div className="text-center">
                              <div className="w-3 h-3 bg-green-400 rounded mx-auto mb-1"></div>
                              <span>Replica 2</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Exam Tips Section */}
            {activeSection === 'exam-tips' && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">RDS Exam Tips</h3>
                
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
                          <span>Multi-AZ vs Read Replicas (synchronous vs asynchronous)</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Backup strategies and retention periods</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Encryption at rest and in transit</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>IAM Database Authentication</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Storage types and performance characteristics</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded">
                      <h4 className="text-xl font-semibold text-blue-800 mb-4">Common Exam Questions</h4>
                      <div className="space-y-4">
                        <div className="p-3 bg-white rounded">
                          <p className="font-medium text-sm">"When should you use Multi-AZ vs Read Replicas?"</p>
                          <p className="text-sm text-gray-600 mt-1">Answer: Multi-AZ for high availability, Read Replicas for read scaling</p>
                        </div>
                        <div className="p-3 bg-white rounded">
                          <p className="font-medium text-sm">"What is the difference between automated backups and snapshots?"</p>
                          <p className="text-sm text-gray-600 mt-1">Answer: Automated backups are managed by AWS, snapshots are manual</p>
                        </div>
                        <div className="p-3 bg-white rounded">
                          <p className="font-medium text-sm">"How does encryption work in RDS?"</p>
                          <p className="text-sm text-gray-600 mt-1">Answer: KMS for at-rest, SSL/TLS for in-transit</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded">
                      <h4 className="text-xl font-semibold text-green-800 mb-4">Service Limits to Remember</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-2 bg-white rounded">
                          <span className="text-sm">DB instances per region</span>
                          <span className="font-medium">40</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-white rounded">
                          <span className="text-sm">Read replicas per source</span>
                          <span className="font-medium">5</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-white rounded">
                          <span className="text-sm">Automated backup retention</span>
                          <span className="font-medium">35 days</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-white rounded">
                          <span className="text-sm">Manual snapshot retention</span>
                          <span className="font-medium">Unlimited</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-white rounded">
                          <span className="text-sm">Storage per instance</span>
                          <span className="font-medium">64 TB</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded">
                      <h4 className="text-xl font-semibold text-purple-800 mb-4">Troubleshooting Tips</h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-white rounded">
                          <p className="font-medium text-sm text-purple-800">Performance Issues</p>
                          <ul className="text-sm text-purple-700 mt-1 space-y-1">
                            <li>• Use Performance Insights</li>
                            <li>• Check CloudWatch metrics</li>
                            <li>• Review slow query logs</li>
                          </ul>
                        </div>
                        <div className="p-3 bg-white rounded">
                          <p className="font-medium text-sm text-purple-800">Connectivity Issues</p>
                          <ul className="text-sm text-purple-700 mt-1 space-y-1">
                            <li>• Check security groups</li>
                            <li>• Verify VPC configuration</li>
                            <li>• Test network connectivity</li>
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
  )
} 