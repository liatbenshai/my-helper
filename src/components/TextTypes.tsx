'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ScaleIcon, 
  BriefcaseIcon, 
  AcademicCapIcon, 
  LightBulbIcon,
  CogIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  NewspaperIcon,
  MegaphoneIcon,
  HeartIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'

const textTypes = [
  {
    icon: ScaleIcon,
    title: 'מסמכים משפטיים',
    description: 'חוזים, צוואות, הסכמים, כתבי תביעה ומסמכים משפטיים אחרים',
    examples: ['חוזה שכירות', 'צוואה', 'הסכם עבודה', 'כתב תביעה'],
    color: 'bg-blue-100 text-blue-600'
  },
  {
    icon: BriefcaseIcon,
    title: 'מסמכים עסקיים',
    description: 'הצעות, דוחות, מכתבים רשמיים, פרזנטציות ומסמכים עסקיים',
    examples: ['הצעת מחיר', 'דוח שנתי', 'מכתב רשמי', 'פרזנטציה'],
    color: 'bg-green-100 text-green-600'
  },
  {
    icon: AcademicCapIcon,
    title: 'טקסטים אקדמיים',
    description: 'מאמרים, עבודות מחקר, סיכומים וטקסטים אקדמיים',
    examples: ['מאמר מחקר', 'עבודת גמר', 'סיכום שיעור', 'ביקורת ספרות'],
    color: 'bg-purple-100 text-purple-600'
  },
  {
    icon: EnvelopeIcon,
    title: 'מענה על מיילים',
    description: 'מכתבים רשמיים, מענה לקוחות, תקשורת עסקית ומכתבים אישיים',
    examples: ['מכתב רשמי', 'מענה לקוח', 'מייל עסקי', 'מכתב תודה'],
    color: 'bg-indigo-100 text-indigo-600'
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: 'כתיבת פוסטים',
    description: 'פוסטים ברשתות חברתיות, בלוגים, תוכן דיגיטלי ופוסטים מקצועיים',
    examples: ['פוסט פייסבוק', 'פוסט לינקדאין', 'בלוג פוסט', 'תוכן אינסטגרם'],
    color: 'bg-pink-100 text-pink-600'
  },
  {
    icon: DocumentTextIcon,
    title: 'כתיבת מאמרים',
    description: 'מאמרים מקצועיים, מאמרי דעה, מאמרים טכניים ומאמרים אקדמיים',
    examples: ['מאמר מקצועי', 'מאמר דעה', 'מאמר טכני', 'מאמר אקדמי'],
    color: 'bg-teal-100 text-teal-600'
  },
  {
    icon: NewspaperIcon,
    title: 'תוכן עיתונאי',
    description: 'כתבות, חדשות, ראיונות, דיווחים ותוכן עיתונאי מקצועי',
    examples: ['כתבה חדשותית', 'ראיון', 'דיווח', 'מאמר עיתונאי'],
    color: 'bg-orange-100 text-orange-600'
  },
  {
    icon: MegaphoneIcon,
    title: 'תוכן שיווקי',
    description: 'טקסטים שיווקיים, פרסומות, תיאורי מוצרים ותוכן מכירתי',
    examples: ['טקסט פרסומת', 'תיאור מוצר', 'תוכן שיווקי', 'טקסט מכירתי'],
    color: 'bg-red-100 text-red-600'
  },
  {
    icon: LightBulbIcon,
    title: 'כתיבה יצירתית',
    description: 'סיפורים, שירים, מאמרים אישיים וכתיבה יצירתית',
    examples: ['סיפור קצר', 'שיר', 'מאמר אישי', 'בלוג'],
    color: 'bg-yellow-100 text-yellow-600'
  },
  {
    icon: HeartIcon,
    title: 'תוכן אישי',
    description: 'מכתבים אישיים, יומנים, זיכרונות ותוכן רגשי',
    examples: ['מכתב אישי', 'יומן', 'זיכרונות', 'מכתב אהבה'],
    color: 'bg-rose-100 text-rose-600'
  },
  {
    icon: UserGroupIcon,
    title: 'תוכן חברתי',
    description: 'הודעות קבוצתיות, הזמנות לאירועים, תוכן קהילתי',
    examples: ['הודעה קבוצתית', 'הזמנה לאירוע', 'תוכן קהילתי', 'הודעה רשמית'],
    color: 'bg-cyan-100 text-cyan-600'
  },
  {
    icon: CogIcon,
    title: 'טקסטים טכניים',
    description: 'מדריכים, תיעוד, הוראות שימוש וטקסטים טכניים',
    examples: ['מדריך משתמש', 'תיעוד טכני', 'הוראות התקנה', 'מדריך API'],
    color: 'bg-gray-100 text-gray-600'
  }
]

export default function TextTypes() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedText, setGeneratedText] = useState('')
  const [selectedType, setSelectedType] = useState('')

  const handleGenerateExample = async (textType: string, example: string) => {
    setIsGenerating(true)
    setSelectedType(textType)
    
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `צור ${example} מקצועי`,
          textType: textType,
          style: 'professional',
          length: 'medium'
        }),
      })

      const data = await response.json()
      
      if (data.success) {
        setGeneratedText(data.text)
      } else {
        setGeneratedText('שגיאה ביצירת הטקסט: ' + data.error)
      }
    } catch (err) {
      setGeneratedText('שגיאה בחיבור לשרת')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 hebrew-text text-center">
            סוגי טקסטים
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto hebrew-text text-center">
            תמיכה בכל סוגי הטקסטים שאתה צריך
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {textTypes.map((type, index) => (
            <motion.div
              key={type.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg ${type.color}`}>
                  <type.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mr-3 hebrew-text">
                  {type.title}
                </h3>
              </div>
              
              <p className="text-gray-600 mb-4 hebrew-text">
                {type.description}
              </p>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700 hebrew-text">דוגמאות:</h4>
                <div className="flex flex-wrap gap-2">
                  {type.examples.map((example, exampleIndex) => (
                    <button
                      key={exampleIndex}
                      onClick={() => handleGenerateExample(type.title.toLowerCase().includes('משפט') ? 'legal' : 
                                                         type.title.toLowerCase().includes('עסק') ? 'business' :
                                                         type.title.toLowerCase().includes('אקדמ') ? 'academic' :
                                                         type.title.toLowerCase().includes('יצירת') ? 'creative' :
                                                         type.title.toLowerCase().includes('טכני') ? 'technical' : 'business', example)}
                      disabled={isGenerating}
                      className="px-3 py-1 bg-gray-100 hover:bg-primary-100 text-gray-700 hover:text-primary-700 rounded-full text-sm hebrew-text transition-colors disabled:opacity-50"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
              
              {generatedText && selectedType === type.title && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h5 className="text-sm font-medium text-green-700 mb-2 hebrew-text">טקסט שנוצר:</h5>
                  <p className="text-gray-800 text-sm hebrew-text leading-relaxed">
                    {generatedText}
                  </p>
                </div>
              )}
              
              {isGenerating && selectedType === type.title && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span className="text-blue-700 text-sm hebrew-text">יוצר טקסט...</span>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
