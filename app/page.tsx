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
          <h2>{lang === "zh" ? "我是谁" : "Who I am"}</h2>
          <p>{copy.identity}</p>
        </article>
        <article>
          <p className="section-kicker">Capability</p>
          <h2>{lang === "zh" ? "我擅长什么" : "What I do"}</h2>
          <p>{copy.capability}</p>
        </article>
        <article>
          <p className="section-kicker">Direction</p>
          <h2>{lang === "zh" ? "我正在走向哪里" : "Where I am going"}</h2>
          <p>{copy.direction}</p>
        </article>
      </section>

      <section className="loom-note">
        <p>
          KevinZ.com.cn 不是简历页，而是一套个人表达系统：把经历、作品和方法整理成可以持续生长的结构。
        </p>
        <Link href="/about">继续了解</Link>
      </section>
    </main>
  )
}
