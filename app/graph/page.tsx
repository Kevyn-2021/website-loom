import { graphLinks, graphNodes } from "@/lib/site-data"

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

  return (
    <main className="page graph-page">
      <section className="knowledge-map" aria-label="个人知识图谱">
        <div className="graph-heading">
          <p className="section-kicker">Knowledge Graph</p>
          <h1>KevinZ Knowledge Graph</h1>
          <p>
            Product, market, hardware, writing and AI hardware woven into one
            living map.
          </p>
        </div>

        <div className="cluster-orbit cluster-orbit-method">
          <span>Method</span>
        </div>
        <div className="cluster-orbit cluster-orbit-experience">
          <span>Experience</span>
        </div>
        <div className="cluster-orbit cluster-orbit-output">
          <span>Output</span>
        </div>
        <div className="cluster-orbit cluster-orbit-frontier">
          <span>Frontier</span>
        </div>

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
                <circle cx={to.x} cy={to.y} r="0.65" className="map-link-dot" />
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

        <div className="graph-footnote">
          <span>Method</span>
          <span>Experience</span>
          <span>Output</span>
          <span>Frontier</span>
          <span>Unlinked</span>
        </div>
      </section>
    </main>
  )
}
