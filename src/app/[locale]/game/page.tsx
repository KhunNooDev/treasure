import { getTranslations } from 'next-intl/server'
import Game from './ui.game'

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'game',
  })

  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
  }
}

export default async function GamePage() {
  return <Game />
}
