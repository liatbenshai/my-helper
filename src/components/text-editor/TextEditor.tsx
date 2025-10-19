'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  PencilIcon, 
  DocumentTextIcon, 
  SparklesIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

interface TextEditorProps {
  initialText?: string
  onSave?: (text: string) => void
  onImprove?: (text: string) => void
  placeholder?: string
  className?: string
}

export default function TextEditor({
  initialText = '',
  onSave,
  onImprove,
  placeholder = 'התחל לכתוב כאן...',
  className = ''
}: TextEditorProps) {
  const [text, setText] = useState(initialText)
  const [isEditing, setIsEditing] = useState(false)
  const [isImproving, setIsImproving] = useState(false)
  const [improvedText, setImprovedText] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [isEditing])

  const handleSave = () => {
    onSave?.(text)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setText(initialText)
    setIsEditing(false)
  }

  const handleImprove = async () => {
    if (!text.trim()) return
    
    setIsImproving(true)
    try {
      // Simulate AI improvement
      await new Promise(resolve => setTimeout(resolve, 2000))
      setImprovedText(text + ' (שופר על ידי AI)')
    } catch (error) {
      console.error('Error improving text:', error)
    } finally {
      setIsImproving(false)
    }
  }

  const handleAcceptImprovement = () => {
    setText(improvedText)
    setImprovedText('')
    onImprove?.(improvedText)
  }

  const handleRejectImprovement = () => {
    setImprovedText('')
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <DocumentTextIcon className="w-5 h-5 text-gray-500" />
          <h3 className="font-medium text-gray-900 hebrew-text">עורך טקסט</h3>
        </div>
        <div className="flex items-center gap-2">
          {!isEditing && (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                title="ערוך"
              >
                <PencilIcon className="w-4 h-4" />
              </button>
              <button
                onClick={handleImprove}
                disabled={!text.trim() || isImproving}
                className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors disabled:opacity-50"
                title="שפר עם AI"
              >
                <SparklesIcon className={`w-4 h-4 ${isImproving ? 'animate-pulse' : ''}`} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {isEditing ? (
          <div className="space-y-4">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={placeholder}
              className="w-full h-64 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent hebrew-input resize-none"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <CheckIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="min-h-[200px]">
            {text ? (
              <div className="prose max-w-none">
                <p className="text-gray-700 hebrew-text leading-relaxed whitespace-pre-wrap">
                  {text}
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-center h-48 text-gray-400">
                <div className="text-center">
                  <DocumentTextIcon className="w-12 h-12 mx-auto mb-2" />
                  <p className="hebrew-text">{placeholder}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* AI Improvement Suggestion */}
        {improvedText && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-primary-50 border border-primary-200 rounded-lg"
          >
            <div className="flex items-center gap-2 mb-2">
              <SparklesIcon className="w-4 h-4 text-primary-600" />
              <h4 className="font-medium text-primary-900 hebrew-text">הצעת שיפור מ-AI</h4>
            </div>
            <p className="text-primary-800 hebrew-text mb-3">
              {improvedText}
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleAcceptImprovement}
                className="px-3 py-1 bg-primary-600 text-white text-sm rounded hover:bg-primary-700 transition-colors"
              >
                קבל
              </button>
              <button
                onClick={handleRejectImprovement}
                className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 transition-colors"
              >
                דחה
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
