import fs from "fs"
import path from "path"

const docsPath = path.join(process.cwd(), "content/docs")

export function readDoc(filename: string) {
  return fs.readFileSync(path.join(docsPath, filename), "utf-8")
}

