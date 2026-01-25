'use client'

import GiscusComponent from '@giscus/react'
import { useTheme } from '@/providers/Theme'

export function Giscus() {
  const { theme } = useTheme()

  return (
    <div>
      <GiscusComponent
        id="comments"
        repo="theezedev/theezedev-website"
        repoId="R_kgDOQ_AwZA"
        category="Blog Comments"
        categoryId="DIC_kwDOQ_AwZM4C1ZZ4"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme={theme === 'dark' ? 'dark' : 'light'}
        lang="en"
        loading="lazy"
      />
    </div>
  )
}
