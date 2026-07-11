"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

import { works } from "@/lib/site-data"

const workTags = [
  "Hardware",
  "Product",
  "Go-to-Market",
  "Book",
  "Website",
  "Newsletter",
  "App",
]

export default function Works() {
  const [activeTags, setActiveTags] = useState(() => new Set(workTags))
  const filteredWorks = useMemo(
    () => works.filter((work) => activeTags.has(work.type)),
    [activeTags],
  )

  function toggleTag(tag: string) {
    setActiveTags((current) => {
      const next = new Set(current)

      if (next.has(tag)) {
        next.delete(tag)
      } else {
        next.add(tag)
      }

      return next.size > 0 ? next : new Set(workTags)
    })
  }

  return (
    <main className="page">
      <p className="section-kicker">Works</p>
      <h1>作品</h1>
      <p className="page-lede">
        从硬件产品、GTM 实践到写作和网站系统，这里收纳已经沉淀成形的项目与作品。它们共同构成一条更完整的产品经理成长线索。
      </p>

      <section className="works-filter" aria-label="作品标签筛选">
        <button
          aria-pressed={activeTags.size === workTags.length}
          className={activeTags.size === workTags.length ? "is-active filter-reset" : "filter-reset"}
          onClick={() => setActiveTags(new Set(workTags))}
          type="button"
        >
          全部
        </button>
        {workTags.map((tag) => (
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

      <section className="works-grid" aria-label="作品列表">
        {filteredWorks.map((work) => (
          work.href ? (
            <Link
              className="work-card work-card-link"
              href={work.href}
              key={`${work.year}-${work.title}`}
            >
              <WorkCardContent work={work} />
            </Link>
          ) : (
            <article className="work-card" key={`${work.year}-${work.title}`}>
              <WorkCardContent work={work} />
            </article>
          )
        ))}
      </section>
    </main>
  )
}

function WorkCardContent({
  work,
}: {
  work: (typeof works)[number]
}) {
  return (
    <>
            <div className="work-meta">
              <span className="tag">{work.type}</span>
              <span>{work.year}</span>
            </div>
            <h2>{work.title}</h2>
            <p>{work.description}</p>
    </>
  )
}
