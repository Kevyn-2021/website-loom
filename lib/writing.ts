import fs from "fs"
import path from "path"
import matter from "gray-matter"

const writingPath = path.join(process.cwd(), "content/writing")
const postFilePattern = /^(\d{4}-\d{2}-\d{2})_(.+)\.md$/
const allowedTags = new Set(["Go-to-Market", "Product", "AI", "Career"])

export type WritingPost = {
  slug: string
  title: string
  date: string
  tags: string[]
  description: string
  content: string
  html: string
}

type ListNode = {
  depth: number
  ordered: boolean
  content: string
  children: ListNode[]
}

export function getAllWriting(): WritingPost[] {
  return fs
    .readdirSync(writingPath)
    .filter((file) => postFilePattern.test(file))
    .map(readWritingFile)
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getWritingBySlug(slug: string): WritingPost | null {
  const decodedSlug = decodeURIComponent(slug)
  const file = `${decodedSlug}.md`

  if (!postFilePattern.test(file)) {
    return null
  }

  const fullPath = path.join(writingPath, file)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  return readWritingFile(file)
}

export function getWritingSlugs() {
  return fs
    .readdirSync(writingPath)
    .filter((file) => postFilePattern.test(file))
    .map((file) => ({ slug: file.replace(/\.md$/, "") }))
}

function readWritingFile(file: string): WritingPost {
  const match = file.match(postFilePattern)

  if (!match) {
    throw new Error(`Invalid writing filename: ${file}`)
  }

  const [, fileDate, titleFromFile] = match
  const fileContent = fs.readFileSync(path.join(writingPath, file), "utf-8")
  const { data, content } = matter(fileContent)
  const tags = normalizeTags(data.tags)
  const cleanContent = content.trim()

  return {
    slug: file.replace(/\.md$/, ""),
    title: typeof data.title === "string" ? data.title : titleFromFile,
    date: normalizeDate(data.date, fileDate),
    tags,
    description:
      typeof data.description === "string"
        ? data.description
        : getFirstParagraph(cleanContent),
    content: cleanContent,
    html: markdownToHtml(cleanContent),
  }
}

function normalizeDate(date: unknown, fallback: string) {
  if (typeof date === "string") {
    return date.slice(0, 10)
  }

  if (date instanceof Date && !Number.isNaN(date.getTime())) {
    return date.toISOString().slice(0, 10)
  }

  return fallback
}

function normalizeTags(tags: unknown): string[] {
  if (!Array.isArray(tags)) {
    return []
  }

  return tags.filter((tag): tag is string => (
    typeof tag === "string" && allowedTags.has(tag)
  ))
}

function getFirstParagraph(content: string) {
  const paragraph = content
    .split(/\n\s*\n/)
    .map((item) => item.trim())
    .find((item) => item && !item.startsWith("#") && !item.startsWith("---"))

  return paragraph?.replace(/\s+/g, " ") ?? ""
}

function markdownToHtml(markdown: string) {
  const blocks = extractBlocks(markdown)

  return blocks
    .map((block) => block.trim())
    .filter(Boolean)
    .map(renderBlock)
    .join("")
}

function renderBlock(block: string) {
  if (/^---+$/.test(block)) {
    return "<hr />"
  }

  const codeFence = block.match(/^```([\w-]*)\n([\s\S]*?)\n```$/)
  if (codeFence) {
    return renderCodeBlock(codeFence[2])
  }

  const image = block.match(imagePattern)
  if (image) {
    return renderImage(image[1], image[2])
  }

  const heading = block.match(/^(#{2,3})\s+(.+)$/)
  if (heading) {
    const level = heading[1].length
    return `<h${level}>${renderInline(heading[2])}</h${level}>`
  }

  const lines = block.split("\n")
  if (lines.some((line) => imagePattern.test(line.trim()))) {
    return renderMixedBlock(lines)
  }

  if (isListBlock(lines)) {
    return renderList(lines)
  }

  if (lines.some((line) => isListLine(line))) {
    return renderMixedBlock(lines)
  }

  return renderParagraph(lines)
}

const imagePattern = /^!\[([^\]]*)\]\(([^)]+)\)$/

function renderMixedBlock(lines: string[]) {
  const html: string[] = []
  let paragraphLines: string[] = []
  let listLines: string[] = []

  function flushParagraph() {
    if (paragraphLines.length === 0) {
      return
    }

    html.push(renderParagraph(paragraphLines))
    paragraphLines = []
  }

  function flushList() {
    if (listLines.length === 0) {
      return
    }

    html.push(renderList(listLines))
    listLines = []
  }

  for (const line of lines) {
    const image = line.trim().match(imagePattern)

    if (image) {
      flushParagraph()
      flushList()
      html.push(renderImage(image[1], image[2]))
    } else if (isListLine(line)) {
      flushParagraph()
      listLines.push(line)
    } else {
      flushList()
      paragraphLines.push(line)
    }
  }

  flushParagraph()
  flushList()
  return html.join("")
}

const SIZE_CLASS: Record<string, string> = {
  "25": "img-25",
  "33": "img-33",
  "50": "img-50",
  "75": "img-75",
  "full": "img-full",
  "100": "img-full",
}

function renderImage(alt: string, src: string) {
  const [cleanAlt, sizeToken] = alt.split("|")
  const sizeClass = sizeToken ? SIZE_CLASS[sizeToken.trim()] : undefined
  const figureClass = sizeClass ? ` class="${sizeClass}"` : ""
  return `<figure${figureClass}><img alt="${escapeAttribute(cleanAlt)}" src="${escapeAttribute(src)}" /><figcaption>${renderInline(cleanAlt)}</figcaption></figure>`
}

function renderParagraph(lines: string[]) {
  return `<p>${lines.map((line) => renderInline(line)).join("<br />")}</p>`
}

function renderCodeBlock(text: string) {
  return `<pre><code>${escapeHtml(text)}</code></pre>`
}

function renderList(lines: string[]) {
  const root: ListNode = {
    depth: -1,
    ordered: false,
    content: "",
    children: [],
  }
  const stack: ListNode[] = [root]

  for (const line of lines) {
    const item = parseListLine(line)

    if (!item) {
      continue
    }

    while (stack.length > 1 && item.depth <= stack[stack.length - 1].depth) {
      stack.pop()
    }

    const node: ListNode = {
      depth: item.depth,
      ordered: item.ordered,
      content: item.content,
      children: [],
    }

    stack[stack.length - 1].children.push(node)
    stack.push(node)
  }

  return renderListGroup(root.children)
}

function renderListGroup(nodes: ListNode[]) {
  if (nodes.length === 0) {
    return ""
  }

  const html: string[] = []
  let index = 0

  while (index < nodes.length) {
    const ordered = nodes[index].ordered
    const tag = ordered ? "ol" : "ul"
    const items: string[] = []

    while (index < nodes.length && nodes[index].ordered === ordered) {
      const node = nodes[index]
      const childHtml = renderListGroup(node.children)
      items.push(`<li>${renderInline(node.content)}${childHtml}</li>`)
      index += 1
    }

    html.push(`<${tag}>${items.join("")}</${tag}>`)
  }

  return html.join("")
}

function isListBlock(lines: string[]) {
  return lines.every((line) => isListLine(line))
}

function isListLine(line: string) {
  return parseListLine(line) !== null
}

function parseListLine(line: string) {
  const match = line.match(/^(\s*)([-*]|\d+\.)\s+(.+)$/)

  if (!match) {
    return null
  }

  return {
    depth: Math.floor(match[1].replace(/\t/g, "  ").length / 2),
    ordered: /\d+\./.test(match[2]),
    content: match[3],
  }
}

function extractBlocks(markdown: string) {
  const blocks: string[] = []
  let current: string[] = []
  let inCodeFence = false

  for (const line of markdown.split("\n")) {
    if (line.startsWith("```")) {
      current.push(line)
      inCodeFence = !inCodeFence

      if (!inCodeFence) {
        blocks.push(current.join("\n"))
        current = []
      }
      continue
    }

    if (!inCodeFence && line.trim() === "") {
      if (current.length > 0) {
        blocks.push(current.join("\n"))
        current = []
      }
      continue
    }

    current.push(line)
  }

  if (current.length > 0) {
    blocks.push(current.join("\n"))
  }

  return blocks
}

function renderInline(text: string) {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/"([^"]+)"/g, "&ldquo;$1&rdquo;")
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

function escapeAttribute(text: string) {
  return escapeHtml(text).replace(/"/g, "&quot;")
}
