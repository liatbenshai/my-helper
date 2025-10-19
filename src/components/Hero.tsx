'use client'

import { motion } from 'framer-motion'
import { SparklesIcon, DocumentTextIcon } from '@heroicons/react/24/outline'

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 flex items-center justify-center overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 hebrew-text leading-tight">
            שיפור תכנים ב-AI
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-2xl text-white mb-6 max-w-3xl mx-auto hebrew-text font-light">
            שפר את הכתיבה שלך בעברית תקנית - דקדוק, סגנון, בהירות ומקצועיות
          </p>

          {/* Description */}
          <p className="text-base md:text-lg text-primary-100 mb-12 max-w-2xl mx-auto hebrew-text">
            AI חכם שמבין את ייחודיות השפה העברית ומסייע בשיפור טקסטים בכל סוגיהם
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button className="btn-primary text-lg px-8 py-4 flex items-center gap-2 shadow-lg hover:shadow-xl">
              <SparklesIcon className="w-6 h-6" />
              <span className="hebrew-text">התחל לשפר עכשיו</span>
            </button>
            <button className="btn-secondary text-lg px-8 py-4 flex items-center gap-2 shadow-lg hover:shadow-xl">
              <DocumentTextIcon className="w-6 h-6" />
              <span className="hebrew-text">ראה דוגמאות</span>
            </button>
          </motion.div>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 flex flex-wrap justify-center gap-3"
          >
            {['שיפור דקדוקי', 'שפה מקצועית', 'שמירת משמעות', 'תמיכה עברית'].map((feature) => (
              <span
                key={feature}
                className="px-4 py-2 bg-white/20 backdrop-blur-md text-white rounded-full text-sm hebrew-text border border-white/30"
              >
                ✓ {feature}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
