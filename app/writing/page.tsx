import { getAllWriting } from "@/lib/writing"
import { WritingList } from "./WritingList"

export default function WritingPage() {
  const posts = getAllWriting()

  return (
    <main className="page">
      <p className="section-kicker">Writing</p>
      <h1>写作</h1>
      <p className="page-lede">
        这里记录产品、市场、职业与 AI 的长期思考。每篇文章都来自具体问题，也会回到可复用的方法。
      </p>

      <WritingList posts={posts} />
    </main>
  )
}
