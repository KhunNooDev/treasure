'use client'
import CardDeck from '@/component/CardDeck'
import words from '@/data/words.json'
import { useState } from 'react'

export default function Home() {
  // Get all unique tags from words.json
  const uniqueTags = Array.from(new Set(words.flatMap((word) => word.tags)))
  const [searchTerm, setSearchTerm] = useState('')

  // Filter uniqueTags based on search term
  const filteredTags = uniqueTags.filter((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <main className='flex flex-col gap-4 p-4'>
      <div className='flex justify-center gap-1'>
        <input
          type='text'
          placeholder='Search'
          className='rounded-md border p-2'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className='flex flex-wrap justify-center gap-4'>
        {/* map filtered tags */}
        {filteredTags.map((tag, idx) => (
          <CardDeck key={idx} tag={tag} />
        ))}
      </div>
    </main>
  )
}
