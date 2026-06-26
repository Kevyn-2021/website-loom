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
        <p>
          KevinZ.com.cn 不是简历页，而是一套持续生长的个人知识系统：经历、作品和方法被整理到同一个结构里。
        </p>
        <Link href="/about">继续了解</Link>
      </section>
    </main>
  )
}
