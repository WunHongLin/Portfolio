"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Container from "./Container";
import type { Project } from "@/types/project";

export default function Projects() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/projects`)
      .then((res) => res.json())
      .then((data: Project[]) => {
        setProjects(data);
      })
      .catch((error) => console.log("錯誤名稱:", error));
  }, []);

  function goTo(index: number) {
    const next = Math.max(0, Math.min(index, projects.length - 1));
    const track = trackRef.current;
    const card = track?.children.item(next) as HTMLElement | null;

    if (track && card)
      track.scrollTo({
        left: card.offsetLeft - track.offsetLeft,
        behavior: "smooth",
      });

    setActiveIndex(next);
  }

  return (
    <section id="projects" className="scroll-mt-20 bg-[#eae0d7] pt-10 pb-15">
      <Container>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <div className="flex flex-wrap items-end gap-4 sm:gap-9">
            <div>
              <p className="section-index">02 / PROJECTS</p>
              <h2 className="section-heading mt-2">作品專案</h2>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="mr-1 text-xs tabular-nums text-[#987766]">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(projects.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              aria-label="上一個作品"
              disabled={activeIndex === 0}
              onClick={() => goTo(activeIndex - 1)}
              className="round-arrow"
            >
              <ArrowLeft size={19} />
            </button>
            <button
              type="button"
              aria-label="下一個作品"
              disabled={activeIndex === projects.length - 1}
              onClick={() => goTo(activeIndex + 1)}
              className="round-arrow"
            >
              <ArrowRight size={19} />
            </button>
          </div>
        </div>
        <div
          ref={trackRef}
          onScroll={(e) => {
            const el = e.currentTarget;
            const first = el.children.item(0) as HTMLElement | null;
            if (!first) return;
            const step = first.getBoundingClientRect().width + 14;
            setActiveIndex(
              Math.min(projects.length - 1, Math.round(el.scrollLeft / step)),
            );
          }}
          className="project-track -mx-1 flex snap-x snap-mandatory gap-3.5 overflow-x-auto px-1 pb-4"
        >
          {projects.map((project) => (
            <article
              key={project.id}
              className="w-90 shrink-0 snap-start overflow-hidden rounded-xl border border-[#eee7e0] bg-[#fffdfa] shadow-[0_7px_24px_rgba(84,60,46,.045)] lg:w-100"
            >
              <Link href={`/projects/${project.slug}`} className="group block">
                <div className="relative m-2 h-60 overflow-hidden rounded-lg bg-[#d3c3b6]">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    sizes="278px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="px-4 pb-4 pt-2">
                  <h3 className="font-display text-[18px] font-bold text-[#3f332c]">
                    {project.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 min-h-6 text-[12px] leading-[1.65] text-[#96867d]">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-[#f3eee9] px-2.5 py-1 text-[10px] text-[#85766d]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 flex items-center gap-2 text-[12px] font-bold text-[#a16c50]">
                    查看專案 <ArrowRight size={15} />
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
