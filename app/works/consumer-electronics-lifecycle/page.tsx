import Image from "next/image"

const stats = [
  ["13.2万字", "系统方法沉淀"],
  ["3000+人", "阅读与使用"],
  ["7章", "覆盖产品到商业"],
]

const chapters = [
  {
    title: "产品管理与商业成功",
    body: "从产品生命周期、4P、4C和企业战略出发，建立消费电子产品的全局视角。",
  },
  {
    title: "产品规划与开发",
    body: "把市场洞察、需求分析、产品定义、商业计划书、开发验证和路线图连接起来。",
  },
  {
    title: "渠道、营销、财务与供应链",
    body: "讨论渠道价格、零售、品牌转化、业务财务、供应链计划和S&OP等关键模块。",
  },
  {
    title: "业务实践",
    body: "回到组织、流程、日常运作和市场开拓，把方法落到真实经营场景中。",
  },
]

const reviewNotes = [
  "系统梳理了从产品规划到商业落地的全流程。",
  "理论结合实践，横向纵向都讲得比较全面。",
  "帮助 GTM、市场、零售人员快速上手实践。",
  "横跨财务、销售、产品、供应链等领域，还原 GTM 工作全貌。",
  "刚入消费电子行业，也能从书中了解渠道和定价相关知识。",
  "构建了完整的产品战略管理体系。",
  "用大量案例讲清如何发现并抓住产品发展的战略机会点。",
  "以产品生命周期为横轴，以营销 4P 为纵轴，思路清晰。",
  "PEST、商业计划书、JTBD、需求管理等工具被串成体系。",
  "像一本百科全书类型的工具书，实操时可以随时查阅。",
  "理论和实际结合，是破局的关键。",
  "适合消费电子领域从业者，也适合财务、人力、电商、渠道和 GTM 岗位拓展视野。",
  "适合重复阅读和理解，也值得推荐给更多朋友。",
  "产品线、研发线、营销线相关岗位都能从中获得启发。",
  "干操盘手的角色会深有感悟。",
]

export default function ConsumerElectronicsBookPage() {
  return (
    <main className="page book-page">
      <section className="book-hero">
        <div className="book-copy">
          <p className="section-kicker">Book</p>
          <h1>消费电子产品全生命周期管理实践</h1>
          <p className="page-lede">
            一本写给消费电子从业者的产品与商业方法书。它以产品生命周期为时间线，以4P为业务线，把规划、开发、上市、销售、财务和供应链放进同一个结构里。
          </p>
          <div className="book-actions">
            <a href="https://weread.qq.com/web/reader/ba332e30813ab83dcg017bd0">
              微信读书
            </a>
            <a href="https://www.kobo.com/hk/en/ebook/yI5U8mY9wzKm-mPiKkv13Q?srsltid=AfmBOorphxIlreLVBbeuTmQHzoZt7TANLFtO2TbL_JkKgpS46k2U7_Fw">
              Kobo
            </a>
          </div>
        </div>

        <div className="book-cover-card">
          <Image
            alt="消费电子产品全生命周期管理实践书籍封面"
            height={612}
            priority
            src="/assets/book-consumer-electronics-lifecycle.png"
            width={428}
          />
        </div>
      </section>

      <section className="book-stats" aria-label="书籍数据">
        {stats.map(([value, label]) => (
          <article key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </article>
        ))}
      </section>

      <section className="book-section book-framework">
        <div>
          <p className="section-kicker">Framework</p>
          <h2>横向生命周期，纵向业务线</h2>
        </div>
        <p>
          这本书的核心不是单点经验，而是一套可迁移的业务地图：横向看产品从规划、开发、上市到经营的阶段变化，纵向看产品、价格、渠道、营销、财务和供应链如何协同。它试图回答的不是“某个动作怎么做”，而是“这些动作为什么必须放在一起看”。
        </p>
      </section>

      <section className="book-chapters" aria-label="内容结构">
        {chapters.map((chapter, index) => (
          <article key={chapter.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{chapter.title}</h2>
            <p>{chapter.body}</p>
          </article>
        ))}
      </section>

      <section className="book-section book-reader-notes">
        <div>
          <p className="section-kicker">Reader Notes</p>
          <h2>读者反馈</h2>
          <p className="book-reader-summary">
            来自不同岗位读者，关键词聚焦体系、实操、上市、渠道、定价与产品方法。
          </p>
        </div>
        <div className="book-review-grid">
          {reviewNotes.map((note) => (
            <blockquote key={note}>{note}</blockquote>
          ))}
        </div>
      </section>
    </main>
  )
}
