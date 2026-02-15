import type { Blog } from 'contentlayer/generated'

/**
 * Sort posts by publishedAt (git commit time) in descending order.
 * Falls back to frontmatter date if publishedAt is not available.
 */
export function sortByPublished<T extends Pick<Blog, 'date' | 'publishedAt'>>(posts: T[]): T[] {
  return posts.sort((a, b) => {
    const dateA = new Date(a.publishedAt || a.date).getTime()
    const dateB = new Date(b.publishedAt || b.date).getTime()
    return dateB - dateA
  })
}
