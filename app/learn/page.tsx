import { allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import { sortByPublished } from '@/utils/sortByPublished'

export const metadata = genPageMetadata({
  title: '입문 가이드',
  description: '코드 대신 말로, 처음부터 끝까지 — Vibe Coding 101',
})

export default async function LearnPage() {
  const posts = allCoreContent(sortByPublished(allBlogs)).filter(
    (post) => post.category === 'tutorial'
  )

  return (
    <div className="font-mono">
      <div className="pt-6 pb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {'> vibe-coding-101'}
        </h1>
        <p className="pt-2 text-sm text-gray-500 dark:text-gray-400">
          코드 대신 말로, 처음부터 끝까지
        </p>
      </div>
      <div className="border-t border-gray-800 dark:border-gray-700">
        <ul>
          {!posts.length && (
            <p className="py-8 text-sm text-gray-500">{'// 첫 번째 글이 곧 올라옵니다'}</p>
          )}
          {posts.map((post, index) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug} className="border-b border-gray-200 py-6 dark:border-gray-800">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dd className="text-xs text-gray-500 dark:text-gray-600">
                      <span className="text-green-600 dark:text-green-500">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {' · '}
                      <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                    </dd>
                    <div className="space-y-2 xl:col-span-3">
                      <div>
                        <h2 className="text-base font-medium">
                          <Link
                            href={`/blog/${slug}`}
                            className="text-gray-900 hover:text-green-500 dark:text-gray-100 dark:hover:text-green-400"
                          >
                            {title}
                          </Link>
                        </h2>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-500">{summary}</p>
                      <div className="text-xs">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-green-600 hover:text-green-500 dark:text-green-500 dark:hover:text-green-400"
                          aria-label={`Read more: "${title}"`}
                        >
                          {'cat more →'}
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
