"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

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
  const [isOpen, setIsOpen] = useState(false)
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <nav className={`site-nav ${isOpen ? "is-open" : ""}`} aria-label="主导航">
      <Brand />
      <button
        className="nav-menu-toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls="primary-navigation"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span>菜单</span>
        <i aria-hidden="true" />
      </button>
      <div className="nav-links" id="primary-navigation">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive(item.href) ? "page" : undefined}
            className={isActive(item.href) ? "is-active" : undefined}
            onClick={() => setIsOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
