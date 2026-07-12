import Link from "next/link"
import { notFound } from "next/navigation"

import { getWritingBySlug, getWritingSlugs } from "@/lib/writing"

type WritingDetailProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getWritingSlugs()
}

export default async function WritingDetailPage({
  params,
}: WritingDetailProps) {
  const { slug } = await params
  const post = getWritingBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="page writing-detail-page">
      <Link className="back-link" href="/writing">
        返回写作
      </Link>
      <article className="writing-detail">
        <div className="writing-detail-heading">
          <p className="section-kicker">Writing</p>
          <time>{post.date}</time>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <div className="tag-row">
            {post.tags.map((tag) => (
              <span className="tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
    </main>
  )
}
