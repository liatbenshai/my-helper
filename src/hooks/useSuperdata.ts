'use client'

import { useState, useCallback } from 'react'
import { TextRecord, LearningData } from '@/lib/supabase'

export interface UseSuperdataState {
  isLoading: boolean
  error: string | null
  data: any
}

export interface UseSuperdataActions {
  saveText: (textData: Omit<TextRecord, 'id' | 'createdAt' | 'updatedAt'>) => Promise<TextRecord | null>
  getTexts: (filters?: any) => Promise<TextRecord[] | null>
  getTextById: (id: string) => Promise<TextRecord | null>
  updateText: (id: string, updates: Partial<TextRecord>) => Promise<TextRecord | null>
  deleteText: (id: string) => Promise<boolean>
  saveLearningData: (learningData: Omit<LearningData, 'id'>) => Promise<LearningData | null>
  getLearningData: (userId: string, limit?: number) => Promise<LearningData[] | null>
  getTextAnalytics: (filters?: any) => Promise<any>
  getLearningInsights: (userId: string) => Promise<any>
  clearError: () => void
}

export function useSuperdata(): UseSuperdataState & UseSuperdataActions {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<any>(null)

  const makeRequest = useCallback(async <T>(
    requestFn: () => Promise<T>,
    setDataFn?: (data: T) => void
  ): Promise<T | null> => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await requestFn()
      if (setDataFn) {
        setDataFn(result)
      }
      setData(result)
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'שגיאה לא ידועה'
      setError(errorMessage)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  const saveText = useCallback(async (textData: Omit<TextRecord, 'id' | 'createdAt' | 'updatedAt'>): Promise<TextRecord | null> => {
    return makeRequest(async () => {
      const response = await fetch('/api/superdata/texts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(textData)
      })
      
      if (!response.ok) {
        throw new Error('שגיאה בשמירת הטקסט')
      }
      
      const result = await response.json()
      if (!result.success) {
        throw new Error(result.error || 'שגיאה בשמירת הטקסט')
      }
      
      return result.data
    })
  }, [makeRequest])

  const getTexts = useCallback(async (filters?: any): Promise<TextRecord[] | null> => {
    return makeRequest(async () => {
      const params = new URLSearchParams()
      if (filters?.textType) params.append('textType', filters.textType)
      if (filters?.tags) params.append('tags', filters.tags.join(','))
      if (filters?.limit) params.append('limit', filters.limit.toString())
      if (filters?.offset) params.append('offset', filters.offset.toString())

      const response = await fetch(`/api/superdata/texts?${params}`)
      
      if (!response.ok) {
        throw new Error('שגיאה בטעינת הטקסטים')
      }
      
      const result = await response.json()
      if (!result.success) {
        throw new Error(result.error || 'שגיאה בטעינת הטקסטים')
      }
      
      return result.data
    })
  }, [makeRequest])

  const getTextById = useCallback(async (id: string): Promise<TextRecord | null> => {
    return makeRequest(async () => {
      const response = await fetch(`/api/superdata/texts/${id}`)
      
      if (!response.ok) {
        throw new Error('שגיאה בטעינת הטקסט')
      }
      
      const result = await response.json()
      if (!result.success) {
        throw new Error(result.error || 'שגיאה בטעינת הטקסט')
      }
      
      return result.data
    })
  }, [makeRequest])

  const updateText = useCallback(async (id: string, updates: Partial<TextRecord>): Promise<TextRecord | null> => {
    return makeRequest(async () => {
      const response = await fetch(`/api/superdata/texts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      })
      
      if (!response.ok) {
        throw new Error('שגיאה בעדכון הטקסט')
      }
      
      const result = await response.json()
      if (!result.success) {
        throw new Error(result.error || 'שגיאה בעדכון הטקסט')
      }
      
      return result.data
    })
  }, [makeRequest])

  const deleteText = useCallback(async (id: string): Promise<boolean> => {
    const result = await makeRequest(async () => {
      const response = await fetch(`/api/superdata/texts/${id}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        throw new Error('שגיאה במחיקת הטקסט')
      }
      
      const result = await response.json()
      if (!result.success) {
        throw new Error(result.error || 'שגיאה במחיקת הטקסט')
      }
      
      return true
    })
    
    return result !== null
  }, [makeRequest])

  const saveLearningData = useCallback(async (learningData: Omit<LearningData, 'id'>): Promise<LearningData | null> => {
    return makeRequest(async () => {
      const response = await fetch('/api/superdata/learning', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(learningData)
      })
      
      if (!response.ok) {
        throw new Error('שגיאה בשמירת נתוני הלמידה')
      }
      
      const result = await response.json()
      if (!result.success) {
        throw new Error(result.error || 'שגיאה בשמירת נתוני הלמידה')
      }
      
      return result.data
    })
  }, [makeRequest])

  const getLearningData = useCallback(async (userId: string, limit?: number): Promise<LearningData[] | null> => {
    return makeRequest(async () => {
      const params = new URLSearchParams()
      params.append('userId', userId)
      if (limit) params.append('limit', limit.toString())

      const response = await fetch(`/api/superdata/learning?${params}`)
      
      if (!response.ok) {
        throw new Error('שגיאה בטעינת נתוני הלמידה')
      }
      
      const result = await response.json()
      if (!result.success) {
        throw new Error(result.error || 'שגיאה בטעינת נתוני הלמידה')
      }
      
      return result.data
    })
  }, [makeRequest])

  const getTextAnalytics = useCallback(async (filters?: any): Promise<any> => {
    return makeRequest(async () => {
      const params = new URLSearchParams()
      if (filters?.textType) params.append('textType', filters.textType)
      if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom)
      if (filters?.dateTo) params.append('dateTo', filters.dateTo)

      const response = await fetch(`/api/superdata/analytics/texts?${params}`)
      
      if (!response.ok) {
        throw new Error('שגיאה בטעינת נתוני הניתוח')
      }
      
      const result = await response.json()
      if (!result.success) {
        throw new Error(result.error || 'שגיאה בטעינת נתוני הניתוח')
      }
      
      return result.data
    })
  }, [makeRequest])

  const getLearningInsights = useCallback(async (userId: string): Promise<any> => {
    return makeRequest(async () => {
      const response = await fetch(`/api/superdata/analytics/learning/${userId}`)
      
      if (!response.ok) {
        throw new Error('שגיאה בטעינת תובנות הלמידה')
      }
      
      const result = await response.json()
      if (!result.success) {
        throw new Error(result.error || 'שגיאה בטעינת תובנות הלמידה')
      }
      
      return result.data
    })
  }, [makeRequest])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    isLoading,
    error,
    data,
    saveText,
    getTexts,
    getTextById,
    updateText,
    deleteText,
    saveLearningData,
    getLearningData,
    getTextAnalytics,
    getLearningInsights,
    clearError
  }
}
