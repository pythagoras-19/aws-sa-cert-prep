'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import TopicsBar from '../../components/TopicsBar'
import { 
  Globe, 
  Clock, 
  DollarSign, 
  BookOpen, 
  Code,
  Database,
  Network,
  Lock,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Info,
  Cpu,
  HardDrive,
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
  Scale
} from 'lucide-react'

export default function Route53ReferencePage() {
  const [activeSection, setActiveSection] = useState('overview')

  const sections = [
    { id: 'overview', label: 'Overview', icon: Globe },
    { id: 'record-types', label: 'Record Types', icon: Database },
    { id: 'routing-policies', label: 'Routing Policies', icon: Network },
    { id: 'health-checks', label: 'Health Checks', icon: Activity },
    { id: 'pricing', label: 'Pricing Model', icon: DollarSign },
    { id: 'exam-tips', label: 'Exam Tips', icon: BookOpen }
  ]

  const recordTypes = [
    {
      type: 'A',
      description: 'IPv4 address record',
      icon: Network,
      color: 'from-blue-500 to-blue-600',
      useCase: 'Point domain to IPv4 address',
      ttl: '300 seconds (default)',
      format: '192.168.1.1'
    },
    {
      type: 'AAAA',
      description: 'IPv6 address record',
      icon: Network,
      color: 'from-green-500 to-green-600',
      useCase: 'Point domain to IPv6 address',
      ttl: '300 seconds (default)',
      format: '2001:db8::1'
    },
    {
      type: 'CNAME',
      description: 'Canonical name record',
      icon: Database,
      color: 'from-purple-500 to-purple-600',
      useCase: 'Alias for another domain name',
      ttl: '300 seconds (default)',
      format: 'www.example.com'
    },
    {
      type: 'MX',
      description: 'Mail exchange record',
      icon: Server,
      color: 'from-orange-500 to-orange-600',
      useCase: 'Direct email to mail servers',
      ttl: '300 seconds (default)',
      format: '10 mail.example.com'
    },
    {
      type: 'TXT',
      description: 'Text record',
      icon: FileText,
      color: 'from-red-500 to-red-600',
      useCase: 'Store text information (SPF, DKIM)',
      ttl: '300 seconds (default)',
      format: 'v=spf1 include:_spf.google.com ~all'
    },
    {
      type: 'NS',
      description: 'Name server record',
      icon: Server,
      color: 'from-indigo-500 to-indigo-600',
      useCase: 'Delegate subdomain to name servers',
      ttl: '172800 seconds (48 hours)',
      format: 'ns1.example.com'
    },
    {
      type: 'PTR',
      description: 'Pointer record',
      icon: MapPin,
      color: 'from-teal-500 to-teal-600',
      useCase: 'Reverse DNS lookup',
      ttl: '300 seconds (default)',
      format: 'hostname.example.com'
    },
    {
      type: 'SRV',
      description: 'Service record',
      icon: Server,
      color: 'from-pink-500 to-pink-600',
      useCase: 'Define service locations',
      ttl: '300 seconds (default)',
      format: '0 5 5060 sip.example.com'
    }
  ]

  const routingPolicies = [
    {
      policy: 'Simple Routing',
      description: 'Route traffic to a single resource',
      icon: Target,
      color: 'from-blue-500 to-blue-600',
      useCase: 'Single resource, no failover',
      pros: ['Simple to configure', 'No additional charges'],
      cons: ['No failover', 'No load balancing'],
      bestFor: 'Single resource deployments'
    },
    {
      policy: 'Weighted Routing',
      description: 'Route traffic based on assigned weights',
      icon: Scale,
      color: 'from-green-500 to-green-600',
      useCase: 'A/B testing, gradual rollouts',
      pros: ['Traffic distribution control', 'Easy rollback'],
      cons: ['No health checks', 'Manual weight management'],
      bestFor: 'Testing and gradual deployments'
    },
    {
      policy: 'Latency-Based Routing',
      description: 'Route to region with lowest latency',
      icon: Clock,
      color: 'from-orange-500 to-orange-600',
      useCase: 'Global applications, performance optimization',
      pros: ['Automatic latency optimization', 'Global performance'],
      cons: ['No health checks', 'Based on network latency only'],
      bestFor: 'Global applications with multiple regions'
    },
    {
      policy: 'Failover Routing',
      description: 'Route to backup resource if primary fails',
      icon: AlertTriangle,
      color: 'from-red-500 to-red-600',
      useCase: 'Disaster recovery, high availability',
      pros: ['Automatic failover', 'Health check integration'],
      cons: ['Additional health check costs', 'Complex setup'],
      bestFor: 'Critical applications requiring high availability'
    },
    {
      policy: 'Geolocation Routing',
      description: 'Route based on user location',
      icon: MapPin,
      color: 'from-purple-500 to-purple-600',
      useCase: 'Content localization, compliance',
      pros: ['Location-based routing', 'Compliance support'],
      cons: ['No health checks', 'Location detection limitations'],
      bestFor: 'Content localization and compliance requirements'
    },
    {
      policy: 'Geoproximity Routing',
      description: 'Route based on geographic distance',
      icon: MapPin,
      color: 'from-teal-500 to-teal-600',
      useCase: 'Traffic engineering, regional preferences',
      pros: ['Fine-grained geographic control', 'Traffic engineering'],
      cons: ['Additional charges', 'Complex configuration'],
      bestFor: 'Advanced traffic engineering scenarios'
    },
    {
      policy: 'Multi-Value Answer',
      description: 'Return multiple healthy resources',
      icon: Database,
      color: 'from-indigo-500 to-indigo-600',
      useCase: 'Load balancing across multiple resources',
      pros: ['Built-in load balancing', 'Health check integration'],
      cons: ['Limited to 8 records', 'No traffic distribution control'],
      bestFor: 'Simple load balancing scenarios'
    }
  ]

  const healthChecks = [
    {
      type: 'HTTP/HTTPS',
      description: 'Check web server availability',
      icon: Globe,
      color: 'from-blue-500 to-blue-600',
      endpoint: 'http://example.com/health',
      interval: '30 seconds',
      timeout: '5 seconds',
      failureThreshold: '3 consecutive failures'
    },
    {
      type: 'TCP',
      description: 'Check TCP port availability',
      icon: Network,
      color: 'from-green-500 to-green-600',
      endpoint: 'example.com:80',
      interval: '30 seconds',
      timeout: '10 seconds',
      failureThreshold: '3 consecutive failures'
    },
    {
      type: 'String Matching',
      description: 'Check for specific response content',
      icon: Search,
      color: 'from-orange-500 to-orange-600',
      endpoint: 'http://example.com/health',
      interval: '30 seconds',
      timeout: '5 seconds',
      failureThreshold: '3 consecutive failures'
    },
    {
      type: 'Calculated Health Checks',
      description: 'Combine multiple health checks',
      icon: Activity,
      color: 'from-purple-500 to-purple-600',
      endpoint: 'Multiple endpoints',
      interval: '30 seconds',
      timeout: '5 seconds',
      failureThreshold: 'Configurable'
    }
  ]

  const pricingComponents = [
    {
      component: 'Hosted Zones',
      description: 'Monthly charge per hosted zone',
      icon: Database,
      color: 'from-blue-500 to-blue-600',
      details: [
        'Public hosted zones: $0.50/month',
        'Private hosted zones: $0.50/month'
      ],
      notes: 'Charged for each hosted zone you create'
    },
    {
      component: 'Queries',
      description: 'DNS queries processed',
      icon: Network,
      color: 'from-green-500 to-green-600',
      details: [
        'First 1B queries/month: $0.40 per million',
        'Additional queries: $0.20 per million'
      ],
      notes: 'Charged for each DNS query processed'
    },
    {
      component: 'Health Checks',
      description: 'Health check monitoring',
      icon: Activity,
      color: 'from-orange-500 to-orange-600',
      details: [
        'Basic health checks: $0.50/month',
        'Advanced health checks: $3.00/month'
      ],
      notes: 'Charged for each health check endpoint'
    }
  ]

  const examTips = [
    {
      tip: "Alias vs CNAME Records",
      description: "Alias records can point to AWS resources and are free. CNAME records can point to any domain but incur query charges.",
      importance: "High",
      icon: Database
    },
    {
      tip: "TTL Values",
      description: "Lower TTL values allow faster DNS propagation but increase query costs. Higher TTL values reduce costs but slow propagation.",
      importance: "Medium",
      icon: Clock
    },
    {
      tip: "Health Check Integration",
      description: "Only Failover and Multi-Value Answer routing policies support health checks. Other policies route traffic regardless of health.",
      importance: "High",
      icon: Activity
    },
    {
      tip: "Geolocation vs Geoproximity",
      description: "Geolocation routes based on user location. Geoproximity routes based on geographic distance and allows traffic engineering.",
      importance: "Medium",
      icon: MapPin
    },
    {
      tip: "Private Hosted Zones",
      description: "Private hosted zones are only accessible within the specified VPCs. They don't resolve from the internet.",
      importance: "Medium",
      icon: Lock
    },
    {
      tip: "DNS Propagation",
      description: "DNS changes can take up to 48 hours to propagate globally, though most resolvers update within minutes to hours.",
      importance: "Medium",
      icon: Globe
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
              <Globe className="w-12 h-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">Route 53 Reference Guide</h1>
            </div>
            <p className="text-xl max-w-3xl mx-auto">
              Complete reference for Amazon Route 53 - highly available and scalable DNS web service
            </p>
          </motion.div>
        </div>
      </div>

      {/* Topics Bar */}
      <TopicsBar
        topics={sections}
        activeTopic={activeSection}
        onTopicChange={setActiveSection}
        title="Route 53 Reference"
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Content Area */}
        <div className="max-w-6xl mx-auto">
          {/* Overview Section */}
          {activeSection === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Route 53 Overview</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">What is Amazon Route 53?</h3>
                    <p className="text-gray-700 mb-4">
                      Amazon Route 53 is a highly available and scalable Domain Name System (DNS) web service. It's designed to give developers and businesses an extremely reliable and cost-effective way to route end users to Internet applications.
                    </p>
                    <p className="text-gray-700 mb-4">
                      Route 53 connects user requests to infrastructure running in AWS and can also route users to infrastructure outside of AWS.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Benefits</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Highly available and reliable</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Scalable DNS infrastructure</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Multiple routing policies</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Health check integration</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Common Use Cases</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <Globe className="w-8 h-8 text-blue-500 mb-3" />
                      <h4 className="font-semibold text-gray-900 mb-2">Domain Registration</h4>
                      <p className="text-gray-600">Register and manage domain names</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <Network className="w-8 h-8 text-green-500 mb-3" />
                      <h4 className="font-semibold text-gray-900 mb-2">DNS Management</h4>
                      <p className="text-gray-600">Manage DNS records and routing</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <Activity className="w-8 h-8 text-purple-500 mb-3" />
                      <h4 className="font-semibold text-gray-900 mb-2">Health Monitoring</h4>
                      <p className="text-gray-600">Monitor application health and availability</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Record Types Section */}
          {activeSection === 'record-types' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">DNS Record Types</h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recordTypes.map((record, index) => {
                    const Icon = record.icon
                    return (
                      <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${record.color} text-white mb-4`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{record.type}</h3>
                        <p className="text-gray-600 mb-3">{record.description}</p>
                        
                        <div className="space-y-2">
                          <div>
                            <span className="text-sm font-medium text-gray-700">Use Case:</span>
                            <p className="text-sm text-gray-600">{record.useCase}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-700">TTL:</span>
                            <p className="text-sm text-gray-600">{record.ttl}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-700">Format:</span>
                            <p className="text-sm text-gray-600 font-mono">{record.format}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* Routing Policies Section */}
          {activeSection === 'routing-policies' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Routing Policies</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {routingPolicies.map((policy, index) => {
                    const Icon = policy.icon
                    return (
                      <div key={index} className="border border-gray-200 rounded-lg p-6">
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${policy.color} text-white mb-4`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{policy.policy}</h3>
                        <p className="text-gray-600 mb-4">{policy.description}</p>
                        
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm font-medium text-gray-700">Use Case:</span>
                            <p className="text-sm text-gray-600">{policy.useCase}</p>
                          </div>
                          
                          <div>
                            <span className="text-sm font-medium text-gray-700">Pros:</span>
                            <ul className="text-sm text-gray-600 list-disc list-inside">
                              {policy.pros.map((pro, i) => (
                                <li key={i}>{pro}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <span className="text-sm font-medium text-gray-700">Cons:</span>
                            <ul className="text-sm text-gray-600 list-disc list-inside">
                              {policy.cons.map((con, i) => (
                                <li key={i}>{con}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="bg-gray-50 p-3 rounded">
                            <span className="text-sm font-medium text-gray-700">Best For:</span>
                            <p className="text-sm text-gray-600">{policy.bestFor}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* Health Checks Section */}
          {activeSection === 'health-checks' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Health Checks</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {healthChecks.map((check, index) => {
                    const Icon = check.icon
                    return (
                      <div key={index} className="border border-gray-200 rounded-lg p-6">
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${check.color} text-white mb-4`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{check.type}</h3>
                        <p className="text-gray-600 mb-4">{check.description}</p>
                        
                        <div className="space-y-2">
                          <div>
                            <span className="text-sm font-medium text-gray-700">Endpoint:</span>
                            <p className="text-sm text-gray-600 font-mono">{check.endpoint}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-700">Interval:</span>
                            <p className="text-sm text-gray-600">{check.interval}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-700">Timeout:</span>
                            <p className="text-sm text-gray-600">{check.timeout}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-700">Failure Threshold:</span>
                            <p className="text-sm text-gray-600">{check.failureThreshold}</p>
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
                        <li>• 1 public hosted zone</li>
                        <li>• 1 million queries per month</li>
                        <li>• 2 basic health checks</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Cost Calculation:</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Hosted zone: $0.50/month</li>
                        <li>• Queries: $0.40/month</li>
                        <li>• Health checks: $1.00/month</li>
                        <li>• <strong>Total: $1.90/month</strong></li>
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
  )
} 