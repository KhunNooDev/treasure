import './globals.css'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

import dynamic from 'next/dynamic'
import { getTranslations } from 'next-intl/server'
const Layout = dynamic(() => import('@/components/Layout'), { ssr: false })
import { Providers } from '@/components/Layout'
import { cn } from '@/lib/utils'

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'home',
  })

  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    keywords: ['Treasure', 'Words', 'Vocabulary', 'Learning', 'Education'],
  }
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = useMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={cn(inter.className, 'overflow-hidden')}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <Layout>{children}</Layout>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
