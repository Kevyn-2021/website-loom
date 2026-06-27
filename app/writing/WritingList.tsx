"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

import type { WritingPost } from "@/lib/writing"

const writingTags = ["Go-to-Market", "Product", "AI", "Career"]
const postsPerPage = 10

export function WritingList({ posts }: { posts: WritingPost[] }) {
  const [activeTags, setActiveTags] = useState(() => new Set(writingTags))
  const [currentPage, setCurrentPage] = useState(1)
  const filteredPosts = useMemo(
    () => posts.filter((post) => post.tags.some((tag) => activeTags.has(tag))),
    [activeTags, posts],
  )
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / postsPerPage))
  const safeCurrentPage = Math.min(currentPage, totalPages)
  const visiblePosts = useMemo(() => {
    const start = (safeCurrentPage - 1) * postsPerPage
    return filteredPosts.slice(start, start + postsPerPage)
  }, [filteredPosts, safeCurrentPage])

  function toggleTag(tag: string) {
    setActiveTags((current) => {
      const next = new Set(current)

      if (next.has(tag)) {
        next.delete(tag)
      } else {
        next.add(tag)
      }

      setCurrentPage(1)
      return next.size > 0 ? next : new Set(writingTags)
    })
  }

  return (
    <>
      <section className="works-filter writing-filter" aria-label="写作标签筛选">
        {writingTags.map((tag) => (
          <button
            aria-pressed={activeTags.has(tag)}
            className={activeTags.has(tag) ? "is-active" : ""}
            key={tag}
            onClick={() => toggleTag(tag)}
            type="button"
          >
            {tag}
          </button>
        ))}
      </section>

      <div className="timeline">
        {filteredPosts.length > 0 ? visiblePosts.map((post) => (
          <Link
            className="writing-card"
            href={`/writing/${post.slug}`}
            key={post.slug}
          >
            <article>
              <div className="writing-card-meta">
                <time>{post.date}</time>
                <div className="tag-row">
                  {post.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
            </article>
          </Link>
        )) : (
          <p className="writing-empty">这个标签下暂时没有文章。</p>
        )}
      </div>

      {filteredPosts.length > postsPerPage ? (
        <nav className="pagination" aria-label="写作分页">
          <button
            disabled={safeCurrentPage === 1}
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            type="button"
          >
            上一页
          </button>
          <span>
            第 {safeCurrentPage} / {totalPages} 页
          </span>
          <button
            disabled={safeCurrentPage === totalPages}
            onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
            type="button"
          >
            下一页
          </button>
        </nav>
      ) : null}
    </>
  )
}
