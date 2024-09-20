'use client'

import * as React from 'react'
import { useRouter, usePathname } from '@/i18n/request'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Globe } from 'lucide-react'

export default function LocalSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const changeLocale = (locale: string) => {
    router.push(pathname, { locale })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <Globe className='h-[1.2rem] w-[1.2rem]' />
          <span className='sr-only'>Toggle locale</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => changeLocale('en')}>English</DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLocale('th')}>Thai</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
