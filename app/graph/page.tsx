import { KnowledgeGraph } from "./KnowledgeGraph"
import { getKnowledgeGraph } from "@/lib/knowledge-graph"

export default function Graph() {
  const graph = getKnowledgeGraph()

  return (
    <main className="page graph-page">
      <KnowledgeGraph graph={graph} />
    </main>
  )
}
