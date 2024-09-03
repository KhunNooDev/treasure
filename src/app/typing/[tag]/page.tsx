import React from 'react'
import Typing from '@/component/Typing'

export default function TypingPage({ params }: { params: { tag: string } }) {
  const tag = params.tag

  return (
    <main className='p-4'>
      <Typing tag={tag} />
    </main>
  )
}
