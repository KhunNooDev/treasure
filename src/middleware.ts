import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'th'],
  // Used when no locale matches
  defaultLocale: 'en',
  // for prefix language in url
  localePrefix: 'as-needed',
  // for detect language from browser
  localeDetection: true,
})

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
