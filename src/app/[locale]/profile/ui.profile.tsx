'use client'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useStore } from '@nanostores/react'
import _ from 'lodash'
import { Home, Trash } from 'lucide-react'
import words from '@/data/words.json'
import { $user, deletePerformance } from '@/store/userStore'
import { Button } from '@/components/ui/button'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import { Progress } from '@/components/ui/progress'
import LocalSwitcher from '@/components/LocalSwitcher'

export default function Index() {
  const t = useTranslations('home')
  const router = useRouter()
  const user = useStore($user)
  const performance = user.performance

  const handleDeletePerformance = (tag: string) => {
    deletePerformance(tag)
  }

  return (
    <main className='flex flex-col gap-4 p-4'>
      <h1 className='text-2xl font-bold'>Profile</h1>
      <ThemeSwitcher />
      <LocalSwitcher />
      <section className='flex flex-col gap-2'>
        <h2 className='text-xl font-semibold'>Performance</h2>
        <div className='p-4'>
          {performance.length > 0 ? (
            <ul>
              {performance.map(({ tag, learnedWords }: { tag: string; learnedWords: string[] }, idx: number) => {
                return (
                  <li key={idx} className='flex items-center justify-between gap-2 border-b border-gray-200 py-2'>
                    <div className='flex w-full items-center gap-2'>
                      <span className='w-1/3 text-sm text-gray-500'>{_.startCase(tag)}</span>
                      <div className='w-2/3'>
                        <span className='text-sm'>
                          {learnedWords.length} / {words.filter((word) => word.tags.includes(tag)).length}
                        </span>

                        <Progress
                          value={(learnedWords.length / words.filter((word) => word.tags.includes(tag)).length) * 100}
                        />
                      </div>
                    </div>
                    <Button
                      onClick={() => handleDeletePerformance(tag)}
                      size='icon'
                      className='w-10 bg-red-500 hover:bg-red-600'
                    >
                      <Trash size={16} />
                    </Button>
                  </li>
                )
              })}
            </ul>
          ) : (
            <p>No performance data available.</p>
          )}
        </div>
      </section>
      <Button onClick={() => router.push('/')}>
        <Home size={16} className='mr-2' /> Back to Home
      </Button>
    </main>
  )
}
