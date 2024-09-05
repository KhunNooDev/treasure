'use client'
import { useRouter } from 'next/navigation'
import { useStore } from '@nanostores/react'
import words from '@/data/words.json'
import { $user } from '@/store/userStore'
import _ from 'lodash'
import { HomeIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ModeToggle'

export default function Profile() {
  const router = useRouter()
  const user = useStore($user)
  const performance = user.performance

  return (
    <main className='flex flex-col gap-4 p-4'>
      <h1 className='text-2xl font-bold'>Profile</h1>
      <ModeToggle />
      <section className='flex flex-col gap-2'>
        <h2 className='text-xl font-semibold'>Performance</h2>
        <div className='p-4'>
          {Object.keys(performance).length > 0 ? (
            <ul>
              {Object.entries(performance).map(([tag, score], idx) => (
                <li key={idx} className='list-disc'>
                  {_.startCase(tag)}: {String(score)} / {words.filter((word) => word.tags.includes(tag)).length}
                </li>
              ))}
            </ul>
          ) : (
            <p>No performance data available.</p>
          )}
        </div>
      </section>
      <Button onClick={() => router.push('/')}>
        <HomeIcon size={16} className='mr-2' /> Back to Home
      </Button>
    </main>
  )
}
