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

const s3Questions = [
  {
    id: 51,
    question: "What is the durability of S3 Standard storage class?",
    options: [
      "99.99% (4 9s)",
      "99.999999999% (11 9s)",
      "99.999% (5 9s)",
      "99.9% (3 9s)"
    ],
    correctAnswer: 1,
    explanation: "S3 Standard provides 99.999999999% (11 9s) durability, meaning that if you store 10,000 objects, you can expect to lose one object every 10,000,000 years on average.",
    category: "Storage Classes",
    difficulty: "Easy"
  },
  {
    id: 52,
    question: "What is the availability SLA for S3 Standard-IA?",
    options: [
      "99.99%",
      "99.9%",
      "99.5%",
      "99%"
    ],
    correctAnswer: 1,
    explanation: "S3 Standard-IA provides 99.9% availability SLA. This means the service is designed to be available 99.9% of the time, with potential for brief periods of unavailability.",
    category: "Storage Classes",
    difficulty: "Easy"
  },
  {
    id: 53,
    question: "What is the minimum storage duration for S3 Standard-IA?",
    options: [
      "30 days",
      "90 days",
      "180 days",
      "365 days"
    ],
    correctAnswer: 0,
    explanation: "S3 Standard-IA has a minimum storage duration of 30 days. If you delete an object before 30 days, you'll be charged for the full 30 days.",
    category: "Storage Classes",
    difficulty: "Medium"
  },
  {
    id: 54,
    question: "Which S3 storage class is stored in a single Availability Zone?",
    options: [
      "S3 Standard",
      "S3 Standard-IA",
      "S3 One Zone-IA",
      "S3 Glacier"
    ],
    correctAnswer: 2,
    explanation: "S3 One Zone-IA stores data in a single Availability Zone, making it 20% cheaper than S3 Standard-IA but with lower availability (99.5%).",
    category: "Storage Classes",
    difficulty: "Medium"
  },
  {
    id: 55,
    question: "What is the retrieval time for S3 Glacier?",
    options: [
      "Minutes to hours",
      "3-5 hours",
      "12-48 hours",
      "Immediate"
    ],
    correctAnswer: 1,
    explanation: "S3 Glacier has a retrieval time of 3-5 hours. This is why it's suitable for long-term archival data that you don't need to access frequently.",
    category: "Storage Classes",
    difficulty: "Medium"
  },
  {
    id: 56,
    question: "Which S3 storage class has the lowest cost?",
    options: [
      "S3 Standard-IA",
      "S3 Glacier",
      "S3 Glacier Deep Archive",
      "S3 One Zone-IA"
    ],
    correctAnswer: 2,
    explanation: "S3 Glacier Deep Archive has the lowest storage cost among all S3 storage classes, but it has the highest retrieval fees and longest retrieval times (12-48 hours).",
    category: "Storage Classes",
    difficulty: "Easy"
  },
  {
    id: 57,
    question: "What is the maximum size of a single S3 object?",
    options: [
      "1 TB",
      "5 TB",
      "10 TB",
      "Unlimited"
    ],
    correctAnswer: 1,
    explanation: "The maximum size of a single S3 object is 5 TB. For objects larger than 100 MB, AWS recommends using multipart upload for better performance and reliability.",
    category: "Storage",
    difficulty: "Easy"
  },
  {
    id: 58,
    question: "What is the maximum number of parts in a multipart upload?",
    options: [
      "1,000 parts",
      "5,000 parts",
      "10,000 parts",
      "Unlimited"
    ],
    correctAnswer: 2,
    explanation: "The maximum number of parts in a multipart upload is 10,000 parts. Each part must be at least 5 MB in size, except for the last part.",
    category: "Performance",
    difficulty: "Hard"
  },
  {
    id: 59,
    question: "Which encryption type is enabled by default for S3?",
    options: [
      "Client-side encryption",
      "Server-side encryption with S3-managed keys (SSE-S3)",
      "Server-side encryption with KMS-managed keys (SSE-KMS)",
      "No encryption by default"
    ],
    correctAnswer: 1,
    explanation: "Server-side encryption with S3-managed keys (SSE-S3) is enabled by default for all new S3 buckets. This provides automatic encryption of data at rest.",
    category: "Security",
    difficulty: "Medium"
  },
  {
    id: 60,
    question: "What is the difference between a bucket policy and an IAM policy?",
    options: [
      "Bucket policies are more secure than IAM policies",
      "Bucket policies are attached to buckets, IAM policies are attached to users/roles",
      "IAM policies are more powerful than bucket policies",
      "There is no difference"
    ],
    correctAnswer: 1,
    explanation: "Bucket policies are attached to S3 buckets and define what actions can be performed on the bucket and its objects. IAM policies are attached to users, groups, or roles and define what AWS services they can access.",
    category: "Security",
    difficulty: "Medium"
  },
  {
    id: 61,
    question: "What is the maximum number of tags you can apply to an S3 object?",
    options: [
      "10 tags",
      "50 tags",
      "100 tags",
      "Unlimited"
    ],
    correctAnswer: 1,
    explanation: "You can apply up to 50 tags to an S3 object. Each tag consists of a key and value, and both are limited to 128 characters.",
    category: "Management",
    difficulty: "Medium"
  },
  {
    id: 62,
    question: "What is the purpose of S3 Transfer Acceleration?",
    options: [
      "To reduce storage costs",
      "To encrypt data in transit",
      "To speed up uploads over long distances",
      "To compress data"
    ],
    correctAnswer: 2,
    explanation: "S3 Transfer Acceleration uses CloudFront edge locations to speed up uploads over long distances. It can provide up to 10x faster uploads for clients far from the S3 bucket's region.",
    category: "Performance",
    difficulty: "Medium"
  },
  {
    id: 63,
    question: "What is the minimum size for each part in a multipart upload?",
    options: [
      "1 MB",
      "5 MB",
      "10 MB",
      "100 MB"
    ],
    correctAnswer: 1,
    explanation: "Each part in a multipart upload must be at least 5 MB in size, except for the last part which can be smaller.",
    category: "Performance",
    difficulty: "Medium"
  },
  {
    id: 64,
    question: "What is the purpose of S3 Select?",
    options: [
      "To select specific objects from a bucket",
      "To retrieve only the data you need from objects",
      "To select storage classes",
      "To select encryption methods"
    ],
    correctAnswer: 1,
    explanation: "S3 Select allows you to retrieve only the data you need from objects, reducing data transfer and processing costs. It supports CSV, JSON, and Parquet formats.",
    category: "Performance",
    difficulty: "Medium"
  },
  {
    id: 65,
    question: "What is the maximum size of an S3 bucket?",
    options: [
      "100 TB",
      "1 PB",
      "Unlimited",
      "Depends on the storage class"
    ],
    correctAnswer: 2,
    explanation: "S3 buckets have unlimited storage capacity. You can store as much data as you want in a single bucket.",
    category: "Storage",
    difficulty: "Easy"
  },
  {
    id: 66,
    question: "What is the purpose of S3 Lifecycle policies?",
    options: [
      "To automatically delete old objects",
      "To automatically transition objects between storage classes",
      "To automatically backup objects",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "S3 Lifecycle policies can automatically transition objects between storage classes, delete old objects, and delete incomplete multipart uploads. This helps optimize costs and manage data lifecycle.",
    category: "Management",
    difficulty: "Medium"
  },
  {
    id: 67,
    question: "What is required to enable cross-region replication?",
    options: [
      "Both buckets must be in the same account",
      "Versioning must be enabled on the source bucket",
      "Both buckets must use the same storage class",
      "Both buckets must be in the same region"
    ],
    correctAnswer: 1,
    explanation: "To enable cross-region replication, versioning must be enabled on the source bucket. The destination bucket can be in a different region and account.",
    category: "Management",
    difficulty: "Medium"
  },
  {
    id: 68,
    question: "What is the purpose of S3 Object Lock?",
    options: [
      "To prevent object deletion",
      "To encrypt objects",
      "To compress objects",
      "To backup objects"
    ],
    correctAnswer: 0,
    explanation: "S3 Object Lock prevents object deletion for a specified period, providing WORM (Write Once Read Many) compliance. It has two modes: Governance and Compliance.",
    category: "Security",
    difficulty: "Hard"
  },
  {
    id: 69,
    question: "What is the difference between Governance and Compliance modes in Object Lock?",
    options: [
      "Governance mode is more secure",
      "Compliance mode cannot be overridden by any user",
      "Governance mode is cheaper",
      "There is no difference"
    ],
    correctAnswer: 1,
    explanation: "In Compliance mode, object retention cannot be overridden by any user, including the root user. In Governance mode, users with special permissions can override the retention settings.",
    category: "Security",
    difficulty: "Hard"
  },
  {
    id: 70,
    question: "What is the purpose of S3 Intelligent Tiering?",
    options: [
      "To automatically optimize storage costs",
      "To automatically encrypt objects",
      "To automatically backup objects",
      "To automatically compress objects"
    ],
    correctAnswer: 0,
    explanation: "S3 Intelligent Tiering automatically moves objects between storage tiers based on access patterns to optimize storage costs. There are no retrieval fees, but there is a monthly monitoring fee.",
    category: "Storage Classes",
    difficulty: "Medium"
  },
  {
    id: 71,
    question: "What is the maximum number of lifecycle rules per bucket?",
    options: [
      "100 rules",
      "1,000 rules",
      "Unlimited",
      "Depends on the bucket size"
    ],
    correctAnswer: 1,
    explanation: "You can have up to 1,000 lifecycle rules per S3 bucket. Each rule can apply to objects with specific prefixes or tags.",
    category: "Management",
    difficulty: "Hard"
  },
  {
    id: 72,
    question: "What is the purpose of S3 Batch Operations?",
    options: [
      "To backup entire buckets",
      "To perform operations on millions of objects",
      "To compress objects",
      "To encrypt objects"
    ],
    correctAnswer: 1,
    explanation: "S3 Batch Operations allows you to perform operations on millions of objects, such as copying objects, invoking Lambda functions, or replacing object tags. It's designed for high-throughput processing.",
    category: "Management",
    difficulty: "Hard"
  },
  {
    id: 73,
    question: "What is the maximum number of objects that can be processed in a single batch operation?",
    options: [
      "1 million objects",
      "10 million objects",
      "100 million objects",
      "Unlimited"
    ],
    correctAnswer: 3,
    explanation: "S3 Batch Operations can process an unlimited number of objects. The operation will continue until all objects in the manifest have been processed.",
    category: "Management",
    difficulty: "Hard"
  },
  {
    id: 74,
    question: "What is the purpose of S3 Glacier Select?",
    options: [
      "To select specific Glacier vaults",
      "To query data stored in Glacier without restoring",
      "To select Glacier storage classes",
      "To backup Glacier data"
    ],
    correctAnswer: 1,
    explanation: "S3 Glacier Select allows you to query data stored in Glacier without restoring the entire object. It supports CSV and JSON formats and can significantly reduce costs for data analysis.",
    category: "Performance",
    difficulty: "Hard"
  },
  {
    id: 75,
    question: "What is the maximum size of an S3 bucket name?",
    options: [
      "63 characters",
      "128 characters",
      "255 characters",
      "Unlimited"
    ],
    correctAnswer: 0,
    explanation: "S3 bucket names must be between 3 and 63 characters long. They must also be globally unique across all AWS accounts.",
    category: "Storage",
    difficulty: "Easy"
  },
  {
    id: 76,
    question: "What characters are allowed in S3 bucket names?",
    options: [
      "Letters, numbers, hyphens, and underscores",
      "Letters, numbers, and hyphens only",
      "Letters and numbers only",
      "Any character"
    ],
    correctAnswer: 1,
    explanation: "S3 bucket names can contain lowercase letters, numbers, and hyphens only. They cannot contain underscores or uppercase letters.",
    category: "Storage",
    difficulty: "Easy"
  },
  {
    id: 77,
    question: "What is the purpose of S3 Access Points?",
    options: [
      "To provide faster access to S3",
      "To create custom endpoints for specific use cases",
      "To reduce costs",
      "To encrypt data"
    ],
    correctAnswer: 1,
    explanation: "S3 Access Points allow you to create custom endpoints for specific use cases, applications, or users. They can have their own access policies and are useful for managing access to shared datasets.",
    category: "Security",
    difficulty: "Hard"
  },
  {
    id: 78,
    question: "What is the maximum number of access points per bucket?",
    options: [
      "100 access points",
      "1,000 access points",
      "10,000 access points",
      "Unlimited"
    ],
    correctAnswer: 1,
    explanation: "You can create up to 1,000 access points per S3 bucket. Each access point can have its own access policy and can be used for different applications or users.",
    category: "Security",
    difficulty: "Hard"
  },
  {
    id: 79,
    question: "What is the purpose of S3 Object Ownership?",
    options: [
      "To track object ownership",
      "To disable ACLs and simplify access management",
      "To reduce costs",
      "To improve performance"
    ],
    correctAnswer: 1,
    explanation: "S3 Object Ownership allows you to disable ACLs and simplify access management by making the bucket owner own all objects. This eliminates the need to manage object-level permissions.",
    category: "Security",
    difficulty: "Medium"
  },
  {
    id: 80,
    question: "What is the maximum number of versions you can keep for an object?",
    options: [
      "100 versions",
      "1,000 versions",
      "10,000 versions",
      "Unlimited"
    ],
    correctAnswer: 3,
    explanation: "S3 can keep an unlimited number of versions for an object when versioning is enabled. However, you can use lifecycle policies to automatically delete old versions to manage costs.",
    category: "Management",
    difficulty: "Medium"
  },
  {
    id: 81,
    question: "What is the purpose of S3 Replication Time Control (RTC)?",
    options: [
      "To control when replication happens",
      "To ensure replication completes within 15 minutes",
      "To reduce replication costs",
      "To improve replication performance"
    ],
    correctAnswer: 1,
    explanation: "S3 Replication Time Control (RTC) ensures that replication completes within 15 minutes for 99.99% of objects. This is useful for applications that require predictable replication times.",
    category: "Management",
    difficulty: "Hard"
  },
  {
    id: 82,
    question: "What is the maximum number of replication rules per bucket?",
    options: [
      "100 rules",
      "1,000 rules",
      "Unlimited",
      "Depends on the bucket size"
    ],
    correctAnswer: 1,
    explanation: "You can have up to 1,000 replication rules per S3 bucket. Each rule can apply to objects with specific prefixes or tags.",
    category: "Management",
    difficulty: "Hard"
  },
  {
    id: 83,
    question: "What is the purpose of S3 Event Notifications?",
    options: [
      "To notify users of bucket changes",
      "To trigger Lambda functions or send messages to SQS/SNS",
      "To backup objects",
      "To encrypt objects"
    ],
    correctAnswer: 1,
    explanation: "S3 Event Notifications can trigger Lambda functions, send messages to SQS queues, or publish to SNS topics when objects are created, updated, or deleted. This enables event-driven architectures.",
    category: "Integration",
    difficulty: "Medium"
  },
  {
    id: 84,
    question: "What is the maximum number of event notifications per bucket?",
    options: [
      "100 notifications",
      "1,000 notifications",
      "Unlimited",
      "Depends on the bucket size"
    ],
    correctAnswer: 1,
    explanation: "You can configure up to 1,000 event notifications per S3 bucket. Each notification can trigger different targets (Lambda, SQS, SNS) for different events.",
    category: "Integration",
    difficulty: "Hard"
  },
  {
    id: 85,
    question: "What is the purpose of S3 Inventory?",
    options: [
      "To track object costs",
      "To generate reports about objects and metadata",
      "To backup objects",
      "To compress objects"
    ],
    correctAnswer: 1,
    explanation: "S3 Inventory generates reports about objects and their metadata, such as size, last modified date, storage class, and encryption status. This is useful for compliance and cost analysis.",
    category: "Management",
    difficulty: "Medium"
  },
  {
    id: 86,
    question: "What is the maximum number of inventory configurations per bucket?",
    options: [
      "100 configurations",
      "1,000 configurations",
      "Unlimited",
      "Depends on the bucket size"
    ],
    correctAnswer: 1,
    explanation: "You can have up to 1,000 inventory configurations per S3 bucket. Each configuration can generate different types of reports with different schedules.",
    category: "Management",
    difficulty: "Hard"
  },
  {
    id: 87,
    question: "What is the purpose of S3 Analytics?",
    options: [
      "To analyze object content",
      "To analyze storage class usage and transition recommendations",
      "To analyze costs",
      "To analyze performance"
    ],
    correctAnswer: 1,
    explanation: "S3 Analytics analyzes storage class usage and provides recommendations for transitioning objects to more cost-effective storage classes. It helps optimize storage costs.",
    category: "Management",
    difficulty: "Medium"
  },
  {
    id: 88,
    question: "What is the purpose of S3 Request Payment?",
    options: [
      "To pay for requests",
      "To require requesters to pay for data transfer",
      "To reduce costs",
      "To improve performance"
    ],
    correctAnswer: 1,
    explanation: "S3 Request Payment allows bucket owners to require requesters to pay for data transfer costs. This is useful when sharing large datasets with other AWS accounts.",
    category: "Billing",
    difficulty: "Hard"
  },
  {
    id: 89,
    question: "What is the purpose of S3 Object Lambda?",
    options: [
      "To run Lambda functions on objects",
      "To modify objects as they are retrieved",
      "To backup objects",
      "To encrypt objects"
    ],
    correctAnswer: 1,
    explanation: "S3 Object Lambda allows you to modify objects as they are retrieved, without modifying the original object. This is useful for data transformation, filtering, and redaction.",
    category: "Integration",
    difficulty: "Hard"
  },
  {
    id: 90,
    question: "What is the maximum size of an object that can be processed by S3 Object Lambda?",
    options: [
      "5 GB",
      "10 GB",
      "50 GB",
      "Unlimited"
    ],
    correctAnswer: 0,
    explanation: "S3 Object Lambda can process objects up to 5 GB in size. For larger objects, you would need to use other approaches like S3 Select or download the object first.",
    category: "Integration",
    difficulty: "Hard"
  },
  {
    id: 91,
    question: "What is the purpose of S3 Multi-Region Access Points?",
    options: [
      "To access S3 from multiple regions",
      "To route requests to the lowest latency region",
      "To reduce costs",
      "To improve security"
    ],
    correctAnswer: 1,
    explanation: "S3 Multi-Region Access Points route requests to the lowest latency region, improving performance for global applications. They automatically route requests based on network conditions.",
    category: "Performance",
    difficulty: "Hard"
  },
  {
    id: 92,
    question: "What is the maximum number of regions supported by Multi-Region Access Points?",
    options: [
      "5 regions",
      "10 regions",
      "20 regions",
      "All AWS regions"
    ],
    correctAnswer: 2,
    explanation: "S3 Multi-Region Access Points support up to 20 AWS regions. This allows you to distribute your data across multiple regions for improved performance and availability.",
    category: "Performance",
    difficulty: "Hard"
  },
  {
    id: 93,
    question: "What is the purpose of S3 Storage Lens?",
    options: [
      "To magnify objects",
      "To provide organization-wide visibility into storage usage",
      "To reduce costs",
      "To improve performance"
    ],
    correctAnswer: 1,
    explanation: "S3 Storage Lens provides organization-wide visibility into storage usage and activity trends. It helps identify cost optimization opportunities and security risks.",
    category: "Management",
    difficulty: "Medium"
  },
  {
    id: 94,
    question: "What is the purpose of S3 Block Public Access?",
    options: [
      "To block all public access",
      "To provide centralized controls to limit public access",
      "To reduce costs",
      "To improve security"
    ],
    correctAnswer: 1,
    explanation: "S3 Block Public Access provides centralized controls to limit public access to S3 buckets and objects. It can be applied at the account or bucket level.",
    category: "Security",
    difficulty: "Medium"
  },
  {
    id: 95,
    question: "What is the purpose of S3 Object Ownership?",
    options: [
      "To track object ownership",
      "To disable ACLs and simplify access management",
      "To reduce costs",
      "To improve performance"
    ],
    correctAnswer: 1,
    explanation: "S3 Object Ownership allows you to disable ACLs and simplify access management by making the bucket owner own all objects. This eliminates the need to manage object-level permissions.",
    category: "Security",
    difficulty: "Medium"
  },
  {
    id: 96,
    question: "What is the purpose of S3 Replication Metrics?",
    options: [
      "To track replication costs",
      "To monitor replication progress and performance",
      "To reduce replication costs",
      "To improve replication performance"
    ],
    correctAnswer: 1,
    explanation: "S3 Replication Metrics provide CloudWatch metrics to monitor replication progress and performance. This helps identify and troubleshoot replication issues.",
    category: "Management",
    difficulty: "Hard"
  },
  {
    id: 97,
    question: "What is the purpose of S3 Object Lock Legal Hold?",
    options: [
      "To prevent object deletion for legal reasons",
      "To encrypt objects",
      "To compress objects",
      "To backup objects"
    ],
    correctAnswer: 0,
    explanation: "S3 Object Lock Legal Hold prevents object deletion for legal reasons, such as litigation or regulatory requirements. It can be applied independently of retention periods.",
    category: "Security",
    difficulty: "Hard"
  },
  {
    id: 98,
    question: "What is the purpose of S3 Replication Configuration?",
    options: [
      "To configure replication settings",
      "To specify source and destination buckets",
      "To define replication rules",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "S3 Replication Configuration allows you to configure replication settings, specify source and destination buckets, and define replication rules. This enables automatic replication of objects.",
    category: "Management",
    difficulty: "Medium"
  },
  {
    id: 99,
    question: "What is the purpose of S3 Bucket Versioning?",
    options: [
      "To track object versions",
      "To protect against accidental deletion",
      "To enable cross-region replication",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "S3 Bucket Versioning tracks object versions, protects against accidental deletion, and is required for cross-region replication. It allows you to recover from both accidental deletion and overwrites.",
    category: "Management",
    difficulty: "Medium"
  },
  {
    id: 100,
    question: "What is the purpose of S3 Transfer Acceleration?",
    options: [
      "To reduce storage costs",
      "To speed up uploads over long distances",
      "To encrypt data in transit",
      "To compress data"
    ],
    correctAnswer: 1,
    explanation: "S3 Transfer Acceleration uses CloudFront edge locations to speed up uploads over long distances. It can provide up to 10x faster uploads for clients far from the S3 bucket's region.",
    category: "Performance",
    difficulty: "Medium"
  }
]

const vpcQuestions = [
  {
    id: 101,
    question: "What is the maximum number of VPCs you can create per region by default?",
    options: [
      "3 VPCs",
      "5 VPCs",
      "10 VPCs",
      "Unlimited"
    ],
    correctAnswer: 1,
    explanation: "By default, you can create up to 5 VPCs per region. This is a soft limit that can be increased by contacting AWS support.",
    category: "Networking",
    difficulty: "Easy"
  },
  {
    id: 102,
    question: "What is the maximum number of subnets you can create per VPC?",
    options: [
      "100 subnets",
      "200 subnets",
      "500 subnets",
      "Unlimited"
    ],
    correctAnswer: 1,
    explanation: "You can create up to 200 subnets per VPC. This includes both public and private subnets across all Availability Zones in the region.",
    category: "Networking",
    difficulty: "Easy"
  },
  {
    id: 103,
    question: "What is the maximum number of security groups you can create per VPC?",
    options: [
      "100 security groups",
      "250 security groups",
      "500 security groups",
      "1000 security groups"
    ],
    correctAnswer: 2,
    explanation: "You can create up to 500 security groups per VPC. Each security group can have up to 60 rules (inbound + outbound combined).",
    category: "Security",
    difficulty: "Easy"
  },
  {
    id: 104,
    question: "What is the maximum number of rules you can have per security group?",
    options: [
      "30 rules (15 inbound + 15 outbound)",
      "60 rules (30 inbound + 30 outbound)",
      "100 rules (50 inbound + 50 outbound)",
      "Unlimited"
    ],
    correctAnswer: 1,
    explanation: "Each security group can have up to 60 rules total, with a maximum of 30 inbound and 30 outbound rules combined.",
    category: "Security",
    difficulty: "Medium"
  },
  {
    id: 105,
    question: "What is the maximum number of network ACLs you can create per VPC?",
    options: [
      "100 NACLs",
      "200 NACLs",
      "500 NACLs",
      "Unlimited"
    ],
    correctAnswer: 1,
    explanation: "You can create up to 200 network ACLs per VPC. Each subnet can be associated with only one NACL at a time.",
    category: "Security",
    difficulty: "Medium"
  },
  {
    id: 106,
    question: "What is the maximum number of rules you can have per network ACL?",
    options: [
      "10 rules (5 inbound + 5 outbound)",
      "20 rules (10 inbound + 10 outbound)",
      "50 rules (25 inbound + 25 outbound)",
      "100 rules (50 inbound + 50 outbound)"
    ],
    correctAnswer: 1,
    explanation: "Each network ACL can have up to 20 rules total, with a maximum of 10 inbound and 10 outbound rules. Rules are numbered from 1 to 32766.",
    category: "Security",
    difficulty: "Medium"
  },
  {
    id: 107,
    question: "What is the difference between a security group and a network ACL?",
    options: [
      "Security groups are stateless, NACLs are stateful",
      "Security groups are stateful, NACLs are stateless",
      "Security groups work at subnet level, NACLs work at instance level",
      "There is no difference"
    ],
    correctAnswer: 1,
    explanation: "Security groups are stateful (return traffic is automatically allowed), while network ACLs are stateless (return traffic must be explicitly allowed).",
    category: "Security",
    difficulty: "Medium"
  },
  {
    id: 108,
    question: "What is the default behavior of a security group for inbound traffic?",
    options: [
      "Allow all traffic",
      "Deny all traffic",
      "Allow only HTTP and HTTPS",
      "Allow only SSH"
    ],
    correctAnswer: 1,
    explanation: "By default, security groups deny all inbound traffic. You must explicitly add rules to allow specific traffic.",
    category: "Security",
    difficulty: "Easy"
  },
  {
    id: 109,
    question: "What is the default behavior of a security group for outbound traffic?",
    options: [
      "Allow all traffic",
      "Deny all traffic",
      "Allow only HTTP and HTTPS",
      "Allow only SSH"
    ],
    correctAnswer: 0,
    explanation: "By default, security groups allow all outbound traffic. You can restrict this by adding specific outbound rules.",
    category: "Security",
    difficulty: "Easy"
  },
  {
    id: 110,
    question: "What is the default behavior of a network ACL for inbound traffic?",
    options: [
      "Allow all traffic",
      "Deny all traffic",
      "Allow only HTTP and HTTPS",
      "Allow only SSH"
    ],
    correctAnswer: 0,
    explanation: "By default, network ACLs allow all inbound traffic. You can restrict this by adding specific deny rules.",
    category: "Security",
    difficulty: "Easy"
  },
  {
    id: 111,
    question: "What is the default behavior of a network ACL for outbound traffic?",
    options: [
      "Allow all traffic",
      "Deny all traffic",
      "Allow only HTTP and HTTPS",
      "Allow only SSH"
    ],
    correctAnswer: 0,
    explanation: "By default, network ACLs allow all outbound traffic. You can restrict this by adding specific deny rules.",
    category: "Security",
    difficulty: "Easy"
  },
  {
    id: 112,
    question: "How many route tables can be associated with a subnet?",
    options: [
      "One route table",
      "Two route tables",
      "Up to five route tables",
      "Unlimited"
    ],
    correctAnswer: 0,
    explanation: "Each subnet can be associated with only one route table at a time. However, multiple subnets can share the same route table.",
    category: "Networking",
    difficulty: "Medium"
  },
  {
    id: 113,
    question: "What is the maximum number of route tables you can create per VPC?",
    options: [
      "100 route tables",
      "200 route tables",
      "500 route tables",
      "Unlimited"
    ],
    correctAnswer: 1,
    explanation: "You can create up to 200 route tables per VPC. This includes the default route table that is created automatically.",
    category: "Networking",
    difficulty: "Medium"
  },
  {
    id: 114,
    question: "What is the purpose of an Internet Gateway?",
    options: [
      "To provide internet access to instances in private subnets",
      "To provide internet access to instances in public subnets",
      "To encrypt traffic between VPCs",
      "To connect on-premises networks to VPC"
    ],
    correctAnswer: 1,
    explanation: "An Internet Gateway provides internet access to instances in public subnets. It allows instances with public IPs to communicate with the internet.",
    category: "Networking",
    difficulty: "Medium"
  },
  {
    id: 115,
    question: "How many Internet Gateways can be attached to a VPC?",
    options: [
      "One Internet Gateway",
      "Two Internet Gateways",
      "Up to five Internet Gateways",
      "Unlimited"
    ],
    correctAnswer: 0,
    explanation: "You can attach only one Internet Gateway to a VPC. However, one Internet Gateway can be shared across multiple VPCs in the same region.",
    category: "Networking",
    difficulty: "Medium"
  },
  {
    id: 116,
    question: "What is the purpose of a NAT Gateway?",
    options: [
      "To provide internet access to instances in public subnets",
      "To provide internet access to instances in private subnets",
      "To encrypt traffic between VPCs",
      "To connect on-premises networks to VPC"
    ],
    correctAnswer: 1,
    explanation: "A NAT Gateway allows instances in private subnets to connect to the internet or other AWS services while remaining private.",
    category: "Networking",
    difficulty: "Medium"
  },
  {
    id: 117,
    question: "What is the difference between a NAT Gateway and a NAT Instance?",
    options: [
      "NAT Gateway is managed, NAT Instance is not",
      "NAT Gateway is stateless, NAT Instance is stateful",
      "NAT Gateway is more expensive, NAT Instance is cheaper",
      "There is no difference"
    ],
    correctAnswer: 0,
    explanation: "NAT Gateway is a fully managed service by AWS, while NAT Instance requires you to manage the underlying EC2 instance yourself.",
    category: "Networking",
    difficulty: "Medium"
  },
  {
    id: 118,
    question: "What is the bandwidth limit for a NAT Gateway?",
    options: [
      "1 Gbps",
      "5 Gbps",
      "10 Gbps",
      "45 Gbps"
    ],
    correctAnswer: 3,
    explanation: "A NAT Gateway can support up to 45 Gbps of bandwidth. If you need more bandwidth, you can create multiple NAT Gateways in different Availability Zones.",
    category: "Networking",
    difficulty: "Hard"
  },
  {
    id: 119,
    question: "What is the purpose of VPC Peering?",
    options: [
      "To connect VPCs to the internet",
      "To connect VPCs to on-premises networks",
      "To connect VPCs to each other using private IP addresses",
      "To encrypt traffic between VPCs"
    ],
    correctAnswer: 2,
    explanation: "VPC Peering allows you to connect VPCs to each other using private IP addresses, enabling instances in different VPCs to communicate as if they were in the same network.",
    category: "Networking",
    difficulty: "Medium"
  },
  {
    id: 120,
    question: "What is a requirement for VPC Peering?",
    options: [
      "Both VPCs must be in the same account",
      "Both VPCs must be in the same region",
      "Both VPCs must have non-overlapping CIDR blocks",
      "Both VPCs must have the same CIDR block"
    ],
    correctAnswer: 2,
    explanation: "VPC Peering requires that the VPCs have non-overlapping CIDR blocks. This prevents IP address conflicts between the VPCs.",
    category: "Networking",
    difficulty: "Medium"
  },
  {
    id: 121,
    question: "What is the purpose of a Virtual Private Gateway?",
    options: [
      "To connect VPCs to the internet",
      "To connect VPCs to each other",
      "To connect VPCs to on-premises networks via VPN",
      "To encrypt traffic between VPCs"
    ],
    correctAnswer: 2,
    explanation: "A Virtual Private Gateway is the VPN concentrator on the AWS side of a VPN connection. It enables you to connect your VPC to your on-premises network.",
    category: "Networking",
    difficulty: "Medium"
  },
  {
    id: 122,
    question: "What is the bandwidth limit for a VPN connection?",
    options: [
      "1.25 Gbps",
      "2.5 Gbps",
      "5 Gbps",
      "10 Gbps"
    ],
    correctAnswer: 0,
    explanation: "A VPN connection has a bandwidth limit of 1.25 Gbps. For higher bandwidth requirements, consider using AWS Direct Connect.",
    category: "Networking",
    difficulty: "Medium"
  },
  {
    id: 123,
    question: "What is AWS Direct Connect?",
    options: [
      "A VPN service for connecting to AWS",
      "A dedicated network connection from your premises to AWS",
      "A service for connecting VPCs to each other",
      "A service for encrypting traffic"
    ],
    correctAnswer: 1,
    explanation: "AWS Direct Connect is a cloud service solution that makes it easy to establish a dedicated network connection from your premises to AWS.",
    category: "Networking",
    difficulty: "Medium"
  },
  {
    id: 124,
    question: "What is the maximum bandwidth for AWS Direct Connect?",
    options: [
      "1 Gbps",
      "10 Gbps",
      "100 Gbps",
      "Unlimited"
    ],
    correctAnswer: 2,
    explanation: "AWS Direct Connect supports connections from 50 Mbps to 100 Gbps. You can also aggregate multiple connections for higher bandwidth.",
    category: "Networking",
    difficulty: "Hard"
  },
  {
    id: 125,
    question: "What is the purpose of VPC Flow Logs?",
    options: [
      "To monitor network traffic in your VPC",
      "To encrypt traffic in your VPC",
      "To connect VPCs to each other",
      "To provide internet access to VPC"
    ],
    correctAnswer: 0,
    explanation: "VPC Flow Logs capture information about the IP traffic going to and from network interfaces in your VPC, helping you troubleshoot connectivity issues and monitor network traffic.",
    category: "Networking",
    difficulty: "Medium"
  },
  {
    id: 126,
    question: "What are the destinations for VPC Flow Logs?",
    options: [
      "CloudWatch Logs only",
      "S3 only",
      "CloudWatch Logs, S3, or Kinesis Data Firehose",
      "EC2 instances only"
    ],
    correctAnswer: 2,
    explanation: "VPC Flow Logs can be published to CloudWatch Logs, S3, or Kinesis Data Firehose, depending on your monitoring and analysis needs.",
    category: "Networking",
    difficulty: "Medium"
  },
  {
    id: 127,
    question: "What is the purpose of a Transit Gateway?",
    options: [
      "To connect VPCs to the internet",
      "To connect VPCs to on-premises networks",
      "To act as a network transit hub for connecting VPCs and on-premises networks",
      "To encrypt traffic between VPCs"
    ],
    correctAnswer: 2,
    explanation: "A Transit Gateway acts as a network transit hub, enabling you to connect VPCs and on-premises networks through a single gateway.",
    category: "Networking",
    difficulty: "Hard"
  },
  {
    id: 128,
    question: "What is the maximum number of VPCs that can be attached to a Transit Gateway?",
    options: [
      "100 VPCs",
      "500 VPCs",
      "1000 VPCs",
      "5000 VPCs"
    ],
    correctAnswer: 3,
    explanation: "A Transit Gateway can have up to 5,000 VPC attachments. This makes it suitable for large-scale network architectures.",
    category: "Networking",
    difficulty: "Hard"
  },
  {
    id: 129,
    question: "What is the purpose of a Customer Gateway?",
    options: [
      "To connect VPCs to the internet",
      "To connect VPCs to each other",
      "To represent your on-premises network in a VPN connection",
      "To encrypt traffic between VPCs"
    ],
    correctAnswer: 2,
    explanation: "A Customer Gateway represents your on-premises network in a VPN connection. It provides information about your on-premises network to AWS.",
    category: "Networking",
    difficulty: "Medium"
  },
  {
    id: 130,
    question: "What is the purpose of a VPN Connection?",
    options: [
      "To connect VPCs to the internet",
      "To connect VPCs to each other",
      "To connect VPCs to on-premises networks over the internet",
      "To encrypt traffic between VPCs"
    ],
    correctAnswer: 2,
    explanation: "A VPN Connection enables you to connect your VPC to your on-premises network over the internet using an encrypted tunnel.",
    category: "Networking",
    difficulty: "Medium"
  },
  {
    id: 131,
    question: "What is the purpose of a Route Table?",
    options: [
      "To encrypt traffic in your VPC",
      "To define how traffic is routed within your VPC",
      "To connect VPCs to the internet",
      "To connect VPCs to each other"
    ],
    correctAnswer: 1,
    explanation: "A Route Table contains a set of rules (routes) that determine where network traffic is directed within your VPC.",
    category: "Networking",
    difficulty: "Easy"
  },
  {
    id: 132,
    question: "What is the local route in a route table?",
    options: [
      "A route to the internet",
      "A route to your on-premises network",
      "A route within the VPC (VPC CIDR block)",
      "A route to another VPC"
    ],
    correctAnswer: 2,
    explanation: "The local route is always present in a route table and allows traffic within the VPC using the VPC's CIDR block.",
    category: "Networking",
    difficulty: "Medium"
  },
  {
    id: 133,
    question: "What is the purpose of a Subnet?",
    options: [
      "To encrypt traffic in your VPC",
      "To divide your VPC's IP address range into smaller networks",
      "To connect VPCs to the internet",
      "To connect VPCs to each other"
    ],
    correctAnswer: 1,
    explanation: "A Subnet is a subdivision of your VPC's IP address range where you can place groups of isolated resources.",
    category: "Networking",
    difficulty: "Easy"
  },
  {
    id: 134,
    question: "What is the difference between a public and private subnet?",
    options: [
      "Public subnets have internet access, private subnets do not",
      "Public subnets are more secure than private subnets",
      "Public subnets are cheaper than private subnets",
      "There is no difference"
    ],
    correctAnswer: 0,
    explanation: "Public subnets have a route to an Internet Gateway, allowing instances to access the internet. Private subnets do not have direct internet access.",
    category: "Networking",
    difficulty: "Easy"
  },
  {
    id: 135,
    question: "What is the purpose of a Network ACL?",
    options: [
      "To encrypt traffic in your VPC",
      "To provide an optional layer of security at the subnet level",
      "To connect VPCs to the internet",
      "To connect VPCs to each other"
    ],
    correctAnswer: 1,
    explanation: "A Network ACL provides an optional layer of security at the subnet level. It acts as a stateless firewall for controlling traffic in and out of subnets.",
    category: "Security",
    difficulty: "Medium"
  },
  {
    id: 136,
    question: "What is the evaluation order for Network ACL rules?",
    options: [
      "Rules are evaluated in alphabetical order",
      "Rules are evaluated in numerical order (lowest to highest)",
      "Rules are evaluated in random order",
      "All rules are evaluated simultaneously"
    ],
    correctAnswer: 1,
    explanation: "Network ACL rules are evaluated in numerical order from lowest to highest. The first rule that matches is applied.",
    category: "Security",
    difficulty: "Medium"
  },
  {
    id: 137,
    question: "What is the purpose of a Security Group?",
    options: [
      "To encrypt traffic in your VPC",
      "To act as a virtual firewall for your instances",
      "To connect VPCs to the internet",
      "To connect VPCs to each other"
    ],
    correctAnswer: 1,
    explanation: "A Security Group acts as a virtual firewall for your instances, controlling inbound and outbound traffic at the instance level.",
    category: "Security",
    difficulty: "Easy"
  },
  {
    id: 138,
    question: "How many security groups can be attached to a network interface?",
    options: [
      "One security group",
      "Up to five security groups",
      "Up to ten security groups",
      "Unlimited"
    ],
    correctAnswer: 1,
    explanation: "You can attach up to five security groups to a network interface. The rules from all attached security groups are evaluated.",
    category: "Security",
    difficulty: "Medium"
  },
  {
    id: 139,
    question: "What is the purpose of a VPC Endpoint?",
    options: [
      "To connect VPCs to the internet",
      "To connect VPCs to each other",
      "To privately connect your VPC to supported AWS services",
      "To encrypt traffic between VPCs"
    ],
    correctAnswer: 2,
    explanation: "A VPC Endpoint enables you to privately connect your VPC to supported AWS services without requiring an internet gateway, NAT device, VPN connection, or AWS Direct Connect connection.",
    category: "Networking",
    difficulty: "Hard"
  },
  {
    id: 140,
    question: "What are the types of VPC Endpoints?",
    options: [
      "Gateway endpoints and Interface endpoints",
      "Public endpoints and Private endpoints",
      "HTTP endpoints and HTTPS endpoints",
      "There is only one type"
    ],
    correctAnswer: 0,
    explanation: "There are two types of VPC Endpoints: Gateway endpoints (for S3 and DynamoDB) and Interface endpoints (for other AWS services).",
    category: "Networking",
    difficulty: "Hard"
  },
  {
    id: 141,
    question: "What is the purpose of a Gateway Endpoint?",
    options: [
      "To connect VPCs to the internet",
      "To connect VPCs to each other",
      "To connect VPCs to S3 and DynamoDB",
      "To encrypt traffic between VPCs"
    ],
    correctAnswer: 2,
    explanation: "A Gateway Endpoint is a gateway that you specify as a target for a route in your route table for traffic destined to S3 or DynamoDB.",
    category: "Networking",
    difficulty: "Hard"
  },
  {
    id: 142,
    question: "What is the purpose of an Interface Endpoint?",
    options: [
      "To connect VPCs to the internet",
      "To connect VPCs to each other",
      "To connect VPCs to AWS services other than S3 and DynamoDB",
      "To encrypt traffic between VPCs"
    ],
    correctAnswer: 2,
    explanation: "An Interface Endpoint is an elastic network interface with a private IP address that serves as an entry point for traffic destined to AWS services other than S3 and DynamoDB.",
    category: "Networking",
    difficulty: "Hard"
  },
  {
    id: 143,
    question: "What is the purpose of VPC Peering across regions?",
    options: [
      "To connect VPCs in different regions",
      "To connect VPCs to the internet",
      "To encrypt traffic between VPCs",
      "To connect VPCs to on-premises networks"
    ],
    correctAnswer: 0,
    explanation: "VPC Peering across regions allows you to connect VPCs in different AWS regions, enabling instances to communicate using private IP addresses across regions.",
    category: "Networking",
    difficulty: "Hard"
  },
  {
    id: 144,
    question: "What is the purpose of a NAT Instance?",
    options: [
      "To provide internet access to instances in public subnets",
      "To provide internet access to instances in private subnets",
      "To encrypt traffic between VPCs",
      "To connect on-premises networks to VPC"
    ],
    correctAnswer: 1,
    explanation: "A NAT Instance is an EC2 instance that allows instances in private subnets to connect to the internet or other AWS services while remaining private.",
    category: "Networking",
    difficulty: "Medium"
  },
  {
    id: 145,
    question: "What is the difference between a NAT Gateway and a NAT Instance?",
    options: [
      "NAT Gateway is more expensive than NAT Instance",
      "NAT Gateway requires more management than NAT Instance",
      "NAT Gateway is managed by AWS, NAT Instance requires manual management",
      "There is no difference"
    ],
    correctAnswer: 2,
    explanation: "NAT Gateway is a fully managed service by AWS, while NAT Instance requires you to manage the underlying EC2 instance, including patching and monitoring.",
    category: "Networking",
    difficulty: "Medium"
  },
  {
    id: 146,
    question: "What is the purpose of a VPC CIDR block?",
    options: [
      "To encrypt traffic in your VPC",
      "To define the IP address range for your VPC",
      "To connect VPCs to the internet",
      "To connect VPCs to each other"
    ],
    correctAnswer: 1,
    explanation: "A VPC CIDR block defines the IP address range for your VPC. All subnets within the VPC must be within this range.",
    category: "Networking",
    difficulty: "Easy"
  },
  {
    id: 147,
    question: "What is the maximum size of a VPC CIDR block?",
    options: [
      "/16 (65,536 IP addresses)",
      "/8 (16,777,216 IP addresses)",
      "/24 (256 IP addresses)",
      "/32 (1 IP address)"
    ],
    correctAnswer: 0,
    explanation: "The maximum size of a VPC CIDR block is /16, which provides 65,536 IP addresses. The minimum size is /28, which provides 16 IP addresses.",
    category: "Networking",
    difficulty: "Medium"
  },
  {
    id: 148,
    question: "What is the minimum size of a VPC CIDR block?",
    options: [
      "/16 (65,536 IP addresses)",
      "/28 (16 IP addresses)",
      "/24 (256 IP addresses)",
      "/32 (1 IP address)"
    ],
    correctAnswer: 1,
    explanation: "The minimum size of a VPC CIDR block is /28, which provides 16 IP addresses. The maximum size is /16, which provides 65,536 IP addresses.",
    category: "Networking",
    difficulty: "Medium"
  },
  {
    id: 149,
    question: "What is the purpose of a Subnet CIDR block?",
    options: [
      "To encrypt traffic in your subnet",
      "To define the IP address range for your subnet",
      "To connect subnets to the internet",
      "To connect subnets to each other"
    ],
    correctAnswer: 1,
    explanation: "A Subnet CIDR block defines the IP address range for your subnet. It must be within the VPC's CIDR block.",
    category: "Networking",
    difficulty: "Easy"
  },
  {
    id: 150,
    question: "What is the purpose of a Route Table Association?",
    options: [
      "To encrypt traffic in your VPC",
      "To associate a route table with a subnet",
      "To connect VPCs to the internet",
      "To connect VPCs to each other"
    ],
    correctAnswer: 1,
    explanation: "A Route Table Association links a route table to a subnet, determining how traffic is routed for that subnet.",
    category: "Networking",
    difficulty: "Medium"
  }
]

const rdsQuestions = [
  {
    id: 151,
    question: "What is the maximum number of DB instances you can have per region?",
    options: [
      "20 instances",
      "40 instances",
      "100 instances",
      "Unlimited"
    ],
    correctAnswer: 1,
    explanation: "By default, you can have up to 40 DB instances per region. This is a soft limit that can be increased by contacting AWS support.",
    category: "Database",
    difficulty: "Easy"
  },
  {
    id: 152,
    question: "What is the maximum number of read replicas you can have per source DB instance?",
    options: [
      "3 read replicas",
      "5 read replicas",
      "10 read replicas",
      "Unlimited"
    ],
    correctAnswer: 1,
    explanation: "You can have up to 5 read replicas per source DB instance. This limit applies to each supported database engine.",
    category: "Database",
    difficulty: "Easy"
  },
  {
    id: 153,
    question: "What is the maximum storage size for an RDS instance?",
    options: [
      "16 TB",
      "32 TB",
      "64 TB",
      "128 TB"
    ],
    correctAnswer: 2,
    explanation: "The maximum storage size for an RDS instance is 64 TB. This applies to all supported database engines.",
    category: "Storage",
    difficulty: "Easy"
  },
  {
    id: 154,
    question: "What is the difference between Multi-AZ and Read Replicas?",
    options: [
      "Multi-AZ is for read scaling, Read Replicas are for high availability",
      "Multi-AZ is for high availability, Read Replicas are for read scaling",
      "Multi-AZ is cheaper, Read Replicas are more expensive",
      "There is no difference"
    ],
    correctAnswer: 1,
    explanation: "Multi-AZ provides high availability through synchronous replication and automatic failover. Read Replicas provide read scaling through asynchronous replication.",
    category: "Database",
    difficulty: "Medium"
  },
  {
    id: 155,
    question: "What is the backup retention period for automated backups?",
    options: [
      "1-7 days",
      "1-35 days",
      "1-365 days",
      "Unlimited"
    ],
    correctAnswer: 1,
    explanation: "Automated backups can be retained for 1 to 35 days. The default retention period is 7 days.",
    category: "Backup",
    difficulty: "Easy"
  },
  {
    id: 156,
    question: "What is the difference between automated backups and manual snapshots?",
    options: [
      "Automated backups are manual, manual snapshots are automatic",
      "Automated backups are managed by AWS, manual snapshots are created by you",
      "Automated backups are more expensive, manual snapshots are free",
      "There is no difference"
    ],
    correctAnswer: 1,
    explanation: "Automated backups are managed by AWS and are deleted when the DB instance is deleted. Manual snapshots are created by you and persist until you delete them.",
    category: "Backup",
    difficulty: "Medium"
  },
  {
    id: 157,
    question: "What database engines support IAM Database Authentication?",
    options: [
      "MySQL and PostgreSQL only",
      "MySQL, PostgreSQL, and MariaDB",
      "All database engines",
      "Oracle and SQL Server only"
    ],
    correctAnswer: 1,
    explanation: "IAM Database Authentication is supported for MySQL 5.7+, PostgreSQL 9.4+, and MariaDB 10.2+. It is not supported for Oracle or SQL Server.",
    category: "Security",
    difficulty: "Medium"
  },
  {
    id: 158,
    question: "What is the purpose of a Parameter Group?",
    options: [
      "To group multiple DB instances together",
      "To control database engine configuration parameters",
      "To manage backup schedules",
      "To control network access"
    ],
    correctAnswer: 1,
    explanation: "Parameter Groups allow you to control database engine configuration parameters for security, performance, and compatibility settings.",
    category: "Database",
    difficulty: "Medium"
  },
  {
    id: 159,
    question: "What is the purpose of a Subnet Group?",
    options: [
      "To group multiple subnets together",
      "To specify which subnets can be used for RDS instances",
      "To control network access",
      "To manage backup storage"
    ],
    correctAnswer: 1,
    explanation: "A Subnet Group specifies which VPC subnets can be used for RDS instances. It must include subnets in at least two Availability Zones.",
    category: "Networking",
    difficulty: "Medium"
  },
  {
    id: 160,
    question: "What is the purpose of Performance Insights?",
    options: [
      "To monitor database performance in real-time",
      "To backup database automatically",
      "To encrypt database data",
      "To scale database storage"
    ],
    correctAnswer: 0,
    explanation: "Performance Insights monitors database load and helps identify performance bottlenecks by analyzing SQL queries and wait states in real-time.",
    category: "Performance",
    difficulty: "Medium"
  },
  {
    id: 161,
    question: "What is the maximum number of connections for a DB instance?",
    options: [
      "Depends on the instance class",
      "Always 1000 connections",
      "Always 5000 connections",
      "Unlimited"
    ],
    correctAnswer: 0,
    explanation: "The maximum number of connections depends on the DB instance class. Larger instance classes support more concurrent connections.",
    category: "Database",
    difficulty: "Medium"
  },
  {
    id: 162,
    question: "What is the purpose of a Security Group in RDS?",
    options: [
      "To encrypt database data",
      "To control network access to the DB instance",
      "To manage database users",
      "To backup database data"
    ],
    correctAnswer: 1,
    explanation: "Security Groups control network access to RDS instances by allowing or denying traffic based on IP addresses, ports, and protocols.",
    category: "Security",
    difficulty: "Easy"
  },
  {
    id: 163,
    question: "What is the purpose of encryption at rest in RDS?",
    options: [
      "To encrypt data while it's being transmitted",
      "To encrypt data stored on disk",
      "To encrypt database passwords",
      "To encrypt backup files only"
    ],
    correctAnswer: 1,
    explanation: "Encryption at rest encrypts data stored on disk, including the database, logs, backups, and snapshots. It uses AWS KMS for key management.",
    category: "Security",
    difficulty: "Medium"
  },
  {
    id: 164,
    question: "What is the purpose of encryption in transit in RDS?",
    options: [
      "To encrypt data stored on disk",
      "To encrypt data while it's being transmitted",
      "To encrypt database passwords",
      "To encrypt backup files"
    ],
    correctAnswer: 1,
    explanation: "Encryption in transit encrypts data while it's being transmitted between the client and the database using SSL/TLS connections.",
    category: "Security",
    difficulty: "Medium"
  },
  {
    id: 165,
    question: "What is the purpose of a Maintenance Window?",
    options: [
      "To backup the database",
      "To apply patches and updates",
      "To scale the database",
      "To encrypt the database"
    ],
    correctAnswer: 1,
    explanation: "A Maintenance Window is a weekly time period during which AWS can apply patches and updates to your DB instance.",
    category: "Database",
    difficulty: "Easy"
  },
  {
    id: 166,
    question: "What is the purpose of a Backup Window?",
    options: [
      "To apply patches and updates",
      "To backup the database",
      "To scale the database",
      "To encrypt the database"
    ],
    correctAnswer: 1,
    explanation: "A Backup Window is a daily time period during which automated backups are taken. It should be set during low-traffic periods.",
    category: "Backup",
    difficulty: "Easy"
  },
  {
    id: 167,
    question: "What is the purpose of a Read Replica?",
    options: [
      "To provide high availability",
      "To offload read traffic from the primary instance",
      "To backup the database",
      "To encrypt the database"
    ],
    correctAnswer: 1,
    explanation: "Read Replicas offload read traffic from the primary instance using asynchronous replication. They improve read performance and scalability.",
    category: "Database",
    difficulty: "Medium"
  },
  {
    id: 168,
    question: "What is the purpose of Multi-AZ deployment?",
    options: [
      "To offload read traffic",
      "To provide high availability and automatic failover",
      "To backup the database",
      "To encrypt the database"
    ],
    correctAnswer: 1,
    explanation: "Multi-AZ deployment provides high availability by maintaining a standby instance in a different Availability Zone with automatic failover capability.",
    category: "Database",
    difficulty: "Medium"
  },
  {
    id: 169,
    question: "What is the availability SLA for Multi-AZ RDS?",
    options: [
      "99.5%",
      "99.9%",
      "99.95%",
      "99.99%"
    ],
    correctAnswer: 2,
    explanation: "Multi-AZ RDS provides a 99.95% availability SLA. This means the service is designed to be available 99.95% of the time.",
    category: "Database",
    difficulty: "Medium"
  },
  {
    id: 170,
    question: "What is the purpose of Point-in-Time Recovery?",
    options: [
      "To restore to any point in time within the backup retention period",
      "To backup the database",
      "To scale the database",
      "To encrypt the database"
    ],
    correctAnswer: 0,
    explanation: "Point-in-Time Recovery allows you to restore your database to any point in time within the backup retention period, down to the second.",
    category: "Backup",
    difficulty: "Medium"
  },
  {
    id: 171,
    question: "What is the purpose of a DB Snapshot?",
    options: [
      "To backup the database manually",
      "To scale the database",
      "To encrypt the database",
      "To monitor the database"
    ],
    correctAnswer: 0,
    explanation: "DB Snapshots are manual backups that you create. They persist until you delete them and can be used to restore or copy your database.",
    category: "Backup",
    difficulty: "Easy"
  },
  {
    id: 172,
    question: "What is the purpose of a DB Instance Class?",
    options: [
      "To group multiple databases together",
      "To define the compute and memory capacity",
      "To control network access",
      "To manage backup storage"
    ],
    correctAnswer: 1,
    explanation: "DB Instance Classes define the compute and memory capacity of your RDS instance. Different classes are optimized for different workloads.",
    category: "Database",
    difficulty: "Easy"
  },
  {
    id: 173,
    question: "What is the purpose of Storage Auto Scaling?",
    options: [
      "To automatically scale compute resources",
      "To automatically scale storage capacity",
      "To automatically backup the database",
      "To automatically encrypt the database"
    ],
    correctAnswer: 1,
    explanation: "Storage Auto Scaling automatically increases storage capacity when needed, up to the maximum storage limit, without manual intervention.",
    category: "Storage",
    difficulty: "Medium"
  },
  {
    id: 174,
    question: "What is the purpose of a VPC in RDS?",
    options: [
      "To encrypt the database",
      "To provide network isolation and security",
      "To backup the database",
      "To scale the database"
    ],
    correctAnswer: 1,
    explanation: "RDS instances run in VPCs to provide network isolation and security. VPCs allow you to control network access and security groups.",
    category: "Networking",
    difficulty: "Medium"
  },
  {
    id: 175,
    question: "What is the purpose of a DB Subnet Group?",
    options: [
      "To group multiple databases together",
      "To specify which subnets can be used for RDS instances",
      "To control network access",
      "To manage backup storage"
    ],
    correctAnswer: 1,
    explanation: "A DB Subnet Group specifies which VPC subnets can be used for RDS instances. It must include subnets in at least two Availability Zones for Multi-AZ deployment.",
    category: "Networking",
    difficulty: "Medium"
  },
  {
    id: 176,
    question: "What is the purpose of a DB Parameter Group?",
    options: [
      "To group multiple databases together",
      "To control database engine configuration parameters",
      "To control network access",
      "To manage backup storage"
    ],
    correctAnswer: 1,
    explanation: "DB Parameter Groups allow you to control database engine configuration parameters for security, performance, and compatibility settings.",
    category: "Database",
    difficulty: "Medium"
  },
  {
    id: 177,
    question: "What is the purpose of a DB Option Group?",
    options: [
      "To group multiple databases together",
      "To configure database engine-specific options",
      "To control network access",
      "To manage backup storage"
    ],
    correctAnswer: 1,
    explanation: "DB Option Groups allow you to configure database engine-specific options, such as Oracle Enterprise Manager or SQL Server Native Web Services.",
    category: "Database",
    difficulty: "Hard"
  },
  {
    id: 178,
    question: "What is the purpose of a DB Cluster?",
    options: [
      "To group multiple databases together",
      "To provide high availability for Aurora databases",
      "To control network access",
      "To manage backup storage"
    ],
    correctAnswer: 1,
    explanation: "DB Clusters are used with Aurora databases to provide high availability and scalability. They consist of a primary instance and read replicas.",
    category: "Database",
    difficulty: "Hard"
  },
  {
    id: 179,
    question: "What is the purpose of a DB Cluster Parameter Group?",
    options: [
      "To group multiple databases together",
      "To control cluster-level configuration parameters",
      "To control network access",
      "To manage backup storage"
    ],
    correctAnswer: 1,
    explanation: "DB Cluster Parameter Groups control cluster-level configuration parameters for Aurora databases, affecting all instances in the cluster.",
    category: "Database",
    difficulty: "Hard"
  },
  {
    id: 180,
    question: "What is the purpose of a DB Cluster Snapshot?",
    options: [
      "To backup individual database instances",
      "To backup the entire cluster",
      "To control network access",
      "To manage backup storage"
    ],
    correctAnswer: 1,
    explanation: "DB Cluster Snapshots backup the entire Aurora cluster, including all instances and data. They are used for disaster recovery and migration.",
    category: "Backup",
    difficulty: "Hard"
  },
  {
    id: 181,
    question: "What is the purpose of a DB Instance Snapshot?",
    options: [
      "To backup the entire cluster",
      "To backup individual database instances",
      "To control network access",
      "To manage backup storage"
    ],
    correctAnswer: 1,
    explanation: "DB Instance Snapshots backup individual database instances. They can be used to restore or copy individual instances.",
    category: "Backup",
    difficulty: "Medium"
  },
  {
    id: 182,
    question: "What is the purpose of a DB Snapshot Copy?",
    options: [
      "To backup the database",
      "To copy snapshots to other regions",
      "To control network access",
      "To manage backup storage"
    ],
    correctAnswer: 1,
    explanation: "DB Snapshot Copy allows you to copy snapshots to other regions for disaster recovery, migration, or compliance requirements.",
    category: "Backup",
    difficulty: "Medium"
  },
  {
    id: 183,
    question: "What is the purpose of a DB Snapshot Export?",
    options: [
      "To backup the database",
      "To export snapshots to S3 for analysis",
      "To control network access",
      "To manage backup storage"
    ],
    correctAnswer: 1,
    explanation: "DB Snapshot Export allows you to export snapshots to S3 in Parquet format for analysis using services like Amazon Athena or Amazon Redshift Spectrum.",
    category: "Backup",
    difficulty: "Hard"
  },
  {
    id: 184,
    question: "What is the purpose of a DB Snapshot Import?",
    options: [
      "To backup the database",
      "To import data from external sources",
      "To control network access",
      "To manage backup storage"
    ],
    correctAnswer: 1,
    explanation: "DB Snapshot Import allows you to import data from external sources, such as S3, into your RDS database.",
    category: "Database",
    difficulty: "Hard"
  },
  {
    id: 185,
    question: "What is the purpose of a DB Instance Reboot?",
    options: [
      "To backup the database",
      "To apply parameter group changes",
      "To control network access",
      "To manage backup storage"
    ],
    correctAnswer: 1,
    explanation: "DB Instance Reboot is required to apply certain parameter group changes. It can be done with or without failover in Multi-AZ deployments.",
    category: "Database",
    difficulty: "Medium"
  },
  {
    id: 186,
    question: "What is the purpose of a DB Instance Modify?",
    options: [
      "To backup the database",
      "To change instance configuration",
      "To control network access",
      "To manage backup storage"
    ],
    correctAnswer: 1,
    explanation: "DB Instance Modify allows you to change instance configuration, such as instance class, storage, or parameter groups.",
    category: "Database",
    difficulty: "Easy"
  },
  {
    id: 187,
    question: "What is the purpose of a DB Instance Delete?",
    options: [
      "To backup the database",
      "To terminate the database instance",
      "To control network access",
      "To manage backup storage"
    ],
    correctAnswer: 1,
    explanation: "DB Instance Delete terminates the database instance. You can choose to create a final snapshot before deletion.",
    category: "Database",
    difficulty: "Easy"
  },
  {
    id: 188,
    question: "What is the purpose of a DB Instance Restore?",
    options: [
      "To backup the database",
      "To restore from a snapshot or point-in-time",
      "To control network access",
      "To manage backup storage"
    ],
    correctAnswer: 1,
    explanation: "DB Instance Restore allows you to restore from a snapshot or point-in-time backup to create a new database instance.",
    category: "Backup",
    difficulty: "Medium"
  },
  {
    id: 189,
    question: "What is the purpose of a DB Instance Copy?",
    options: [
      "To backup the database",
      "To create a copy of the database instance",
      "To control network access",
      "To manage backup storage"
    ],
    correctAnswer: 1,
    explanation: "DB Instance Copy creates a copy of the database instance, which can be useful for testing, development, or migration purposes.",
    category: "Database",
    difficulty: "Medium"
  },
  {
    id: 190,
    question: "What is the purpose of a DB Instance Promote?",
    options: [
      "To backup the database",
      "To promote a read replica to primary",
      "To control network access",
      "To manage backup storage"
    ],
    correctAnswer: 1,
    explanation: "DB Instance Promote promotes a read replica to become the primary instance. This breaks the replication relationship.",
    category: "Database",
    difficulty: "Hard"
  },
  {
    id: 191,
    question: "What is the purpose of a DB Instance Reboot with Failover?",
    options: [
      "To backup the database",
      "To reboot with automatic failover in Multi-AZ",
      "To control network access",
      "To manage backup storage"
    ],
    correctAnswer: 1,
    explanation: "DB Instance Reboot with Failover reboots the primary instance and automatically fails over to the standby instance in Multi-AZ deployments.",
    category: "Database",
    difficulty: "Medium"
  },
  {
    id: 192,
    question: "What is the purpose of a DB Instance Reboot without Failover?",
    options: [
      "To backup the database",
      "To reboot without automatic failover",
      "To control network access",
      "To manage backup storage"
    ],
    correctAnswer: 1,
    explanation: "DB Instance Reboot without Failover reboots the primary instance without failing over to the standby instance in Multi-AZ deployments.",
    category: "Database",
    difficulty: "Medium"
  },
  {
    id: 193,
    question: "What is the purpose of a DB Instance Stop?",
    options: [
      "To backup the database",
      "To stop the database instance",
      "To control network access",
      "To manage backup storage"
    ],
    correctAnswer: 1,
    explanation: "DB Instance Stop stops the database instance to save costs. The instance can be started again later.",
    category: "Database",
    difficulty: "Easy"
  },
  {
    id: 194,
    question: "What is the purpose of a DB Instance Start?",
    options: [
      "To backup the database",
      "To start a stopped database instance",
      "To control network access",
      "To manage backup storage"
    ],
    correctAnswer: 1,
    explanation: "DB Instance Start starts a previously stopped database instance. The instance becomes available for connections.",
    category: "Database",
    difficulty: "Easy"
  },
  {
    id: 195,
    question: "What is the purpose of a DB Instance Upgrade?",
    options: [
      "To backup the database",
      "To upgrade the database engine version",
      "To control network access",
      "To manage backup storage"
    ],
    correctAnswer: 1,
    explanation: "DB Instance Upgrade upgrades the database engine version. This can be done during a maintenance window.",
    category: "Database",
    difficulty: "Medium"
  },
  {
    id: 196,
    question: "What is the purpose of a DB Instance Downgrade?",
    options: [
      "To backup the database",
      "To downgrade the database engine version",
      "To control network access",
      "To manage backup storage"
    ],
    correctAnswer: 1,
    explanation: "DB Instance Downgrade downgrades the database engine version. This is not always supported and may require a restore from backup.",
    category: "Database",
    difficulty: "Hard"
  },
  {
    id: 197,
    question: "What is the purpose of a DB Instance Rename?",
    options: [
      "To backup the database",
      "To change the database instance name",
      "To control network access",
      "To manage backup storage"
    ],
    correctAnswer: 1,
    explanation: "DB Instance Rename changes the database instance name. This is a cosmetic change that doesn't affect the database functionality.",
    category: "Database",
    difficulty: "Easy"
  },
  {
    id: 198,
    question: "What is the purpose of a DB Instance Tag?",
    options: [
      "To backup the database",
      "To add metadata to the database instance",
      "To control network access",
      "To manage backup storage"
    ],
    correctAnswer: 1,
    explanation: "DB Instance Tags add metadata to the database instance for organization, cost allocation, and resource management.",
    category: "Database",
    difficulty: "Easy"
  },
  {
    id: 199,
    question: "What is the purpose of a DB Instance Monitoring?",
    options: [
      "To backup the database",
      "To monitor database performance and health",
      "To control network access",
      "To manage backup storage"
    ],
    correctAnswer: 1,
    explanation: "DB Instance Monitoring tracks database performance and health using CloudWatch metrics and Performance Insights.",
    category: "Performance",
    difficulty: "Medium"
  },
  {
    id: 200,
    question: "What is the purpose of a DB Instance Logging?",
    options: [
      "To backup the database",
      "To enable database engine logs",
      "To control network access",
      "To manage backup storage"
    ],
    correctAnswer: 1,
    explanation: "DB Instance Logging enables database engine logs for troubleshooting, auditing, and compliance purposes.",
    category: "Database",
    difficulty: "Medium"
  }
]

const allQuestions = [...ec2Questions, ...s3Questions, ...vpcQuestions, ...rdsQuestions]

const categories = ['All', 'Instance Types', 'Pricing', 'Storage', 'Security', 'Networking', 'Auto Scaling', 'Instance Management', 'Storage Classes', 'Management', 'Performance', 'Integration', 'Billing']
const difficulties = ['All', 'Easy', 'Medium', 'Hard']

const services = ['All', 'EC2', 'S3', 'VPC', 'RDS']

export default function QAPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [totalAnswered, setTotalAnswered] = useState(0)
  const [filteredQuestions, setFilteredQuestions] = useState(allQuestions)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')
  const [selectedService, setSelectedService] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return // Prevent multiple selections
    setSelectedAnswer(answerIndex)
    
    if (answerIndex === allQuestions[currentQuestion].correctAnswer) {
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
    let filtered = allQuestions

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(q => q.category === selectedCategory)
    }

    if (selectedDifficulty !== 'All') {
      filtered = filtered.filter(q => q.difficulty === selectedDifficulty)
    }

    if (selectedService !== 'All') {
      if (selectedService === 'EC2') {
        filtered = filtered.filter(q => q.id <= 50)
      } else if (selectedService === 'S3') {
        filtered = filtered.filter(q => q.id > 50 && q.id <= 100)
      } else if (selectedService === 'VPC') {
        filtered = filtered.filter(q => q.id > 100)
      } else if (selectedService === 'RDS') {
        filtered = filtered.filter(q => q.id > 150)
      }
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
  }, [selectedCategory, selectedDifficulty, selectedService, searchTerm])

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
                AWS Solutions Architect Q&A
              </h1>
            </div>
            <p className="text-xl max-w-3xl mx-auto">
              Test your knowledge with interactive questions covering EC2, S3, VPC, and RDS concepts
            </p>
            <div className="flex justify-center space-x-4 text-sm text-gray-500">
              <span>📚 200 Questions</span>
              <span>🎯 Multiple Choice</span>
              <span>📊 Progress Tracking</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Service</label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-aws-orange"
              >
                {services.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-aws-orange"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Difficulty</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-aws-orange"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-aws-orange"
              />
            </div>
          </div>

          <button
            onClick={resetQuiz}
            className="btn-secondary flex items-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset Quiz
          </button>
        </div>
      </section>

      {/* Progress Bar */}
      <section className="py-4 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Question {currentQuestion + 1} of {filteredQuestions.length}
              </span>
              <span className="text-sm font-medium text-gray-700">
                {Math.round(((currentQuestion + 1) / filteredQuestions.length) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / filteredQuestions.length) * 100}%` }}
              ></div>
            </div>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{allQuestions.length}</div>
                <div className="text-gray-600">Total Questions</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{score}</div>
                <div className="text-gray-600">Correct Answers</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {totalAnswered > 0 ? Math.round((score / totalAnswered) * 100) : 0}%
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