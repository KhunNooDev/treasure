'use client'
import _ from 'lodash'
import { useRouter } from 'next/navigation'

export default function CardDeck({ tag }: { tag: string }) {
  const router = useRouter()

  const handlePlayTyping = () => {
    router.push(`/typing?tag=${tag}`)
  }

  return (
    <div className='flex w-32 flex-col items-center justify-center gap-2 rounded-md border border-gray-300 bg-white p-2'>
      <div>
        <h1>{_.startCase(tag)}</h1>
      </div>
      <button onClick={handlePlayTyping} className='rounded-md border border-gray-300 p-2'>
        Typing
      </button>
    </div>
  )
}
