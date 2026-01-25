import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { SocialIcon } from '@/components/SocialIcon'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []
  const socialLinks = footerData?.socialLinks || []

  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between w-full">
        <Link className="flex items-center" href="/">
          <Logo />
        </Link>

        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <ThemeSelector />
          <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }, i) => {
              return (
                <CMSLink
                  className="relative text-sm font-medium transition-colors text-white hover:text-[#1DB954] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#1DB954] after:transition-all after:duration-300 hover:after:w-full"
                  key={i}
                  {...link}
                />
              )
            })}
          </nav>
          {socialLinks.length > 0 && (
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <SocialIcon key={i} platform={social.platform} url={social.url} />
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}
