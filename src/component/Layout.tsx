'use client'
import { usePathname, useRouter } from 'next/navigation'
import { FaHome, FaSearch, FaPlus, FaBell, FaUser } from 'react-icons/fa'
import { cn } from '@/util/cn'
import { useStore } from '@nanostores/react'
import { $hideNav } from '@/store/layoutStore'

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const hideNav = useStore($hideNav)
  return (
    <div className='flex h-screen flex-col'>
      <div className={cn('flex-grow overflow-auto pb-14', { 'pb-0': hideNav })}>{children}</div>
      {!hideNav && (
        <nav className='fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white'>
          <ul className='flex justify-around'>
            <li
              title='Home'
              onClick={() => router.push('/')}
              className={cn('nav-item', {
                'border-t-blue-500 text-blue-500': pathname === '/',
              })}
            >
              <FaHome size={24} />
            </li>
            <li className='nav-item' title='Search'>
              <FaSearch size={24} />
            </li>
            <li className='nav-item' title='Add'>
              <FaPlus size={24} />
            </li>
            <li className='nav-item' title='Notifications'>
              <FaBell size={24} />
            </li>
            <li
              title='Profile'
              onClick={() => router.push('/profile')}
              className={cn('nav-item', {
                'border-t-blue-500 text-blue-500': pathname === '/profile',
              })}
            >
              <FaUser size={24} />
            </li>
          </ul>
        </nav>
      )}
    </div>
  )
}
