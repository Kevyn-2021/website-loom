import Link from "next/link"
import Image from "next/image"

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
  const pathSections = copy.sections
  const orderedSections = [...copy.sections].reverse()
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

      <section className="global-section" aria-labelledby="global-title">
        <div className="world-map">
          <div className="global-heading">
          <p className="section-kicker">Global context</p>
          <h2 id="global-title">在不同市场里，理解产品如何落地</h2>
          <p>亚洲、美洲、欧洲让我看到：<br />同一个产品，必须经过不同文化、渠道与生活方式的重新翻译。</p>
          </div>
          <div className="world-map-visual" role="img" aria-label="Kevin 曾在中国、美国、墨西哥、秘鲁、西班牙和法国常驻或工作">
          <Image
            src="/assets/global-footprint-map.png"
            alt=""
            fill
            sizes="(max-width: 860px) 100vw, 900px"
            className="world-map-art"
          />
          <div className="map-grid" aria-hidden="true" />
          <span className="map-caption">6 markets · product / GTM / sales</span>
          </div>
          <div className="market-legend-panel" aria-label="经历过的国家和地区">
            <div className="market-legend">
              {["中国", "美国", "墨西哥", "秘鲁", "西班牙", "法国"].map((country, index) => (
                <span key={country} className={`market-item market-item-${index + 1}`}><i />{country}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="about-path-card" aria-labelledby="path-title">
        <div className="about-path-heading">
          <p className="section-kicker">Path</p>
          <h2 id="path-title">五个节点，一条持续迁移的产品路径</h2>
        </div>
        <div className="about-path-line">
          {pathSections.map((section, index) => (
            <div className={`about-path-node path-node-${index + 1}`} key={section.title}>
              <time>{section.period}</time>
              <i />
              <strong>{section.title.split("：")[0]}</strong>
            </div>
          ))}
        </div>
      </section>

      <div className="about-detail-heading">
        <p className="section-kicker">Detailed timeline</p>
        <p>{lang === "zh" ? "以下按时间倒序，从现在回看这条路径如何形成。" : "The details below run in reverse time, looking back from the present."}</p>
      </div>

      <div className="about-narrative">
        {orderedSections.map((section, index) => {
          const delimiter = lang === "zh" ? "。" : "."
          const [lead, ...bodyParts] = section.body.split(delimiter)

          return (
          <section key={section.title} className={`about-card about-card-${index + 1} ${index === 0 ? "about-card-current" : ""}`}>
            <div className="about-section-meta">
              <time>{section.period}</time>
            </div>
            <div className="about-card-content">
              <div className="about-card-heading">
                <h2>{section.title}</h2>
              </div>
              <p><span className="about-lead">{lead}{delimiter}</span>{bodyParts.join(delimiter)}</p>
              <div className="about-tag-row" aria-label="阶段技能">
                {section.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </section>
          )
        })}
      </div>
    </main>
  )
}
