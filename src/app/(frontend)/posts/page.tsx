import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { CardPostData } from '@/components/Card'
import { Input } from '@/components/ui/input'

export const dynamic = 'force-dynamic'
export const revalidate = 600

type Args = {
  searchParams: Promise<{
    q?: string
    page?: string
  }>
}

export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { q: query, page } = await searchParamsPromise
  const currentPage = Number(page) || 1
  const payload = await getPayload({ config: configPromise })

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
    ...(query
      ? {
          where: {
            or: [
              {
                title: {
                  like: query,
                },
              },
              {
                'meta.description': {
                  like: query,
                },
              },
              {
                'meta.title': {
                  like: query,
                },
              },
              {
                slug: {
                  like: query,
                },
              },
            ],
          },
        }
      : {}),
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-8">
        <div className="prose dark:prose-invert max-w-none text-center mx-auto">
          <h1 className="mb-4">Posts</h1>
          {query && (
            <p className="text-lg text-muted-foreground">
              Search results for: <strong>&quot;{query}&quot;</strong>
            </p>
          )}
        </div>
      </div>

      <div className="container mb-8">
        <div className="max-w-2xl mx-auto mb-12">
          <form action="/posts" method="get" className="relative group">
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
              name="q"
              type="search"
              placeholder="Search posts..."
              defaultValue={query || ''}
              className="w-full pl-12 pr-4 py-6 text-base rounded-lg border-2 border-border focus:border-[#1DB954] focus:ring-2 focus:ring-[#1DB954]/20 transition-all shadow-sm hover:shadow-md"
            />
          </form>
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
            {query ? `No results found for "${query}".` : 'No posts yet.'}
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
  }
}
