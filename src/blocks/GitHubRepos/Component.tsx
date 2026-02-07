'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import type { GitHubReposBlock as GitHubReposBlockType } from '@/payload-types'

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
  fork: boolean
  topics: string[]
}

const languageColors: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  'C++': '#f34b7d',
  C: '#555555',
  CSS: '#563d7c',
  HTML: '#e34c26',
  Shell: '#89e051',
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 12,
    },
  },
}

export const GitHubReposBlock: React.FC<GitHubReposBlockType> = ({
  heading,
  subheading,
  githubUsername,
  maxRepos = 6,
  filterForks = false,
  sortBy = 'updated',
}) => {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const maxReposValue = maxRepos ?? 6

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${githubUsername}/repos?sort=${sortBy}&per_page=100`,
        )

        if (!response.ok) {
          throw new Error('Failed to fetch repositories')
        }

        let data: GitHubRepo[] = await response.json()

        // Filter out forks if needed
        if (filterForks) {
          data = data.filter((repo) => !repo.fork)
        }

        // Sort by stars if selected
        if (sortBy === 'stars') {
          data.sort((a, b) => b.stargazers_count - a.stargazers_count)
        }

        // Limit repos
        data = data.slice(0, maxReposValue)

        setRepos(data)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        setLoading(false)
      }
    }

    if (githubUsername) {
      fetchRepos()
    }
  }, [githubUsername, maxReposValue, filterForks, sortBy])

  if (loading) {
    return (
      <div className="container my-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: maxReposValue }).map((_, i) => (
            <div
              key={i}
              className="h-64 bg-card rounded-lg border border-border animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container my-16">
        <div className="text-center py-12">
          <p className="text-destructive">Error loading repositories: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container my-16">
      <div className="text-center mb-12">
        {heading && <h2 className="text-4xl md:text-5xl font-bold mb-4">{heading}</h2>}
        {subheading && (
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subheading}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((repo) => (
          <motion.a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-card rounded-lg border border-border p-6 hover:border-[#1DB954] transition-all duration-300 overflow-hidden"
            variants={cardVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 10px 40px rgba(29, 185, 84, 0.3)',
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#1DB954]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            />

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold group-hover:text-[#1DB954] transition-colors duration-300 flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0h8v12H6V4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {repo.name}
                </h3>
                <motion.svg
                  className="w-5 h-5 text-muted-foreground group-hover:text-[#1DB954]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ x: 0, y: 0 }}
                  whileHover={{ x: 4, y: -4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </motion.svg>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[40px]">
                {repo.description || 'No description provided'}
              </p>

              {/* Topics */}
              {repo.topics && repo.topics.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {repo.topics.slice(0, 3).map((topic) => (
                    <span
                      key={topic}
                      className="text-xs px-2 py-1 bg-[#1DB954]/10 text-[#1DB954] rounded-full"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {repo.language && (
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: languageColors[repo.language] || '#858585' }}
                    />
                    <span>{repo.language}</span>
                  </div>
                )}

                <motion.div
                  className="flex items-center gap-1"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{repo.stargazers_count}</span>
                </motion.div>

                <motion.div
                  className="flex items-center gap-1"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{repo.forks_count}</span>
                </motion.div>
              </div>
            </div>

            {/* Shine effect on hover */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
              initial={false}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
            </motion.div>
          </motion.a>
        ))}
      </div>

      {/* View all repos link */}
      <div className="text-center mt-12">
        <a
          href={`https://github.com/${githubUsername}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-lg font-medium text-[#1DB954] hover:underline"
        >
          View all repositories on GitHub
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </a>
      </div>
    </div>
  )
}
