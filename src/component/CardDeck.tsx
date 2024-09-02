'use client'
import _ from 'lodash'
import { useRouter } from 'next/navigation'

export default function CardDeck({ tag, count }: { tag: string; count: number }) {
  const router = useRouter()

  const handlePlayTyping = () => {
    router.push(`/typing?tag=${tag}`)
  }

  return (
    <div className='flex w-32 flex-col items-center justify-center gap-2 rounded-md border border-gray-300 bg-white p-2'>
      <div className='flex flex-col items-center justify-center gap-2'>
        <h1>{_.startCase(tag)}</h1>
        <p>{count} words</p>
      </div>
      <button onClick={handlePlayTyping} className='rounded-md border border-gray-300 p-2'>
        Typing
      </button>
    </div>
  )
}
