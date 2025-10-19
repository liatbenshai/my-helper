// Text Types
export interface TextRecord {
  id?: string
  title: string
  content: string
  textType: TextType
  style: TextStyle
  tags: string[]
  createdAt?: string
  updatedAt?: string
  metadata?: Record<string, any>
}

export type TextType = 'legal' | 'business' | 'academic' | 'creative' | 'technical'
export type TextStyle = 'formal' | 'casual' | 'professional' | 'persuasive'
export type TextLength = 'short' | 'medium' | 'long'

// Learning Types
export interface LearningData {
  id?: string
  userId: string
  textId: string
  improvementType: ImprovementType
  originalText: string
  improvedText: string
  feedback: string
  rating: number
  createdAt: string
}

export type ImprovementType = 'grammar' | 'style' | 'clarity' | 'professional' | 'comprehensive'

// AI Types
export interface AIGenerationRequest {
  prompt: string
  textType: TextType
  context?: string
  style?: TextStyle
  length?: TextLength
  targetAudience?: string
}

export interface AIImprovementRequest {
  text: string
  improvementType: ImprovementType
  targetAudience?: string
  context?: string
}

export interface AIResponse {
  success: boolean
  text?: string
  originalText?: string
  improvedText?: string
  metadata?: {
    textType?: TextType
    style?: TextStyle
    length?: TextLength
    tokens?: number
    improvementType?: ImprovementType
  }
  error?: string
}

// Analytics Types
export interface TextAnalytics {
  totalTexts: number
  textsByType: Record<TextType, number>
  averageLength: number
  mostUsedTags: Array<{ tag: string; count: number }>
}

export interface LearningInsights {
  totalImprovements: number
  averageRating: number
  improvementTypes: Record<ImprovementType, number>
  progressOverTime: Array<{ date: string; count: number }>
}

// User Types
export interface User {
  id: string
  name: string
  email: string
  preferences: UserPreferences
  createdAt: string
  lastActiveAt: string
}

export interface UserPreferences {
  defaultTextType: TextType
  defaultStyle: TextStyle
  defaultLength: TextLength
  language: 'he' | 'en'
  theme: 'light' | 'dark'
  notifications: {
    email: boolean
    push: boolean
    updates: boolean
  }
}

// Form Types
export interface TextFormData {
  title: string
  content: string
  textType: TextType
  style: TextStyle
  length: TextLength
  tags: string[]
  context?: string
  targetAudience?: string
}

export interface ImprovementFormData {
  text: string
  improvementType: ImprovementType
  targetAudience?: string
  context?: string
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
  metadata?: Record<string, any>
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Component Props Types
export interface TextEditorProps {
  initialText?: string
  onSave?: (text: string) => void
  onImprove?: (text: string) => void
  placeholder?: string
  className?: string
  readonly?: boolean
}

export interface TextCardProps {
  text: TextRecord
  onEdit?: (text: TextRecord) => void
  onDelete?: (id: string) => void
  onImprove?: (text: TextRecord) => void
}

export interface AnalyticsCardProps {
  title: string
  value: string | number
  change?: number
  trend?: 'up' | 'down' | 'stable'
  icon?: React.ComponentType<any>
}

// Error Types
export interface AppError {
  code: string
  message: string
  details?: any
  timestamp: string
}

// Configuration Types
export interface AppConfig {
  ai: {
    model: string
    maxTokens: number
    temperature: number
  }
  superdata: {
    apiKey: string
    databaseId: string
    baseUrl: string
  }
  features: {
    textGeneration: boolean
    textImprovement: boolean
    analytics: boolean
    learning: boolean
  }
}
