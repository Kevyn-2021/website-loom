import Link from "next/link"

import { aboutCopy } from "@/lib/site-data"

export default async function About({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>
}) {
  const params = await searchParams
  const lang = params?.lang === "en" ? "en" : "zh"
  const copy = aboutCopy[lang]
  const nextLangHref = lang === "zh" ? "/about?lang=en" : "/about"

  return (
    <main className="page">
      <div className="language-row">
        <span>About</span>
        <Link className="language-toggle" href={nextLangHref}>
          {lang === "zh" ? "English" : "中文"}
        </Link>
      </div>
      <h1>{copy.title}</h1>
      <div className="narrative">
        {copy.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </section>
        ))}
      </div>
    </main>
  )
}
