'use client'
import React, { useState, useEffect } from 'react'

interface TypingAnimationProps {
  text: string
  highlightStart?: number
  highlightColor?: string
  typingSpeed?: number
  className?: string
}

export const TypingAnimation: React.FC<TypingAnimationProps> = ({
  text,
  highlightStart,
  highlightColor = '#1DB954',
  typingSpeed = 100,
  className = '',
}) => {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1))
      }, typingSpeed)
      return () => clearTimeout(timeout)
    } else {
      setIsComplete(true)
    }
  }, [displayedText, text, typingSpeed])

  const renderText = () => {
    if (!highlightStart) {
      return displayedText
    }

    const beforeHighlight = displayedText.slice(0, highlightStart)
    const highlighted = displayedText.slice(highlightStart)

    return (
      <>
        {beforeHighlight}
        <span style={{ color: highlightColor }}>{highlighted}</span>
      </>
    )
  }

  return (
    <span className={className}>
      {renderText()}
      <span
        className="inline-block w-[3px] h-[1em] ml-1 bg-current animate-blink"
        style={{
          animation: isComplete ? 'blink 1s step-end infinite' : 'none',
          opacity: isComplete ? 1 : 0,
        }}
      />
      <style jsx>{`
        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          51%,
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </span>
  )
}
