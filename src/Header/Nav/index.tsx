'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import Link from 'next/link'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex gap-6 items-center">
      {navItems.map(({ link }, i) => {
        const href =
          link.type === 'reference' &&
          typeof link.reference?.value === 'object' &&
          link.reference.value.slug
            ? `${link.reference?.relationTo !== 'pages' ? `/${link.reference?.relationTo}` : ''}/${
                link.reference.value.slug
              }`
            : link.url

        if (!href) return null

        return (
          <Link
            key={i}
            href={href}
            className="relative text-sm font-medium transition-colors text-foreground hover:text-[#1DB954] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#1DB954] after:transition-all after:duration-300 hover:after:w-full"
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
