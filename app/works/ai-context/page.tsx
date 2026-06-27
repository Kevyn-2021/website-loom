import { readDoc } from "@/lib/docs"
import { MarkdownActions } from "@/components/MarkdownActions"

const contextDoc = "AIContext-KevinZ个人上下文-2026-06-27.md"

export default function AiContextPage() {
  const markdown = readDoc(contextDoc)

  return (
    <main className="page work-detail-page">
      <p className="section-kicker">AI Context Prompt</p>
      <h1>AI Context Prompt</h1>
      <p className="page-lede">
        这份上下文让大模型快速理解 KevinZ 的经历、能力、偏好和协作方式。它不是简历，而是一份给 AI 使用的背景说明。
      </p>

      <section className="context-preview" aria-label="上下文用途">
        <article>
          <span>01</span>
          <h2>快速熟悉背景</h2>
          <p>让模型知道Kevin的职业主线、关键经历和核心能力。</p>
        </article>
        <article>
          <span>02</span>
          <h2>稳定回答风格</h2>
          <p>约束表达方式，减少空泛鼓励和营销化措辞。</p>
        </article>
        <article>
          <span>03</span>
          <h2>提升交付质量</h2>
          <p>让输出更像可以直接使用的文档、方案或判断。</p>
        </article>
      </section>

      <section className="code-section" aria-label="AI Context Markdown">
        <div className="code-section-heading">
          <div>
            <p className="section-kicker">Markdown Source</p>
            <h2>给大模型的完整上下文</h2>
          </div>
          <MarkdownActions content={markdown} filename={contextDoc} />
        </div>
        <pre>
          <code>{markdown}</code>
        </pre>
      </section>
    </main>
  )
}
