+++
title = "Web Images in Blog Posts"
description = "Learn how to add local and web images as thumbnails and in-content images to your blog posts."
date = 2026-01-15T00:00:00Z
tags = ["tutorial", "images", "blog"]
author = "SHAPeS"
+++

Adding images to blog posts enhances visual appeal and helps readers engage with content. This blog supports both local and web images.

## Local Images

Place images in the `public/` folder, then reference them:

```markdown
![Screenshot](./screenshot.png)
```

Local images should be stored in subdirectories under `public/`:

```
public/
├── images/
│   ├── blog/
│   │   ├── screenshot.png
│   │   └── diagram.jpg
│   └── thumbnails/
│       └── post-cover.jpg
```

## Web Images

Use full URLs for images hosted online:

```markdown
![Code snippet](https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800)
```

## Cover Images

Set a cover image in the frontmatter:

```toml
cover_image = "/images/blog/featured.jpg"
# or for web images:
cover_image = "https://example.com/image.jpg"
```

The cover image appears at the top of both the post card on the listing page and the article header.

## Image Best Practices

- Use optimized images (compress before uploading)
- Add alt text for accessibility
- Choose appropriate aspect ratios (16:9 for cover images)
- Lazy load images with `loading="lazy"`

## Example Inline Image

Here's an example of an inline image in the content:

![VS Code](https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop)

The image above shows a code editor with syntax highlighting - perfect for programming tutorials.
