'use client'

import type { ShareBlock as ShareBlockProps } from '@/payload-types'
import React from 'react'
import { cn } from '@/utilities/ui'
import {
  TwitterShareButton,
  LinkedinShareButton,
  FacebookShareButton,
  RedditShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  EmailShareButton,
  TwitterIcon,
  LinkedinIcon,
  FacebookIcon,
  RedditIcon,
  WhatsappIcon,
  TelegramIcon,
  EmailIcon,
} from 'react-share'

type Props = {
  className?: string
} & ShareBlockProps

export const ShareBlock: React.FC<Props> = ({ className, title, platforms }) => {
  const [copied, setCopied] = React.useState(false)
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''
  const currentTitle = typeof document !== 'undefined' ? document.title : ''

  const selectedPlatforms = platforms || ['twitter', 'linkedin', 'facebook', 'reddit', 'email']

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const iconSize = 40
  const buttonClass = 'transition-all duration-300 hover:scale-110 hover:opacity-90'

  return (
    <div className={cn('my-12 w-full', className)}>
      <div className="max-w-3xl mx-auto px-4">
        <div>
          {title && (
            <h3 className="text-xl font-semibold text-center mb-6 text-foreground">{title}</h3>
          )}

          <div className="flex flex-wrap justify-center gap-3">
            {selectedPlatforms.includes('twitter') && (
              <TwitterShareButton url={currentUrl} title={currentTitle} className={buttonClass}>
                <TwitterIcon size={iconSize} round />
              </TwitterShareButton>
            )}

            {selectedPlatforms.includes('linkedin') && (
              <LinkedinShareButton url={currentUrl} title={currentTitle} className={buttonClass}>
                <LinkedinIcon size={iconSize} round />
              </LinkedinShareButton>
            )}

            {selectedPlatforms.includes('facebook') && (
              <FacebookShareButton url={currentUrl} title={currentTitle} className={buttonClass}>
                <FacebookIcon size={iconSize} round />
              </FacebookShareButton>
            )}

            {selectedPlatforms.includes('reddit') && (
              <RedditShareButton url={currentUrl} title={currentTitle} className={buttonClass}>
                <RedditIcon size={iconSize} round />
              </RedditShareButton>
            )}

            {selectedPlatforms.includes('whatsapp') && (
              <WhatsappShareButton url={currentUrl} title={currentTitle} className={buttonClass}>
                <WhatsappIcon size={iconSize} round />
              </WhatsappShareButton>
            )}

            {selectedPlatforms.includes('telegram') && (
              <TelegramShareButton url={currentUrl} title={currentTitle} className={buttonClass}>
                <TelegramIcon size={iconSize} round />
              </TelegramShareButton>
            )}

            {selectedPlatforms.includes('email') && (
              <EmailShareButton
                url={currentUrl}
                subject={currentTitle}
                body={`Check out this post: ${currentUrl}`}
                className={buttonClass}
              >
                <EmailIcon size={iconSize} round />
              </EmailShareButton>
            )}

            {selectedPlatforms.includes('copy') && (
              <button
                onClick={handleCopy}
                className={cn(
                  'w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110',
                  copied ? 'bg-green-500' : 'bg-gray-500 hover:bg-gray-600',
                )}
                aria-label="Copy link"
              >
                {copied ? (
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
