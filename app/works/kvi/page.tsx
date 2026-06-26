import { readDoc } from "@/lib/docs"

const kviDoc = "2026-06-27_KVI_视觉风格系统.md"

const principles = [
  {
    label: "01",
    title: "克制",
    body: "每个元素都要有存在理由，装饰只在能传达信息或建立氛围时保留。",
  },
  {
    label: "02",
    title: "灰阶",
    body: "灰阶负责结构，暖赭色只作为注意力标点，避免页面变成调色盘。",
  },
  {
    label: "03",
    title: "层级",
    body: "字号、字重、间距和对齐共同建立扫描路径，让内容在第一眼可读。",
  },
  {
    label: "04",
    title: "纵深",
    body: "轻玻璃、细边框和微弱噪点表达层次，不用重阴影制造漂浮感。",
  },
  {
    label: "05",
    title: "呼吸",
    body: "卡片内部紧凑，区块之间留白，让信息有秩序地停留在页面上。",
  },
]

export default function KviPage() {
  const markdown = readDoc(kviDoc)

  return (
    <main className="page work-detail-page">
      <p className="section-kicker">KVI</p>
      <h1>VI 视觉风格系统</h1>
      <p className="page-lede">
        这套视觉系统把 KevinZ 的页面约束成一组可维护的规则：灰阶为基，暖色作标点，视觉服务内容。
      </p>

      <section className="kvi-showcase" aria-label="KVI 视觉样张">
        <div className="kvi-hero-card">
          <span>KVI / KevinZ Visual Identity</span>
          <h2>少量规则，让页面保持一致</h2>
          <p>
            设计不是不断添加，而是把不必要的东西删掉。留下来的颜色、间距、材质和层级，都要帮助读者更快理解内容。
          </p>
        </div>

        <div className="kvi-principles">
          {principles.map((principle) => (
            <article key={principle.label}>
              <span>{principle.label}</span>
              <h3>{principle.title}</h3>
              <p>{principle.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="code-section" aria-label="KVI Markdown">
        <div className="code-section-heading">
          <p className="section-kicker">Markdown Source</p>
          <h2>可维护的视觉规则</h2>
        </div>
        <pre>
          <code>{markdown}</code>
        </pre>
      </section>
    </main>
  )
}

