import type { Block } from 'payload'

export const GitHubRepos: Block = {
  slug: 'githubRepos',
  interfaceName: 'GitHubReposBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      defaultValue: 'Open Source Projects',
    },
    {
      name: 'subheading',
      type: 'textarea',
      label: 'Subheading',
      defaultValue: 'Check out some of my latest work on GitHub',
    },
    {
      name: 'githubUsername',
      type: 'text',
      label: 'GitHub Username',
      required: true,
      defaultValue: 'ezekielburke',
    },
    {
      name: 'maxRepos',
      type: 'number',
      label: 'Maximum Repos to Display',
      defaultValue: 6,
      min: 1,
      max: 12,
    },
    {
      name: 'filterForks',
      type: 'checkbox',
      label: 'Hide Forked Repositories',
      defaultValue: true,
    },
    {
      name: 'sortBy',
      type: 'select',
      label: 'Sort By',
      defaultValue: 'updated',
      options: [
        { label: 'Recently Updated', value: 'updated' },
        { label: 'Most Stars', value: 'stars' },
        { label: 'Recently Created', value: 'created' },
      ],
    },
  ],
  labels: {
    singular: 'GitHub Repos Block',
    plural: 'GitHub Repos Blocks',
  },
}
