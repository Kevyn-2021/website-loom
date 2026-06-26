import { graphNodes } from "@/lib/site-data"

export default function Graph() {
  return (
    <main className="page">
      <p className="section-kicker">Knowledge Graph</p>
      <h1>知识图谱</h1>
      <p className="page-lede">
        这不是后台系统，而是帮助访客理解“这个人如何被组织起来”的表达工具。
      </p>

      <section className="graph-panel" aria-label="个人结构信息图">
        {graphNodes.map((node, index) => (
          <article className="graph-node" key={node.label}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{node.label}</h2>
            <p>{node.detail}</p>
          </article>
        ))}
      </section>
    </main>
  )
}
