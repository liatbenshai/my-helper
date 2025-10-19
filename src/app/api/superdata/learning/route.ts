import { NextRequest, NextResponse } from 'next/server'
import { superdataClient } from '@/lib/superdata'
import { z } from 'zod'

const SaveLearningDataSchema = z.object({
  userId: z.string().min(1),
  textId: z.string().min(1),
  improvementType: z.string(),
  originalText: z.string().min(1),
  improvedText: z.string().min(1),
  feedback: z.string().optional(),
  rating: z.number().min(1).max(5)
})

// GET /api/superdata/learning - Get learning data for user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'מזהה משתמש חסר' },
        { status: 400 }
      )
    }

    const learningData = await superdataClient.getLearningData(userId, limit)

    return NextResponse.json({
      success: true,
      data: learningData,
      count: learningData.length
    })

  } catch (error) {
    console.error('Error fetching learning data:', error)
    return NextResponse.json(
      { success: false, error: 'שגיאה בטעינת נתוני הלמידה' },
      { status: 500 }
    )
  }
}

// POST /api/superdata/learning - Save learning data
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const learningData = SaveLearningDataSchema.parse({
      ...body,
      createdAt: new Date().toISOString()
    })

    const savedData = await superdataClient.saveLearningData(learningData)

    return NextResponse.json({
      success: true,
      data: savedData
    }, { status: 201 })

  } catch (error) {
    console.error('Error saving learning data:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'נתונים לא תקינים', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { success: false, error: 'שגיאה בשמירת נתוני הלמידה' },
      { status: 500 }
    )
  }
}
