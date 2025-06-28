'use client'

import React, { useState } from 'react';

const ec2Questions = [
  {
    id: 1,
    question: "What is the difference between On-Demand, Reserved, and Spot Instances?",
    answer: "On-Demand: Pay by the hour, Reserved: 1-3 year commitment, Spot: Use spare capacity. On-Demand is the most flexible but expensive, Reserved offers significant discounts for a 1-3 year commitment, and Spot uses spare capacity with up to 90% discount but can be terminated with 2-minute notice.",
  },
  {
    id: 2,
    question: "Which instance type is best for a high-traffic web application?",
    answer: "M6i instances (general purpose) provide a balance of compute, memory, and networking resources, making them ideal for web applications.",
  },
  {
    id: 3,
    question: "What is the maximum number of Elastic IP addresses you can have per region?",
    answer: "By default, AWS allows 5 Elastic IP addresses per region. You can request an increase through AWS Support if you need more.",
  },
  {
    id: 4,
    question: "Which of the following is true about Security Groups?",
    answer: "Security Groups are stateful, meaning that if you allow inbound traffic, the corresponding outbound traffic is automatically allowed.",
  },
  {
    id: 5,
    question: "What happens when a Spot Instance is terminated?",
    answer: "You get a 2-minute notice before termination. Spot instances are best suited for fault-tolerant, flexible applications that can handle interruptions.",
  },
  {
    id: 6,
    question: "Which EBS volume type provides the best performance for database workloads?",
    answer: "io1 volumes provide the highest performance with up to 64,000 IOPS and 1,000 MB/s throughput. They are ideal for critical database workloads that require consistent, high performance.",
  },
  {
    id: 7,
    question: "What is the purpose of an Auto Scaling Group?",
    answer: "Auto Scaling Groups automatically adjust the number of EC2 instances in your application based on demand, helping you maintain performance and optimize costs.",
  },
  {
    id: 8,
    question: "Which instance type is best for a memory-intensive database like SAP HANA?",
    answer: "R6i instances are specifically designed for memory-intensive workloads like SAP HANA, large in-memory databases, and real-time big data analytics.",
  },
  {
    id: 9,
    question: "What is the difference between EBS and Instance Store?",
    answer: "EBS volumes are network-attached storage that persist independently of the instance lifecycle. Instance Store is physically attached to the host and is ephemeral - data is lost when the instance stops or terminates.",
  },
  {
    id: 10,
    question: "What is the maximum number of instances you can have in an Auto Scaling Group?",
    answer: "The default maximum number of instances in an Auto Scaling Group is 500. You can request an increase through AWS Support if you need more.",
  },
  {
    id: 11,
    question: "Which pricing model offers the highest discount compared to On-Demand?",
    answer: "Spot Instances can offer up to 90% discount compared to On-Demand pricing, making them the most cost-effective option for fault-tolerant workloads.",
  },
  {
    id: 12,
    question: "What is the purpose of a Launch Template?",
    answer: "Launch Templates define the configuration for launching instances, including instance type, AMI, security groups, storage, and other settings. They help ensure consistency when launching instances and can be used with Auto Scaling Groups.",
  },
  {
    id: 13,
    question: "Which instance type is best for batch processing workloads?",
    answer: "C6i instances are optimized for compute-intensive workloads like batch processing, media transcoding, and high-traffic web servers.",
  },
  {
    id: 14,
    question: "What is the difference between a Security Group and a Network ACL?",
    answer: "Security Groups operate at the instance level and are stateful (automatically allow return traffic). Network ACLs operate at the subnet level and are stateless (require explicit rules for both directions).",
  },
  {
    id: 15,
    question: "What is the maximum size of an EBS volume?",
    answer: "The maximum size for a single EBS volume is 16 TB. You can attach multiple volumes to a single instance if you need more storage.",
  },
  {
    id: 16,
    question: "Which instance type is best for a development environment?",
    answer: "T3 instances are ideal for development environments because they are cost-effective and provide burstable performance.",
  },
  {
    id: 17,
    question: "What is the purpose of an Elastic IP address?",
    answer: "Elastic IP addresses are static, public IPv4 addresses that you can allocate to your AWS account and associate with your instances. They remain associated with your account until you release them, even if the instance is stopped or terminated.",
  },
  {
    id: 18,
    question: "What is the maximum number of security groups you can attach to an instance?",
    answer: "You can attach up to 5 security groups to a single EC2 instance.",
  },
];

function shuffle(array: any[]) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function FlashcardsPage() {
  const [cards, setCards] = useState(ec2Questions);
  const [current, setCurrent] = useState(0);

  const handleRandomize = () => {
    setCards(shuffle(cards));
    setCurrent(0);
  };

  const next = () => setCurrent(c => (c + 1 < cards.length ? c + 1 : 0));
  const prev = () => setCurrent(c => (c - 1 >= 0 ? c - 1 : cards.length - 1));

  const card = cards[current];

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">EC2 Flashcards</h1>
      <button
        className="mb-4 px-3 py-1 rounded border bg-white text-gray-800 hover:bg-gray-100"
        onClick={handleRandomize}
      >
        Randomize
      </button>
      <div className="bg-white rounded shadow p-6 mb-4">
        <div className="text-lg font-semibold mb-4">{card.question}</div>
        <details className="mb-2">
          <summary className="cursor-pointer text-orange-600">Show Answer</summary>
          <div className="mt-2 text-gray-700">{card.answer}</div>
        </details>
        <div className="flex justify-between mt-4">
          <button onClick={prev} className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200">Previous</button>
          <span className="text-sm text-gray-500">{current + 1} / {cards.length}</span>
          <button onClick={next} className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200">Next</button>
        </div>
      </div>
    </div>
  );
} 