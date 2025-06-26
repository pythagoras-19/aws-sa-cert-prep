'use client'

import { useState } from 'react'
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
  Zap
} from 'lucide-react'

export default function VPCReferencePage() {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
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

      {/* Navigation Tabs */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto space-x-1 py-4">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">What is VPC?</h2>
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

                  <h3 className="text-xl font-semibold text-gray-900 mb-4">VPC Benefits</h3>
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
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">VPC Architecture</h3>
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
            </motion.div>
          )}

          {/* Components Tab */}
          {activeTab === 'components' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">VPC Components</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-md p-6 border">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <Network className="w-5 h-5 mr-2 text-blue-600" />
                      Subnets
                    </h3>
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
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <Route className="w-5 h-5 mr-2 text-green-600" />
                      Route Tables
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Route tables contain a set of rules (routes) that determine where network traffic is directed.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Default Route Table</span>
                        <span className="text-gray-600">Created automatically</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Custom Route Tables</span>
                        <span className="text-gray-600">Up to 200 per VPC</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Local Route</span>
                        <span className="text-gray-600">Always present (VPC CIDR)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-md p-6 border">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <Globe className="w-5 h-5 mr-2 text-purple-600" />
                      Internet Gateway
                    </h3>
                    <p className="text-gray-700 mb-4">
                      A horizontally scaled, redundant, and highly available VPC component that allows communication between instances in your VPC and the internet.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>One per VPC</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Provides IPv4 and IPv6 support</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>No additional charges</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6 border">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <Server className="w-5 h-5 mr-2 text-orange-600" />
                      NAT Gateway
                    </h3>
                    <p className="text-gray-700 mb-4">
                      A managed service that allows instances in private subnets to connect to the internet or other AWS services.
                    </p>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                        <p className="text-sm font-medium text-blue-800">Public NAT Gateway</p>
                        <p className="text-sm text-blue-700">Allows outbound internet access from private subnets</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded border-l-4 border-green-400">
                        <p className="text-sm font-medium text-green-800">Private NAT Gateway</p>
                        <p className="text-sm text-green-700">Allows communication between VPCs</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">VPC Security</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="bg-white rounded-lg shadow-md p-6 border mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-green-600" />
                      Security Groups
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Stateful virtual firewalls that control inbound and outbound traffic at the instance level.
                    </p>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 rounded">
                        <p className="font-medium text-sm">Key Features:</p>
                        <ul className="text-sm text-gray-600 mt-1 space-y-1">
                          <li>• Stateful (return traffic automatically allowed)</li>
                          <li>• Allow rules only (no deny rules)</li>
                          <li>• Instance-level protection</li>
                          <li>• Up to 5 per network interface</li>
                        </ul>
                      </div>
                      <div className="p-3 bg-blue-50 rounded">
                        <p className="font-medium text-sm text-blue-800">Default Rules:</p>
                        <ul className="text-sm text-blue-700 mt-1 space-y-1">
                          <li>• Inbound: Deny all</li>
                          <li>• Outbound: Allow all</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6 border">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <Lock className="w-5 h-5 mr-2 text-red-600" />
                      Network ACLs
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Stateless network-level firewalls that control traffic at the subnet level.
                    </p>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 rounded">
                        <p className="font-medium text-sm">Key Features:</p>
                        <ul className="text-sm text-gray-600 mt-1 space-y-1">
                          <li>• Stateless (return traffic must be explicitly allowed)</li>
                          <li>• Allow and deny rules</li>
                          <li>• Subnet-level protection</li>
                          <li>• One per subnet</li>
                        </ul>
                      </div>
                      <div className="p-3 bg-orange-50 rounded">
                        <p className="font-medium text-sm text-orange-800">Default Rules:</p>
                        <ul className="text-sm text-orange-700 mt-1 space-y-1">
                          <li>• Inbound: Allow all</li>
                          <li>• Outbound: Allow all</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-white rounded-lg shadow-md p-6 border mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Security Group vs NACL</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Feature</th>
                            <th className="text-left py-2">Security Groups</th>
                            <th className="text-left py-2">NACLs</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-2">Level</td>
                            <td className="py-2">Instance</td>
                            <td className="py-2">Subnet</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">State</td>
                            <td className="py-2">Stateful</td>
                            <td className="py-2">Stateless</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">Rules</td>
                            <td className="py-2">Allow only</td>
                            <td className="py-2">Allow/Deny</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">Evaluation</td>
                            <td className="py-2">All rules evaluated</td>
                            <td className="py-2">Numbered order</td>
                          </tr>
                          <tr>
                            <td className="py-2">Default</td>
                            <td className="py-2">Deny all inbound</td>
                            <td className="py-2">Allow all</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6 border">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">VPC Flow Logs</h3>
                    <p className="text-gray-700 mb-4">
                      Capture information about IP traffic going to and from network interfaces in your VPC.
                    </p>
                    <div className="space-y-3">
                      <div className="p-3 bg-purple-50 rounded border-l-4 border-purple-400">
                        <p className="text-sm font-medium text-purple-800">Use Cases:</p>
                        <ul className="text-sm text-purple-700 mt-1 space-y-1">
                          <li>• Troubleshoot connectivity issues</li>
                          <li>• Monitor network traffic</li>
                          <li>• Security analysis</li>
                          <li>• Compliance requirements</li>
                        </ul>
                      </div>
                      <div className="p-3 bg-gray-50 rounded">
                        <p className="text-sm font-medium">Destinations:</p>
                        <ul className="text-sm text-gray-600 mt-1 space-y-1">
                          <li>• CloudWatch Logs</li>
                          <li>• S3 Bucket</li>
                          <li>• Kinesis Data Firehose</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Networking Tab */}
          {activeTab === 'networking' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">VPC Networking</h2>
              
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-lg shadow-md p-6 border">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <Route className="w-5 h-5 mr-2 text-blue-600" />
                      VPC Peering
                    </h3>
                    <p className="text-gray-700 mb-4">
                      A networking connection between two VPCs that enables you to route traffic between them using private IP addresses.
                    </p>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 rounded">
                        <p className="text-sm font-medium text-blue-800">Requirements:</p>
                        <ul className="text-sm text-blue-700 mt-1 space-y-1">
                          <li>• Non-overlapping CIDR blocks</li>
                          <li>• Same or different AWS accounts</li>
                          <li>• Same or different regions</li>
                        </ul>
                      </div>
                      <div className="p-3 bg-green-50 rounded">
                        <p className="text-sm font-medium text-green-800">Benefits:</p>
                        <ul className="text-sm text-green-700 mt-1 space-y-1">
                          <li>• Private communication</li>
                          <li>• No single point of failure</li>
                          <li>• No bandwidth bottleneck</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6 border">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <Globe className="w-5 h-5 mr-2 text-purple-600" />
                      VPN Connections
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Secure connections between your on-premises network and your VPC over the internet.
                    </p>
                    <div className="space-y-3">
                      <div className="p-3 bg-purple-50 rounded">
                        <p className="text-sm font-medium text-purple-800">Components:</p>
                        <ul className="text-sm text-purple-700 mt-1 space-y-1">
                          <li>• Virtual Private Gateway</li>
                          <li>• Customer Gateway</li>
                          <li>• VPN Connection</li>
                        </ul>
                      </div>
                      <div className="p-3 bg-orange-50 rounded">
                        <p className="text-sm font-medium text-orange-800">Limitations:</p>
                        <ul className="text-sm text-orange-700 mt-1 space-y-1">
                          <li>• 1.25 Gbps bandwidth</li>
                          <li>• Internet-based (not private)</li>
                          <li>• Higher latency than Direct Connect</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-lg shadow-md p-6 border">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-yellow-600" />
                      AWS Direct Connect
                    </h3>
                    <p className="text-gray-700 mb-4">
                      A cloud service solution that makes it easy to establish a dedicated network connection from your premises to AWS.
                    </p>
                    <div className="space-y-3">
                      <div className="p-3 bg-yellow-50 rounded">
                        <p className="text-sm font-medium text-yellow-800">Benefits:</p>
                        <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                          <li>• Private, dedicated connection</li>
                          <li>• Lower latency than VPN</li>
                          <li>• Higher bandwidth (up to 100 Gbps)</li>
                          <li>• Reduced data transfer costs</li>
                        </ul>
                      </div>
                      <div className="p-3 bg-red-50 rounded">
                        <p className="text-sm font-medium text-red-800">Considerations:</p>
                        <ul className="text-sm text-red-700 mt-1 space-y-1">
                          <li>• Longer setup time</li>
                          <li>• Higher costs</li>
                          <li>• Requires physical connection</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6 border">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <Users className="w-5 h-5 mr-2 text-green-600" />
                      Transit Gateway
                    </h3>
                    <p className="text-gray-700 mb-4">
                      A network transit hub that enables you to connect VPCs and on-premises networks through a single gateway.
                    </p>
                    <div className="space-y-3">
                      <div className="p-3 bg-green-50 rounded">
                        <p className="text-sm font-medium text-green-800">Use Cases:</p>
                        <ul className="text-sm text-green-700 mt-1 space-y-1">
                          <li>• Hub-and-spoke architecture</li>
                          <li>• Multi-VPC connectivity</li>
                          <li>• Cross-region connectivity</li>
                          <li>• Shared services</li>
                        </ul>
                      </div>
                      <div className="p-3 bg-blue-50 rounded">
                        <p className="text-sm font-medium text-blue-800">Benefits:</p>
                        <ul className="text-sm text-blue-700 mt-1 space-y-1">
                          <li>• Simplified network architecture</li>
                          <li>• Centralized management</li>
                          <li>• Cost-effective scaling</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Scenarios Tab */}
          {activeTab === 'scenarios' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Common VPC Scenarios</h2>
              
              <div className="space-y-8">
                <div className="bg-white rounded-lg shadow-md p-6 border">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Scenario 1: Web Application Architecture</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-700 mb-4">
                        Design a secure VPC for a three-tier web application with web servers, application servers, and databases.
                      </p>
                      <div className="space-y-3">
                        <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                          <p className="font-medium text-blue-800">Public Subnets (Web Tier)</p>
                          <ul className="text-sm text-blue-700 mt-1 space-y-1">
                            <li>• Web servers with public IPs</li>
                            <li>• Route to Internet Gateway</li>
                            <li>• Security Group: Allow HTTP/HTTPS from internet</li>
                          </ul>
                        </div>
                        <div className="p-3 bg-green-50 rounded border-l-4 border-green-400">
                          <p className="font-medium text-green-800">Private Subnets (App Tier)</p>
                          <ul className="text-sm text-green-700 mt-1 space-y-1">
                            <li>• Application servers (no public IPs)</li>
                            <li>• Route to NAT Gateway for outbound</li>
                            <li>• Security Group: Allow from web tier only</li>
                          </ul>
                        </div>
                        <div className="p-3 bg-red-50 rounded border-l-4 border-red-400">
                          <p className="font-medium text-red-800">Database Subnets</p>
                          <ul className="text-sm text-red-700 mt-1 space-y-1">
                            <li>• RDS instances (no public IPs)</li>
                            <li>• No internet access</li>
                            <li>• Security Group: Allow from app tier only</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded">
                      <h4 className="font-semibold mb-3">Architecture Diagram</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                          <span>Internet Gateway</span>
                        </div>
                        <div className="flex items-center ml-4">
                          <div className="w-3 h-3 bg-blue-400 rounded mr-2"></div>
                          <span>Public Subnet (Web)</span>
                        </div>
                        <div className="flex items-center ml-4">
                          <div className="w-3 h-3 bg-green-400 rounded mr-2"></div>
                          <span>Private Subnet (App)</span>
                        </div>
                        <div className="flex items-center ml-4">
                          <div className="w-3 h-3 bg-red-400 rounded mr-2"></div>
                          <span>Database Subnet</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 border">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Scenario 2: Hybrid Cloud Setup</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-700 mb-4">
                        Connect your on-premises data center to AWS VPC using VPN and Direct Connect for redundancy.
                      </p>
                      <div className="space-y-3">
                        <div className="p-3 bg-purple-50 rounded border-l-4 border-purple-400">
                          <p className="font-medium text-purple-800">VPN Connection</p>
                          <ul className="text-sm text-purple-700 mt-1 space-y-1">
                            <li>• Virtual Private Gateway</li>
                            <li>• Customer Gateway (on-premises)</li>
                            <li>• IPSec tunnel</li>
                            <li>• Backup connection</li>
                          </ul>
                        </div>
                        <div className="p-3 bg-yellow-50 rounded border-l-4 border-yellow-400">
                          <p className="font-medium text-yellow-800">Direct Connect</p>
                          <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                            <li>• Dedicated connection</li>
                            <li>• Lower latency</li>
                            <li>• Primary connection</li>
                            <li>• Higher bandwidth</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded">
                      <h4 className="font-semibold mb-3">Network Flow</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <span>On-Premises</span>
                          <ArrowRight className="w-4 h-4 mx-2" />
                          <span>Direct Connect</span>
                          <ArrowRight className="w-4 h-4 mx-2" />
                          <span>VPC</span>
                        </div>
                        <div className="flex items-center">
                          <span>On-Premises</span>
                          <ArrowRight className="w-4 h-4 mx-2" />
                          <span>VPN (Backup)</span>
                          <ArrowRight className="w-4 h-4 mx-2" />
                          <span>VPC</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 border">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Scenario 3: Multi-VPC Architecture</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-700 mb-4">
                        Design a solution to connect multiple VPCs across different AWS accounts and regions.
                      </p>
                      <div className="space-y-3">
                        <div className="p-3 bg-green-50 rounded border-l-4 border-green-400">
                          <p className="font-medium text-green-800">Transit Gateway</p>
                          <ul className="text-sm text-green-700 mt-1 space-y-1">
                            <li>• Central hub for all VPCs</li>
                            <li>• Cross-account and cross-region</li>
                            <li>• Simplified routing</li>
                          </ul>
                        </div>
                        <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                          <p className="font-medium text-blue-800">VPC Peering</p>
                          <ul className="text-sm text-blue-700 mt-1 space-y-1">
                            <li>• Direct VPC-to-VPC connection</li>
                            <li>• Same region only</li>
                            <li>• Non-overlapping CIDR blocks</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded">
                      <h4 className="font-semibold mb-3">Architecture</h4>
                      <div className="space-y-2 text-sm">
                        <div className="text-center">
                          <div className="w-6 h-6 bg-green-500 rounded mx-auto mb-1"></div>
                          <span>Transit Gateway</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="text-center">
                            <div className="w-4 h-4 bg-blue-400 rounded mx-auto mb-1"></div>
                            <span>VPC 1</span>
                          </div>
                          <div className="text-center">
                            <div className="w-4 h-4 bg-blue-400 rounded mx-auto mb-1"></div>
                            <span>VPC 2</span>
                          </div>
                          <div className="text-center">
                            <div className="w-4 h-4 bg-blue-400 rounded mx-auto mb-1"></div>
                            <span>VPC 3</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Exam Tips Tab */}
          {activeTab === 'exam-tips' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">VPC Exam Tips</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
                    <h3 className="text-xl font-semibold text-yellow-800 mb-4 flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      Key Concepts to Master
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Security Groups vs NACLs (stateful vs stateless)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Public vs Private subnets and their routing</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>NAT Gateway vs NAT Instance</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>VPC Peering limitations and requirements</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>VPN vs Direct Connect use cases</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded">
                    <h3 className="text-xl font-semibold text-blue-800 mb-4">Common Exam Questions</h3>
                    <div className="space-y-4">
                      <div className="p-3 bg-white rounded">
                        <p className="font-medium text-sm">"Which component allows instances in private subnets to access the internet?"</p>
                        <p className="text-sm text-gray-600 mt-1">Answer: NAT Gateway</p>
                      </div>
                      <div className="p-3 bg-white rounded">
                        <p className="font-medium text-sm">"What is the difference between Security Groups and NACLs?"</p>
                        <p className="text-sm text-gray-600 mt-1">Answer: Stateful vs Stateless, Instance vs Subnet level</p>
                      </div>
                      <div className="p-3 bg-white rounded">
                        <p className="font-medium text-sm">"How many route tables can be associated with a subnet?"</p>
                        <p className="text-sm text-gray-600 mt-1">Answer: One route table per subnet</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded">
                    <h3 className="text-xl font-semibold text-green-800 mb-4">Service Limits to Remember</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-2 bg-white rounded">
                        <span className="text-sm">VPCs per region</span>
                        <span className="font-medium">5 (soft limit)</span>
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
                        <span className="font-medium">60 (inbound + outbound)</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-white rounded">
                        <span className="text-sm">NACLs per VPC</span>
                        <span className="font-medium">200</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-white rounded">
                        <span className="text-sm">Rules per NACL</span>
                        <span className="font-medium">20 (numbered 1-32766)</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded">
                    <h3 className="text-xl font-semibold text-purple-800 mb-4">Troubleshooting Tips</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-white rounded">
                        <p className="font-medium text-sm text-purple-800">Connectivity Issues</p>
                        <ul className="text-sm text-purple-700 mt-1 space-y-1">
                          <li>• Check Security Groups and NACLs</li>
                          <li>• Verify route table associations</li>
                          <li>• Ensure proper subnet configuration</li>
                        </ul>
                      </div>
                      <div className="p-3 bg-white rounded">
                        <p className="font-medium text-sm text-purple-800">Performance Issues</p>
                        <ul className="text-sm text-purple-700 mt-1 space-y-1">
                          <li>• Use VPC Flow Logs for analysis</li>
                          <li>• Check NAT Gateway bandwidth</li>
                          <li>• Consider Direct Connect for high bandwidth</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-white rounded-lg shadow-md p-6 border">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Practice Scenarios</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Scenario 1: E-commerce Application</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Design a VPC for an e-commerce application with web servers, application servers, databases, and a CDN.
                    </p>
                    <div className="text-xs text-gray-500">
                      <p>• Consider security requirements</p>
                      <p>• Plan for scalability</p>
                      <p>• Include monitoring and logging</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Scenario 2: Multi-Region Deployment</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Design a solution to deploy the same application across multiple AWS regions with data replication.
                    </p>
                    <div className="text-xs text-gray-500">
                      <p>• Use VPC Peering or Transit Gateway</p>
                      <p>• Consider data consistency</p>
                      <p>• Plan for disaster recovery</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
} 