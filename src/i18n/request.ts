import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'

// Can be imported from a shared config
const locales = ['en', 'th']

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as string)) notFound()

  return {
    messages: {
      ...(await import(`./${locale}/common.json`)),
      ...(await import(`./${locale}/home.json`)),
      ...(await import(`./${locale}/about.json`)),
    },
  }
})

export const { Link, usePathname, useRouter } = createSharedPathnamesNavigation({
  locales,
  defaultLocale: 'en',
})
