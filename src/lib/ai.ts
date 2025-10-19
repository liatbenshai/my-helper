import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface AIGenerationRequest {
  prompt: string
  textType: 'legal' | 'business' | 'academic' | 'creative' | 'technical'
  context?: string
  style?: 'formal' | 'casual' | 'professional' | 'persuasive'
  length?: 'short' | 'medium' | 'long'
  targetAudience?: string
}

export interface AIImprovementRequest {
  text: string
  improvementType: 'grammar' | 'style' | 'clarity' | 'professional' | 'comprehensive'
  targetAudience?: string
  context?: string
}

export interface AIResponse {
  success: boolean
  text?: string
  originalText?: string
  improvedText?: string
  metadata?: {
    textType?: string
    style?: string
    length?: string
    tokens?: number
    improvementType?: string
  }
  error?: string
}

class AIService {
  private systemPrompts = {
    legal: `אתה מומחה לכתיבת מסמכים משפטיים בעברית. התמחותך כוללת:
- חוזים והסכמים
- צוואות וירושות
- כתבי תביעה והגנה
- מסמכים משפטיים רשמיים

השתמש בשפה משפטית מדויקת, תקנית ומקצועית. הקפד על:
- דיוק משפטי
- מבנה ברור ומובנה
- שפה רשמית ומכובדת
- פיסוק נכון ומדויק`,

    business: `אתה מומחה לכתיבת מסמכים עסקיים בעברית. התמחותך כוללת:
- הצעות עסקיות
- דוחות ומצגות
- מכתבים רשמיים
- תוכניות עסקיות

השתמש בשפה מקצועית, ברורה ומשכנעת. הקפד על:
- מבנה לוגי וברור
- שפה מקצועית ומכובדת
- עובדות ונתונים מדויקים
- קריאות ונגישות`,

    academic: `אתה מומחה לכתיבת טקסטים אקדמיים בעברית. התמחותך כוללת:
- מאמרים מחקריים
- עבודות גמר ותזה
- סיכומים וביקורות
- פרסומים אקדמיים

השתמש בשפה מדעית, מדויקת ואובייקטיבית. הקפד על:
- דיוק מדעי ואקדמי
- מבנה מחקרי ברור
- ציטוטים ומקורות
- שפה אובייקטיבית ומקצועית`,

    creative: `אתה מומחה לכתיבה יצירתית בעברית. התמחותך כוללת:
- סיפורים ושירה
- מאמרים אישיים
- בלוגים וכתבות
- תוכן יצירתי

השתמש בשפה עשירה, מעניינת ורגשית. הקפד על:
- יצירתיות ומקוריות
- שפה עשירה ומגוונת
- מבנה מעניין ומושך
- הבעה רגשית ואנושית`,

    technical: `אתה מומחה לכתיבת טקסטים טכניים בעברית. התמחותך כוללת:
- מדריכים והוראות
- תיעוד טכני
- מפרטים טכניים
- הוראות שימוש

השתמש בשפה ברורה, מדויקת ונגישה. הקפד על:
- דיוק טכני
- מבנה לוגי וברור
- שפה פשוטה ומובנת
- הוראות מדויקות ומובנות`
  }

  private stylePrompts = {
    formal: 'השתמש בשפה רשמית ומכובדת, עם מבנה מסורתי ומכובד.',
    casual: 'השתמש בשפה פשוטה וידידותית, עם מבנה נינוח ונגיש.',
    professional: 'השתמש בשפה מקצועית ומדויקת, עם מבנה ברור ומאורגן.',
    persuasive: 'השתמש בשפה משכנעת ומנומקת, עם מבנה שנועד לשכנע ולשנות דעות.'
  }

  private lengthPrompts = {
    short: 'כתוב טקסט קצר וממוקד, עם מידע חיוני בלבד.',
    medium: 'כתוב טקסט באורך בינוני, עם פרטים רלוונטיים ומפורטים.',
    long: 'כתוב טקסט מפורט ומקיף, עם כל הפרטים הנדרשים והסברים מפורטים.'
  }

