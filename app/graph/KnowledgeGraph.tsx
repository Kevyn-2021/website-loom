"use client"

import { useMemo, useState } from "react"

import { graphLinks, graphNodes } from "@/lib/site-data"

const clusterLabels: Record<string, string> = {
  hub: "Core",
  method: "Method",
  experience: "Experience",
  output: "Output",
  frontier: "Frontier",
  orphan: "Unlinked",
}

export function KnowledgeGraph() {
  const [activeNodeId, setActiveNodeId] = useState<string | null>("kevin")
  const nodeById = useMemo(
    () => Object.fromEntries(graphNodes.map((node) => [node.id, node])),
    []
  )
  const activeNode =
    graphNodes.find((node) => node.id === activeNodeId) ?? graphNodes[0]
  const activeLinkIds = new Set(
    graphLinks
      .filter((link) => link.from === activeNode.id || link.to === activeNode.id)
      .flatMap((link) => [link.from, link.to])
  )

  return (
    <section
      className="knowledge-map"
      aria-label="KevinZ 个人知识图谱"
      onMouseLeave={() => setActiveNodeId("kevin")}
    >
      <div className="graph-heading">
        <p className="section-kicker">Knowledge Graph</p>
        <h1>KevinZ Knowledge Graph</h1>
        <p>Product, market, hardware, writing and AI hardware in one living map.</p>
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
        aria-label="知识节点之间的关联"
        preserveAspectRatio="none"
      >
        {graphLinks.map((link) => {
          const from = nodeById[link.from]
          const to = nodeById[link.to]
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

      {graphNodes.map((node) => {
        const isActive = node.id === activeNode.id
        const isNeighbor = activeLinkIds.has(node.id)

        return (
          <button
            aria-label={`${node.label}: ${node.detail}`}
            className={`map-node map-node-${node.cluster} ${
              isActive ? "is-active" : ""
            } ${isNeighbor ? "is-neighbor" : "is-dimmed"}`}
            key={node.id}
            onBlur={() => setActiveNodeId("kevin")}
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
            <p>{node.detail}</p>
          </button>
        )
      })}

      <aside className="graph-inspector" aria-live="polite">
        <span>{clusterLabels[activeNode.cluster]}</span>
        <h2>{activeNode.label}</h2>
        <p>{activeNode.detail}</p>
      </aside>
    </section>
  )
}
