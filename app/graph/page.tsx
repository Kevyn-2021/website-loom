import { graphClusters, graphLinks, graphNodes } from "@/lib/site-data"

const clusterLabels: Record<string, string> = {
  hub: "Hub",
  method: "Method",
  experience: "Experience",
  output: "Output",
  frontier: "Frontier",
  orphan: "Orphan",
}

export default function Graph() {
  const nodeById = Object.fromEntries(graphNodes.map((node) => [node.id, node]))
  const linkedNodeIds = new Set(
    graphLinks.flatMap((link) => [link.from, link.to])
  )
  const orphanNodes = graphNodes.filter((node) => !linkedNodeIds.has(node.id))
  const hubNode = graphNodes.reduce((currentHub, node) => {
    const degree = graphLinks.filter(
      (link) => link.from === node.id || link.to === node.id
    ).length
    const currentDegree = graphLinks.filter(
      (link) => link.from === currentHub.id || link.to === currentHub.id
    ).length

    return degree > currentDegree ? node : currentHub
  }, graphNodes[0])

  return (
    <main className="page">
      <p className="section-kicker">Knowledge Graph</p>
      <h1>知识图谱</h1>
      <p className="page-lede">
        这不是后台系统，而是一张可以被阅读的个人知识网络：节点代表原子化经验，连线代表双向关联，聚类让散落线索涌现为结构。
      </p>

      <section className="knowledge-map" aria-label="个人知识图谱">
        <svg
          className="knowledge-map-lines"
          viewBox="0 0 100 100"
          role="img"
          aria-label="知识节点之间的双向链接"
          preserveAspectRatio="none"
        >
          {graphLinks.map((link) => {
            const from = nodeById[link.from]
            const to = nodeById[link.to]

            return (
              <g key={`${link.from}-${link.to}`}>
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  className={`map-link map-link-${from.cluster}`}
                />
                <circle cx={to.x} cy={to.y} r="0.8" className="map-link-dot" />
              </g>
            )
          })}
        </svg>

        {graphNodes.map((node) => (
          <article
            className={`map-node map-node-${node.cluster}`}
            key={node.id}
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
            }}
          >
            <span>{clusterLabels[node.cluster]}</span>
            <h2>{node.label}</h2>
            <p>{node.detail}</p>
          </article>
        ))}
      </section>

      <section className="graph-reading">
        <article>
          <p className="section-kicker">Nodes</p>
          <h2>点：原子化的笔记</h2>
          <p>
            每个节点只表达一个概念：产品定义、GTM、生命周期、全球市场、写作。它们不是履历条目，而是可以反复被调用的思考单元。
          </p>
        </article>
        <article>
          <p className="section-kicker">Links</p>
          <h2>线：双向链接与关联</h2>
          <p>
            线不是装饰，而是说明关系：产品定义连接消费电子，GTM 连接全球市场，写作连接书籍；任何一个点都可以反向解释另一个点。
          </p>
        </article>
        <article>
          <p className="section-kicker">Graph</p>
          <h2>面：涌现的宏观结构</h2>
          <p>
            当点和线不断增加，页面不再只是“关于我”的介绍，而会逐渐变成一个可生长的个人知识系统。
          </p>
        </article>
      </section>

      <section className="cluster-grid" aria-label="图谱结构说明">
        {graphClusters.map((cluster) => (
          <article className={`cluster-card cluster-card-${cluster.cluster}`} key={cluster.name}>
            <span>{clusterLabels[cluster.cluster]}</span>
            <h2>{cluster.name}</h2>
            <p>{cluster.description}</p>
          </article>
        ))}
        <article className="cluster-card cluster-card-hub">
          <span>Hub</span>
          <h2>枢纽节点：{hubNode.label}</h2>
          <p>
            它连接最多主题，是整张图的入口。当前图谱里，个人叙事先从“张凯峰”向能力、经历和输出展开。
          </p>
        </article>
        <article className="cluster-card cluster-card-orphan">
          <span>Orphan</span>
          <h2>孤岛节点：{orphanNodes.map((node) => node.label).join("、")}</h2>
          <p>
            孤岛不是无用信息，而是暂时还没有进入主结构的碎片。未来它可能通过健康、团队或生活方式主题重新接入网络。
          </p>
        </article>
      </section>
    </main>
  )
}
