'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  HelpCircle, 
  CheckCircle, 
  XCircle, 
  ChevronDown, 
  ChevronRight,
  BookOpen,
  Target,
  AlertTriangle,
  Info,
  Search,
  Filter,
  RefreshCw
} from 'lucide-react'

const ec2Questions = [
  {
    id: 1,
    question: "What is the difference between On-Demand, Reserved, and Spot Instances?",
    options: [
      "On-Demand: Pay by the hour, Reserved: 1-3 year commitment, Spot: Use spare capacity",
      "On-Demand: Most expensive, Reserved: Cheapest, Spot: Middle cost",
      "On-Demand: Always available, Reserved: Limited availability, Spot: No availability",
      "All three are the same pricing model with different names"
    ],
    correctAnswer: 0,
    explanation: "On-Demand instances are the most flexible but expensive, allowing you to pay by the hour with no commitment. Reserved instances require a 1-3 year commitment but offer significant discounts (up to 72%). Spot instances use AWS's spare capacity and can be terminated with 2-minute notice, offering up to 90% discount but are not suitable for critical workloads.",
    category: "Pricing",
    difficulty: "Medium"
  },
  {
    id: 2,
    question: "Which instance type is best for a high-traffic web application?",
    options: [
      "T3 instances (burstable)",
      "M6i instances (general purpose)",
      "C6i instances (compute optimized)",
      "R6i instances (memory optimized)"
    ],
    correctAnswer: 1,
    explanation: "M6i instances provide a balance of compute, memory, and networking resources, making them ideal for web applications. T3 instances are burstable and may not handle sustained high traffic well. C6i instances are optimized for compute-intensive workloads, while R6i instances are for memory-intensive applications.",
    category: "Instance Types",
    difficulty: "Easy"
  },
  {
    id: 3,
    question: "What is the maximum number of Elastic IP addresses you can have per region?",
    options: [
      "5 per region",
      "10 per region", 
      "Unlimited",
      "Depends on your account type"
    ],
    correctAnswer: 0,
    explanation: "By default, AWS allows 5 Elastic IP addresses per region. You can request an increase through AWS Support if you need more. Elastic IPs are static IPv4 addresses that can be moved between instances.",
    category: "Networking",
    difficulty: "Easy"
  },
  {
    id: 4,
    question: "Which of the following is true about Security Groups?",
    options: [
      "They are stateless and require explicit return traffic rules",
      "They are stateful and automatically allow return traffic",
      "They can only be attached to one instance at a time",
      "They work at the subnet level, not the instance level"
    ],
    correctAnswer: 1,
    explanation: "Security Groups are stateful, meaning that if you allow inbound traffic, the corresponding outbound traffic is automatically allowed. This is different from Network ACLs, which are stateless and require explicit rules for both directions.",
    category: "Security",
    difficulty: "Medium"
  },
  {
    id: 5,
    question: "What happens when a Spot Instance is terminated?",
    options: [
      "You get a 24-hour notice before termination",
      "You get a 2-minute notice before termination",
      "The instance is immediately terminated without notice",
      "The instance is automatically moved to On-Demand pricing"
    ],
    correctAnswer: 1,
    explanation: "When AWS needs to reclaim Spot capacity, you receive a 2-minute termination notice. This is why Spot instances are best suited for fault-tolerant, flexible applications that can handle interruptions.",
    category: "Pricing",
    difficulty: "Medium"
  },
  {
    id: 6,
    question: "Which EBS volume type provides the best performance for database workloads?",
    options: [
      "gp2 (General Purpose SSD)",
      "gp3 (General Purpose SSD)",
      "io1 (Provisioned IOPS SSD)",
      "st1 (Throughput Optimized HDD)"
    ],
    correctAnswer: 2,
    explanation: "io1 volumes provide the highest performance with up to 64,000 IOPS and 1,000 MB/s throughput. They are ideal for critical database workloads that require consistent, high performance. gp2/gp3 are good for general workloads, while st1 is for big data workloads.",
    category: "Storage",
    difficulty: "Medium"
  },
  {
    id: 7,
    question: "What is the purpose of an Auto Scaling Group?",
    options: [
      "To automatically backup instances",
      "To automatically scale the number of instances based on demand",
      "To automatically update instance software",
      "To automatically migrate instances between regions"
    ],
    correctAnswer: 1,
    explanation: "Auto Scaling Groups automatically adjust the number of EC2 instances in your application based on demand. They can scale out (add instances) when demand increases and scale in (remove instances) when demand decreases, helping you maintain performance and optimize costs.",
    category: "Auto Scaling",
    difficulty: "Easy"
  },
  {
    id: 8,
    question: "Which instance type is best for a memory-intensive database like SAP HANA?",
    options: [
      "C6i instances (compute optimized)",
      "M6i instances (general purpose)",
      "R6i instances (memory optimized)",
      "I3 instances (storage optimized)"
    ],
    correctAnswer: 2,
    explanation: "R6i instances are specifically designed for memory-intensive workloads like SAP HANA, large in-memory databases, and real-time big data analytics. They provide the highest memory-to-vCPU ratio among instance families.",
    category: "Instance Types",
    difficulty: "Medium"
  },
  {
    id: 9,
    question: "What is the difference between EBS and Instance Store?",
    options: [
      "EBS is faster, Instance Store is slower",
      "EBS is persistent, Instance Store is ephemeral",
      "EBS is cheaper, Instance Store is more expensive",
      "There is no difference"
    ],
    correctAnswer: 1,
    explanation: "EBS volumes are network-attached storage that persist independently of the instance lifecycle. Instance Store is physically attached to the host and is ephemeral - data is lost when the instance stops or terminates.",
    category: "Storage",
    difficulty: "Medium"
  },
  {
    id: 10,
    question: "What is the maximum number of instances you can have in an Auto Scaling Group?",
    options: [
      "100 instances",
      "500 instances",
      "1000 instances",
      "Unlimited"
    ],
    correctAnswer: 1,
    explanation: "The default maximum number of instances in an Auto Scaling Group is 500. You can request an increase through AWS Support if you need more. The minimum is 0 and the desired capacity can be set between these limits.",
    category: "Auto Scaling",
    difficulty: "Easy"
  },
  {
    id: 11,
    question: "Which pricing model offers the highest discount compared to On-Demand?",
    options: [
      "Reserved Instances",
      "Spot Instances",
      "Savings Plans",
      "Dedicated Hosts"
    ],
    correctAnswer: 1,
    explanation: "Spot Instances can offer up to 90% discount compared to On-Demand pricing, making them the most cost-effective option. However, they can be terminated with 2-minute notice, so they're best for fault-tolerant workloads.",
    category: "Pricing",
    difficulty: "Easy"
  },
  {
    id: 12,
    question: "What is the purpose of a Launch Template?",
    options: [
      "To create a backup of your instances",
      "To define the configuration for launching instances",
      "To schedule instance start/stop times",
      "To migrate instances between regions"
    ],
    correctAnswer: 1,
    explanation: "Launch Templates define the configuration for launching instances, including instance type, AMI, security groups, storage, and other settings. They help ensure consistency when launching instances and can be used with Auto Scaling Groups.",
    category: "Instance Management",
    difficulty: "Medium"
  },
  {
    id: 13,
    question: "Which instance type is best for batch processing workloads?",
    options: [
      "T3 instances (burstable)",
      "C6i instances (compute optimized)",
      "R6i instances (memory optimized)",
      "D2 instances (storage optimized)"
    ],
    correctAnswer: 1,
    explanation: "C6i instances are optimized for compute-intensive workloads like batch processing, media transcoding, and high-traffic web servers. They provide the best price-performance ratio for applications that need high CPU performance.",
    category: "Instance Types",
    difficulty: "Medium"
  },
  {
    id: 14,
    question: "What is the difference between a Security Group and a Network ACL?",
    options: [
      "Security Groups work at the instance level, Network ACLs work at the subnet level",
      "Security Groups are stateless, Network ACLs are stateful",
      "Security Groups are more expensive than Network ACLs",
      "There is no difference"
    ],
    correctAnswer: 0,
    explanation: "Security Groups operate at the instance level and are stateful (automatically allow return traffic). Network ACLs operate at the subnet level and are stateless (require explicit rules for both directions). You can use both together for layered security.",
    category: "Security",
    difficulty: "Medium"
  },
  {
    id: 15,
    question: "What is the maximum size of an EBS volume?",
    options: [
      "1 TB",
      "16 TB",
      "64 TB",
      "Unlimited"
    ],
    correctAnswer: 1,
    explanation: "The maximum size for a single EBS volume is 16 TB. You can attach multiple volumes to a single instance if you need more storage. The maximum number of EBS volumes per instance is 27.",
    category: "Storage",
    difficulty: "Easy"
  },
  {
    id: 16,
    question: "Which instance type is best for a development environment?",
    options: [
      "T3 instances (burstable)",
      "M6i instances (general purpose)",
      "C6i instances (compute optimized)",
      "R6i instances (memory optimized)"
    ],
    correctAnswer: 0,
    explanation: "T3 instances are ideal for development environments because they are cost-effective and provide burstable performance. They can handle variable workloads well and are perfect for testing, development, and low-traffic applications.",
    category: "Instance Types",
    difficulty: "Easy"
  },
  {
    id: 17,
    question: "What is the purpose of an Elastic IP address?",
    options: [
      "To provide faster internet connectivity",
      "To provide a static, public IPv4 address",
      "To reduce network latency",
      "To encrypt network traffic"
    ],
    correctAnswer: 1,
    explanation: "Elastic IP addresses are static, public IPv4 addresses that you can allocate to your AWS account and associate with your instances. They remain associated with your account until you release them, even if the instance is stopped or terminated.",
    category: "Networking",
    difficulty: "Easy"
  },
  {
    id: 18,
    question: "What is the maximum number of security groups you can attach to an instance?",
    options: [
      "1 security group",
      "5 security groups",
      "10 security groups",
      "Unlimited"
    ],
    correctAnswer: 1,
    explanation: "You can attach up to 5 security groups to a single EC2 instance. This allows you to create different security rules for different purposes and apply them to the same instance.",
    category: "Security",
    difficulty: "Easy"
  },
  {
    id: 19,
    question: "Which EBS volume type is best for big data workloads?",
    options: [
      "gp2 (General Purpose SSD)",
      "io1 (Provisioned IOPS SSD)",
      "st1 (Throughput Optimized HDD)",
      "sc1 (Cold HDD)"
    ],
    correctAnswer: 2,
    explanation: "st1 (Throughput Optimized HDD) volumes are designed for big data workloads, data warehouses, and log processing. They provide high throughput and are cost-effective for large, sequential workloads.",
    category: "Storage",
    difficulty: "Medium"
  },
  {
    id: 20,
    question: "What is the purpose of a Placement Group?",
    options: [
      "To group instances for billing purposes",
      "To place instances close together for low latency",
      "To automatically backup instances",
      "To migrate instances between regions"
    ],
    correctAnswer: 1,
    explanation: "Placement Groups are used to influence the placement of instances across underlying hardware to meet the requirements of your workload. Cluster placement groups place instances close together for low latency, while spread placement groups place instances on distinct hardware for high availability.",
    category: "Instance Management",
    difficulty: "Hard"
  },
  {
    id: 21,
    question: "What is the maximum number of instances in a cluster placement group?",
    options: [
      "100 instances",
      "500 instances",
      "1000 instances",
      "Unlimited"
    ],
    correctAnswer: 0,
    explanation: "A cluster placement group can contain a maximum of 100 instances. Cluster placement groups are used for applications that need low latency and high network throughput between instances.",
    category: "Instance Management",
    difficulty: "Hard"
  },
  {
    id: 22,
    question: "Which instance type is best for a high-performance database?",
    options: [
      "T3 instances (burstable)",
      "M6i instances (general purpose)",
      "R6i instances (memory optimized)",
      "I3 instances (storage optimized)"
    ],
    correctAnswer: 2,
    explanation: "R6i instances are optimized for memory-intensive workloads like high-performance databases. They provide the highest memory-to-vCPU ratio and are ideal for applications that need large amounts of memory.",
    category: "Instance Types",
    difficulty: "Medium"
  },
  {
    id: 23,
    question: "What is the purpose of an EBS snapshot?",
    options: [
      "To create a backup of your EBS volume",
      "To increase the size of your EBS volume",
      "To encrypt your EBS volume",
      "To migrate your EBS volume to another region"
    ],
    correctAnswer: 0,
    explanation: "EBS snapshots are incremental backups of your EBS volumes that are stored in S3. They can be used to create new volumes, restore data, or migrate data between regions. Snapshots are encrypted by default.",
    category: "Storage",
    difficulty: "Easy"
  },
  {
    id: 24,
    question: "What is the maximum number of EBS volumes you can attach to an instance?",
    options: [
      "10 volumes",
      "27 volumes",
      "50 volumes",
      "Unlimited"
    ],
    correctAnswer: 1,
    explanation: "You can attach up to 27 EBS volumes to a single EC2 instance. The actual limit depends on the instance type and the number of available block device mappings.",
    category: "Storage",
    difficulty: "Easy"
  },
  {
    id: 25,
    question: "Which instance type is best for a web server with moderate traffic?",
    options: [
      "T3 instances (burstable)",
      "M6i instances (general purpose)",
      "C6i instances (compute optimized)",
      "R6i instances (memory optimized)"
    ],
    correctAnswer: 1,
    explanation: "M6i instances provide a good balance of compute, memory, and networking resources, making them ideal for web servers with moderate traffic. They offer consistent performance without the burst limitations of T3 instances.",
    category: "Instance Types",
    difficulty: "Easy"
  },
  {
    id: 26,
    question: "What is the purpose of a Dedicated Host?",
    options: [
      "To provide dedicated network bandwidth",
      "To provide a physical server dedicated to your use",
      "To provide dedicated storage",
      "To provide dedicated security"
    ],
    correctAnswer: 1,
    explanation: "Dedicated Hosts are physical servers with EC2 instance capacity fully dedicated to your use. They are useful for meeting compliance requirements, licensing requirements, or when you need to use your existing server-bound software licenses.",
    category: "Instance Management",
    difficulty: "Hard"
  },
  {
    id: 27,
    question: "Which EBS volume type is the most cost-effective for infrequently accessed data?",
    options: [
      "gp2 (General Purpose SSD)",
      "io1 (Provisioned IOPS SSD)",
      "st1 (Throughput Optimized HDD)",
      "sc1 (Cold HDD)"
    ],
    correctAnswer: 3,
    explanation: "sc1 (Cold HDD) volumes are the most cost-effective storage option for infrequently accessed data. They are designed for workloads with large, sequential cold data that you access infrequently.",
    category: "Storage",
    difficulty: "Medium"
  },
  {
    id: 28,
    question: "What is the maximum number of instances in a spread placement group?",
    options: [
      "7 instances",
      "10 instances",
      "100 instances",
      "Unlimited"
    ],
    correctAnswer: 0,
    explanation: "A spread placement group can contain a maximum of 7 instances. Spread placement groups are used for applications that need high availability and are placed on distinct underlying hardware.",
    category: "Instance Management",
    difficulty: "Hard"
  },
  {
    id: 29,
    question: "Which instance type is best for a machine learning workload?",
    options: [
      "T3 instances (burstable)",
      "M6i instances (general purpose)",
      "C6i instances (compute optimized)",
      "P3 instances (GPU instances)"
    ],
    correctAnswer: 3,
    explanation: "P3 instances are designed for machine learning workloads and provide high-performance GPUs. They are ideal for training deep learning models, high-performance computing, and other GPU-intensive applications.",
    category: "Instance Types",
    difficulty: "Medium"
  },
  {
    id: 30,
    question: "What is the purpose of an EBS volume encryption?",
    options: [
      "To compress data",
      "To encrypt data at rest",
      "To increase performance",
      "To reduce costs"
    ],
    correctAnswer: 1,
    explanation: "EBS volume encryption encrypts data at rest using AWS-managed keys or customer-managed keys. It provides an additional layer of security for sensitive data stored on EBS volumes.",
    category: "Security",
    difficulty: "Easy"
  },
  {
    id: 31,
    question: "Which instance type is best for a file server?",
    options: [
      "T3 instances (burstable)",
      "M6i instances (general purpose)",
      "I3 instances (storage optimized)",
      "R6i instances (memory optimized)"
    ],
    correctAnswer: 2,
    explanation: "I3 instances are optimized for storage-intensive workloads and provide high I/O performance with NVMe SSD storage. They are ideal for file servers, data warehouses, and other storage-intensive applications.",
    category: "Instance Types",
    difficulty: "Medium"
  },
  {
    id: 32,
    question: "What is the purpose of an Auto Scaling policy?",
    options: [
      "To define when to scale instances",
      "To define backup schedules",
      "To define security rules",
      "To define network rules"
    ],
    correctAnswer: 0,
    explanation: "Auto Scaling policies define when and how to scale your Auto Scaling Group. They can be based on CloudWatch metrics like CPU utilization, memory usage, or custom metrics.",
    category: "Auto Scaling",
    difficulty: "Medium"
  },
  {
    id: 33,
    question: "Which instance type is best for a gaming server?",
    options: [
      "T3 instances (burstable)",
      "M6i instances (general purpose)",
      "C6i instances (compute optimized)",
      "G4 instances (GPU instances)"
    ],
    correctAnswer: 2,
    explanation: "C6i instances provide high compute performance and low latency, making them ideal for gaming servers. They can handle the computational demands of modern games and provide a good gaming experience.",
    category: "Instance Types",
    difficulty: "Medium"
  },
  {
    id: 34,
    question: "What is the purpose of an EBS volume snapshot copy?",
    options: [
      "To create a backup",
      "To copy snapshots between regions",
      "To increase snapshot size",
      "To encrypt snapshots"
    ],
    correctAnswer: 1,
    explanation: "EBS snapshot copy allows you to copy snapshots between AWS regions. This is useful for disaster recovery, compliance requirements, or when you need to launch instances in different regions.",
    category: "Storage",
    difficulty: "Medium"
  },
  {
    id: 35,
    question: "Which instance type is best for a media transcoding workload?",
    options: [
      "T3 instances (burstable)",
      "M6i instances (general purpose)",
      "C6i instances (compute optimized)",
      "R6i instances (memory optimized)"
    ],
    correctAnswer: 2,
    explanation: "C6i instances are optimized for compute-intensive workloads like media transcoding. They provide high CPU performance and are cost-effective for applications that need to process large amounts of data.",
    category: "Instance Types",
    difficulty: "Medium"
  },
  {
    id: 36,
    question: "What is the purpose of an EBS volume fast snapshot restore?",
    options: [
      "To increase snapshot size",
      "To restore snapshots faster",
      "To encrypt snapshots",
      "To compress snapshots"
    ],
    correctAnswer: 1,
    explanation: "Fast snapshot restore allows you to create volumes from snapshots faster than standard snapshot restore. It's useful for applications that need to quickly restore from snapshots.",
    category: "Storage",
    difficulty: "Hard"
  },
  {
    id: 37,
    question: "Which instance type is best for a high-traffic web application?",
    options: [
      "T3 instances (burstable)",
      "M6i instances (general purpose)",
      "C6i instances (compute optimized)",
      "R6i instances (memory optimized)"
    ],
    correctAnswer: 1,
    explanation: "M6i instances provide a good balance of compute, memory, and networking resources, making them ideal for high-traffic web applications. They can handle variable workloads and provide consistent performance.",
    category: "Instance Types",
    difficulty: "Medium"
  },
  {
    id: 38,
    question: "What is the purpose of an EBS volume multi-attach?",
    options: [
      "To attach multiple volumes to one instance",
      "To attach one volume to multiple instances",
      "To increase volume performance",
      "To reduce volume costs"
    ],
    correctAnswer: 1,
    explanation: "EBS multi-attach allows you to attach a single EBS volume to multiple instances in the same Availability Zone. This is useful for applications that need shared storage, but only io1 volumes support this feature.",
    category: "Storage",
    difficulty: "Hard"
  },
  {
    id: 39,
    question: "Which instance type is best for a development environment?",
    options: [
      "T3 instances (burstable)",
      "M6i instances (general purpose)",
      "C6i instances (compute optimized)",
      "R6i instances (memory optimized)"
    ],
    correctAnswer: 0,
    explanation: "T3 instances are ideal for development environments because they are cost-effective and provide burstable performance. They can handle variable workloads well and are perfect for testing and development.",
    category: "Instance Types",
    difficulty: "Easy"
  },
  {
    id: 40,
    question: "What is the purpose of an EBS volume lifecycle manager?",
    options: [
      "To automatically backup volumes",
      "To automatically delete old snapshots",
      "To automatically resize volumes",
      "To automatically migrate volumes"
    ],
    correctAnswer: 1,
    explanation: "EBS lifecycle manager automatically deletes old snapshots based on policies you define. This helps you manage snapshot costs and storage by removing snapshots that are no longer needed.",
    category: "Storage",
    difficulty: "Medium"
  },
  {
    id: 41,
    question: "Which instance type is best for a database server?",
    options: [
      "T3 instances (burstable)",
      "M6i instances (general purpose)",
      "R6i instances (memory optimized)",
      "I3 instances (storage optimized)"
    ],
    correctAnswer: 2,
    explanation: "R6i instances are optimized for memory-intensive workloads like databases. They provide high memory-to-vCPU ratios and are ideal for applications that need large amounts of memory for caching and data processing.",
    category: "Instance Types",
    difficulty: "Medium"
  },
  {
    id: 42,
    question: "What is the purpose of an EBS volume encryption by default?",
    options: [
      "To reduce costs",
      "To increase performance",
      "To encrypt all new volumes automatically",
      "To compress data"
    ],
    correctAnswer: 2,
    explanation: "EBS encryption by default automatically encrypts all new EBS volumes and snapshots. This provides an additional layer of security without requiring manual configuration for each volume.",
    category: "Security",
    difficulty: "Medium"
  },
  {
    id: 43,
    question: "Which instance type is best for a high-performance computing workload?",
    options: [
      "T3 instances (burstable)",
      "M6i instances (general purpose)",
      "C6i instances (compute optimized)",
      "R6i instances (memory optimized)"
    ],
    correctAnswer: 2,
    explanation: "C6i instances are optimized for compute-intensive workloads like high-performance computing. They provide high CPU performance and are cost-effective for applications that need to process large amounts of data.",
    category: "Instance Types",
    difficulty: "Medium"
  },
  {
    id: 44,
    question: "What is the purpose of an EBS volume snapshot archive?",
    options: [
      "To compress snapshots",
      "To store snapshots in cheaper storage",
      "To encrypt snapshots",
      "To migrate snapshots"
    ],
    correctAnswer: 1,
    explanation: "EBS snapshot archive stores snapshots in cheaper storage for long-term retention. It's useful for compliance requirements or when you need to keep snapshots for extended periods.",
    category: "Storage",
    difficulty: "Hard"
  },
  {
    id: 45,
    question: "Which instance type is best for a caching server?",
    options: [
      "T3 instances (burstable)",
      "M6i instances (general purpose)",
      "R6i instances (memory optimized)",
      "I3 instances (storage optimized)"
    ],
    correctAnswer: 2,
    explanation: "R6i instances are optimized for memory-intensive workloads like caching servers. They provide high memory-to-vCPU ratios and are ideal for applications that need large amounts of memory for caching data.",
    category: "Instance Types",
    difficulty: "Medium"
  },
  {
    id: 46,
    question: "What is the purpose of an EBS volume snapshot copy?",
    options: [
      "To create a backup",
      "To copy snapshots between regions",
      "To increase snapshot size",
      "To encrypt snapshots"
    ],
    correctAnswer: 1,
    explanation: "EBS snapshot copy allows you to copy snapshots between AWS regions. This is useful for disaster recovery, compliance requirements, or when you need to launch instances in different regions.",
    category: "Storage",
    difficulty: "Medium"
  },
  {
    id: 47,
    question: "Which instance type is best for a load balancer?",
    options: [
      "T3 instances (burstable)",
      "M6i instances (general purpose)",
      "C6i instances (compute optimized)",
      "R6i instances (memory optimized)"
    ],
    correctAnswer: 1,
    explanation: "M6i instances provide a good balance of compute, memory, and networking resources, making them ideal for load balancers. They can handle variable workloads and provide consistent performance.",
    category: "Instance Types",
    difficulty: "Medium"
  },
  {
    id: 48,
    question: "What is the purpose of an EBS volume snapshot import?",
    options: [
      "To import snapshots from S3",
      "To import snapshots from other regions",
      "To import snapshots from other AWS accounts",
      "To import snapshots from on-premises"
    ],
    correctAnswer: 0,
    explanation: "EBS snapshot import allows you to import snapshots from S3. This is useful for migrating data from on-premises environments or other cloud providers to AWS.",
    category: "Storage",
    difficulty: "Hard"
  },
  {
    id: 49,
    question: "Which instance type is best for a monitoring server?",
    options: [
      "T3 instances (burstable)",
      "M6i instances (general purpose)",
      "C6i instances (compute optimized)",
      "R6i instances (memory optimized)"
    ],
    correctAnswer: 1,
    explanation: "M6i instances provide a good balance of compute, memory, and networking resources, making them ideal for monitoring servers. They can handle variable workloads and provide consistent performance.",
    category: "Instance Types",
    difficulty: "Easy"
  },
  {
    id: 50,
    question: "What is the purpose of an EBS volume snapshot export?",
    options: [
      "To export snapshots to S3",
      "To export snapshots to other regions",
      "To export snapshots to other AWS accounts",
      "To export snapshots to on-premises"
    ],
    correctAnswer: 0,
    explanation: "EBS snapshot export allows you to export snapshots to S3. This is useful for backing up data, migrating data to other cloud providers, or for compliance requirements.",
    category: "Storage",
    difficulty: "Hard"
  }
]

