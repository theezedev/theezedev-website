'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { X } from 'lucide-react'
import type { Category } from '@/payload-types'

interface CategoryFilterProps {
  categories: Category[]
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category')

  const handleCategoryClick = (categorySlug: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (activeCategory === categorySlug) {
      // Remove category filter if clicking active category
      params.delete('category')
    } else {
      params.set('category', categorySlug)
    }

    // Keep search query if it exists
    const query = searchParams.get('q')
    if (query) {
      params.set('q', query)
    }

    // Reset to page 1 when filtering
    params.delete('page')

    router.push(`/posts?${params.toString()}`)
  }

  const clearCategory = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('category')

    // Keep search query if it exists
    const query = searchParams.get('q')
    if (query) {
      params.set('q', query)
    }

    router.push(`/posts?${params.toString()}`)
  }

  if (categories.length === 0) return null

  return (
    <div className="flex flex-wrap justify-center items-center gap-2">
      {categories.map((category) => {
        const isActive = activeCategory === category.slug

        return (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.slug)}
            className={`
              px-3 py-1.5 rounded-full text-sm font-medium transition-all
              ${
                isActive
                  ? 'bg-[#1DB954] text-white shadow-[0_0_15px_rgba(29,185,84,0.5)]'
                  : 'bg-card border border-border hover:border-[#1DB954] hover:shadow-[0_0_10px_rgba(29,185,84,0.3)]'
              }
            `}
          >
            {category.title}
          </button>
        )
      })}

      {activeCategory && (
        <button
          onClick={clearCategory}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium bg-card border border-border hover:border-destructive transition-all"
          aria-label="Clear category filter"
        >
          <X className="h-3 w-3" />
          Clear
        </button>
      )}
    </div>
  )
}
