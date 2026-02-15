import 'css/prism.css'
import 'katex/dist/katex.css'

import PageTitle from '@/components/PageTitle'
import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { coreContent, allCoreContent } from 'pliny/utils/contentlayer'
import { sortByPublished } from '@/utils/sortByPublished'
import { allBlogs, allAuthors } from 'contentlayer/generated'
import type { Authors, Blog } from 'contentlayer/generated'
import PostSimple from '@/layouts/PostSimple'
import PostLayout from '@/layouts/PostLayout'
import PostBanner from '@/layouts/PostBanner'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'

const defaultLayout = 'PostLayout'
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  const post = allBlogs.find((p) => p.slug === slug)
  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Authors)
  })
  if (!post) {
    return
  }

  const publishedAt = new Date(post.date).toISOString()
  const modifiedAt = new Date(post.lastmod || post.date).toISOString()
  const authors = authorDetails.map((author) => author.name)
  let imageList = [siteMetadata.socialBanner]
  if (post.images) {
    imageList = typeof post.images === 'string' ? [post.images] : post.images
  }
  const ogImages = imageList.map((img) => {
    return {
      url: img && img.includes('http') ? img : siteMetadata.siteUrl + img,
    }
  })

  const isEnglish = post.language === 'en'
  const locale = isEnglish ? 'en_US' : 'ko_KR'

  // Find translation post for hreflang
  const alternates: Record<string, string> = {}
  if (post.translationOf) {
    const translationPost = allBlogs.find((p) => p.slug === post.translationOf)
    if (translationPost) {
      const altLang = isEnglish ? 'ko' : 'en'
      alternates[altLang] = `${siteMetadata.siteUrl}/blog/${translationPost.slug}`
    }
  }
  // Also check if another post points to this one as its translation
  const reverseTranslation = allBlogs.find((p) => p.translationOf === post.slug)
  if (reverseTranslation) {
    const altLang = reverseTranslation.language === 'en' ? 'en' : 'ko'
    alternates[altLang] = `${siteMetadata.siteUrl}/blog/${reverseTranslation.slug}`
  }

  return {
    title: post.title,
    description: post.summary,
    alternates: Object.keys(alternates).length > 0 ? { languages: alternates } : undefined,
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: siteMetadata.title,
      locale,
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: `${siteMetadata.siteUrl}/blog/${slug}`,
      images: ogImages,
      authors: authors.length > 0 ? authors : [siteMetadata.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: imageList,
    },
  }
}

export const generateStaticParams = async () => {
  return allBlogs.map((p) => ({ slug: p.slug.split('/').map((name) => decodeURI(name)) }))
}

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  // Filter out drafts in production
  const sortedCoreContents = allCoreContent(sortByPublished(allBlogs))
  const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug)
  if (postIndex === -1) {
    return notFound()
  }

  const prev = sortedCoreContents[postIndex + 1]
  const next = sortedCoreContents[postIndex - 1]
  const post = allBlogs.find((p) => p.slug === slug) as Blog
  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Authors)
  })
  const mainContent = coreContent(post)
  const jsonLd = post.structuredData
  jsonLd['author'] = authorDetails.map((author) => {
    return {
      '@type': 'Person',
      name: author.name,
    }
  })

  // Add VideoObject if youtubeId is present
  if (post.youtubeId) {
    jsonLd['video'] = {
      '@type': 'VideoObject',
      name: post.title,
      description: post.summary,
      thumbnailUrl: post.images ? post.images[0] : siteMetadata.socialBanner,
      uploadDate: new Date(post.date).toISOString(),
      contentUrl: `https://www.youtube.com/watch?v=${post.youtubeId}`,
      embedUrl: `https://www.youtube.com/embed/${post.youtubeId}`,
    }
  }

  // Find translation post
  let translationUrl: string | undefined
  let translationLang: string | undefined
  if (post.translationOf) {
    const translationPost = allBlogs.find((p) => p.slug === post.translationOf)
    if (translationPost) {
      translationUrl = `/blog/${translationPost.slug}`
      translationLang = post.language === 'en' ? 'ko' : 'en'
    }
  }
  const reverseTranslation = allBlogs.find((p) => p.translationOf === post.slug)
  if (reverseTranslation) {
    translationUrl = `/blog/${reverseTranslation.slug}`
    translationLang = reverseTranslation.language === 'en' ? 'en' : 'ko'
  }

  const Layout = layouts[post.layout || defaultLayout]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout
        content={mainContent}
        authorDetails={authorDetails}
        next={next}
        prev={prev}
        translationUrl={translationUrl}
        translationLang={translationLang}
      >
        <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
      </Layout>
    </>
  )
}
