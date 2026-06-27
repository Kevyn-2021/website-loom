import Link from "next/link"

import { getAllWriting } from "@/lib/writing"

export default function WritingPage() {
  const posts = getAllWriting()

  return (
    <main className="page">
      <p className="section-kicker">Writing</p>
      <h1>写作</h1>
      <p className="page-lede">
        这里记录产品、市场、职业与 AI 的长期思考。每篇文章都来自具体问题，也会回到可复用的方法。
      </p>

      <div className="timeline">
        {posts.map((post) => (
          <Link
            className="writing-card"
            href={`/writing/${post.slug}`}
            key={post.slug}
          >
            <article>
              <time>{post.date}</time>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <div className="tag-row">
                {post.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  )
}
