'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Server, 
  Database, 
  Shield, 
  Globe, 
  Cloud, 
  Zap,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Play,
  HelpCircle,
  CreditCard
} from 'lucide-react'

const serviceCategories = [
  {
    id: 'compute',
    name: 'Compute Services',
    icon: Server,
    color: 'from-orange-500 to-red-500',
    services: [
      {
        name: 'EC2 (Elastic Compute Cloud)',
        description: 'Virtual servers in the cloud',
        keyFeatures: [
          'On-demand, scalable computing capacity',
          'Multiple instance types (General Purpose, Compute Optimized, Memory Optimized, etc.)',
          'Auto Scaling for automatic capacity management',
          'Elastic IP addresses for static IPs',
          'Spot Instances for cost optimization'
        ],
        useCases: [
          'Web applications and websites',
          'High-performance computing',
          'Batch processing',
          'Development and testing environments'
        ],
        examTips: [
          'Understand instance types and their use cases',
          'Know when to use Spot vs On-Demand vs Reserved Instances',
          'Auto Scaling groups and policies',
          'EC2 instance metadata service'
        ]
      },
      {
        name: 'Lambda',
        description: 'Serverless compute service',
        keyFeatures: [
          'Event-driven, serverless computing',
          'Automatic scaling and high availability',
          'Pay only for compute time consumed',
          'Supports multiple programming languages',
          'Integrated with 200+ AWS services'
        ],
        useCases: [
          'Real-time file processing',
          'Stream processing',
          'Web applications',
          'IoT backends'
        ],
        examTips: [
          'Cold starts and warm starts',
          'Memory allocation affects CPU and cost',
          'Timeout limits (15 minutes max)',
          'Concurrency limits and throttling'
        ]
      },
      {
        name: 'ECS (Elastic Container Service)',
        description: 'Container orchestration service',
        keyFeatures: [
          'Fully managed container orchestration',
          'Supports Docker containers',
          'Fargate for serverless containers',
          'EC2 launch type for more control',
          'Service discovery and load balancing'
        ],
        useCases: [
          'Microservices architectures',
          'Batch processing',
          'Application modernization',
          'DevOps and CI/CD pipelines'
        ],
        examTips: [
          'Fargate vs EC2 launch types',
          'Task definitions and service definitions',
          'Cluster capacity providers',
          'Service auto scaling'
        ]
      }
    ]
  },
  {
    id: 'storage',
    name: 'Storage Services',
    icon: Database,
    color: 'from-blue-500 to-cyan-500',
    services: [
      {
        name: 'S3 (Simple Storage Service)',
        description: 'Object storage service',
        keyFeatures: [
          '99.999999999% (11 9s) durability',
          '99.99% availability SLA',
          'Multiple storage classes (Standard, IA, Glacier)',
          'Lifecycle policies for cost optimization',
          'Versioning and cross-region replication'
        ],
        useCases: [
          'Static website hosting',
          'Data lakes and analytics',
          'Backup and disaster recovery',
          'Content distribution'
        ],
        examTips: [
          'Storage classes and their use cases',
          'Consistency model (read-after-write for new objects)',
          'Lifecycle policies and transitions',
          'S3 Transfer Acceleration'
        ]
      },
      {
        name: 'EBS (Elastic Block Store)',
        description: 'Block storage for EC2 instances',
        keyFeatures: [
          'Persistent block storage volumes',
          'Multiple volume types (GP2, IO1, ST1, SC1)',
          'Snapshot-based backup',
          'Encryption at rest',
          'Multi-attach for shared storage'
        ],
        useCases: [
          'Operating system storage',
          'Database storage',
          'Application data',
          'Backup and recovery'
        ],
        examTips: [
          'Volume types and their performance characteristics',
          'Snapshot lifecycle management',
          'EBS optimization',
          'Multi-attach limitations'
        ]
      },
      {
        name: 'EFS (Elastic File System)',
        description: 'Managed file storage',
        keyFeatures: [
          'Fully managed NFS file system',
          'Automatic scaling',
          'High availability and durability',
          'Performance modes (General Purpose, Max I/O)',
          'Throughput modes (Bursting, Provisioned)'
        ],
        useCases: [
          'Shared file storage',
          'Content management systems',
          'Web serving',
          'Big data analytics'
        ],
        examTips: [
          'Performance modes and their use cases',
          'Throughput modes and bursting',
          'Mount targets and security groups',
          'Lifecycle management'
        ]
      }
    ]
  },
  {
    id: 'networking',
    name: 'Networking & Content Delivery',
    icon: Globe,
    color: 'from-green-500 to-emerald-500',
    services: [
      {
        name: 'VPC (Virtual Private Cloud)',
        description: 'Isolated network environment',
        keyFeatures: [
          'Private, isolated network in AWS',
          'Subnets, route tables, and security groups',
          'Internet Gateway and NAT Gateway',
          'VPC peering and Transit Gateway',
          'Flow logs for network monitoring'
        ],
        useCases: [
          'Multi-tier applications',
          'Hybrid cloud connectivity',
          'Network isolation',
          'Compliance requirements'
        ],
        examTips: [
          'Default VPC vs custom VPC',
          'Subnet CIDR blocks and IP addressing',
          'Security groups vs NACLs',
          'VPC endpoints for private connectivity'
        ]
      },
      {
        name: 'Route 53',
        description: 'DNS and domain registration',
        keyFeatures: [
          'Highly available and scalable DNS',
          'Domain registration and management',
          'Health checks and failover',
          'Geolocation and latency-based routing',
          'Integration with other AWS services'
        ],
        useCases: [
          'Domain management',
          'Load balancing across regions',
          'Disaster recovery',
          'Traffic management'
        ],
        examTips: [
          'Routing policies (Simple, Weighted, Latency, Geolocation)',
          'Health checks and failover configuration',
          'Alias records vs CNAME',
          'DNS propagation times'
        ]
      },
      {
        name: 'CloudFront',
        description: 'Content delivery network',
        keyFeatures: [
          'Global content delivery network',
          'Edge locations worldwide',
          'Caching and compression',
          'HTTPS support and custom certificates',
          'Real-time metrics and logging'
        ],
        useCases: [
          'Static content delivery',
          'Video streaming',
          'Software distribution',
          'API acceleration'
        ],
        examTips: [
          'Cache behaviors and TTL settings',
          'Origin types (S3, ALB, EC2, Custom)',
          'Invalidation vs versioning',
          'Price classes and edge locations'
        ]
      }
    ]
  },
  {
    id: 'database',
    name: 'Database Services',
    icon: Database,
    color: 'from-purple-500 to-pink-500',
    services: [
      {
        name: 'RDS (Relational Database Service)',
        description: 'Managed relational databases',
        keyFeatures: [
          'Managed database service',
          'Multiple database engines (MySQL, PostgreSQL, Oracle, SQL Server)',
          'Multi-AZ deployments for high availability',
          'Read replicas for read scaling',
          'Automated backups and point-in-time recovery'
        ],
        useCases: [
          'OLTP applications',
          'E-commerce platforms',
          'Content management systems',
          'Business applications'
        ],
        examTips: [
          'Multi-AZ vs Read Replicas',
          'Backup retention and automated backups',
          'Instance types and storage options',
          'Security groups and encryption'
        ]
      },
      {
        name: 'DynamoDB',
        description: 'NoSQL database service',
        keyFeatures: [
          'Fully managed NoSQL database',
          'Single-digit millisecond performance',
          'Automatic scaling',
          'Global tables for multi-region replication',
          'Point-in-time recovery'
        ],
        useCases: [
          'Mobile applications',
          'Gaming applications',
          'IoT applications',
          'Real-time bidding'
        ],
        examTips: [
          'Provisioned vs On-Demand capacity',
          'Partition keys and sort keys',
          'Consistency models (Eventually Consistent vs Strongly Consistent)',
          'Global tables and replication'
        ]
      },
      {
        name: 'ElastiCache',
        description: 'In-memory caching service',
        keyFeatures: [
          'Managed Redis and Memcached',
          'High performance and low latency',
          'Multi-AZ deployments',
          'Automatic failover',
          'Backup and restore capabilities'
        ],
        useCases: [
          'Session storage',
          'Real-time analytics',
          'Gaming leaderboards',
          'Caching frequently accessed data'
        ],
        examTips: [
          'Redis vs Memcached use cases',
          'Multi-AZ and automatic failover',
          'Parameter groups and security',
          'Backup and snapshot strategies'
        ]
      }
    ]
  },
  {
    id: 'security',
    name: 'Security & Identity',
    icon: Shield,
    color: 'from-red-500 to-pink-500',
    services: [
      {
        name: 'IAM (Identity and Access Management)',
        description: 'User and permission management',
        keyFeatures: [
          'Centralized access control',
          'Users, groups, and roles',
          'Policy-based permissions',
          'Multi-factor authentication',
          'Access key management'
        ],
        useCases: [
          'User access management',
          'Application permissions',
          'Cross-account access',
          'Federation with external identity providers'
        ],
        examTips: [
          'Principle of least privilege',
          'IAM roles vs IAM users',
          'Policy evaluation logic',
          'Cross-account roles and trust relationships'
        ]
      },
      {
        name: 'KMS (Key Management Service)',
        description: 'Encryption key management',
        keyFeatures: [
          'Centralized key management',
          'Hardware security modules (HSMs)',
          'Automatic key rotation',
          'Integration with AWS services',
          'Audit logging with CloudTrail'
        ],
        useCases: [
          'Data encryption at rest',
          'Data encryption in transit',
          'Application-level encryption',
          'Compliance requirements'
        ],
        examTips: [
          'Customer managed keys vs AWS managed keys',
          'Key policies and permissions',
          'Automatic key rotation',
          'Cross-region key replication'
        ]
      },
      {
        name: 'CloudTrail',
        description: 'API activity logging',
        keyFeatures: [
          'Comprehensive API activity logging',
          'Management and data events',
          'Integration with CloudWatch',
          'S3 storage for logs',
          'Real-time monitoring'
        ],
        useCases: [
          'Security monitoring',
          'Compliance auditing',
          'Operational troubleshooting',
          'Risk assessment'
        ],
        examTips: [
          'Management events vs data events',
          'CloudTrail logs vs CloudWatch logs',
          'Log file integrity validation',
          'Cross-region logging'
        ]
      }
    ]
  },
  {
    id: 'monitoring',
    name: 'Monitoring & Management',
    icon: Zap,
    color: 'from-yellow-500 to-orange-500',
    services: [
      {
        name: 'CloudWatch',
        description: 'Monitoring and observability',
        keyFeatures: [
          'Metrics collection and monitoring',
          'Log aggregation and analysis',
          'Alarms and notifications',
          'Dashboards and visualization',
          'Automated actions'
        ],
        useCases: [
          'Application monitoring',
          'Infrastructure monitoring',
          'Log analysis',
          'Performance optimization'
        ],
        examTips: [
          'Basic vs detailed monitoring',
          'CloudWatch logs vs CloudTrail',
          'Alarm states and actions',
          'Custom metrics and dimensions'
        ]
      },
      {
        name: 'CloudFormation',
        description: 'Infrastructure as code',
        keyFeatures: [
          'Template-based resource provisioning',
          'Declarative infrastructure definition',
          'Stack management and updates',
          'Rollback capabilities',
          'Cross-stack references'
        ],
        useCases: [
          'Infrastructure automation',
          'Environment consistency',
          'Disaster recovery',
          'Compliance and governance'
        ],
        examTips: [
          'Template structure and syntax',
          'Stack updates and change sets',
          'Intrinsic functions and pseudo parameters',
          'Nested stacks and cross-stack references'
        ]
      },
      {
        name: 'Systems Manager',
        description: 'Systems management service',
        keyFeatures: [
          'Centralized configuration management',
          'Patch management',
          'Parameter Store for configuration',
          'Session Manager for secure access',
          'Automation and runbooks'
        ],
        useCases: [
          'Configuration management',
          'Patch management',
          'Secure server access',
          'Automation and orchestration'
        ],
        examTips: [
          'Parameter Store vs Secrets Manager',
          'Session Manager vs SSH',
          'Patch Manager and maintenance windows',
          'State Manager for configuration compliance'
        ]
      }
    ]
  }
]

