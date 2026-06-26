import fs from "fs"
import path from "path"

export type GraphCluster =
  | "core"
  | "method"
  | "gtm"
  | "experience"
  | "output"
  | "frontier"
  | "personal"

export type GraphNode = {
  id: string
  label: string
  cluster: GraphCluster
  x: number
  y: number
  note: string
}

export type GraphLink = {
  from: string
  to: string
  relation: string
}

export type KnowledgeGraphData = {
  nodes: GraphNode[]
  links: GraphLink[]
}

const graphPath = path.join(
  process.cwd(),
  "content/graph/kevinz-knowledge-graph.md"
)

function readMarkdownTable(markdown: string, heading: string) {
  const headingPattern = new RegExp(`^## ${heading}\\s*$`, "m")
  const headingMatch = markdown.match(headingPattern)

  if (!headingMatch || headingMatch.index === undefined) {
    return []
  }

  const afterHeading = markdown.slice(headingMatch.index + headingMatch[0].length)
  const nextHeadingIndex = afterHeading.search(/^## /m)
  const section =
    nextHeadingIndex === -1 ? afterHeading : afterHeading.slice(0, nextHeadingIndex)

  return section
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("|") && !line.includes("---"))
}

function parseRow(row: string) {
  return row
    .split("|")
    .slice(1, -1)
    .map((cell) => cell.trim())
}

export function getKnowledgeGraph(): KnowledgeGraphData {
  const markdown = fs.readFileSync(graphPath, "utf-8")
  const nodeRows = readMarkdownTable(markdown, "Nodes")
  const linkRows = readMarkdownTable(markdown, "Links")
  const nodeHeader = parseRow(nodeRows[0] ?? "")
  const linkHeader = parseRow(linkRows[0] ?? "")

  const nodes = nodeRows.slice(1).map((row) => {
    const values = parseRow(row)
    const data = Object.fromEntries(
      nodeHeader.map((key, index) => [key, values[index] ?? ""])
    )

    return {
      id: data.id,
      label: data.label,
      cluster: data.cluster as GraphCluster,
      x: Number(data.x),
      y: Number(data.y),
      note: data.note,
    }
  })

  const links = linkRows.slice(1).map((row) => {
    const values = parseRow(row)
    const data = Object.fromEntries(
      linkHeader.map((key, index) => [key, values[index] ?? ""])
    )

    return {
      from: data.from,
      to: data.to,
      relation: data.relation,
    }
  })

  return { nodes, links }
}
