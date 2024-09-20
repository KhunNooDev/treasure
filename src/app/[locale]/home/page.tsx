import { getTranslations } from 'next-intl/server'
import Home from './ui.home'

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'home',
  })

  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
  }
}

export default async function HomePage() {
  return <Home />
}
