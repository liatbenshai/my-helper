'use client'

import { motion } from 'framer-motion'
import { 
  PencilIcon, 
  DocumentCheckIcon, 
  ChartBarIcon, 
  CloudIcon,
  ShieldCheckIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

const features = [
  {
    icon: PencilIcon,
    title: 'כתיבה חכמה',
    description: 'AI מתקדם לכתיבת טקסטים משפטיים, עסקיים ואקדמיים בעברית תקנית',
    color: 'text-blue-600'
  },
  {
    icon: DocumentCheckIcon,
    title: 'שיפור אוטומטי',
    description: 'משפר טקסטים קיימים - דקדוק, סגנון, בהירות ומקצועיות',
    color: 'text-green-600'
  },
  {
    icon: ChartBarIcon,
    title: 'ניתוח מתקדם',
    description: 'מעקב אחר התקדמות, סטטיסטיקות ותובנות על הכתיבה שלך',
    color: 'text-purple-600'
  },
  {
    icon: CloudIcon,
    title: 'שמירה בענן',
    description: 'כל הטקסטים נשמרים בבטחה בענן עם גישה מכל מקום',
    color: 'text-indigo-600'
  },
  {
    icon: ShieldCheckIcon,
    title: 'אבטחה מלאה',
    description: 'הגנה על הפרטיות והמידע שלך עם הצפנה מתקדמת',
    color: 'text-red-600'
  },
  {
    icon: ClockIcon,
    title: 'זמינות 24/7',
    description: 'המערכת זמינה בכל שעות היממה לשירות מיטבי',
    color: 'text-orange-600'
  }
]

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 hebrew-text text-center">
            תכונות מתקדמות
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto hebrew-text text-center">
            כל מה שאתה צריך לכתיבה מקצועית ומתקדמת
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg bg-gray-50 ${feature.color}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mr-3 hebrew-text">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600 hebrew-text">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
