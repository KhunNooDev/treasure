'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import _ from 'lodash'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import words from '@/data/words.json'
import { SearchIcon } from 'lucide-react'

export default function Home() {
  const router = useRouter()

  // Get all unique tags from words.json
  const uniqueTags = Array.from(new Set(words.flatMap((word) => word.tags)))
  // Count of words in each tag
  const tagCounts = uniqueTags.reduce(
    (acc, tag) => {
      acc[tag] = words.filter((word) => word.tags.includes(tag)).length
      return acc
    },
    {} as Record<string, number>,
  )

  const [searchTerm, setSearchTerm] = useState('')

  // Filter uniqueTags based on search term
  const filteredTags = uniqueTags.filter((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <main className='flex flex-col gap-4 p-4'>
      <Input
        placeholder='Search'
        onChange={(e) => setSearchTerm(e.target.value)}
        startIcon={<SearchIcon size={16} />}
      />
      <div className='flex flex-wrap justify-center gap-4'>
        {filteredTags.map((tag, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardTitle>{_.startCase(tag)}</CardTitle>
              <CardDescription>{tagCounts[tag]} words</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => router.push(`/typing/${tag}`)}>Play Typing</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}
