import type { Block } from 'payload'

export const Share: Block = {
  slug: 'share',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Share this post',
    },
    {
      name: 'platforms',
      type: 'select',
      hasMany: true,
      defaultValue: ['twitter', 'linkedin', 'facebook', 'reddit', 'email'],
      options: [
        { label: 'Twitter (X)', value: 'twitter' },
        { label: 'LinkedIn', value: 'linkedin' },
        { label: 'Facebook', value: 'facebook' },
        { label: 'Reddit', value: 'reddit' },
        { label: 'WhatsApp', value: 'whatsapp' },
        { label: 'Telegram', value: 'telegram' },
        { label: 'Email', value: 'email' },
        { label: 'Copy Link', value: 'copy' },
      ],
    },
  ],
  interfaceName: 'ShareBlock',
}
