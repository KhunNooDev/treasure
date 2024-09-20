'use client'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useStore } from '@nanostores/react'
import { $hideNav } from '@/store/layoutStore'
import { Home, Search, Plus, Bell, User, Gamepad2 } from 'lucide-react'
import { ThemeProvider } from 'next-themes'

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const hideNav = useStore($hideNav)

  return (
    <div className='flex h-screen flex-col'>
      <div className={cn('flex-grow overflow-auto pb-10', { 'pb-0': hideNav })}>{children}</div>
      {!hideNav && (
        <nav className='fixed bottom-0 left-0 right-0 rounded-t-lg border-t border-gray-200 bg-white dark:bg-black'>
          <ul className='flex justify-around'>
            <li
              title='Home'
              onClick={() => router.push('/')}
              className={cn('nav-item', {
                'border-t-blue-500 text-blue-500': pathname === '/',
              })}
            >
              <Home size={20} />
            </li>
            <li
              title='Game'
              onClick={() => router.push('/game')}
              className={cn('nav-item', {
                'border-t-blue-500 text-blue-500': pathname === '/game',
              })}
            >
              <Gamepad2 size={20} />
            </li>
            {/* <li className='nav-item' title='Search'>
              <Search size={20} />
            </li>
            <li className='nav-item' title='Add'>
              <Plus size={20} />
            </li>
            <li className='nav-item' title='Notifications'>
              <Bell size={20} />
            </li> */}
            <li
              title='Profile'
              onClick={() => router.push('/profile')}
              className={cn('nav-item', {
                'border-t-blue-500 text-blue-500': pathname === '/profile',
              })}
            >
              <User size={20} />
            </li>
          </ul>
        </nav>
      )}
    </div>
  )
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  )
}
