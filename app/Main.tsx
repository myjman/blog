import Link from '@/components/Link'
import Tag from '@/components/Tag'
import TerminalBanner from '@/components/TerminalBanner'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  return (
    <>
      <div className="font-mono">
        <div className="pt-6 pb-6">
          <TerminalBanner />
        </div>
        <div className="border-t border-gray-800 dark:border-gray-700">
          <ul>
            {!posts.length && <p className="py-4 text-sm text-gray-500">{'// no posts found'}</p>}
            {posts.slice(0, MAX_DISPLAY).map((post) => {
              const { slug, date, title, summary, tags } = post
              return (
                <li key={slug} className="border-b border-gray-200 py-6 dark:border-gray-800">
                  <article>
                    <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                      <dd className="text-xs text-gray-500 dark:text-gray-600">
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
                          <div className="flex flex-wrap gap-1 pt-1">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
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
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end pt-4 font-mono text-xs">
          <Link
            href="/blog"
            className="text-green-600 hover:text-green-500 dark:text-green-500 dark:hover:text-green-400"
            aria-label="All posts"
          >
            {'ls -la /blog →'}
          </Link>
        </div>
      )}
    </>
  )
}