export default function ConceptsPage() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('compute')
  const [expandedService, setExpandedService] = useState<string | null>(null)

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Core AWS Concepts
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Master the essential AWS services and architectural patterns you need to know 
              for the Solutions Architect Associate exam.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {serviceCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="card"
              >
                <div 
                  className="flex items-center justify-between cursor-pointer mb-6"
                  onClick={() => setExpandedCategory(
                    expandedCategory === category.id ? null : category.id
                  )}
                >
                  <div className="flex items-center">
                    <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mr-4`}>
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {category.name}
                    </h2>
                  </div>
                  {expandedCategory === category.id ? (
                    <ChevronDown className="w-6 h-6 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-6 h-6 text-gray-500" />
                  )}
                </div>

                {expandedCategory === category.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {category.services.map((service, serviceIndex) => (
                      <div key={service.name} className="border-l-4 border-aws-orange pl-4">
                        <div 
                          className="flex items-center justify-between cursor-pointer mb-3"
                          onClick={() => setExpandedService(
                            expandedService === service.name ? null : service.name
                          )}
                        >
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {service.name}
                            </h3>
                            <p className="text-gray-600 text-sm">
                              {service.description}
                            </p>
                          </div>
                          {expandedService === service.name ? (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-500" />
                          )}
                        </div>

                        {expandedService === service.name && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-4"
                          >
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                                <Zap className="w-4 h-4 mr-2 text-aws-orange" />
                                Key Features
                              </h4>
                              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                {service.keyFeatures.map((feature, index) => (
                                  <li key={index}>{feature}</li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                                <Play className="w-4 h-4 mr-2 text-aws-orange" />
                                Use Cases
                              </h4>
                              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                {service.useCases.map((useCase, index) => (
                                  <li key={index}>{useCase}</li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                                <BookOpen className="w-4 h-4 mr-2 text-aws-orange" />
                                Exam Tips
                              </h4>
                              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                {service.examTips.map((tip, index) => (
                                  <li key={index}>{tip}</li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Test Your Knowledge?
            </h2>
            <p className="text-lg text-gray-600">
              Practice what you've learned with our interactive Q&A and flashcards.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <button className="btn-primary text-lg py-4 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 mr-2" />
              Practice Q&A
            </button>
            <button className="btn-secondary text-lg py-4 flex items-center justify-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Flashcards
            </button>
          </div>
        </div>
      </section>
    </div>
  )
} 