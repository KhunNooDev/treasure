'use client'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import avatar from '/public/images/dargon_1.png'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function Index() {
  const t = useTranslations('home')
  const router = useRouter()

  return (
    <main className='flex flex-col gap-4'>
      <div className='h-96 w-full rounded-b-3xl bg-primary p-4 text-primary-foreground'>
        <Avatar>
          <AvatarImage src={avatar.src} />
          <AvatarFallback></AvatarFallback>
        </Avatar>
      </div>
      <div className='flex flex-col gap-4 p-4'>
        {/* <h1 className='text-2xl font-bold'>{t('welcome')}</h1>
        <p className='text-sm text-gray-500'>{t('welcomeDescription')}</p> */}
      </div>
    </main>
  )
}
