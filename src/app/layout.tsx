import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import dynamic from 'next/dynamic'
import { Providers } from '@/components/Layout'
const Layout = dynamic(() => import('@/components/Layout'), { ssr: false })

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Treasure',
  description: 'Treasure is a website that helps you learn new words and improve your vocabulary.',
  keywords: ['Treasure', 'Words', 'Vocabulary', 'Learning', 'Education'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  )
}
