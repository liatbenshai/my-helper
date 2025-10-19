import { NextRequest, NextResponse } from 'next/server'
import { supabaseClient, TextRecord } from '@/lib/supabase'
import { z } from 'zod'

const CreateTextSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  textType: z.enum(['legal', 'business', 'academic', 'creative', 'technical']),
  style: z.enum(['formal', 'casual', 'professional', 'persuasive']),
  tags: z.array(z.string()).optional().default([]),
  metadata: z.record(z.any()).optional()
})

const UpdateTextSchema = z.object({
  title: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  textType: z.string().optional(),
  style: z.string().optional(),
  tags: z.array(z.string()).optional(),
  metadata: z.record(z.any()).optional()
})

// GET /api/superdata/texts - Get all texts with optional filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const textType = searchParams.get('textType')
    const tags = searchParams.get('tags')?.split(',')
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : undefined

    const filters = {
      textType: textType || undefined,
      tags: tags || undefined,
      limit,
      offset
    }

    const texts = await supabaseClient.getTexts(filters)

    return NextResponse.json({
      success: true,
      data: texts,
      count: texts.length
    })

  } catch (error) {
    console.error('Error fetching texts:', error)
    return NextResponse.json(
      { success: false, error: 'שגיאה בטעינת הטקסטים' },
      { status: 500 }
    )
  }
}

// POST /api/superdata/texts - Create new text
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const textData = CreateTextSchema.parse(body)

    const savedText = await supabaseClient.saveText(textData)

    return NextResponse.json({
      success: true,
      data: savedText
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating text:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'נתונים לא תקינים', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { success: false, error: 'שגיאה ביצירת הטקסט' },
      { status: 500 }
    )
  }
}
