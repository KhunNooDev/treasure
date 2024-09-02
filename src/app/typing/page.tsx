'use client'
import React from 'react'
import Typing from '@/component/Typing'
import { useSearchParams } from 'next/navigation'

export default function TypingPage() {
  const searchParams = useSearchParams()
  const tag = searchParams.get('tag') || 'default'

  return (
    <main className='p-4'>
      <Typing tag={tag} />
    </main>
  )
}
