'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface Topic {
  id: string
  label: string
  icon: LucideIcon
}

interface TopicsBarProps {
  topics: Topic[]
  activeTopic: string
  onTopicChange: (topicId: string) => void
  title: string
}

export default function TopicsBar({ topics, activeTopic, onTopicChange, title }: TopicsBarProps) {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Page Title */}
          <div className="flex items-center">
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <div className="ml-4 text-sm text-gray-500">
              {topics.length} topics
            </div>
          </div>

          {/* Topics Navigation */}
          <div className="flex space-x-1">
            {topics.map((topic) => {
              const Icon = topic.icon
              const isActive = activeTopic === topic.id
              
              return (
                <motion.button
                  key={topic.id}
                  onClick={() => onTopicChange(topic.id)}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-aws-orange text-white shadow-md'
                      : 'text-gray-600 hover:text-aws-orange hover:bg-orange-50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className={`w-4 h-4 mr-2 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  {topic.label}
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
} 