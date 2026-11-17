"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Container from "./Container";
import { site } from "@/lib/site";

const links = [
  { title: "首頁", href: "/#top" },
  { title: "關於我", href: "/#about" },
  { title: "作品專案", href: "/#projects" },
  { title: "獎項榮譽", href: "/#awards" },
  { title: "聯絡我", href: "/#contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-[#e6dcd3] bg-[#fbf9f5]/95 backdrop-blur-md">
      <Container className="flex h-19 items-center justify-between gap-4">
        <Link
          href="/"
          aria-label="返回首頁"
          className="logo-mark text-[34px] text-[#8c5b43]"
        >
          {site.initials}
        </Link>
        <nav
          aria-label="主要導覽"
          className="hidden items-center gap-8 lg:flex"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link text-[13px] font-semibold tracking-[.08em] text-[#5c5049] hover:text-[#a36b4e]"
            >
              {link.title}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label={isOpen ? "關閉選單" : "開啟選單"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex rounded-lg p-2 text-[#5d4134] lg:hidden"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </Container>
      {isOpen && (
        <nav
          id="mobile-menu"
          aria-label="手機導覽"
          className="border-t border-[#e6dcd3] bg-[#fbf9f5] px-6 py-4 lg:hidden"
        >
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              onClick={() => setIsOpen(false)}
              className="block border-b border-[#eee5df] py-3 text-sm font-medium text-[#61473b] last:border-none"
            >
              {link.title}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
