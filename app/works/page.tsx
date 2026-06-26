import { works } from "@/lib/site-data"

export default function Works() {
  return (
    <main className="page">
      <p className="section-kicker">Works</p>
      <h1>作品</h1>
      <p className="page-lede">
        这里展示已经形成结果的作品，而不是绩效履历。先按时间线排序，后续作品增多后再加入翻页。
      </p>

      <section className="works-grid" aria-label="作品列表">
        {works.map((work) => (
          <article className="work-card" key={`${work.year}-${work.title}`}>
            <div className="work-meta">
              <span className="tag">{work.type}</span>
              <span>{work.year}</span>
            </div>
            <h2>{work.title}</h2>
            <p>{work.description}</p>
          </article>
        ))}
      </section>
    </main>
  )
}
