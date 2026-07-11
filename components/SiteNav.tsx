"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { KevinZMark } from "@/components/KevinZMark"
import { navItems } from "@/lib/site-data"

function Brand() {
  return (
    <Link className="brand" href="/">
      <KevinZMark className="brand-mark" />
      <span className="brand-name">
        <span>Kevin</span>
        <strong>Zhang</strong>
      </span>
    </Link>
  )
}

export function SiteNav() {
  const pathname = usePathname()
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <nav className="site-nav" aria-label="主导航">
      <Brand />
      <div className="nav-links">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive(item.href) ? "page" : undefined}
            className={isActive(item.href) ? "is-active" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
