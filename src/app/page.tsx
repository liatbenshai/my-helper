import { Metadata } from 'next'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import TextTypes from '@/components/TextTypes'
import AIAssistant from '@/components/AIAssistant'

export const metadata: Metadata = {
  title: 'My Helper - מערכת כתיבה עם AI',
  description: 'מערכת לכתיבת טקסטים עם AI מתוחכם ולומד',
}

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <TextTypes />
      <AIAssistant />
    </main>
  )
}
