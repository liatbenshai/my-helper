import type { Metadata } from 'next'
import { Inter, Noto_Sans_Hebrew } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const notoSansHebrew = Noto_Sans_Hebrew({ subsets: ['hebrew'] })

export const metadata: Metadata = {
  title: 'My Helper - מערכת כתיבה עם AI',
  description: 'מערכת לכתיבת טקסטים עם AI מתוחכם ולומד',
  keywords: ['AI', 'כתיבה', 'עברית', 'טקסטים', 'מערכת לומדת'],
  authors: [{ name: 'My Helper Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${inter.className} ${notoSansHebrew.className} bg-gray-50 text-gray-900`}>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
