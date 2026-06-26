import Link from "next/link"
import "./globals.css"

import { navItems } from "@/lib/site-data"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>
        <nav className="site-nav" aria-label="主导航">
          <Link className="brand" href="/">
            <span>Kevin</span>
            <strong>Z</strong>
          </Link>
          <div className="nav-links">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {children}
      </body>
    </html>
  )
}
