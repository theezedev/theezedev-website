'use client'
import React from 'react'
import { motion } from 'framer-motion'
import RichText from '@/components/RichText'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

interface IntroContentProps {
  introContent: DefaultTypedEditorState
}

export const IntroContent: React.FC<IntroContentProps> = ({ introContent }) => {
  return (
    <motion.div
      className="container mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
    </motion.div>
  )
}
