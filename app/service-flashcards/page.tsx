'use client'

import React, { useState } from 'react';
import { RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';

const awsServices = [
  // Compute Services
  {
    id: 1,
    service: "EC2 (Elastic Compute Cloud)",
    category: "Compute",
    description: "Virtual servers in the cloud. Provides scalable computing capacity in the AWS cloud. You can launch as many or as few virtual servers as you need, configure security and networking, and manage storage."
  },
  {
    id: 5,
    service: "Lambda",
    category: "Compute",
    description: "Serverless compute service. Runs your code in response to events and automatically manages the underlying compute resources. You pay only for the compute time you consume."
  },
  {
    id: 18,
    service: "ECS (Elastic Container Service)",
    category: "Compute",
    description: "Fully managed container orchestration service. Supports Docker containers and allows you to easily run and scale containerized applications on AWS."
  },
  {
    id: 19,
    service: "EKS (Elastic Kubernetes Service)",
    category: "Compute",
    description: "Fully managed Kubernetes service. Makes it easy to run Kubernetes on AWS without needing to install, operate, and maintain your own Kubernetes control plane."
  },
  {
    id: 53,
    service: "Batch",
    category: "Compute",
    description: "Fully managed batch processing. Enables developers, scientists, and engineers to easily and efficiently run hundreds of thousands of batch computing jobs on AWS."
  },
  {
    id: 127,
    service: "AWS App Runner",
    category: "Compute",
    description: "Fully managed service for running containerized web applications and APIs. Automatically builds and deploys your application, load balances traffic, and scales to meet your traffic needs."
  },
  {
    id: 135,
    service: "AWS CloudShell",
    category: "Compute",
    description: "Browser-based shell environment. Provides a pre-authenticated AWS CLI that you can launch from the AWS Management Console and use to run scripts with the same permissions as your console user."
  },
  
  // Additional Analytics Services
  {
    id: 136,
    service: "Amazon CloudSearch",
    category: "Analytics",
    description: "Managed search service. Makes it simple and cost-effective to set up, manage, and scale a search solution for your website or application."
  },
  {
    id: 137,
    service: "Amazon DataZone",
    category: "Analytics",
    description: "Data governance service. Helps you catalog, discover, share, and govern data at scale across organizational boundaries."
  },
  {
    id: 138,
    service: "Amazon FinSpace",
    category: "Analytics",
    description: "Financial data analytics service. Provides a complete data management and analytics solution for financial services organizations."
  },
  {
    id: 139,
    service: "Amazon Kinesis",
    category: "Analytics",
    description: "Real-time data streaming service. Collects, processes, and analyzes real-time, streaming data so you can get timely insights and react quickly to new information."
  },
  {
    id: 140,
    service: "Amazon Kinesis Data Firehose",
    category: "Analytics",
    description: "Real-time data delivery service. Captures, transforms, and delivers data streams to Amazon S3, Amazon Redshift, Amazon Elasticsearch Service, and Splunk."
  },
  {
    id: 141,
    service: "Amazon Managed Service for Apache Flink",
    category: "Analytics",
    description: "Managed stream processing service. Makes it easy to run Apache Flink applications and SQL queries on streaming data."
  },
  {
    id: 142,
    service: "Amazon Kinesis Data Streams",
    category: "Analytics",
    description: "Real-time data streaming service. Builds custom applications that process or analyze streaming data for specialized needs."
  },
  {
    id: 143,
    service: "Amazon Kinesis Video Streams",
    category: "Analytics",
    description: "Video streaming service. Makes it easy to securely stream video from connected devices to AWS for analytics, machine learning, and other processing."
  },
  {
    id: 144,
    service: "Amazon OpenSearch Serverless",
    category: "Analytics",
    description: "Serverless search and analytics service. Automatically provisions and scales the underlying resources to power your search and analytics workloads."
  },
  {
    id: 145,
    service: "Amazon Redshift Serverless",
    category: "Analytics",
    description: "Serverless data warehouse service. Automatically provisions and scales data warehouse capacity to deliver fast performance for all your analytics workloads."
  },
  {
    id: 146,
    service: "AWS Clean Rooms",
    category: "Analytics",
    description: "Privacy-preserving data collaboration service. Enables multiple parties to collaborate on their collective data without sharing the underlying data with each other."
  },
  {
    id: 147,
    service: "AWS Data Exchange",
    category: "Analytics",
    description: "Data marketplace service. Makes it easy to find, subscribe to, and use third-party data in the cloud."
  },
  {
    id: 148,
    service: "AWS Data Pipeline",
    category: "Analytics",
    description: "Data workflow orchestration service. Helps you reliably process and move data between different AWS compute and storage services, as well as on-premises data sources."
  },
  {
    id: 149,
    service: "AWS Entity Resolution",
    category: "Analytics",
    description: "Entity resolution service. Helps you match and link related records from multiple sources to create a unified view of entities."
  },
  {
    id: 150,
    service: "AWS Lake Formation",
    category: "Analytics",
    description: "Data lake management service. Makes it easy to set up a secure data lake in days. A data lake is a centralized, curated, and secured repository that stores all your data, both in its original form and prepared for analysis."
  },
  {
    id: 151,
    service: "Amazon Managed Streaming for Apache Kafka",
    category: "Analytics",
    description: "Fully managed Apache Kafka service. Makes it easy to build and run applications that use Apache Kafka to process streaming data."
  },
  
  // Application Integration Services
  {
    id: 152,
    service: "Amazon AppFlow",
    category: "Application Integration",
    description: "Fully managed integration service. Enables you to securely transfer data between SaaS applications and AWS services without writing custom integration code."
  },
  {
    id: 153,
    service: "AWS B2B Data Interchange",
    category: "Application Integration",
    description: "Business-to-business data exchange service. Helps you transform and exchange EDI (Electronic Data Interchange) documents with trading partners."
  },
  {
    id: 154,
    service: "Amazon Managed Workflows for Apache Airflow (MWAA)",
    category: "Application Integration",
    description: "Managed Apache Airflow service. Makes it easy to set up and operate end-to-end data pipelines in the cloud using Apache Airflow."
  },
  {
    id: 155,
    service: "Amazon MQ",
    category: "Application Integration",
    description: "Managed message broker service. Provides Apache ActiveMQ and RabbitMQ for message brokers that help you move from legacy message brokers to the cloud."
  },
  
  // Business Applications Services
  {
    id: 156,
    service: "Alexa for Business",
    category: "Business Applications",
    description: "Voice-enabled business productivity service. Makes Alexa available for your organization to help you and your team get more done."
  },
  {
    id: 157,
    service: "AWS AppFabric",
    category: "Business Applications",
    description: "Application integration service. Connects your SaaS applications to provide a unified view of your data and enable cross-application workflows."
  },
  {
    id: 158,
    service: "Amazon Chime",
    category: "Business Applications",
    description: "Communications service. Provides voice, video, and chat capabilities for your organization with a single, secure application."
  },
  {
    id: 159,
    service: "Amazon Chime SDK",
    category: "Business Applications",
    description: "Real-time communications SDK. Enables you to add voice, video, and messaging capabilities to your web and mobile applications."
  },
  {
    id: 160,
    service: "Amazon Connect",
    category: "Business Applications",
    description: "Cloud contact center service. Makes it easy for any business to deliver better customer service at a lower cost."
  },
  {
    id: 161,
    service: "Amazon Pinpoint",
    category: "Business Applications",
    description: "Multichannel marketing and engagement service. Helps you understand your users and engage with them across multiple messaging channels."
  },
  {
    id: 162,
    service: "Amazon SES",
    category: "Business Applications",
    description: "Email service. Enables you to send and receive email using a reliable and scalable email platform."
  },
  {
    id: 163,
    service: "Amazon WorkDocs",
    category: "Business Applications",
    description: "Fully managed, secure enterprise storage and sharing service. Enables you to create, edit, and share content with your team."
  },
  {
    id: 164,
    service: "Amazon WorkMail",
    category: "Business Applications",
    description: "Secure, managed business email and calendar service. Gives users the ability to seamlessly access their email, contacts, and calendar using the email client they already know and love."
  },
  
  // Cloud Financial Management Services
  {
    id: 165,
    service: "AWS Application Cost Profiler",
    category: "Cloud Financial Management",
    description: "Application cost optimization service. Helps you identify cost optimization opportunities for your applications by providing detailed cost breakdowns and recommendations."
  },
  {
    id: 166,
    service: "AWS Billing Conductor",
    category: "Cloud Financial Management",
    description: "Billing management service. Helps you customize your AWS billing experience and manage billing for multiple AWS accounts and services."
  },
  {
    id: 167,
    service: "AWS Cost and Usage Report",
    category: "Cloud Financial Management",
    description: "Detailed billing report service. Provides comprehensive billing data that you can use to analyze your AWS costs and usage patterns."
  },
  {
    id: 168,
    service: "Reserved Instance (RI) Reporting",
    category: "Cloud Financial Management",
    description: "Reserved Instance optimization service. Provides detailed reporting and recommendations to help you optimize your Reserved Instance purchases and usage."
  },
  {
    id: 169,
    service: "Savings Plans",
    category: "Cloud Financial Management",
    description: "Flexible pricing model. Provides significant savings on your AWS usage in exchange for a commitment to use a specific amount of compute power for a 1 or 3-year term."
  },
  
  // Additional Compute Services
  {
    id: 170,
    service: "Amazon EC2 Image Builder",
    category: "Compute",
    description: "Automated image building service. Simplifies the creation, maintenance, validation, testing, and distribution of Linux or Windows images."
  },
  {
    id: 171,
    service: "Amazon Lightsail",
    category: "Compute",
    description: "Virtual private server service. Provides easy-to-use virtual private server (VPS) instances, containers, databases, and more at a cost-effective monthly price."
  },
  {
    id: 172,
    service: "Amazon Linux 2023",
    category: "Compute",
    description: "AWS-optimized Linux distribution. Provides a secure, stable, and high-performance execution environment for applications running on Amazon EC2."
  },
  {
    id: 173,
    service: "AWS Elastic Beanstalk",
    category: "Compute",
    description: "Platform as a service (PaaS). Makes it easy to deploy and manage applications in the AWS cloud without worrying about the infrastructure that runs those applications."
  },
  {
    id: 174,
    service: "AWS Fargate",
    category: "Compute",
    description: "Serverless compute engine for containers. Allows you to run containers without having to manage servers or clusters of Amazon EC2 instances."
  },
  {
    id: 175,
    service: "AWS Serverless Application Repository",
    category: "Compute",
    description: "Managed repository for serverless applications. Makes it easy for developers and enterprise teams to store, share, and deploy serverless applications."
  },
  {
    id: 176,
    service: "AWS Outposts",
    category: "Compute",
    description: "Hybrid cloud service. Extends AWS infrastructure, services, APIs, and tools to virtually any datacenter, co-location space, or on-premises facility."
  },
  {
    id: 177,
    service: "AWS Wavelength",
    category: "Compute",
    description: "Edge computing service. Provides mobile edge computing infrastructure for developing, deploying, and scaling ultra-low-latency applications."
  },
  
  // Storage Services
  {
    id: 2,
    service: "S3 (Simple Storage Service)",
    category: "Storage",
    description: "Object storage service. Offers industry-leading scalability, data availability, security, and performance. Store and retrieve any amount of data from anywhere on the web."
  },
  {
    id: 10,
    service: "EBS (Elastic Block Store)",
    category: "Storage",
    description: "Block-level storage volumes. Provides persistent block storage volumes for use with EC2 instances. Each EBS volume is automatically replicated within its Availability Zone."
  },
  {
    id: 39,
    service: "S3 Glacier",
    category: "Storage",
    description: "Low-cost storage for data archiving. Secure, durable, and extremely low-cost cloud storage service for data archiving and long-term backup."
  },
  {
    id: 40,
    service: "EFS (Elastic File System)",
    category: "Storage",
    description: "Fully managed file system. Provides simple, scalable, elastic file storage for use with AWS Cloud services and on-premises resources."
  },
  {
    id: 41,
    service: "Storage Gateway",
    category: "Storage",
    description: "Hybrid cloud storage service. Enables your on-premises applications to seamlessly use AWS cloud storage. You can use the service for backup and archiving, disaster recovery, cloud data processing, storage tiering, and migration."
  },
  {
    id: 42,
    service: "Transfer Family",
    category: "Storage",
    description: "Fully managed file transfer service. Enables you to transfer files over SFTP, FTPS, and FTP directly into and out of Amazon S3 or Amazon EFS."
  },
  {
    id: 43,
    service: "DataSync",
    category: "Storage",
    description: "Data transfer service. Simplifies, automates, and accelerates moving data between on-premises storage systems and AWS storage services."
  },
  {
    id: 44,
    service: "Snow Family",
    category: "Storage",
    description: "Edge computing and data transfer devices. Includes Snowcone, Snowball, and Snowmobile for transferring data to and from AWS."
  },
  {
    id: 103,
    service: "FSx for Windows File Server",
    category: "Storage",
    description: "Fully managed Windows file system. Built on Windows Server, providing a fully managed native Microsoft Windows file system accessible over the industry-standard Server Message Block (SMB) protocol."
  },
  {
    id: 104,
    service: "FSx for Lustre",
    category: "Storage",
    description: "High-performance file system. Built for compute-intensive workloads, such as high-performance computing, machine learning, and media data processing workflows."
  },
  {
    id: 105,
    service: "FSx for NetApp ONTAP",
    category: "Storage",
    description: "Fully managed NetApp ONTAP file system. Provides the popular features, performance, and APIs of ONTAP file systems with the agility, scalability, security, and resiliency of AWS."
  },
  {
    id: 106,
    service: "FSx for OpenZFS",
    category: "Storage",
    description: "Fully managed OpenZFS file system. Provides the familiar features, performance, and APIs of OpenZFS file systems with the agility, scalability, security, and resiliency of AWS."
  },
  {
    id: 107,
    service: "Backup",
    category: "Storage",
    description: "Centralized backup service. Provides a fully managed backup service that makes it easy to centralize and automate the backup of data across AWS services in the cloud as well as on premises using the AWS Storage Gateway."
  },
  {
    id: 1,
    service: "EC2 (Elastic Compute Cloud)",
    description: "Virtual servers in the cloud. Provides scalable computing capacity in the AWS cloud. You can launch as many or as few virtual servers as you need, configure security and networking, and manage storage."
  },
  {
    id: 2,
    service: "S3 (Simple Storage Service)",
    description: "Object storage service. Offers industry-leading scalability, data availability, security, and performance. Store and retrieve any amount of data from anywhere on the web."
  },
  {
    id: 3,
    service: "VPC (Virtual Private Cloud)",
    category: "Networking",
    description: "Isolated cloud resources. Provides a logically isolated section of the AWS cloud where you can launch AWS resources in a virtual network that you define."
  },
  {
    id: 4,
    service: "RDS (Relational Database Service)",
    category: "Database",
    description: "Managed relational database service. Makes it easy to set up, operate, and scale relational databases in the cloud. Supports multiple database engines."
  },
  {
    id: 5,
    service: "Lambda",
    description: "Serverless compute service. Runs your code in response to events and automatically manages the underlying compute resources. You pay only for the compute time you consume."
  },
  {
    id: 6,
    service: "Route 53",
    category: "Networking",
    description: "Scalable DNS and domain name registration. Highly available and scalable cloud DNS web service designed to give developers and businesses an extremely reliable and cost-effective way to route end users to internet applications."
  },
  {
    id: 7,
    service: "CloudFront",
    category: "Networking",
    description: "Content delivery network (CDN). Delivers data, videos, applications, and APIs to customers globally with low latency, high transfer speeds, all within a developer-friendly environment."
  },
  {
    id: 8,
    service: "ELB (Elastic Load Balancer)",
    category: "Networking",
    description: "Distributes incoming application traffic. Automatically distributes incoming application traffic across multiple targets, such as EC2 instances, containers, and IP addresses."
  },
  {
    id: 9,
    service: "Auto Scaling",
    category: "Compute",
    description: "Automatically adjusts capacity. Maintains application availability and allows you to scale your EC2 capacity up or down automatically according to conditions you define."
  },
  {
    id: 10,
    service: "EBS (Elastic Block Store)",
    description: "Block-level storage volumes. Provides persistent block storage volumes for use with EC2 instances. Each EBS volume is automatically replicated within its Availability Zone."
  },
  {
    id: 11,
    service: "CloudWatch",
    category: "Analytics",
    description: "Monitoring and observability service. Provides data and actionable insights to monitor your applications, respond to system-wide performance changes, optimize resource utilization."
  },
  {
    id: 12,
    service: "IAM (Identity and Access Management)",
    category: "Security, Identity, and Compliance",
    description: "Security service for access control. Helps you securely control access to AWS resources. You use IAM to control who is authenticated (signed in) and authorized (has permissions) to use resources."
  },
  {
    id: 13,
    service: "SNS (Simple Notification Service)",
    category: "Application Integration",
    description: "Fully managed pub/sub messaging service. Enables you to decouple microservices, distributed systems, and serverless applications. SNS provides topics for high-throughput, push-based, many-to-many messaging."
  },
  {
    id: 14,
    service: "SQS (Simple Queue Service)",
    category: "Application Integration",
    description: "Fully managed message queuing service. Enables you to decouple and scale microservices, distributed systems, and serverless applications. SQS eliminates the complexity and overhead associated with managing and operating message-oriented middleware."
  },
  {
    id: 15,
    service: "API Gateway",
    category: "Application Integration",
    description: "Fully managed service for creating and managing APIs. Makes it easy for developers to create, publish, maintain, monitor, and secure APIs at any scale."
  },
  {
    id: 16,
    service: "DynamoDB",
    category: "Database",
    description: "Fully managed NoSQL database service. Provides fast and predictable performance with seamless scalability. You can use DynamoDB to create a database table that can store and retrieve any amount of data."
  },
  {
    id: 17,
    service: "ElastiCache",
    category: "Database",
    description: "In-memory data store and cache service. Supports Redis and Memcached. Improves the performance of web applications by allowing you to retrieve information from fast, managed, in-memory data stores."
  },
  {
    id: 18,
    service: "ECS (Elastic Container Service)",
    description: "Fully managed container orchestration service. Supports Docker containers and allows you to easily run and scale containerized applications on AWS."
  },
  {
    id: 19,
    service: "EKS (Elastic Kubernetes Service)",
    description: "Fully managed Kubernetes service. Makes it easy to run Kubernetes on AWS without needing to install, operate, and maintain your own Kubernetes control plane."
  },
  {
    id: 20,
    service: "CloudFormation",
    description: "Infrastructure as code service. Gives developers and systems administrators an easy way to create and manage a collection of related AWS resources, provisioning and updating them in an orderly and predictable fashion."
  },
  {
    id: 21,
    service: "CodeDeploy",
    description: "Automated deployment service. Automates software deployments to a variety of compute services such as EC2, Lambda, and on-premises servers."
  },
  {
    id: 22,
    service: "CodePipeline",
    description: "Continuous delivery service. Automates the build, test, and deploy phases of your release process every time there is a code change."
  },
  {
    id: 23,
    service: "KMS (Key Management Service)",
    category: "Security, Identity, and Compliance",
    description: "Managed encryption key service. Makes it easy for you to create and manage cryptographic keys and control their use across a wide range of AWS services and in your applications."
  },
  {
    id: 24,
    service: "WAF (Web Application Firewall)",
    category: "Security, Identity, and Compliance",
    description: "Web application firewall service. Helps protect your web applications or APIs against common web exploits that could affect application availability, compromise security, or consume excessive resources."
  },
  {
    id: 25,
    service: "Shield",
    category: "Security, Identity, and Compliance",
    description: "DDoS protection service. Provides protection against DDoS attacks for applications running on AWS. Shield Standard is automatically included at no additional cost."
  },
  {
    id: 26,
    service: "GuardDuty",
    category: "Security, Identity, and Compliance",
    description: "Threat detection service. Continuously monitors for malicious activity and unauthorized behavior to protect your AWS accounts and workloads."
  },
  {
    id: 27,
    service: "Config",
    description: "Configuration management service. Continuously monitors and records your AWS resource configurations and allows you to automate the evaluation of recorded configurations against desired configurations."
  },
  {
    id: 28,
    service: "CloudTrail",
    description: "API logging service. Enables governance, compliance, operational auditing, and risk auditing of your AWS account. With CloudTrail, you can log, continuously monitor, and retain account activity."
  },
  {
    id: 29,
    service: "X-Ray",
    category: "Analytics",
    description: "Distributed tracing service. Helps developers analyze and debug production, distributed applications, such as those built using a microservices architecture."
  },
  {
    id: 30,
    service: "Glue",
    category: "Analytics",
    description: "ETL (extract, transform, and load) service. Makes it easy to move data between data stores. It's a fully managed ETL service that makes it simple and cost-effective to categorize your data, clean it, enrich it, and move it reliably between various data stores."
  },
  {
    id: 31,
    service: "Redshift",
    category: "Database",
    description: "Fully managed data warehouse service. Makes it simple and cost-effective to analyze all your data using standard SQL and your existing business intelligence tools."
  },
  {
    id: 32,
    service: "Aurora",
    category: "Database",
    description: "MySQL and PostgreSQL-compatible relational database. Built for the cloud, Aurora combines the performance and availability of traditional enterprise databases with the simplicity and cost-effectiveness of open source databases."
  },
  {
    id: 33,
    service: "Neptune",
    category: "Database",
    description: "Fully managed graph database service. Makes it easy to build and run applications that work with highly connected datasets. Neptune supports popular graph models Property Graph and W3C's RDF."
  },
  {
    id: 34,
    service: "DocumentDB",
    category: "Database",
    description: "MongoDB-compatible document database service. Designed from the ground up to give you the performance, scalability, and availability you need when operating mission-critical MongoDB workloads at scale."
  },
  {
    id: 35,
    service: "Timestream",
    description: "Fully managed time series database. Built for IoT and operational applications that can scale to process trillions of time series data points per day."
  },
  {
    id: 36,
    service: "Qldb (Quantum Ledger Database)",
    description: "Fully managed ledger database. Provides a transparent, immutable, and cryptographically verifiable transaction log owned by a central trusted authority."
  },
  {
    id: 37,
    service: "Elasticsearch Service",
    description: "Managed Elasticsearch service. Makes it easy to deploy, secure, operate, and scale Elasticsearch to search, analyze, and visualize data in real-time."
  },
  {
    id: 38,
    service: "OpenSearch Service",
    category: "Analytics",
    description: "Managed OpenSearch service. Makes it easy to deploy, secure, and operate OpenSearch at scale with zero down time."
  },
  {
    id: 39,
    service: "S3 Glacier",
    description: "Low-cost storage for data archiving. Secure, durable, and extremely low-cost cloud storage service for data archiving and long-term backup."
  },
  {
    id: 40,
    service: "EFS (Elastic File System)",
    description: "Fully managed file system. Provides simple, scalable, elastic file storage for use with AWS Cloud services and on-premises resources."
  },
  {
    id: 41,
    service: "Storage Gateway",
    description: "Hybrid cloud storage service. Enables your on-premises applications to seamlessly use AWS cloud storage. You can use the service for backup and archiving, disaster recovery, cloud data processing, storage tiering, and migration."
  },
  {
    id: 42,
    service: "Transfer Family",
    description: "Fully managed file transfer service. Enables you to transfer files over SFTP, FTPS, and FTP directly into and out of Amazon S3 or Amazon EFS."
  },
  {
    id: 43,
    service: "DataSync",
    description: "Data transfer service. Simplifies, automates, and accelerates moving data between on-premises storage systems and AWS storage services."
  },
  {
    id: 44,
    service: "Snow Family",
    description: "Edge computing and data transfer devices. Includes Snowcone, Snowball, and Snowmobile for transferring data to and from AWS."
  },
  {
    id: 45,
    service: "Direct Connect",
    description: "Dedicated network connection. Establishes a dedicated network connection from your premises to AWS. Using AWS Direct Connect, you can establish private connectivity between AWS and your datacenter, office, or colocation environment."
  },
  {
    id: 46,
    service: "VPN (Virtual Private Network)",
    description: "Secure remote access. Provides secure remote access to your AWS resources and on-premises networks from anywhere in the world."
  },
  {
    id: 47,
    service: "Transit Gateway",
    description: "Network transit hub. Enables you to connect thousands of Amazon VPCs and on-premises networks using a single gateway."
  },
  {
    id: 48,
    service: "App Mesh",
    description: "Service mesh for microservices. Provides application-level networking to make it easy for your services to communicate with each other across multiple types of compute infrastructure."
  },
  {
    id: 49,
    service: "Cloud Map",
    description: "Service discovery for cloud resources. A cloud resource discovery service. With Cloud Map, you can define custom names for your application resources, and it maintains the updated location of these dynamically changing resources."
  },
  {
    id: 50,
    service: "EventBridge",
    category: "Application Integration",
    description: "Serverless event bus. Makes it easy to connect application components using real-time data streams. EventBridge delivers a stream of real-time data from your own applications, SaaS applications, and AWS services to targets such as AWS Lambda functions, HTTP invocation endpoints, and more."
  },
  {
    id: 51,
    service: "Step Functions",
    category: "Application Integration",
    description: "Serverless workflow service. Makes it easy to coordinate the components of distributed applications and microservices using visual workflows."
  },
  {
    id: 52,
    service: "SWF (Simple Workflow Service)",
    category: "Application Integration",
    description: "Workflow service for coordinating application components. Helps developers build, run, and scale background jobs that have parallel or sequential steps."
  },
  {
    id: 53,
    service: "Batch",
    description: "Fully managed batch processing. Enables developers, scientists, and engineers to easily and efficiently run hundreds of thousands of batch computing jobs on AWS."
  },
  {
    id: 54,
    service: "EMR (Elastic MapReduce)",
    category: "Analytics",
    description: "Big data platform. Makes it easy, fast, and cost-effective to process vast amounts of data across dynamically scalable Amazon EC2 instances."
  },
  {
    id: 55,
    service: "Athena",
    category: "Analytics",
    description: "Interactive query service. Makes it easy to analyze data in Amazon S3 using standard SQL. Athena is serverless, so there is no infrastructure to manage."
  },
  {
    id: 56,
    service: "QuickSight",
    category: "Analytics",
    description: "Business intelligence service. Delivers easy-to-understand insights to the people who need them. You can create and publish interactive dashboards that include ML-powered insights."
  },
  {
    id: 57,
    service: "SageMaker",
    description: "Machine learning platform. Enables developers and data scientists to quickly and easily build, train, and deploy machine learning models at any scale."
  },
  {
    id: 58,
    service: "Comprehend",
    description: "Natural language processing service. Uses machine learning to find insights and relationships in text. You can analyze text using sentiment analysis, entity recognition, and more."
  },
  {
    id: 59,
    service: "Rekognition",
    description: "Image and video analysis service. Makes it easy to add image and video analysis to your applications. You just provide an image or video to the Rekognition API, and the service can identify objects, people, text, scenes, and activities."
  },
  {
    id: 60,
    service: "Polly",
    description: "Text-to-speech service. Uses advanced deep learning technologies to synthesize speech that sounds like a human voice. You can use Polly to develop applications that increase engagement and accessibility."
  },
  {
    id: 61,
    service: "Lex",
    description: "Conversational AI service. Helps you build chatbots and virtual assistants. Lex provides the advanced deep learning functionalities of automatic speech recognition (ASR) for converting speech to text."
  },
  {
    id: 62,
    service: "Translate",
    description: "Neural machine translation service. Delivers fast, high-quality, and affordable language translation. Neural machine translation is a form of language translation automation that uses deep learning models."
  },
  {
    id: 63,
    service: "Transcribe",
    description: "Automatic speech recognition service. Makes it easy for developers to add speech-to-text capability to their applications. Using the Amazon Transcribe API, you can analyze audio files stored in Amazon S3 and have the service return a text file of the transcribed speech."
  },
  {
    id: 64,
    service: "Textract",
    description: "Document analysis service. Automatically extracts text, handwriting, and data from scanned documents. It goes beyond simple optical character recognition (OCR) to identify, understand, and extract data from forms and tables."
  },
  {
    id: 65,
    service: "Forecast",
    description: "Time series forecasting service. Uses machine learning to combine time series data with additional variables to build forecasts. Amazon Forecast requires no machine learning experience to get started."
  },
  {
    id: 66,
    service: "Personalize",
    description: "Real-time recommendation service. Makes it easy for developers to create individualized recommendations for customers using their applications. You can use the same technology used by Amazon.com for real-time personalized recommendations."
  },
  {
    id: 67,
    service: "Fraud Detector",
    description: "Fraud detection service. Makes it easy to identify potentially fraudulent online activities such as online payment fraud and the creation of fake accounts."
  },
  {
    id: 68,
    service: "CodeBuild",
    description: "Fully managed build service. Compiles source code, runs tests, and produces software packages that are ready to deploy. CodeBuild eliminates the need to provision, manage, and scale your own build servers."
  },
  {
    id: 69,
    service: "CodeCommit",
    description: "Fully managed source control service. Hosts secure Git-based repositories. CodeCommit eliminates the need to operate your own source control system or worry about scaling its infrastructure."
  },
  {
    id: 70,
    service: "CodeArtifact",
    description: "Fully managed artifact repository service. Makes it easy for organizations of any size to securely store, publish, and share software packages used in their software development process."
  },
  {
    id: 71,
    service: "CodeStar",
    description: "Cloud-based development service. Provides the tools you need to quickly develop, build, and deploy applications on AWS. With AWS CodeStar, you can use a variety of project templates to start your project."
  },
  {
    id: 72,
    service: "Cloud9",
    description: "Cloud-based integrated development environment (IDE). Write, run, and debug your code with just a browser. It includes a terminal, a code editor, and a debugger."
  },
  {
    id: 73,
    service: "Systems Manager",
    description: "Operations management service. Helps you automatically collect software inventory, apply OS patches, create system images, and configure Windows and Linux operating systems."
  },
  {
    id: 74,
    service: "OpsWorks",
    description: "Configuration management service. Provides managed instances of Chef and Puppet. Chef and Puppet are automation platforms that allow you to use code to automate the configurations of your servers."
  },
  {
    id: 75,
    service: "Organizations",
    description: "Account management service. Helps you centrally manage and govern multiple AWS accounts as you grow and scale your AWS resources."
  },
  {
    id: 76,
    service: "Control Tower",
    description: "Multi-account governance service. Provides the easiest way to set up and govern a secure, multi-account AWS environment based on AWS best practices."
  },
  {
    id: 77,
    service: "Service Catalog",
    description: "Application portfolio management service. Helps organizations create and manage catalogs of approved products that are available for deployment on AWS."
  },
  {
    id: 78,
    service: "License Manager",
    description: "Software license management service. Makes it easier to manage your software licenses from software vendors such as Microsoft, SAP, Oracle, and IBM across AWS and on-premises environments."
  },
  {
    id: 79,
    service: "Secrets Manager",
    description: "Secrets management service. Helps you protect the secrets needed to access your applications, services, and IT resources. The service enables you to easily rotate, manage, and retrieve database credentials, API keys, and other secrets throughout their lifecycle."
  },
  {
    id: 80,
    service: "Certificate Manager",
    category: "Security, Identity, and Compliance",
    description: "SSL/TLS certificate management service. Provision, manage, and deploy public and private SSL/TLS certificates for use with AWS services and your internal connected resources."
  },
  {
    id: 81,
    service: "Artifact",
    category: "Security, Identity, and Compliance",
    description: "Compliance documentation service. Provides on-demand access to AWS' security and compliance reports and select online agreements."
  },
  {
    id: 82,
    service: "Macie",
    category: "Security, Identity, and Compliance",
    description: "Data security and privacy service. Uses machine learning and pattern matching to discover and help protect your sensitive data stored in AWS."
  },
  {
    id: 83,
    service: "Detective",
    category: "Security, Identity, and Compliance",
    description: "Security investigation service. Automatically analyzes, investigates, and quickly identifies the root cause of potential security issues or suspicious activities."
  },
  {
    id: 84,
    service: "Inspector",
    category: "Security, Identity, and Compliance",
    description: "Security assessment service. Automatically assesses applications for exposure, vulnerabilities, and deviations from best practices."
  },
  {
    id: 85,
    service: "Security Hub",
    category: "Security, Identity, and Compliance",
    description: "Security findings aggregation service. Provides a comprehensive view of your high-priority security alerts and compliance status across AWS accounts."
  },
  {
    id: 86,
    service: "Cognito",
    category: "Security, Identity, and Compliance",
    description: "User authentication and authorization service. Provides authentication, authorization, and user management for your web and mobile apps."
  },
  {
    id: 87,
    service: "Directory Service",
    category: "Security, Identity, and Compliance",
    description: "Managed directory service. Enables you to run Microsoft Active Directory (AD) as a managed service. AWS Directory Service for Microsoft Active Directory, also known as AWS Managed Microsoft AD, is powered by Windows Server 2012 R2."
  },
  {
    id: 88,
    service: "Single Sign-On",
    description: "Cloud SSO service. Makes it easy to centrally manage access to multiple AWS accounts and business applications and provide users with single sign-on access to all their assigned accounts and applications from one place."
  },
  {
    id: 89,
    service: "CloudHSM",
    category: "Security, Identity, and Compliance",
    description: "Hardware security module service. Helps you meet corporate, contractual, and regulatory compliance requirements for data security by using dedicated Hardware Security Module (HSM) appliances within the AWS Cloud."
  },
  {
    id: 90,
    service: "RAM (Resource Access Manager)",
    description: "Resource sharing service. Makes it easy to share your AWS resources with any AWS account or through AWS Organizations. You can share AWS Transit Gateways, Subnets, AWS License Manager configurations, and Amazon Route 53 Resolver rules."
  },
  {
    id: 91,
    service: "Cost Explorer",
    category: "Cloud Financial Management",
    description: "Cost analysis service. Enables you to visualize, understand, and manage your AWS costs and usage over time. Cost Explorer provides reports that help you identify cost drivers and usage trends."
  },
  {
    id: 92,
    service: "Budgets",
    category: "Cloud Financial Management",
    description: "Cost management service. Gives you the ability to set custom budgets that alert you when your costs or usage exceed (or are forecasted to exceed) your budgeted amount."
  },
  {
    id: 93,
    service: "Trusted Advisor",
    description: "AWS account optimization service. Inspects your AWS environment and provides real-time guidance to help you provision your resources following AWS best practices."
  },
  {
    id: 94,
    service: "Support Center",
    description: "Technical support service. Provides a unified experience for creating and managing your AWS support cases. Support Center provides a single location to view and manage your support cases."
  },
  {
    id: 95,
    service: "Health Dashboard",
    description: "Service health monitoring. Provides ongoing visibility into your service health and gives you detailed visibility into how AWS performs in your account."
  },
  {
    id: 96,
    service: "Personal Health Dashboard",
    description: "Personalized health monitoring. Provides alerts and remediation guidance when AWS is experiencing events that may impact you."
  },
  {
    id: 97,
    service: "Well-Architected Tool",
    description: "Architecture review service. Helps you review the state of your workloads and compares them to the latest AWS architectural best practices."
  },
  {
    id: 98,
    service: "Migration Hub",
    description: "Migration tracking service. Provides a single location to track the progress of application migrations across multiple AWS and partner solutions."
  },
  {
    id: 99,
    service: "Application Discovery Service",
    description: "Application discovery service. Helps enterprise customers plan migration projects by gathering information about their on-premises data centers."
  },
  {
    id: 100,
    service: "Database Migration Service",
    description: "Database migration service. Helps you migrate databases to AWS quickly and securely. The source database remains fully operational during the migration, minimizing downtime to applications that rely on the database."
  },
  {
    id: 101,
    service: "Server Migration Service",
    description: "Server migration service. Automates, schedules, and tracks incremental replications of live server volumes to make it easier for you to coordinate large-scale server migrations."
  },
  {
    id: 102,
    service: "CloudEndure Migration",
    description: "Automated migration service. Provides a simple, automated solution for migrating and disaster recovery to AWS. CloudEndure Migration continuously replicates your machines into a low-cost staging area in your target AWS account and region."
  },
  {
    id: 103,
    service: "FSx for Windows File Server",
    description: "Fully managed Windows file system. Built on Windows Server, providing a fully managed native Microsoft Windows file system accessible over the industry-standard Server Message Block (SMB) protocol."
  },
  {
    id: 104,
    service: "FSx for Lustre",
    description: "High-performance file system. Built for compute-intensive workloads, such as high-performance computing, machine learning, and media data processing workflows."
  },
  {
    id: 105,
    service: "FSx for NetApp ONTAP",
    description: "Fully managed NetApp ONTAP file system. Provides the popular features, performance, and APIs of ONTAP file systems with the agility, scalability, security, and resiliency of AWS."
  },
  {
    id: 106,
    service: "FSx for OpenZFS",
    description: "Fully managed OpenZFS file system. Provides the familiar features, performance, and APIs of OpenZFS file systems with the agility, scalability, security, and resiliency of AWS."
  },
  {
    id: 107,
    service: "Backup",
    description: "Centralized backup service. Provides a fully managed backup service that makes it easy to centralize and automate the backup of data across AWS services in the cloud as well as on premises using the AWS Storage Gateway."
  },
  {
    id: 108,
    service: "CloudEndure Disaster Recovery",
    description: "Disaster recovery service. Provides continuous replication of your physical, virtual, and cloud-based servers into a low-cost staging area in your target AWS account and preferred Region."
  },
  {
    id: 109,
    service: "Application Migration Service",
    description: "Application migration service. Rehosts your applications without any code changes or cloud expertise required. It automatically converts your source servers to run natively on AWS."
  },
  {
    id: 110,
    service: "Ground Station",
    description: "Satellite ground station service. Enables you to control satellite communications, process data, and scale your satellite operations quickly, easily, and cost-effectively without having to worry about building or managing your own ground station infrastructure."
  },
  {
    id: 111,
    service: "IoT Core",
    description: "Managed cloud platform for IoT devices. Lets connected devices easily and securely interact with cloud applications and other devices. IoT Core can support billions of devices and trillions of messages."
  },
  {
    id: 112,
    service: "IoT Device Management",
    description: "IoT device management service. Makes it easy to securely onboard, organize, monitor, and remotely manage IoT devices at scale."
  },
  {
    id: 113,
    service: "IoT Analytics",
    category: "Analytics",
    description: "IoT analytics service. Makes it easy to run sophisticated analytics on massive volumes of IoT data without having to worry about all the typically undifferentiated heavy lifting involved in building an IoT analytics platform."
  },
  {
    id: 114,
    service: "IoT Events",
    description: "IoT event detection service. Makes it easy to detect and respond to events from IoT sensors and applications. Events are patterns of data that identify more complex circumstances than expected."
  },
  {
    id: 115,
    service: "IoT Greengrass",
    description: "Edge computing service. Extends AWS to edge devices so they can act locally on the data they generate, while still using the cloud for management, analytics, and durable storage."
  },
  {
    id: 116,
    service: "FreeRTOS",
    description: "Real-time operating system for microcontrollers. Makes it easy to program, deploy, secure, connect, and manage small, low-power edge devices."
  },
  {
    id: 117,
    service: "RoboMaker",
    description: "Robotics development service. Makes it easy to develop, test, and deploy intelligent robotics applications at scale. RoboMaker provides a fully-managed, scalable infrastructure for simulation."
  },
  {
    id: 118,
    service: "Panorama",
    description: "Computer vision service for edge devices. Applies computer vision to video from on-premises cameras to make predictions locally with high accuracy and low latency."
  },
  {
    id: 119,
    service: "Lookout for Vision",
    description: "Computer vision service for quality control. Uses machine learning to spot defects and anomalies in manufactured products using computer vision."
  },
  {
    id: 120,
    service: "Lookout for Equipment",
    description: "Predictive maintenance service. Uses machine learning to detect abnormal equipment behavior by analyzing sensor data, enabling you to implement predictive maintenance and reduce unplanned downtime."
  },
  {
    id: 121,
    service: "Lookout for Metrics",
    category: "Analytics",
    description: "Anomaly detection service. Uses machine learning to detect anomalies in your metrics and help you identify the root cause of issues in your applications and infrastructure."
  },
  {
    id: 122,
    service: "Monitron",
    description: "Predictive maintenance service. Uses sensors and machine learning to detect potential equipment failures so you can fix problems before they occur."
  },
  {
    id: 123,
    service: "AWS IoT TwinMaker",
    description: "Digital twin service. Makes it faster and easier to create digital twins of real-world systems like buildings, factories, industrial equipment, and production lines."
  },
  {
    id: 124,
    service: "AWS IoT SiteWise",
    description: "Industrial data collection service. Collects, structures, and searches industrial data at scale to help you make better, data-driven decisions."
  },
  {
    id: 125,
    service: "AWS IoT FleetWise",
    description: "Vehicle data collection service. Makes it easier to collect, transform, and transfer vehicle data to the cloud in near real-time."
  },
  {
    id: 126,
    service: "AWS Amplify",
    description: "Full-stack development platform. Helps frontend web and mobile developers build full-stack applications, with the flexibility to leverage the breadth of AWS services as your use cases evolve."
  },
  {
    id: 127,
    service: "AWS App Runner",
    description: "Fully managed service for running containerized web applications and APIs. Automatically builds and deploys your application, load balances traffic, and scales to meet your traffic needs."
  },
  {
    id: 128,
    service: "AWS Proton",
    description: "Application delivery service. Provides application templates, automated deployments, and infrastructure provisioning for container and serverless applications."
  },
  {
    id: 129,
    service: "AWS AppConfig",
    description: "Feature flags and dynamic configuration service. Enables you to quickly deploy application configuration changes to your applications hosted on AWS or on-premises."
  },
  {
    id: 130,
    service: "AWS Fault Injection Simulator",
    description: "Chaos engineering service. Helps you improve your application's performance, observability, and resiliency by performing controlled experiments on your AWS resources."
  },
  {
    id: 131,
    service: "AWS Resilience Hub",
    description: "Resilience assessment service. Provides a single place to define, validate, and track the resilience of your applications so you can avoid unnecessary downtime caused by software, infrastructure, or operational disruptions."
  },
  {
    id: 132,
    service: "AWS Application Composer",
    description: "Visual application builder. Helps you quickly compose and configure event-driven applications using a visual canvas and deploy them to AWS."
  },
  {
    id: 133,
    service: "AWS Launch Wizard",
    description: "Application deployment service. Helps you size, configure, and deploy third-party applications on AWS without having to identify and provision individual AWS resources."
  },
  {
    id: 134,
    service: "AWS Service Catalog AppRegistry",
    description: "Application resource management service. Helps you manage application metadata and resources across your organization to maintain consistency and improve operational efficiency."
  },
  {
    id: 135,
    service: "AWS CloudShell",
    description: "Browser-based shell environment. Provides a pre-authenticated AWS CLI that you can launch from the AWS Management Console and use to run scripts with the same permissions as your console user."
  },
  {
    id: 136,
    service: "AWS Network Firewall",
    category: "Security, Identity, and Compliance",
    description: "Managed network firewall service. Deploys essential network protections for your Amazon VPCs at scale."
  },
  {
    id: 137,
    service: "AWS Resource Access Manager",
    category: "Security, Identity, and Compliance",
    description: "Resource sharing service. Makes it easy to share your AWS resources with any AWS account or through AWS Organizations."
  },
  {
    id: 138,
    service: "AWS Secrets Manager",
    category: "Security, Identity, and Compliance",
    description: "Secrets management service. Helps you protect the secrets needed to access your applications, services, and IT resources."
  },
  {
    id: 139,
    service: "AWS Security Hub",
    category: "Security, Identity, and Compliance",
    description: "Security findings aggregation service. Provides a comprehensive view of your high-priority security alerts and compliance status across AWS accounts."
  },
  {
    id: 140,
    service: "AWS IAM Identity Center",
    category: "Security, Identity, and Compliance",
    description: "Cloud SSO service. Makes it easy to centrally manage access to multiple AWS accounts and business applications."
  },
  {
    id: 141,
    service: "AWS WAF Captcha",
    category: "Security, Identity, and Compliance",
    description: "Bot mitigation service. Adds CAPTCHA challenges to your web applications to help block unwanted bot traffic."
  },
  {
    id: 142,
    service: "Amazon Security Lake",
    category: "Security, Identity, and Compliance",
    description: "Security data lake service. Automatically centralizes security data from cloud, on-premises, and custom sources into a purpose-built data lake stored in your account."
  },
  {
    id: 143,
    service: "Amazon Verified Permissions",
    category: "Security, Identity, and Compliance",
    description: "Fine-grained authorization service. Provides a scalable permissions management system for applications, supporting ABAC and RBAC models."
  },
  {
    id: 144,
    service: "AWS Audit Manager",
    category: "Security, Identity, and Compliance",
    description: "Audit management service. Helps you continuously audit your AWS usage to simplify how you assess risk and compliance with regulations and industry standards."
  },
  {
    id: 145,
    service: "AWS Firewall Manager",
    category: "Security, Identity, and Compliance",
    description: "Security management service. Centrally configures and manages firewall rules across your accounts and applications in AWS Organizations."
  }
];

function shuffle(array: any[]) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function ServiceFlashcardsPage() {
  const [cards, setCards] = useState(awsServices);
  const [current, setCurrent] = useState(0);
  const [showDescription, setShowDescription] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Get unique categories
  const categories = ['All', ...Array.from(new Set(awsServices.map(service => service.category || 'Other')))];
  
  // Filter cards by category
  const filteredCards = selectedCategory === 'All' 
    ? cards 
    : cards.filter(card => (card.category || 'Other') === selectedCategory);

  const handleRandomize = () => {
    setCards(shuffle(filteredCards));
    setCurrent(0);
    setShowDescription(false);
  };

  const next = () => {
    setCurrent(c => (c + 1 < filteredCards.length ? c + 1 : 0));
    setShowDescription(false);
  };
  
  const prev = () => {
    setCurrent(c => (c - 1 >= 0 ? c - 1 : filteredCards.length - 1));
    setShowDescription(false);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrent(0);
    setShowDescription(false);
  };

  const card = filteredCards[current] || filteredCards[0];

  if (!card) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">AWS Service Flashcards</h1>
          <p className="text-gray-600">No services found for the selected category.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">AWS Service Flashcards</h1>
        <p className="text-gray-600 mb-4">Learn what each AWS service does</p>
        
        {/* Category Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category:</label>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-aws-orange text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <button
          className="inline-flex items-center px-4 py-2 rounded-lg border bg-white text-gray-800 hover:bg-gray-100 transition-colors"
          onClick={handleRandomize}
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Randomize
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        {/* Progress */}
        <div className="text-center mb-6">
          <span className="text-sm text-gray-500">
            {current + 1} of {filteredCards.length} {selectedCategory !== 'All' && `(${selectedCategory})`}
          </span>
        </div>

        {/* Flashcard */}
        <div className="min-h-[300px] flex items-center justify-center">
          <div 
            className="w-full max-w-2xl cursor-pointer"
            onClick={() => setShowDescription(!showDescription)}
          >
            {!showDescription ? (
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {card.service}
                </h2>
                <p className="text-gray-600">Click to see what this service does</p>
              </div>
            ) : (
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  {card.service}
                </h3>
                <p className="text-gray-800 text-lg leading-relaxed">
                  {card.description}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button 
            onClick={prev} 
            className="flex items-center px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </button>
          
          <div className="text-center">
            <button
              onClick={() => setShowDescription(!showDescription)}
              className="px-6 py-2 rounded-lg bg-aws-orange text-white hover:bg-orange-600 transition-colors"
            >
              {showDescription ? 'Show Service Name' : 'Show Description'}
            </button>
          </div>

          <button 
            onClick={next} 
            className="flex items-center px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-orange-50 rounded-lg p-4">
        <h3 className="font-semibold text-orange-800 mb-2">How to use:</h3>
        <ul className="text-sm text-orange-700 space-y-1">
          <li>• Click the card to flip between service name and description</li>
          <li>• Use Previous/Next buttons to navigate</li>
          <li>• Click Randomize to shuffle the order</li>
          <li>• Study both sides to learn what each AWS service does</li>
        </ul>
      </div>
    </div>
  );
} 