'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { SparklesIcon, ArrowRightIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'

interface ImprovementResult {
  success: boolean
  originalText: string
  improvedText: string
  improvementType: string
  error?: string
}

export default function AIAssistant() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [inputText, setInputText] = useState('')
  const [improvementType, setImprovementType] = useState('comprehensive')
  const [result, setResult] = useState<ImprovementResult | null>(null)
  const [error, setError] = useState('')

  const handleImprove = async () => {
    if (!inputText.trim()) {
      setError('אנא הכנס טקסט לשיפור')
      return
    }

    setIsGenerating(true)
    setError('')
    setResult(null)

    try {
      console.log('Sending request to improve text:', { text: inputText, improvementType })
      
      const response = await fetch('/api/ai/improve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          improvementType: improvementType,
        }),
      })

      console.log('Response status:', response.status)
      const data = await response.json()
      console.log('Response data:', data)

      if (data.success) {
        setResult(data)
      } else {
        setError(data.error || 'שגיאה בשיפור הטקסט')
      }
    } catch (err) {
      console.error('Error in handleImprove:', err)
      setError('שגיאה בחיבור לשרת')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 to-secondary-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 hebrew-text text-center">
            שפר את הטקסט שלך
          </h2>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto hebrew-text text-center">
            הכנס טקסט וה-AI ישפר אותו בדקדוק, סגנון וברור
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2 hebrew-text">
                הדבק את הטקסט שברצונך לשפר:
              </label>
              <textarea
                className="textarea-field"
                placeholder="הדבק כאן את הטקסט שלך..."
                rows={6}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2 hebrew-text">
                סוג שיפור:
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'comprehensive', label: 'שיפור מקיף' },
                  { key: 'grammar', label: 'דקדוק' },
                  { key: 'style', label: 'סגנון' },
                  { key: 'clarity', label: 'בהירות' },
                  { key: 'professional', label: 'מקצועיות' }
                ].map((option) => (
                  <button
                    key={option.key}
                    onClick={() => setImprovementType(option.key)}
                    className={`px-4 py-2 rounded-lg transition-colors hebrew-text ${
                      improvementType === option.key
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 hover:bg-primary-100 text-gray-700 hover:text-primary-700'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg flex items-center gap-2">
                <ExclamationTriangleIcon className="w-5 h-5 text-red-600" />
                <span className="text-red-700 hebrew-text">{error}</span>
              </div>
            )}

            <button
              onClick={handleImprove}
              disabled={isGenerating || !inputText.trim()}
              className="w-full btn-primary text-lg py-3 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  משפר טקסט...
                </>
              ) : (
                <>
                  <SparklesIcon className="w-5 h-5" />
                  שפר עכשיו
                  <ArrowRightIcon className="w-5 h-5" />
                </>
              )}
            </button>

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-8 space-y-6"
              >
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircleIcon className="w-6 h-6" />
                  <span className="text-lg font-semibold hebrew-text">הטקסט שופר בהצלחה!</span>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-600 mb-2 hebrew-text">הטקסט המקורי:</h4>
                    <p className="text-gray-700 hebrew-text leading-relaxed text-sm">
                      {result.originalText}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="text-sm font-medium text-green-700 mb-2 hebrew-text">הטקסט המשופר:</h4>
                    <p className="text-gray-800 hebrew-text leading-relaxed text-sm">
                      {result.improvedText}
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <span className="text-sm text-gray-500 hebrew-text">
                    סוג שיפור: {result.improvementType}
                  </span>
                  <button
                    onClick={() => {
                      setInputText(result.improvedText)
                      setResult(null)
                    }}
                    className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors hebrew-text text-sm"
                  >
                    שפר שוב
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
