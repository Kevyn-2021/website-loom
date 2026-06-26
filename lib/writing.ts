import fs from "fs"
import path from "path"
import matter from "gray-matter"

const writingPath = path.join(process.cwd(), "content/writing")

export function getAllWriting() {
  const files = fs.readdirSync(writingPath)

  return files.map((file) => {
    const fileContent = fs.readFileSync(
      path.join(writingPath, file),
      "utf-8"
    )

    const { data, content } = matter(fileContent)

    return {
      slug: file.replace(".md", ""),
      meta: data,
      content,
    }
  })
}