const categories = ['All', 'Instance Types', 'Pricing', 'Storage', 'Security', 'Networking', 'Auto Scaling', 'Instance Management']
const difficulties = ['All', 'Easy', 'Medium', 'Hard']

export default function QAPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [totalAnswered, setTotalAnswered] = useState(0)
  const [filteredQuestions, setFilteredQuestions] = useState(ec2Questions)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return // Prevent multiple selections
    setSelectedAnswer(answerIndex)
    
    if (answerIndex === ec2Questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
    setTotalAnswered(totalAnswered + 1)
  }

  const nextQuestion = () => {
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    }
  }

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setTotalAnswered(0)
  }

  const filterQuestions = () => {
    let filtered = ec2Questions

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(q => q.category === selectedCategory)
    }

    if (selectedDifficulty !== 'All') {
      filtered = filtered.filter(q => q.difficulty === selectedDifficulty)
    }

    if (searchTerm) {
      filtered = filtered.filter(q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.explanation.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredQuestions(filtered)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
  }

  React.useEffect(() => {
    filterQuestions()
  }, [selectedCategory, selectedDifficulty, searchTerm])

  const currentQ = filteredQuestions[currentQuestion]

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
              <HelpCircle className="w-12 h-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">
                EC2 Practice Questions
              </h1>
            </div>
            <p className="text-xl max-w-3xl mx-auto">
              Test your knowledge with 50 of the most common EC2 questions from the AWS Solutions Architect Associate exam.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <div className="flex items-center">
              <Search className="w-5 h-5 mr-2 text-gray-500" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-aws-orange"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-aws-orange"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-aws-orange"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>{difficulty}</option>
              ))}
            </select>

            <button
              onClick={resetQuiz}
              className="btn-secondary flex items-center"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset Quiz
            </button>
          </div>
        </div>
      </section>

      {/* Progress Bar */}
      <section className="py-4 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {filteredQuestions.length}
            </span>
            <span className="text-sm text-gray-600">
              Score: {score}/{totalAnswered} ({totalAnswered > 0 ? Math.round((score/totalAnswered)*100) : 0}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-aws-orange h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / filteredQuestions.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </section>

      {/* Question */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {currentQ && (
            <motion.div
              key={currentQ.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="card"
            >
              {/* Question Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <span className="px-3 py-1 bg-aws-orange text-white rounded-full text-sm font-semibold">
                    {currentQ.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    currentQ.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    currentQ.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {currentQ.difficulty}
                  </span>
                </div>
                <span className="text-gray-500 text-sm">#{currentQ.id}</span>
              </div>

              {/* Question */}
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {currentQ.question}
              </h2>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={selectedAnswer !== null}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedAnswer === null
                        ? 'border-gray-200 hover:border-aws-orange hover:bg-orange-50'
                        : selectedAnswer === index
                        ? index === currentQ.correctAnswer
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-500 bg-red-50'
                        : index === currentQ.correctAnswer
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center text-sm font-bold">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="flex-1">{option}</span>
                      {selectedAnswer !== null && index === currentQ.correctAnswer && (
                        <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
                      )}
                      {selectedAnswer !== null && selectedAnswer === index && index !== currentQ.correctAnswer && (
                        <XCircle className="w-5 h-5 text-red-500 ml-2" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Explanation */}
              {selectedAnswer !== null && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="mb-6"
                >
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <div className="flex items-center mb-2">
                      <Info className="w-5 h-5 text-blue-500 mr-2" />
                      <h3 className="font-semibold text-blue-900">Explanation</h3>
                    </div>
                    <p className="text-blue-800">{currentQ.explanation}</p>
                  </div>
                </motion.div>
              )}

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <button
                  onClick={previousQuestion}
                  disabled={currentQuestion === 0}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <span className="text-gray-600">
                  {currentQuestion + 1} of {filteredQuestions.length}
                </span>

                <button
                  onClick={nextQuestion}
                  disabled={currentQuestion === filteredQuestions.length - 1}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Results Summary */}
      {totalAnswered > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quiz Summary</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-aws-orange mb-2">{score}</div>
                <div className="text-gray-600">Correct Answers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">{totalAnswered}</div>
                <div className="text-gray-600">Questions Answered</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {Math.round((score/totalAnswered)*100)}%
                </div>
                <div className="text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
} 