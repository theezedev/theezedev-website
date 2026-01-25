'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'

import { Input } from '@/components/ui/input'

export function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('q') || '')

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())

      if (search) {
        params.set('q', search)
      } else {
        params.delete('q')
      }

      // Keep category if it exists
      const category = searchParams.get('category')
      if (category) {
        params.set('category', category)
      }

      // Reset to page 1 on new search
      params.delete('page')

      router.push(`/posts?${params.toString()}`)
    }, 300) // 300ms debounce

    return () => clearTimeout(timer)
  }, [search, router, searchParams])

  return (
    <div className="relative group">
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-[#1DB954] transition-colors"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <Input
        type="search"
        placeholder="Search posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-12 pr-4 py-6 text-base rounded-lg border-2 border-border focus-visible:border-[#1DB954] focus-visible:ring-2 focus-visible:ring-[#1DB954]/20 focus-visible:ring-offset-0 transition-all shadow-sm hover:shadow-md"
      />
    </div>
  )
}
