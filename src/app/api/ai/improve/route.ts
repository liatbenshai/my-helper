import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { z } from 'zod'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

const ImproveRequestSchema = z.object({
  text: z.string().min(1),
  improvementType: z.enum(['grammar', 'style', 'clarity', 'professional', 'comprehensive']),
  targetAudience: z.string().optional(),
  context: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'OpenAI API key לא מוגדר' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { text, improvementType, targetAudience, context } = ImproveRequestSchema.parse(body)

    const systemPrompt = buildImprovementPrompt(improvementType, targetAudience)
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: `הקשר: ${context || 'אין הקשר מיוחד'}\n\nטקסט לשיפור:\n${text}`
        }
      ],
      max_tokens: 1500,
      temperature: 0.3,
    })

    const improvedText = completion.choices[0]?.message?.content || ''

    return NextResponse.json({
      success: true,
      originalText: text,
      improvedText: improvedText,
      improvementType,
      metadata: {
        tokens: completion.usage?.total_tokens || 0
      }
    })

  } catch (error) {
    console.error('Error improving text:', error)
    return NextResponse.json(
      { success: false, error: 'שגיאה בשיפור הטקסט' },
      { status: 500 }
    )
  }
}

function buildImprovementPrompt(improvementType: string, targetAudience?: string): string {
  const basePrompt = `אתה מומחה לשיפור טקסטים בעברית. המטרה שלך היא לשפר טקסטים קיימים ולהפוך אותם לעברית תקנית, מקצועית וברורה.`
  
  const improvementPrompts = {
    'grammar': 'התמקד בתיקון שגיאות דקדוק, פיסוק, ואיות. וודא שהטקסט עומד בכללי העברית התקנית.',
    'style': 'שפר את הסגנון והזרימה של הטקסט. השתמש בשפה עשירה ומגוונת יותר.',
    'clarity': 'התמקד בבהירות והבנה. וודא שהטקסט ברור וקל להבנה.',
    'professional': 'הפוך את הטקסט למקצועי יותר. השתמש בשפה רשמית ומכובדת.',
    'comprehensive': 'בצע שיפור מקיף - דקדוק, סגנון, בהירות, ומקצועיות.'
  }

  let prompt = basePrompt
  prompt += ` ${improvementPrompts[improvementType as keyof typeof improvementPrompts] || ''}`
  
  if (targetAudience) {
    prompt += `\n\nקהל היעד: ${targetAudience}`
  }
  
  prompt += `\n\nהחזר את הטקסט המשופר בלבד, ללא הסברים נוספים.`

  return prompt
}
