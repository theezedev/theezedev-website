import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Building in the open. Dive into my latest projects or browse the blog for dev deep-dives.',
  images: [
    {
      url: `${getServerSideURL()}/theeze-dev-OG.webp`,
    },
  ],
  siteName: 'theeze.dev',
  title: 'theeze.dev',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