  async generateText(request: AIGenerationRequest): Promise<AIResponse> {
    try {
      const systemPrompt = this.buildSystemPrompt(request)
      
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: this.buildUserPrompt(request)
          }
        ],
        max_tokens: this.getMaxTokens(request.length),
        temperature: 0.7,
      })

      const generatedText = completion.choices[0]?.message?.content || ''

      return {
        success: true,
        text: generatedText,
        metadata: {
          textType: request.textType,
          style: request.style,
          length: request.length,
          tokens: completion.usage?.total_tokens || 0
        }
      }

    } catch (error) {
      console.error('Error generating text:', error)
      return {
        success: false,
        error: 'שגיאה ביצירת הטקסט'
      }
    }
  }

  async improveText(request: AIImprovementRequest): Promise<AIResponse> {
    try {
      const systemPrompt = this.buildImprovementPrompt(request)
      
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: this.buildImprovementUserPrompt(request)
          }
        ],
        max_tokens: 1500,
        temperature: 0.3,
      })

      const improvedText = completion.choices[0]?.message?.content || ''

      return {
        success: true,
        originalText: request.text,
        improvedText: improvedText,
        metadata: {
          improvementType: request.improvementType,
          tokens: completion.usage?.total_tokens || 0
        }
      }

    } catch (error) {
      console.error('Error improving text:', error)
      return {
        success: false,
        error: 'שגיאה בשיפור הטקסט'
      }
    }
  }

  private buildSystemPrompt(request: AIGenerationRequest): string {
    let prompt = this.systemPrompts[request.textType]
    
    if (request.style) {
      prompt += `\n\n${this.stylePrompts[request.style]}`
    }
    
    if (request.length) {
      prompt += `\n\n${this.lengthPrompts[request.length]}`
    }
    
    if (request.targetAudience) {
      prompt += `\n\nקהל היעד: ${request.targetAudience}`
    }
    
    prompt += `\n\nכתוב את הטקסט בעברית תקנית, עם פיסוק נכון ומבנה ברור.`
    
    return prompt
  }

  private buildUserPrompt(request: AIGenerationRequest): string {
    let prompt = `בקשה: ${request.prompt}`
    
    if (request.context) {
      prompt = `הקשר: ${request.context}\n\n${prompt}`
    }
    
    return prompt
  }

  private buildImprovementPrompt(request: AIImprovementRequest): string {
    const improvementPrompts = {
      grammar: 'התמקד בתיקון שגיאות דקדוק, פיסוק, ואיות. וודא שהטקסט עומד בכללי העברית התקנית.',
      style: 'שפר את הסגנון והזרימה של הטקסט. השתמש בשפה עשירה ומגוונת יותר.',
      clarity: 'התמקד בבהירות והבנה. וודא שהטקסט ברור וקל להבנה.',
      professional: 'הפוך את הטקסט למקצועי יותר. השתמש בשפה רשמית ומכובדת.',
      comprehensive: 'בצע שיפור מקיף - דקדוק, סגנון, בהירות, ומקצועיות.'
    }

    let prompt = `אתה מומחה לשיפור טקסטים בעברית. המטרה שלך היא לשפר טקסטים קיימים ולהפוך אותם לעברית תקנית, מקצועית וברורה.`
    prompt += `\n\n${improvementPrompts[request.improvementType]}`
    
    if (request.targetAudience) {
      prompt += `\n\nקהל היעד: ${request.targetAudience}`
    }
    
    if (request.context) {
      prompt += `\n\nהקשר: ${request.context}`
    }
    
    prompt += `\n\nהחזר את הטקסט המשופר בלבד, ללא הסברים נוספים.`
    
    return prompt
  }

  private buildImprovementUserPrompt(request: AIImprovementRequest): string {
    return `טקסט לשיפור:\n${request.text}`
  }

  private getMaxTokens(length?: string): number {
    switch (length) {
      case 'short': return 500
      case 'medium': return 1000
      case 'long': return 2000
      default: return 1000
    }
  }
}

export const aiService = new AIService()
