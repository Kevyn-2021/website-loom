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
  const blocks = markdown.split(/\n\s*\n/)

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

  if (lines.every((line) => /^-\s+/.test(line.trim()))) {
    return `<ul>${lines
      .map((line) => `<li>${renderInline(line.replace(/^-\s+/, ""))}</li>`)
      .join("")}</ul>`
  }

  if (lines.some((line) => /^-\s+/.test(line.trim()))) {
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

    html.push(`<ul>${listLines
      .map((line) => `<li>${renderInline(line.replace(/^-\s+/, ""))}</li>`)
      .join("")}</ul>`)
    listLines = []
  }

  for (const line of lines) {
    const image = line.trim().match(imagePattern)

    if (image) {
      flushParagraph()
      flushList()
      html.push(renderImage(image[1], image[2]))
    } else if (/^-\s+/.test(line.trim())) {
      flushParagraph()
      listLines.push(line.trim())
    } else {
      flushList()
      paragraphLines.push(line)
    }
  }

  flushParagraph()
  flushList()
  return html.join("")
}

function renderImage(alt: string, src: string) {
  return `<figure><img alt="${escapeAttribute(alt)}" src="${escapeAttribute(src)}" /><figcaption>${renderInline(alt)}</figcaption></figure>`
}

function renderParagraph(lines: string[]) {
  return `<p>${lines.map((line) => renderInline(line)).join("<br />")}</p>`
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
