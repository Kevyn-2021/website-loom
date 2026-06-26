import Link from "next/link"

import { homeCopy } from "@/lib/site-data"

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>
}) {
  const params = await searchParams
  const lang = params?.lang === "en" ? "en" : "zh"
  const copy = homeCopy[lang]
  const nextLangHref = lang === "zh" ? "/?lang=en" : "/"

  return (
    <main>
      <section className="hero">
        <div className="language-row">
          <span>{copy.eyebrow}</span>
          <Link className="language-toggle" href={nextLangHref}>
            {lang === "zh" ? "English" : "中文"}
          </Link>
        </div>
        <h1>{copy.title}</h1>
        <p className="hero-intro">{copy.intro}</p>
      </section>

      <section className="origin-panel" aria-label="网站初衷">
        <div>
          <p className="section-kicker">Origin</p>
          <h2>{copy.originTitle}</h2>
        </div>
        <p>{copy.origin}</p>
        <div className="origin-tags" aria-label="核心隐喻">
          {copy.originMeta.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="summary-grid" aria-label="个人摘要">
        <article>
          <p className="section-kicker">Identity</p>
          <h2>{lang === "zh" ? "经验主线" : "Path"}</h2>
          <p>{copy.identity}</p>
        </article>
        <article>
          <p className="section-kicker">Capability</p>
          <h2>{lang === "zh" ? "方法结构" : "Method"}</h2>
          <p>{copy.capability}</p>
        </article>
        <article>
          <p className="section-kicker">Direction</p>
          <h2>{lang === "zh" ? "当前方向" : "Direction"}</h2>
          <p>{copy.direction}</p>
        </article>
      </section>

      <section className="loom-note">
        <p>如果需要一条更完整的路径，可以继续阅读经历叙事，或直接从作品和知识图谱进入。</p>
        <Link href="/about">继续了解</Link>
      </section>
    </main>
  )
}
