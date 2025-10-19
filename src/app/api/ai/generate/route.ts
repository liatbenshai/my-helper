import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { z } from 'zod'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const GenerateRequestSchema = z.object({
  prompt: z.string().min(1),
  textType: z.string(),
  context: z.string().optional(),
  style: z.string().optional(),
  length: z.enum(['short', 'medium', 'long']).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, textType, context, style, length } = GenerateRequestSchema.parse(body)

    // Build system prompt based on text type
    const systemPrompt = buildSystemPrompt(textType, style, length)
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: `הקשר: ${context || 'אין הקשר מיוחד'}\n\nבקשה: ${prompt}`
        }
      ],
      max_tokens: length === 'long' ? 2000 : length === 'medium' ? 1000 : 500,
      temperature: 0.7,
    })

    const generatedText = completion.choices[0]?.message?.content || ''

    return NextResponse.json({
      success: true,
      text: generatedText,
      metadata: {
        textType,
        style,
        length,
        tokens: completion.usage?.total_tokens || 0
      }
    })

  } catch (error) {
    console.error('Error generating text:', error)
    return NextResponse.json(
      { success: false, error: 'שגיאה ביצירת הטקסט' },
      { status: 500 }
    )
  }
}

function buildSystemPrompt(textType: string, style?: string, length?: string): string {
  const basePrompt = `אתה עוזר כתיבה מקצועי בעברית. אתה מתמחה בכתיבת טקסטים משפטיים, עסקיים ואקדמיים בעברית תקנית ומקצועית.`
  
  const typePrompts = {
    'legal': 'התמחותך היא בכתיבת מסמכים משפטיים - חוזים, צוואות, הסכמים, וכתבי תביעה. השתמש בשפה משפטית מדויקת ותקנית.',
    'business': 'התמחותך היא בכתיבת מסמכים עסקיים - הצעות, דוחות, מכתבים רשמיים, ופרזנטציות. השתמש בשפה מקצועית וברורה.',
    'academic': 'התמחותך היא בכתיבת טקסטים אקדמיים - מאמרים, עבודות מחקר, וסיכומים. השתמש בשפה מדעית ומדויקת.',
    'creative': 'התמחותך היא בכתיבה יצירתית - סיפורים, שירים, ומאמרים אישיים. השתמש בשפה עשירה ומעניינת.',
    'technical': 'התמחותך היא בכתיבת טקסטים טכניים - מדריכים, תיעוד, והוראות שימוש. השתמש בשפה ברורה ומדויקת.'
  }

  const stylePrompts = {
    'formal': 'השתמש בשפה רשמית ומכובדת.',
    'casual': 'השתמש בשפה פשוטה וידידותית.',
    'professional': 'השתמש בשפה מקצועית ומדויקת.',
    'persuasive': 'השתמש בשפה משכנעת ומנומקת.'
  }

  const lengthPrompts = {
    'short': 'כתוב טקסט קצר וממוקד.',
    'medium': 'כתוב טקסט באורך בינוני עם פרטים רלוונטיים.',
    'long': 'כתוב טקסט מפורט ומקיף.'
  }

  let prompt = basePrompt
  prompt += ` ${typePrompts[textType as keyof typeof typePrompts] || ''}`
  if (style) prompt += ` ${stylePrompts[style as keyof typeof stylePrompts] || ''}`
  if (length) prompt += ` ${lengthPrompts[length as keyof typeof lengthPrompts] || ''}`
  
  prompt += `\n\nכתוב את הטקסט בעברית תקנית, עם פיסוק נכון ומבנה ברור.`

  return prompt
}
