import Link from "next/link"
import React from "react"

import { KevinZMark } from "@/components/KevinZMark"
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
        <KevinZMark className="hero-mark" />
        <h1>{copy.title}</h1>
        <p className="hero-alias">{copy.alias}</p>
        <p className="hero-intro">{copy.intro}</p>
      </section>

      <section className="origin-panel" aria-label="网站初衷">
        <div>
          <p className="section-kicker">Origin</p>
          <h2>{copy.originTitle}</h2>
        </div>
        <p className="origin-short">
          {copy.origin.split(
            lang === "zh" ? /(线索|编织|结构|观点……)/g : /(threads|weaves|structure)/gi,
          ).map((part, index) =>
            part === "观点……" ? <React.Fragment key={`${part}-${index}`}>{part}<br /></React.Fragment> :
            /^(线索|编织|结构|threads|weaves|structure)$/i.test(part) ? (
              <span className="copy-keyword" key={`${part}-${index}`}>{part}</span>
            ) : part,
          )}
        </p>
        <div className="origin-keywords" aria-label="核心关键词">
          {copy.originMeta.map((item) => <span key={item}>{item}</span>)}
        </div>
      </section>

      <section className="summary-grid" aria-label="个人摘要">
        <article className="summary-link-card">
          <p className="section-kicker">Identity</p>
          <h2>{lang === "zh" ? "经验主线" : "Path"}</h2>
          <p>{copy.identity}</p>
          <Link href="/about">经历路径 <span>↗</span></Link>
        </article>
        <article className="summary-link-card">
          <p className="section-kicker">Capability</p>
          <h2>{lang === "zh" ? "方法结构" : "Method"}</h2>
          <p>{copy.capability}</p>
          <Link href="/graph">知识图谱 <span>↗</span></Link>
        </article>
        <article className="summary-link-card">
          <p className="section-kicker">Works</p>
          <h2>{lang === "zh" ? "持续创作" : "Works"}</h2>
          <p>{copy.direction}</p>
          <Link href="/works">查看作品 <span>↗</span></Link>
        </article>
      </section>

      <section className="home-lower-grid">
        <article className="home-now-card">
          <p className="section-kicker">Now</p>
          <h2>{lang === "zh" ? "正在关注" : "Currently"}</h2>
          <div className="now-focus-list">
            <span>{lang === "zh" ? "AI 智能硬件" : "AI hardware"}</span>
            <span>{lang === "zh" ? "产品生命周期" : "Product lifecycle"}</span>
            <span>{lang === "zh" ? "个人知识系统" : "Personal knowledge system"}</span>
          </div>
          <span className="home-now-year">2026</span>
        </article>
        <article className="graph-teaser">
          <div className="graph-teaser-copy">
            <p className="section-kicker">Knowledge graph</p>
            <h2>{lang === "zh" ? "经验如何连接成方法" : "How experience becomes method"}</h2>
            <Link className="graph-teaser-action" href="/graph">{lang === "zh" ? "进入知识图谱" : "Open the graph"} ↗</Link>
          </div>
          <div className="graph-teaser-map">
            <img src="/assets/knowledge-graph-preview.png" alt="简化的知识图谱关系预览" />
          </div>
        </article>
      </section>
    </main>
  )
}
