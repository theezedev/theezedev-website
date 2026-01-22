import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
}

export const Logo = (props: Props) => {
  const { className } = props

  return (
    <svg
      viewBox="0 0 150 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('w-[150px] h-auto', className)}
      aria-label="theeze.dev logo"
    >
      <text
        x="75"
        y="20"
        fontSize="28"
        fontWeight="700"
        fontFamily="system-ui, -apple-system, sans-serif"
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-current"
      >
        <tspan className="fill-current">theeze</tspan>
        <tspan fill="#1DB954">.dev</tspan>
      </text>
    </svg>
  )
}
