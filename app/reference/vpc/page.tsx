'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Network, 
  Route, 
  Lock, 
  Globe, 
  Server, 
  AlertTriangle, 
  CheckCircle,
  Info,
  ExternalLink,
  ArrowRight,
  BookOpen,
  Target,
  Users,
  Zap,
  Menu,
  X,
  ChevronRight
} from 'lucide-react'

export default function VPCReferencePage() {
  const [activeSection, setActiveSection] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const sections = [
    { id: 'overview', label: 'Overview', icon: Network },
    { id: 'components', label: 'Components', icon: Server },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'networking', label: 'Networking', icon: Route },
    { id: 'scenarios', label: 'Scenarios', icon: Target },
    { id: 'exam-tips', label: 'Exam Tips', icon: BookOpen }
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
              <Network className="w-12 h-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">VPC Reference Guide</h1>
            </div>
            <p className="text-xl max-w-3xl mx-auto">
              Comprehensive guide to Amazon Virtual Private Cloud (VPC) for the AWS Solutions Architect Associate exam
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
              <h2 className="text-lg font-semibold text-gray-900">VPC Topics</h2>
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
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
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
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="flex items-center">
                  <Info className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm text-blue-800 font-medium">Quick Tip</span>
                </div>
                <p className="text-xs text-blue-700 mt-1">
                  Use the sidebar to navigate between different VPC topics and concepts.
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
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                        {Icon && <Icon className="w-6 h-6 text-blue-600" />}
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900">{section?.label}</h2>
                        <p className="text-gray-600 mt-1">
                          {activeSection === 'overview' && 'Learn about VPC fundamentals and architecture'}
                          {activeSection === 'components' && 'Explore VPC components and their functions'}
                          {activeSection === 'security' && 'Understand VPC security features and best practices'}
                          {activeSection === 'networking' && 'Configure VPC networking and connectivity'}
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
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">What is VPC?</h3>
                        <p className="text-lg text-gray-700 mb-6">
                          Amazon Virtual Private Cloud (VPC) is a logically isolated section of the AWS Cloud where you can launch AWS resources in a virtual network that you define.
                        </p>
                        
                        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                          <div className="flex">
                            <Info className="w-5 h-5 text-blue-400 mr-2 mt-0.5" />
                            <div>
                              <p className="text-blue-800 font-medium">Key Concept</p>
                              <p className="text-blue-700">VPC provides complete control over your virtual networking environment, including IP address ranges, subnets, route tables, and network gateways.</p>
                            </div>
                          </div>
                        </div>

                        <h4 className="text-xl font-semibold text-gray-900 mb-4">VPC Benefits</h4>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Complete network isolation and security control</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Custom IP address ranges and subnet configuration</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Advanced security features with security groups and NACLs</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Hybrid cloud connectivity options</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-xl font-semibold text-gray-900 mb-4">VPC Architecture</h4>
                        <div className="bg-white rounded-lg shadow-md p-6 border">
                          <div className="space-y-4">
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                              <span className="text-sm font-medium">VPC (10.0.0.0/16)</span>
                            </div>
                            <div className="ml-6 space-y-2">
                              <div className="flex items-center">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                <span className="text-sm">Public Subnet (10.0.1.0/24)</span>
                              </div>
                              <div className="flex items-center">
                                <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                                <span className="text-sm">Private Subnet (10.0.2.0/24)</span>
                              </div>
                              <div className="flex items-center">
                                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                                <span className="text-sm">Database Subnet (10.0.3.0/24)</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                          <div className="flex">
                            <AlertTriangle className="w-5 h-5 text-yellow-400 mr-2 mt-0.5" />
                            <div>
                              <p className="text-yellow-800 font-medium">Exam Focus</p>
                              <p className="text-yellow-700">VPC is heavily tested on the exam. Focus on subnet design, security groups vs NACLs, and connectivity options.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Components Section */}
                {activeSection === 'components' && (
                  <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">VPC Components</h3>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-md p-6 border">
                          <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                            <Network className="w-5 h-5 mr-2 text-blue-600" />
                            Subnets
                          </h4>
                          <p className="text-gray-700 mb-4">
                            Subnets are subdivisions of your VPC's IP address range where you can place groups of isolated resources.
                          </p>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                              <span className="font-medium">Public Subnets</span>
                              <span className="text-sm text-gray-600">Route to Internet Gateway</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                              <span className="font-medium">Private Subnets</span>
                              <span className="text-sm text-gray-600">No direct internet access</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                              <span className="font-medium">Database Subnets</span>
                              <span className="text-sm text-gray-600">Isolated for RDS/ElastiCache</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 border">
                          <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                            <Route className="w-5 h-5 mr-2 text-green-600" />
                            Route Tables
                          </h4>
                          <p className="text-gray-700 mb-4">
                            Route tables contain a set of rules (routes) that determine where network traffic is directed.
                          </p>
                          <div className="space-y-3">
                            <div className="p-3 bg-green-50 rounded">
                              <p className="font-medium text-sm text-green-800">Main Route Table</p>
                              <ul className="text-sm text-green-700 mt-1 space-y-1">
                                <li>• Associated with all subnets by default</li>
                                <li>• Can be modified</li>
                                <li>• Cannot be deleted</li>
                              </ul>
                            </div>
                            <div className="p-3 bg-blue-50 rounded">
                              <p className="font-medium text-sm text-blue-800">Custom Route Tables</p>
                              <ul className="text-sm text-blue-700 mt-1 space-y-1">
                                <li>• Created for specific subnets</li>
                                <li>• Can be deleted</li>
                                <li>• More specific routes take precedence</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-md p-6 border">
                          <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                            <Globe className="w-5 h-5 mr-2 text-orange-600" />
                            Internet Gateway
                          </h4>
                          <p className="text-gray-700 mb-4">
                            A horizontally scalable, redundant, and highly available VPC component that allows communication between instances in your VPC and the internet.
                          </p>
                          <div className="space-y-3">
                            <div className="p-3 bg-orange-50 rounded">
                              <p className="font-medium text-sm text-orange-800">Features:</p>
                              <ul className="text-sm text-orange-700 mt-1 space-y-1">
                                <li>• One per VPC</li>
                                <li>• Attached to VPC</li>
                                <li>• Provides internet connectivity</li>
                                <li>• No additional charges</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 border">
                          <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                            <Shield className="w-5 h-5 mr-2 text-red-600" />
                            Security Groups
                          </h4>
                          <p className="text-gray-700 mb-4">
                            Virtual firewalls that control inbound and outbound traffic for your instances.
                          </p>
                          <div className="space-y-3">
                            <div className="p-3 bg-red-50 rounded">
                              <p className="font-medium text-sm text-red-800">Characteristics:</p>
                              <ul className="text-sm text-red-700 mt-1 space-y-1">
                                <li>• Stateful (return traffic allowed)</li>
                                <li>• Allow rules only (no deny)</li>
                                <li>• Instance level</li>
                                <li>• Multiple per instance</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 border">
                          <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                            <Lock className="w-5 h-5 mr-2 text-purple-600" />
                            Network ACLs
                          </h4>
                          <p className="text-gray-700 mb-4">
                            Optional layer of security that acts as a firewall for controlling traffic in and out of subnets.
                          </p>
                          <div className="space-y-3">
                            <div className="p-3 bg-purple-50 rounded">
                              <p className="font-medium text-sm text-purple-800">Characteristics:</p>
                              <ul className="text-sm text-purple-700 mt-1 space-y-1">
                                <li>• Stateless (explicit return rules)</li>
                                <li>• Allow and deny rules</li>
                                <li>• Subnet level</li>
                                <li>• One per subnet</li>
                              </ul>
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
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">VPC Security</h3>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <div className="bg-white rounded-lg shadow-md p-6 border mb-6">
                          <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                            <Shield className="w-5 h-5 mr-2 text-green-600" />
                            Security Groups vs NACLs
                          </h4>
                          <p className="text-gray-700 mb-4">
                            Understanding the differences between Security Groups and Network ACLs is crucial for VPC security.
                          </p>
                          <div className="space-y-4">
                            <div className="p-4 bg-green-50 rounded border-l-4 border-green-400">
                              <h5 className="font-semibold text-green-800 mb-2">Security Groups</h5>
                              <ul className="text-sm text-green-700 space-y-1">
                                <li>• Stateful (return traffic automatically allowed)</li>
                                <li>• Allow rules only (no deny)</li>
                                <li>• Instance level</li>
                                <li>• Multiple per instance</li>
                                <li>• Evaluated first</li>
                              </ul>
                            </div>
                            <div className="p-4 bg-blue-50 rounded border-l-4 border-blue-400">
                              <h5 className="font-semibold text-blue-800 mb-2">Network ACLs</h5>
                              <ul className="text-sm text-blue-700 space-y-1">
                                <li>• Stateless (explicit return rules needed)</li>
                                <li>• Allow and deny rules</li>
                                <li>• Subnet level</li>
                                <li>• One per subnet</li>
                                <li>• Evaluated second</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 border">
                          <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                            <Lock className="w-5 h-5 mr-2 text-red-600" />
                            VPC Endpoints
                          </h4>
                          <p className="text-gray-700 mb-4">
                            Private connections to AWS services without requiring an internet gateway, NAT device, VPN connection, or AWS Direct Connect connection.
                          </p>
                          <div className="space-y-3">
                            <div className="p-3 bg-red-50 rounded">
                              <p className="font-medium text-sm text-red-800">Types:</p>
                              <ul className="text-sm text-red-700 mt-1 space-y-1">
                                <li>• Gateway Endpoints (S3, DynamoDB)</li>
                                <li>• Interface Endpoints (other AWS services)</li>
                                <li>• Enhanced security</li>
                                <li>• Reduced latency</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="bg-white rounded-lg shadow-md p-6 border mb-6">
                          <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                            <Users className="w-5 h-5 mr-2 text-purple-600" />
                            Private Subnets
                          </h4>
                          <p className="text-gray-700 mb-4">
                            Subnets that do not have a route to the internet gateway, providing enhanced security for sensitive resources.
                          </p>
                          <div className="space-y-3">
                            <div className="p-3 bg-purple-50 rounded">
                              <p className="font-medium text-sm text-purple-800">Use Cases:</p>
                              <ul className="text-sm text-purple-700 mt-1 space-y-1">
                                <li>• Database servers (RDS, ElastiCache)</li>
                                <li>• Application servers</li>
                                <li>• Internal services</li>
                                <li>• Compliance requirements</li>
                              </ul>
                            </div>
                            <div className="p-3 bg-orange-50 rounded">
                              <p className="font-medium text-sm text-orange-800">Internet Access:</p>
                              <ul className="text-sm text-orange-700 mt-1 space-y-1">
                                <li>• NAT Gateway/Instance</li>
                                <li>• VPC Endpoints</li>
                                <li>• Transit Gateway</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 border">
                          <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                            <Zap className="w-5 h-5 mr-2 text-yellow-600" />
                            Flow Logs
                          </h4>
                          <p className="text-gray-700 mb-4">
                            Capture information about the IP traffic going to and from network interfaces in your VPC.
                          </p>
                          <div className="space-y-3">
                            <div className="p-3 bg-yellow-50 rounded">
                              <p className="font-medium text-sm text-yellow-800">Benefits:</p>
                              <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                                <li>• Troubleshoot connectivity issues</li>
                                <li>• Monitor network traffic</li>
                                <li>• Security analysis</li>
                                <li>• Compliance requirements</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Networking Section */}
                {activeSection === 'networking' && (
                  <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">VPC Networking</h3>
                    
                    <div className="space-y-8">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-lg shadow-md p-6 border">
                          <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                            <Route className="w-5 h-5 mr-2 text-blue-600" />
                            NAT Gateway
                          </h4>
                          <p className="text-gray-700 mb-4">
                            Network Address Translation (NAT) Gateway enables instances in private subnets to connect to the internet or other AWS services.
                          </p>
                          <div className="space-y-3">
                            <div className="p-3 bg-blue-50 rounded">
                              <p className="text-sm font-medium text-blue-800">Features:</p>
                              <ul className="text-sm text-blue-700 mt-1 space-y-1">
                                <li>• Highly available</li>
                                <li>• Managed by AWS</li>
                                <li>• Pay per hour and data processed</li>
                                <li>• One per AZ</li>
                              </ul>
                            </div>
                            <div className="p-3 bg-green-50 rounded">
                              <p className="text-sm font-medium text-green-800">Use Cases:</p>
                              <ul className="text-sm text-green-700 mt-1 space-y-1">
                                <li>• Private subnet internet access</li>
                                <li>• Software updates</li>
                                <li>• External API calls</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 border">
                          <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                            <Globe className="w-5 h-5 mr-2 text-green-600" />
                            VPC Peering
                          </h4>
                          <p className="text-gray-700 mb-4">
                            A networking connection between two VPCs that enables you to route traffic between them using private IP addresses.
                          </p>
                          <div className="space-y-3">
                            <div className="p-3 bg-green-50 rounded">
                              <p className="text-sm font-medium text-green-800">Benefits:</p>
                              <ul className="text-sm text-green-700 mt-1 space-y-1">
                                <li>• Private communication</li>
                                <li>• No internet gateway required</li>
                                <li>• Same or different accounts</li>
                                <li>• Same or different regions</li>
                              </ul>
                            </div>
                            <div className="p-3 bg-orange-50 rounded">
                              <p className="text-sm font-medium text-orange-800">Limitations:</p>
                              <ul className="text-sm text-orange-700 mt-1 space-y-1">
                                <li>• No transitive peering</li>
                                <li>• Overlapping CIDR blocks not allowed</li>
                                <li>• Route table configuration required</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-lg shadow-md p-6 border">
                          <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                            <Network className="w-5 h-5 mr-2 text-purple-600" />
                            Transit Gateway
                          </h4>
                          <p className="text-gray-700 mb-4">
                            A network transit hub that enables you to connect VPCs and on-premises networks through a single gateway.
                          </p>
                          <div className="space-y-3">
                            <div className="p-3 bg-purple-50 rounded">
                              <p className="text-sm font-medium text-purple-800">Features:</p>
                              <ul className="text-sm text-purple-700 mt-1 space-y-1">
                                <li>• Centralized routing</li>
                                <li>• Transitive routing</li>
                                <li>• Cross-region connectivity</li>
                                <li>• Simplified network architecture</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 border">
                          <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                            <Shield className="w-5 h-5 mr-2 text-red-600" />
                            VPN Connections
                          </h4>
                          <p className="text-gray-700 mb-4">
                            Secure connections between your on-premises network and your VPC over the internet.
                          </p>
                          <div className="space-y-3">
                            <div className="p-3 bg-red-50 rounded">
                              <p className="text-sm font-medium text-red-800">Types:</p>
                              <ul className="text-sm text-red-700 mt-1 space-y-1">
                                <li>• AWS VPN (managed)</li>
                                <li>• Customer Gateway</li>
                                <li>• Site-to-Site VPN</li>
                                <li>• Client VPN</li>
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
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Common VPC Scenarios</h3>
                    
                    <div className="space-y-8">
                      <div className="bg-white rounded-lg shadow-md p-6 border">
                        <h4 className="text-xl font-semibold text-gray-900 mb-4">Scenario 1: Three-Tier Architecture</h4>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <p className="text-gray-700 mb-4">
                              Design a secure VPC for a web application with web, application, and database tiers.
                            </p>
                            <div className="space-y-3">
                              <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                                <p className="font-medium text-blue-800">Public Subnet (Web Tier)</p>
                                <ul className="text-sm text-blue-700 mt-1 space-y-1">
                                  <li>• Web servers (ALB, EC2)</li>
                                  <li>• Internet Gateway</li>
                                  <li>• Security Groups: 80, 443</li>
                                </ul>
                              </div>
                              <div className="p-3 bg-green-50 rounded border-l-4 border-green-400">
                                <p className="font-medium text-green-800">Private Subnet (App Tier)</p>
                                <ul className="text-sm text-green-700 mt-1 space-y-1">
                                  <li>• Application servers</li>
                                  <li>• NAT Gateway</li>
                                  <li>• Security Groups: 8080</li>
                                </ul>
                              </div>
                              <div className="p-3 bg-red-50 rounded border-l-4 border-red-400">
                                <p className="font-medium text-red-800">Private Subnet (DB Tier)</p>
                                <ul className="text-sm text-red-700 mt-1 space-y-1">
                                  <li>• RDS, ElastiCache</li>
                                  <li>• No internet access</li>
                                  <li>• Security Groups: 3306, 5432</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-50 p-4 rounded">
                            <h5 className="font-semibold mb-3">Architecture</h5>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center">
                                <span>Internet</span>
                                <ArrowRight className="w-4 h-4 mx-2" />
                                <span>ALB</span>
                              </div>
                              <div className="ml-4 space-y-1">
                                <div className="flex items-center">
                                  <ArrowRight className="w-4 h-4 mr-2" />
                                  <span>Web Tier (Public)</span>
                                </div>
                                <div className="ml-4 space-y-1">
                                  <div className="flex items-center">
                                    <ArrowRight className="w-4 h-4 mr-2" />
                                    <span>App Tier (Private)</span>
                                  </div>
                                  <div className="ml-4">
                                    <div className="flex items-center">
                                      <ArrowRight className="w-4 h-4 mr-2" />
                                      <span>DB Tier (Private)</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg shadow-md p-6 border">
                        <h4 className="text-xl font-semibold text-gray-900 mb-4">Scenario 2: Multi-VPC Architecture</h4>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <p className="text-gray-700 mb-4">
                              Connect multiple VPCs across different environments (dev, staging, prod) using VPC peering.
                            </p>
                            <div className="space-y-3">
                              <div className="p-3 bg-purple-50 rounded border-l-4 border-purple-400">
                                <p className="font-medium text-purple-800">VPC Peering</p>
                                <ul className="text-sm text-purple-700 mt-1 space-y-1">
                                  <li>• Direct private communication</li>
                                  <li>• No internet gateway required</li>
                                  <li>• Route table configuration</li>
                                  <li>• Security group rules</li>
                                </ul>
                              </div>
                              <div className="p-3 bg-orange-50 rounded border-l-4 border-orange-400">
                                <p className="font-medium text-orange-800">Best Practices</p>
                                <ul className="text-sm text-orange-700 mt-1 space-y-1">
                                  <li>• Non-overlapping CIDR blocks</li>
                                  <li>• Consistent naming conventions</li>
                                  <li>• Proper security group rules</li>
                                  <li>• Monitoring and logging</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-50 p-4 rounded">
                            <h5 className="font-semibold mb-3">Network Design</h5>
                            <div className="space-y-2 text-sm">
                              <div className="grid grid-cols-3 gap-2">
                                <div className="text-center">
                                  <div className="w-3 h-3 bg-blue-400 rounded mx-auto mb-1"></div>
                                  <span>Dev VPC</span>
                                  <div className="text-xs text-gray-600">10.1.0.0/16</div>
                                </div>
                                <div className="text-center">
                                  <div className="w-3 h-3 bg-green-400 rounded mx-auto mb-1"></div>
                                  <span>Staging VPC</span>
                                  <div className="text-xs text-gray-600">10.2.0.0/16</div>
                                </div>
                                <div className="text-center">
                                  <div className="w-3 h-3 bg-red-400 rounded mx-auto mb-1"></div>
                                  <span>Prod VPC</span>
                                  <div className="text-xs text-gray-600">10.3.0.0/16</div>
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
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">VPC Exam Tips</h3>
                    
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
                              <span>Security Groups vs NACLs (stateful vs stateless)</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span>Public vs Private subnets</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span>NAT Gateway vs NAT Instance</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span>VPC Peering limitations</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span>Route table evaluation order</span>
                            </li>
                          </ul>
                        </div>

                        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded">
                          <h4 className="text-xl font-semibold text-blue-800 mb-4">Common Exam Questions</h4>
                          <div className="space-y-4">
                            <div className="p-3 bg-white rounded">
                              <p className="font-medium text-sm">"What's the difference between Security Groups and NACLs?"</p>
                              <p className="text-sm text-gray-600 mt-1">Answer: Security Groups are stateful and instance-level, NACLs are stateless and subnet-level</p>
                            </div>
                            <div className="p-3 bg-white rounded">
                              <p className="font-medium text-sm">"How do you provide internet access to private subnets?"</p>
                              <p className="text-sm text-gray-600 mt-1">Answer: Use NAT Gateway or NAT Instance with route table configuration</p>
                            </div>
                            <div className="p-3 bg-white rounded">
                              <p className="font-medium text-sm">"Can VPCs with overlapping CIDR blocks be peered?"</p>
                              <p className="text-sm text-gray-600 mt-1">Answer: No, overlapping CIDR blocks are not allowed in VPC peering</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded">
                          <h4 className="text-xl font-semibold text-green-800 mb-4">Service Limits to Remember</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center p-2 bg-white rounded">
                              <span className="text-sm">VPCs per region</span>
                              <span className="font-medium">5</span>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-white rounded">
                              <span className="text-sm">Subnets per VPC</span>
                              <span className="font-medium">200</span>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-white rounded">
                              <span className="text-sm">Security Groups per VPC</span>
                              <span className="font-medium">500</span>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-white rounded">
                              <span className="text-sm">Rules per Security Group</span>
                              <span className="font-medium">60</span>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-white rounded">
                              <span className="text-sm">VPC Peering connections</span>
                              <span className="font-medium">125</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded">
                          <h4 className="text-xl font-semibold text-purple-800 mb-4">Troubleshooting Tips</h4>
                          <div className="space-y-3">
                            <div className="p-3 bg-white rounded">
                              <p className="font-medium text-sm text-purple-800">Connectivity Issues</p>
                              <ul className="text-sm text-purple-700 mt-1 space-y-1">
                                <li>• Check route tables</li>
                                <li>• Verify security groups</li>
                                <li>• Review NACL rules</li>
                                <li>• Test network connectivity</li>
                              </ul>
                            </div>
                            <div className="p-3 bg-white rounded">
                              <p className="font-medium text-sm text-purple-800">Security Issues</p>
                              <ul className="text-sm text-purple-700 mt-1 space-y-1">
                                <li>• Review security group rules</li>
                                <li>• Check NACL configurations</li>
                                <li>• Verify IAM permissions</li>
                                <li>• Enable VPC Flow Logs</li>
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