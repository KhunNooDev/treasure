import { getTranslations } from 'next-intl/server'
import Profile from './ui.profile'

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'profile',
  })

  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
  }
}

export default async function ProfilePage() {
  return <Profile />
}
