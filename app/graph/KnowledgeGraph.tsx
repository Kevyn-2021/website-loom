"use client"

import { useMemo, useState } from "react"

import type { KnowledgeGraphData } from "@/lib/knowledge-graph"

const clusterLabels: Record<string, string> = {
  core: "Core",
  method: "Method",
  gtm: "GTM",
  experience: "Experience",
  output: "Output",
  frontier: "Frontier",
  personal: "Personal",
}

type KnowledgeGraphProps = {
  graph: KnowledgeGraphData
}

export function KnowledgeGraph({ graph }: KnowledgeGraphProps) {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(
    graph.nodes[0]?.id ?? null
  )
  const defaultNode = graph.nodes[0]
  const nodeById = useMemo(
    () => Object.fromEntries(graph.nodes.map((node) => [node.id, node])),
    [graph.nodes]
  )
  const activeNode =
    graph.nodes.find((node) => node.id === activeNodeId) ?? defaultNode
  const activeLinkIds = new Set(
    graph.links
      .filter((link) => link.from === activeNode.id || link.to === activeNode.id)
      .flatMap((link) => [link.from, link.to])
  )

  return (
    <section
      className="knowledge-map"
      aria-label="KevinZ 个人知识图谱"
      onMouseLeave={() => setActiveNodeId(defaultNode.id)}
    >
      <div className="graph-heading">
        <p className="section-kicker">Knowledge Graph</p>
        <h1>KevinZ Knowledge Graph</h1>
        <p>产品、市场、硬件、写作与 AI 硬件，在同一张网络里互相牵引。</p>
      </div>

      <div className="cluster-orbit cluster-orbit-method">
        <span>Method</span>
      </div>
      <div className="cluster-orbit cluster-orbit-gtm">
        <span>GTM</span>
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
        aria-label="知识节点之间的关联"
        preserveAspectRatio="none"
      >
        {graph.links.map((link) => {
          const from = nodeById[link.from]
          const to = nodeById[link.to]
          if (!from || !to) return null
          const isActive =
            activeNode.id === link.from || activeNode.id === link.to

          return (
            <g key={`${link.from}-${link.to}`}>
              <line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                className={`map-link map-link-${from.cluster} ${
                  isActive ? "is-active" : "is-muted"
                }`}
              />
              <circle
                cx={to.x}
                cy={to.y}
                r="0.62"
                className={`map-link-dot ${isActive ? "is-active" : ""}`}
              />
            </g>
          )
        })}
      </svg>

      {graph.nodes.map((node) => {
        const isActive = node.id === activeNode.id
        const isNeighbor = activeLinkIds.has(node.id)

        return (
          <button
            aria-label={`${node.label}: ${node.note}`}
            className={`map-node map-node-${node.cluster} ${
              isActive ? "is-active" : ""
            } ${isNeighbor ? "is-neighbor" : "is-dimmed"}`}
            key={node.id}
            onBlur={() => setActiveNodeId(defaultNode.id)}
            onFocus={() => setActiveNodeId(node.id)}
            onMouseEnter={() => setActiveNodeId(node.id)}
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
            }}
            title={node.label}
            type="button"
          >
            <span>{clusterLabels[node.cluster]}</span>
            <h2>{node.label}</h2>
            <p>{node.note}</p>
          </button>
        )
      })}

      <aside className="graph-inspector" aria-live="polite">
        <span>{clusterLabels[activeNode.cluster]}</span>
        <h2>{activeNode.label}</h2>
        <p>{activeNode.note}</p>
      </aside>
    </section>
  )
}
