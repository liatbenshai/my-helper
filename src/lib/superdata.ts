import axios from 'axios'

interface SuperdataConfig {
  apiKey: string
  databaseId: string
  baseUrl: string
}

interface TextRecord {
  id?: string
  title: string
  content: string
  textType: string
  style: string
  tags: string[]
  createdAt?: string
  updatedAt?: string
  metadata?: Record<string, any>
}

interface LearningData {
  id?: string
  userId: string
  textId: string
  improvementType: string
  originalText: string
  improvedText: string
  feedback: string
  rating: number
  createdAt: string
}

class SuperdataClient {
  private config: SuperdataConfig

  constructor() {
    this.config = {
      apiKey: process.env.SUPERDATA_API_KEY || '',
      databaseId: process.env.SUPERDATA_DATABASE_ID || '',
      baseUrl: 'https://api.superdata.com/v1'
    }
  }

  private getHeaders() {
    return {
      'Authorization': `Bearer ${this.config.apiKey}`,
      'Content-Type': 'application/json',
    }
  }

  // Text Management
  async saveText(textData: Omit<TextRecord, 'id' | 'createdAt' | 'updatedAt'>): Promise<TextRecord> {
    try {
      const response = await axios.post(
        `${this.config.baseUrl}/databases/${this.config.databaseId}/texts`,
        {
          ...textData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        { headers: this.getHeaders() }
      )
      return response.data
    } catch (error) {
      console.error('Error saving text to Superdata:', error)
      throw new Error('שגיאה בשמירת הטקסט')
    }
  }

  async getTexts(filters?: {
    textType?: string
    tags?: string[]
    limit?: number
    offset?: number
  }): Promise<TextRecord[]> {
    try {
      const params = new URLSearchParams()
      if (filters?.textType) params.append('textType', filters.textType)
      if (filters?.tags) params.append('tags', filters.tags.join(','))
      if (filters?.limit) params.append('limit', filters.limit.toString())
      if (filters?.offset) params.append('offset', filters.offset.toString())

      const response = await axios.get(
        `${this.config.baseUrl}/databases/${this.config.databaseId}/texts?${params}`,
        { headers: this.getHeaders() }
      )
      return response.data
    } catch (error) {
      console.error('Error fetching texts from Superdata:', error)
      throw new Error('שגיאה בטעינת הטקסטים')
    }
  }

  async getTextById(id: string): Promise<TextRecord> {
    try {
      const response = await axios.get(
        `${this.config.baseUrl}/databases/${this.config.databaseId}/texts/${id}`,
        { headers: this.getHeaders() }
      )
      return response.data
    } catch (error) {
      console.error('Error fetching text by ID:', error)
      throw new Error('שגיאה בטעינת הטקסט')
    }
  }

  async updateText(id: string, updates: Partial<TextRecord>): Promise<TextRecord> {
    try {
      const response = await axios.patch(
        `${this.config.baseUrl}/databases/${this.config.databaseId}/texts/${id}`,
        {
          ...updates,
          updatedAt: new Date().toISOString()
        },
        { headers: this.getHeaders() }
      )
      return response.data
    } catch (error) {
      console.error('Error updating text:', error)
      throw new Error('שגיאה בעדכון הטקסט')
    }
  }

  async deleteText(id: string): Promise<void> {
    try {
      await axios.delete(
        `${this.config.baseUrl}/databases/${this.config.databaseId}/texts/${id}`,
        { headers: this.getHeaders() }
      )
    } catch (error) {
      console.error('Error deleting text:', error)
      throw new Error('שגיאה במחיקת הטקסט')
    }
  }

  // Learning Data Management
  async saveLearningData(learningData: Omit<LearningData, 'id'>): Promise<LearningData> {
    try {
      const response = await axios.post(
        `${this.config.baseUrl}/databases/${this.config.databaseId}/learning`,
        learningData,
        { headers: this.getHeaders() }
      )
      return response.data
    } catch (error) {
      console.error('Error saving learning data:', error)
      throw new Error('שגיאה בשמירת נתוני הלמידה')
    }
  }

  async getLearningData(userId: string, limit?: number): Promise<LearningData[]> {
    try {
      const params = new URLSearchParams()
      params.append('userId', userId)
      if (limit) params.append('limit', limit.toString())

      const response = await axios.get(
        `${this.config.baseUrl}/databases/${this.config.databaseId}/learning?${params}`,
        { headers: this.getHeaders() }
      )
      return response.data
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
    try {
      const params = new URLSearchParams()
      if (filters?.textType) params.append('textType', filters.textType)
      if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom)
      if (filters?.dateTo) params.append('dateTo', filters.dateTo)

      const response = await axios.get(
        `${this.config.baseUrl}/databases/${this.config.databaseId}/analytics/texts?${params}`,
        { headers: this.getHeaders() }
      )
      return response.data
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
    try {
      const response = await axios.get(
        `${this.config.baseUrl}/databases/${this.config.databaseId}/analytics/learning/${userId}`,
        { headers: this.getHeaders() }
      )
      return response.data
    } catch (error) {
      console.error('Error fetching learning insights:', error)
      throw new Error('שגיאה בטעינת תובנות הלמידה')
    }
  }
}

export const superdataClient = new SuperdataClient()
export type { TextRecord, LearningData }
