import Link from "next/link"

import { KevinZMark } from "@/components/KevinZMark"
import { aboutCopy } from "@/lib/site-data"

export default async function About({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>
}) {
  const params = await searchParams
  const lang = params?.lang === "en" ? "en" : "zh"
  const copy = aboutCopy[lang]
  const nextLangHref = lang === "zh" ? "/about?lang=en" : "/about"
  const profileMeta =
    lang === "zh"
      ? [
          ["起点", "工程与芯片"],
          ["路径", "产品 / GTM / 销售"],
          ["方向", "AI硬件与个人知识系统"],
        ]
      : [
          ["Start", "Engineering and chips"],
          ["Path", "Product / GTM / Sales"],
          ["Focus", "AI hardware and knowledge systems"],
        ]

  return (
    <main className="page about-page">
      <div className="language-row">
        <span>About</span>
        <Link className="language-toggle" href={nextLangHref}>
          {lang === "zh" ? "English" : "中文"}
        </Link>
      </div>

      <section className="about-hero">
        <div>
          <p className="section-kicker">Profile</p>
          <KevinZMark className="about-mark" />
          <h1>{copy.title}</h1>
          <p className="about-hero-intro">{copy.intro}</p>
        </div>
        <div className="about-profile-card" aria-label="个人路径摘要">
          {profileMeta.map(([label, value]) => (
            <p key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </p>
          ))}
        </div>
      </section>

      <div className="about-narrative">
        {copy.sections.map((section, index) => (
          <section key={section.title}>
            <div className="about-section-meta">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <time>{section.period}</time>
            </div>
            <div>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
              <div className="about-tag-row" aria-label="阶段技能">
                {section.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
