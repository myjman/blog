import { allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'
import { sortByPublished } from '@/utils/sortByPublished'

export default async function Page() {
  const sortedPosts = sortByPublished(allBlogs)
  const posts = allCoreContent(sortedPosts).filter((post) => post.category !== 'tutorial')
  return <Main posts={posts} />
}
