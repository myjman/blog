import { allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { sortByPublished } from '@/utils/sortByPublished'

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({ title: 'Blog (English)' })

export default async function EnglishBlogPage() {
  const posts = allCoreContent(sortByPublished(allBlogs)).filter((post) => post.language === 'en')
  const pageNumber = 1
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE * pageNumber)
  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
    />
  )
}
