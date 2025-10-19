import { createClient } from '@supabase/supabase-js'
import { TextRecord, LearningData } from '@/types'

interface SupabaseConfig {
  url: string
  anonKey: string
}

class SupabaseClient {
  private supabase: any

  constructor() {
    const config: SupabaseConfig = {
      url: process.env.SUPABASE_URL || '',
      anonKey: process.env.SUPABASE_ANON_KEY || ''
    }

    if (!config.url || !config.anonKey) {
      console.warn('Supabase configuration missing')
      // Create a mock client for build time
      this.supabase = null
    } else {
      this.supabase = createClient(config.url, config.anonKey)
    }
  }

  // Text Management
  async saveText(textData: Omit<TextRecord, 'id' | 'createdAt' | 'updatedAt'>): Promise<TextRecord> {
    if (!this.supabase) {
      throw new Error('Supabase client not initialized')
    }
    
    try {
      const { data, error } = await this.supabase
        .from('texts')
        .insert({
          ...textData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) throw error

      return {
        ...data,
        id: data.id,
        createdAt: data.created_at,
        updatedAt: data.updated_at
      }
    } catch (error) {
      console.error('Error saving text to Supabase:', error)
      throw new Error('שגיאה בשמירת הטקסט')
    }
  }

  async getTexts(filters?: {
    textType?: string
    tags?: string[]
    limit?: number
    offset?: number
  }): Promise<TextRecord[]> {
    if (!this.supabase) {
      throw new Error('Supabase client not initialized')
    }
    
    try {
      let query = this.supabase
        .from('texts')
        .select('*')
        .order('created_at', { ascending: false })

      if (filters?.textType) {
        query = query.eq('text_type', filters.textType)
      }

      if (filters?.tags && filters.tags.length > 0) {
        query = query.contains('tags', filters.tags)
      }

      if (filters?.limit) {
        query = query.limit(filters.limit)
      }

      if (filters?.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
      }

      const { data, error } = await query

      if (error) throw error

      return data.map((item: any) => ({
        ...item,
        id: item.id,
        textType: item.text_type,
        createdAt: item.created_at,
        updatedAt: item.updated_at
      }))
    } catch (error) {
      console.error('Error fetching texts from Supabase:', error)
      throw new Error('שגיאה בטעינת הטקסטים')
    }
  }

  async getTextById(id: string): Promise<TextRecord> {
    if (!this.supabase) {
      throw new Error('Supabase client not initialized')
    }
    
    try {
      const { data, error } = await this.supabase
        .from('texts')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error

      return {
        ...data,
        id: data.id,
        textType: data.text_type,
        createdAt: data.created_at,
        updatedAt: data.updated_at
      }
    } catch (error) {
      console.error('Error fetching text by ID:', error)
      throw new Error('שגיאה בטעינת הטקסט')
    }
  }

  async updateText(id: string, updates: Partial<TextRecord>): Promise<TextRecord> {
    if (!this.supabase) {
      throw new Error('Supabase client not initialized')
    }
    
    try {
      const { data, error } = await this.supabase
        .from('texts')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      return {
        ...data,
        id: data.id,
        textType: data.text_type,
        createdAt: data.created_at,
        updatedAt: data.updated_at
      }
    } catch (error) {
      console.error('Error updating text:', error)
      throw new Error('שגיאה בעדכון הטקסט')
    }
  }

  async deleteText(id: string): Promise<void> {
    if (!this.supabase) {
      throw new Error('Supabase client not initialized')
    }
    
    try {
      const { error } = await this.supabase
        .from('texts')
        .delete()
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      console.error('Error deleting text:', error)
      throw new Error('שגיאה במחיקת הטקסט')
    }
  }

  // Learning Data Management
  async saveLearningData(learningData: Omit<LearningData, 'id'>): Promise<LearningData> {
    if (!this.supabase) {
      throw new Error('Supabase client not initialized')
    }
    
    try {
      const { data, error } = await this.supabase
        .from('learning_data')
        .insert({
          user_id: learningData.userId,
          text_id: learningData.textId,
          improvement_type: learningData.improvementType,
          original_text: learningData.originalText,
          improved_text: learningData.improvedText,
          feedback: learningData.feedback || '',
          rating: learningData.rating,
          created_at: learningData.createdAt
        })
        .select()
        .single()

      if (error) throw error

      return {
        id: data.id,
        userId: data.user_id,
        textId: data.text_id,
        improvementType: data.improvement_type,
        originalText: data.original_text,
        improvedText: data.improved_text,
        feedback: data.feedback,
        rating: data.rating,
        createdAt: data.created_at
      }
    } catch (error) {
      console.error('Error saving learning data:', error)
      throw new Error('שגיאה בשמירת נתוני הלמידה')
    }
  }

  async getLearningData(userId: string, limit?: number): Promise<LearningData[]> {
    if (!this.supabase) {
      throw new Error('Supabase client not initialized')
    }
    
    try {
      let query = this.supabase
        .from('learning_data')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (limit) {
        query = query.limit(limit)
      }

      const { data, error } = await query

      if (error) throw error

      return data.map((item: any) => ({
        id: item.id,
        userId: item.user_id,
        textId: item.text_id,
        improvementType: item.improvement_type,
        originalText: item.original_text,
        improvedText: item.improved_text,
        feedback: item.feedback,
        rating: item.rating,
        createdAt: item.created_at
      }))
    } catch (error) {
      console.error('Error fetching learning data:', error)
      throw new Error('שגיאה בטעינת נתוני הלמידה')
    }
  }

  // Analytics and Insights
  async getTextAnalytics(filters?: {
    textType?: string
    dateFrom?: string
    dateTo?: string
  }): Promise<{
    totalTexts: number
    textsByType: Record<string, number>
    averageLength: number
    mostUsedTags: Array<{ tag: string; count: number }>
  }> {
    if (!this.supabase) {
      throw new Error('Supabase client not initialized')
    }
    
    try {
      let query = this.supabase
        .from('texts')
        .select('text_type, content, tags')

      if (filters?.textType) {
        query = query.eq('text_type', filters.textType)
      }

      if (filters?.dateFrom) {
        query = query.gte('created_at', filters.dateFrom)
      }

      if (filters?.dateTo) {
        query = query.lte('created_at', filters.dateTo)
      }

      const { data, error } = await query

      if (error) throw error

      const totalTexts = data.length
      const textsByType = data.reduce((acc: Record<string, number>, item: any) => {
        acc[item.text_type] = (acc[item.text_type] || 0) + 1
        return acc
      }, {})

      const averageLength = data.reduce((sum: number, item: any) => sum + item.content.length, 0) / totalTexts

      const tagCounts: Record<string, number> = {}
      data.forEach((item: any) => {
        if (item.tags) {
          item.tags.forEach((tag: string) => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1
          })
        }
      })

      const mostUsedTags = Object.entries(tagCounts)
        .map(([tag, count]) => ({ tag, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10)

      return {
        totalTexts,
        textsByType,
        averageLength,
        mostUsedTags
      }
    } catch (error) {
      console.error('Error fetching text analytics:', error)
      throw new Error('שגיאה בטעינת נתוני הניתוח')
    }
  }

  async getLearningInsights(userId: string): Promise<{
    totalImprovements: number
    averageRating: number
    improvementTypes: Record<string, number>
    progressOverTime: Array<{ date: string; count: number }>
  }> {
    if (!this.supabase) {
      throw new Error('Supabase client not initialized')
    }
    
    try {
      const { data, error } = await this.supabase
        .from('learning_data')
        .select('*')
        .eq('user_id', userId)

      if (error) throw error

      const totalImprovements = data.length
      const averageRating = data.reduce((sum: number, item: any) => sum + item.rating, 0) / totalImprovements

      const improvementTypes = data.reduce((acc: Record<string, number>, item: any) => {
        acc[item.improvement_type] = (acc[item.improvement_type] || 0) + 1
        return acc
      }, {})

      const progressOverTime = data.reduce((acc: Record<string, number>, item: any) => {
        const date = item.created_at.split('T')[0]
        acc[date] = (acc[date] || 0) + 1
        return acc
      }, {})

      const progressArray = Object.entries(progressOverTime)
        .map(([date, count]) => ({ date, count: count as number }))
        .sort((a, b) => a.date.localeCompare(b.date))

      return {
        totalImprovements,
        averageRating,
        improvementTypes,
        progressOverTime: progressArray
      }
    } catch (error) {
      console.error('Error fetching learning insights:', error)
      throw new Error('שגיאה בטעינת תובנות הלמידה')
    }
  }
}

export const supabaseClient = new SupabaseClient()
export type { TextRecord, LearningData }
