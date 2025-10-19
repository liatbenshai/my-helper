import { NextRequest, NextResponse } from 'next/server'
import { superdataClient } from '@/lib/superdata'
import { z } from 'zod'

const UpdateTextSchema = z.object({
  title: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  textType: z.string().optional(),
  style: z.string().optional(),
  tags: z.array(z.string()).optional(),
  metadata: z.record(z.any()).optional()
})

// GET /api/superdata/texts/[id] - Get text by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'מזהה טקסט חסר' },
        { status: 400 }
      )
    }

    const text = await superdataClient.getTextById(id)

    return NextResponse.json({
      success: true,
      data: text
    })

  } catch (error) {
    console.error('Error fetching text:', error)
    return NextResponse.json(
      { success: false, error: 'שגיאה בטעינת הטקסט' },
      { status: 500 }
    )
  }
}

// PATCH /api/superdata/texts/[id] - Update text
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    const updates = UpdateTextSchema.parse(body)

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'מזהה טקסט חסר' },
        { status: 400 }
      )
    }

    const updatedText = await superdataClient.updateText(id, updates)

    return NextResponse.json({
      success: true,
      data: updatedText
    })

  } catch (error) {
    console.error('Error updating text:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'נתונים לא תקינים', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { success: false, error: 'שגיאה בעדכון הטקסט' },
      { status: 500 }
    )
  }
}

// DELETE /api/superdata/texts/[id] - Delete text
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'מזהה טקסט חסר' },
        { status: 400 }
      )
    }

    await superdataClient.deleteText(id)

    return NextResponse.json({
      success: true,
      message: 'הטקסט נמחק בהצלחה'
    })

  } catch (error) {
    console.error('Error deleting text:', error)
    return NextResponse.json(
      { success: false, error: 'שגיאה במחיקת הטקסט' },
      { status: 500 }
    )
  }
}
