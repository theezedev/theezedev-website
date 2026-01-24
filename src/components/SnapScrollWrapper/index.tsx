'use client'

import { usePathname } from 'next/navigation'
import { cn } from '@/utilities/ui'

export function SnapScrollWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHomePage = pathname === '/' || pathname === '/home'

  return (
    <div className={cn(isHomePage && 'h-screen overflow-y-scroll snap-y snap-mandatory')}>
      {children}
    </div>
  )
}
