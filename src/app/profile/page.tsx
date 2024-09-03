'use client'
import { useRouter } from 'next/navigation'
import { FaHome } from 'react-icons/fa'
import { useStore } from '@nanostores/react'
import words from '@/data/words.json'
import { $user } from '@/store/userStore'
import _ from 'lodash'

export default function Profile() {
  const router = useRouter()
  const user = useStore($user)
  const performance = user.performance

  return (
    <main className='flex flex-col gap-4 p-4'>
      <h1 className='text-2xl font-bold'>Profile</h1>
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
      <button
        onClick={() => router.push('/')}
        className='mt-4 flex items-center justify-center gap-2 rounded-md border border-gray-300 p-2'
      >
        <FaHome /> Back to Home
      </button>
    </main>
  )
}
