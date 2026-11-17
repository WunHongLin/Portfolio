import Link from "next/link";
import { ArrowUp, Github, Instagram, Linkedin, Mail } from "lucide-react";
import Container from "./Container";
import { site } from "@/lib/site";
const links = [
  { label: "首頁", href: "/#top" },
  { label: "關於我", href: "/#about" },
  { label: "作品專案", href: "/#projects" },
  { label: "獎項榮譽", href: "/#awards" },
  { label: "聯絡我", href: "/#contact" },
];
export default function Footer() {
  return (
    <footer className=" bg-[#faf7f2]">
      <Container>
        <div className="flex flex-col gap-2 border-t border-[#eadfd8] py-4 text-[11px] text-[#9c8d82] sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Trying to be better.</p>
        </div>
      </Container>
    </footer>
  );
}
