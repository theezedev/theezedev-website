import type { ProfileBlock as ProfileBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

type Props = {
  className?: string
} & ProfileBlockProps

export const ProfileBlock: React.FC<Props> = ({ className, image, name, bio }) => {
  return (
    <div className={cn('my-12 w-full', className)}>
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          {/* Circle Image */}
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-6 ring-4 ring-border">
            {typeof image === 'object' && (
              <Media
                resource={image}
                className="w-full h-full object-cover"
                imgClassName="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Name */}
          {name && <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">{name}</h3>}

          {/* Bio */}
          {bio && (
            <div className="w-full">
              <RichText data={bio} enableGutter={false} enableProse={true} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
