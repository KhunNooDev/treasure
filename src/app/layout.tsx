import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import dynamic from 'next/dynamic'
const Layout = dynamic(() => import('@/component/Layout'), { ssr: false })

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
    <html lang='en'>
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
