'use client'

import { useState, useCallback } from 'react'
import { aiService, AIGenerationRequest, AIImprovementRequest, AIResponse } from '@/lib/ai'

export interface UseAIState {
  isLoading: boolean
  error: string | null
  result: AIResponse | null
}

export interface UseAIActions {
  generateText: (request: AIGenerationRequest) => Promise<AIResponse>
  improveText: (request: AIImprovementRequest) => Promise<AIResponse>
  clearError: () => void
  clearResult: () => void
}

export function useAI(): UseAIState & UseAIActions {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<AIResponse | null>(null)

  const generateText = useCallback(async (request: AIGenerationRequest): Promise<AIResponse> => {
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await aiService.generateText(request)
      setResult(response)
      
      if (!response.success) {
        setError(response.error || 'שגיאה לא ידועה')
      }
      
      return response
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'שגיאה לא ידועה'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }, [])

  const improveText = useCallback(async (request: AIImprovementRequest): Promise<AIResponse> => {
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await aiService.improveText(request)
      setResult(response)
      
      if (!response.success) {
        setError(response.error || 'שגיאה לא ידועה')
      }
      
      return response
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'שגיאה לא ידועה'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const clearResult = useCallback(() => {
    setResult(null)
  }, [])

  return {
    isLoading,
    error,
    result,
    generateText,
    improveText,
    clearError,
    clearResult
  }
}
