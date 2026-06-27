"use client"

import { useState } from "react"

type MarkdownActionsProps = {
  content: string
  filename: string
}

export function MarkdownActions({ content, filename }: MarkdownActionsProps) {
  const [copied, setCopied] = useState(false)

  const copyMarkdown = async () => {
    await navigator.clipboard.writeText(content)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  const downloadMarkdown = () => {
    const blob = new Blob([content], { type: "text/markdown;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="code-actions" aria-label="Markdown 操作">
      <button type="button" onClick={copyMarkdown}>
        {copied ? "已复制" : "一键复制"}
      </button>
      <button type="button" onClick={downloadMarkdown}>
        下载 .md
      </button>
    </div>
  )
}
