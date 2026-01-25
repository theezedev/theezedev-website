import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { SearchBar } from '@/components/SearchBar'
import { CategoryFilter } from '@/components/CategoryFilter'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { CardPostData } from '@/components/Card'

export const dynamic = 'force-dynamic'
export const revalidate = 600

type Args = {
  searchParams: Promise<{
    q?: string
    page?: string
    category?: string
  }>
}

export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { q: query, page, category } = await searchParamsPromise
  const currentPage = Number(page) || 1
  const payload = await getPayload({ config: configPromise })

  // Fetch all categories for the filter
  const categoriesData = await payload.find({
    collection: 'categories',
    depth: 0,
    limit: 100,
    sort: 'title',
  })

  // Build the where clause
  const whereClause: any = {}

  // Add search filter
  if (query) {
    whereClause.or = [
      { title: { like: query } },
      { 'meta.description': { like: query } },
      { 'meta.title': { like: query } },
      { slug: { like: query } },
    ]
  }

  // Add category filter
  if (category) {
    whereClause.categories = {
      slug: { equals: category },
    }
  }

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    page: currentPage,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
    ...(Object.keys(whereClause).length > 0 ? { where: whereClause } : {}),
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-8">
        <div className="prose dark:prose-invert max-w-none text-center mx-auto">
          <h1 className="mb-4">Posts</h1>
          {(query || category) && (
            <p className="text-lg text-muted-foreground">
              {query && (
                <>
                  Search results for: <strong>&quot;{query}&quot;</strong>
                </>
              )}
              {query && category && ' in '}
              {category && (
                <>
                  Category: <strong>{category}</strong>
                </>
              )}
            </p>
          )}
        </div>
      </div>

      <div className="container mb-8 space-y-6">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <SearchBar />
        </div>

        {/* Category Filter */}
        <div className="max-w-4xl mx-auto">
          <CategoryFilter categories={categoriesData.docs} />
        </div>

        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>

      {posts.totalDocs > 0 ? (
        <CollectionArchive posts={posts.docs as CardPostData[]} />
      ) : (
        <div className="container">
          <p className="text-center">
            {query || category
              ? `No results found${query ? ` for "${query}"` : ''}${category ? ` in category "${category}"` : ''}.`
              : 'No posts yet.'}
          </p>
        </div>
      )}

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `theeze.dev Posts`,
    description:
      'Browse technical articles, tutorials, and insights on web development, software engineering, and modern development practices.',
  }
}
