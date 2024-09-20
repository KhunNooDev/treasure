'use client'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import _ from 'lodash'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import words from '@/data/words.json'
import { Search } from 'lucide-react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Progress } from '@/components/ui/progress'
import { useStore } from '@nanostores/react'
import { $user } from '@/store/userStore'

export default function Index() {
  const t = useTranslations('home')
  const router = useRouter()
  const user = useStore($user)
  const performance = user.performance

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
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4

  // Filter uniqueTags based on search term
  const filteredTags = uniqueTags.filter((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

  // Calculate pagination
  const totalPages = Math.ceil(filteredTags.length / itemsPerPage)
  const startIdx = (currentPage - 1) * itemsPerPage
  const endIdx = startIdx + itemsPerPage
  const currentTags = filteredTags.slice(startIdx, endIdx)

  // Reset to first page if search term changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  const getProgressByTag = (tag: string) => {
    const learnedWords = performance.find((p: { tag: string }) => p.tag === tag)?.learnedWords.length || 0
    const totalWords = tagCounts[tag]
    return { progress: (learnedWords / totalWords) * 100, learnedWords, totalWords }
  }
  return (
    <main className='flex flex-col gap-4 p-4'>
      <Input placeholder='Search' onChange={(e) => setSearchTerm(e.target.value)} startIcon={<Search size={16} />} />
      <div className='flex flex-wrap justify-center gap-4'>
        {currentTags.map((tag, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardTitle>{_.startCase(tag)}</CardTitle>
              <CardDescription>{tagCounts[tag]} words</CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col gap-2'>
              <div>
                <Progress value={getProgressByTag(tag).progress} />
                <div>
                  {getProgressByTag(tag).learnedWords} / {getProgressByTag(tag).totalWords} words learned
                </div>
              </div>
              <Button onClick={() => router.push(`/game/typing/${tag}`)}>Play Typing</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href='#' onlyIcon onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} />
          </PaginationItem>
          {currentPage > 2 && (
            <PaginationItem>
              <PaginationLink href='#' onClick={() => setCurrentPage(1)}>
                1
              </PaginationLink>
            </PaginationItem>
          )}
          {currentPage > 3 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {Array.from({ length: totalPages }, (_, idx) => {
            if (idx + 1 >= currentPage - 1 && idx + 1 <= currentPage + 1) {
              return (
                <PaginationItem key={idx}>
                  <PaginationLink href='#' isActive={currentPage === idx + 1} onClick={() => setCurrentPage(idx + 1)}>
                    {idx + 1}
                  </PaginationLink>
                </PaginationItem>
              )
            }
            return null
          })}
          {currentPage < totalPages - 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {currentPage < totalPages - 1 && (
            <PaginationItem>
              <PaginationLink href='#' onClick={() => setCurrentPage(totalPages)}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext
              href='#'
              onlyIcon
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  )
}
