import { getAllWriting } from "@/lib/writing"

export default function WritingPage() {
  const posts = getAllWriting()

  return (
    <main className="page">
      <p className="section-kicker">Writing</p>
      <h1>写作</h1>
      <p className="page-lede">
        这里保留时间序的思考流。内容以手写为准，不做 AI 加工式包装。
      </p>

      <div className="timeline">
        {posts.map((post) => (
          <article key={post.slug}>
            <time>{new Date(post.meta.date).toLocaleDateString("zh-CN")}</time>
            <h2>{post.meta.title}</h2>
            {Array.isArray(post.meta.tags) ? (
              <div className="tag-row">
                {post.meta.tags.map((tag: string) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </main>
  )
}
