# Share Block

A social sharing block for Payload CMS that allows users to easily share posts on various social media platforms.

## Features

- 🎨 **Animated UI** - Smooth hover effects and animations
- 📱 **Multiple Platforms** - Support for Twitter/X, LinkedIn, Facebook, Reddit, WhatsApp, Telegram, Email, and Copy Link
- ⚙️ **Customizable** - Choose which platforms to display
- 🎯 **Auto-detection** - Automatically uses current page URL and title
- 📋 **Copy to Clipboard** - One-click copy link functionality with feedback

## Usage in Editor

When editing a post in Payload CMS:

1. Click the **+** button in the rich text editor
2. Select **Share** from the block options
3. Configure the block:
   - **Title** (optional): Custom heading text (defaults to "Share this post")
   - **Platforms**: Select which social platforms to display (multi-select)

## Supported Platforms

- **Twitter (X)** - Share on Twitter/X
- **LinkedIn** - Share on LinkedIn
- **Facebook** - Share on Facebook
- **Reddit** - Submit to Reddit
- **WhatsApp** - Share via WhatsApp
- **Telegram** - Share via Telegram
- **Email** - Share via email
- **Copy Link** - Copy URL to clipboard

## Configuration Example

```typescript
{
  blockType: 'share',
  title: 'Love this post? Share it!',
  platforms: ['twitter', 'linkedin', 'reddit', 'copy']
}
```

## Styling

The component uses Tailwind CSS and adapts to your theme's:
- Card background (`bg-card`)
- Border color (`border-border`)
- Text color (`text-foreground`)

Each platform button has its brand colors and hover animations.

## Technical Details

- **Client Component**: Uses React hooks for interactivity
- **Browser APIs**: Leverages `window.location`, `document.title`, and `navigator.clipboard`
- **Responsive**: Mobile-friendly with flexbox layout
- **Accessible**: Includes proper ARIA labels

## Animation Features

1. **Scale on Hover**: Buttons grow slightly (scale-110)
2. **Icon Rotation**: Icons rotate on hover
3. **Ripple Effect**: Animated ping effect on hover
4. **Background Gradient**: Subtle animated gradient background
5. **Copy Feedback**: Visual confirmation when link is copied
