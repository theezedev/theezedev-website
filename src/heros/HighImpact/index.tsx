'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { TypingAnimation } from '@/components/TypingAnimation'
import { SocialIcon } from '@/components/SocialIcon'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText, socialLinks }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div
      className="relative -mt-[10.4rem] w-full flex items-center justify-center text-white"
      data-theme="dark"
      data-hero="high-impact"
    >
      <div className="container mb-8 z-10 relative flex items-center justify-center">
        <div className="max-w-[36.5rem] text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <TypingAnimation text="theeze.dev" highlightStart={6} typingSpeed={150} />
          </h1>
          {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex justify-center gap-4 mb-6">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
          {Array.isArray(socialLinks) && socialLinks.length > 0 && (
            <div className="flex justify-center gap-4">
              {socialLinks.map((social, i) => (
                <SocialIcon key={i} platform={social.platform} url={social.url} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="min-h-[80vh] select-none">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
        )}
      </div>
    </div>
  )
}
