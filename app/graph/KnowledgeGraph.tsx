"use client"

import {
  Background,
  Handle,
  MarkerType,
  Panel,
  Position,
  ReactFlow,
  type Edge,
  type Node,
  type NodeProps,
  useReactFlow,
} from "@xyflow/react"
import { useMemo, useState } from "react"

import type {
  GraphCluster,
  KnowledgeGraphData,
} from "@/lib/knowledge-graph"

const clusterLabels: Record<GraphCluster, string> = {
  core: "Core",
  method: "Method",
  gtm: "GTM",
  experience: "Experience",
  output: "Output",
  frontier: "Frontier",
  personal: "Personal",
}

const clusterNames: Record<GraphCluster, string> = {
  core: "中心",
  method: "方法",
  gtm: "商业化",
  experience: "经历",
  output: "作品",
  frontier: "方向",
  personal: "生活",
}

type FlowNodeData = {
  active: boolean
  cluster: GraphCluster
  clusterLabel: string
  label: string
  note: string
  related: boolean
}

type FlowNode = Node<FlowNodeData, "knowledgeNode">

type KnowledgeGraphProps = {
  graph: KnowledgeGraphData
}

const nodeTypes = {
  knowledgeNode: KnowledgeNode,
}

function KnowledgeNode({ data }: NodeProps<FlowNode>) {
  return (
    <div
      className={`kg-node kg-node-${data.cluster} ${
        data.active ? "is-active" : ""
      } ${data.related ? "is-related" : "is-muted"}`}
    >
      <Handle className="kg-handle" position={Position.Top} type="target" />
      <Handle className="kg-handle" position={Position.Bottom} type="source" />
      <span>{data.clusterLabel}</span>
      <strong>{data.label}</strong>
      <small>{data.note}</small>
    </div>
  )
}

function GraphCenterButton({ onCenter }: { onCenter: () => void }) {
  const { fitView } = useReactFlow()

  const centerGraph = () => {
    onCenter()
    fitView({ duration: 520, padding: 0.1 })
  }

  return (
    <Panel className="graph-center-panel" position="top-left">
      <button type="button" onClick={centerGraph}>
        一键居中
      </button>
    </Panel>
  )
}

export function KnowledgeGraph({ graph }: KnowledgeGraphProps) {
  const defaultNodeId =
    graph.nodes.find((node) => node.id === "kevinz")?.id ?? graph.nodes[0]?.id
  const [activeNodeId, setActiveNodeId] = useState(defaultNodeId)

  const nodeById = useMemo(
    () => Object.fromEntries(graph.nodes.map((node) => [node.id, node])),
    [graph.nodes]
  )

  const activeNode = nodeById[activeNodeId] ?? graph.nodes[0]

  const relatedNodeIds = useMemo(() => {
    const ids = new Set<string>([activeNode.id])

    graph.links.forEach((link) => {
      if (link.from === activeNode.id) ids.add(link.to)
      if (link.to === activeNode.id) ids.add(link.from)
    })

    return ids
  }, [activeNode.id, graph.links])

  const activeRelations = useMemo(
    () =>
      graph.links.filter(
        (link) => link.from === activeNode.id || link.to === activeNode.id
      ),
    [activeNode.id, graph.links]
  )

  const nodes = useMemo<FlowNode[]>(
    () =>
      graph.nodes.map((node) => {
        const isActive = node.id === activeNode.id
        const isRelated = relatedNodeIds.has(node.id)

        return {
          id: node.id,
          type: "knowledgeNode",
          position: {
            x: node.x * 12,
            y: node.y * 8.5,
          },
          data: {
            active: isActive,
            cluster: node.cluster,
            clusterLabel: clusterLabels[node.cluster],
            label: node.label,
            note: node.note,
            related: isRelated,
          },
          draggable: false,
          selectable: true,
        }
      }),
    [activeNode.id, graph.nodes, relatedNodeIds]
  )

  const edges = useMemo<Edge[]>(
    () =>
      graph.links.map((link) => {
        const isActive = link.from === activeNode.id || link.to === activeNode.id

        return {
          id: `${link.from}-${link.to}`,
          source: link.from,
          target: link.to,
          label: isActive ? link.relation : undefined,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: isActive ? "#c4622e" : "rgba(42, 39, 34, 0.2)",
            width: 14,
            height: 14,
          },
          style: {
            stroke: isActive ? "#c4622e" : "rgba(42, 39, 34, 0.18)",
            strokeWidth: isActive ? 1.8 : 1,
          },
          labelBgBorderRadius: 6,
          labelBgPadding: [5, 3],
          labelBgStyle: {
            fill: "rgba(255, 255, 252, 0.86)",
            fillOpacity: 0.94,
          },
          labelStyle: {
            fill: "#7a6b5d",
            fontSize: 11,
            fontWeight: 650,
          },
          type: "smoothstep",
        }
      }),
    [activeNode.id, graph.links]
  )

  return (
    <section className="knowledge-explorer" aria-label="KevinZ 个人知识图谱">
      <div className="graph-heading">
        <p className="section-kicker">Knowledge Graph</p>
        <h1>经验、方法与作品如何彼此支撑</h1>
        <p>
          这张图从 Markdown 文档生成。节点代表细颗粒度的概念，连线表示支撑、迁移、反馈和沉淀关系。
        </p>
      </div>

      <div className="graph-flow-shell">
        <div className="graph-canvas">
          <ReactFlow
            edges={edges}
            fitView
            fitViewOptions={{ padding: 0.1 }}
            maxZoom={1.45}
            minZoom={0.45}
            nodes={nodes}
            nodeOrigin={[0.5, 0.5]}
            nodeTypes={nodeTypes}
            nodesConnectable={false}
            nodesDraggable={false}
            onNodeClick={(_, node) => setActiveNodeId(node.id)}
            onNodeMouseEnter={(_, node) => setActiveNodeId(node.id)}
            onPaneClick={() => setActiveNodeId(defaultNodeId)}
            panOnScroll
            proOptions={{ hideAttribution: true }}
          >
            <GraphCenterButton onCenter={() => setActiveNodeId(defaultNodeId)} />
            <Background color="rgba(42, 39, 34, 0.12)" gap={34} size={1} />
          </ReactFlow>
        </div>

        <aside className="graph-inspector" aria-live="polite">
          <span>{clusterNames[activeNode.cluster]}</span>
          <h2>{activeNode.label}</h2>
          <p>{activeNode.note}</p>
          <ul>
            {activeRelations.map((link) => {
              const neighborId =
                link.from === activeNode.id ? link.to : link.from
              const neighbor = nodeById[neighborId]

              return (
                <li key={`${link.from}-${link.to}`}>
                  <span>{link.relation}</span>
                  <strong>{neighbor?.label ?? neighborId}</strong>
                </li>
              )
            })}
          </ul>
        </aside>
      </div>
    </section>
  )
}
