import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import type { Project } from "@/types/project";
import { error } from "console";

type Props = { params: Promise<{ slug: string }> };

export default async function ProjectDetail({ params }: Props) {
  const { slug } = await params;

  // get the data of project
  const response = await fetch("http://127.0.0.1:8000/projects", {
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error("無法取得作品資料");
  }

  const projects: Project[] = await response.json();

  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();
  return (
    <main className="bg-[#fbf9f5] py-10">
      <Container>
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-[#99674d] hover:underline"
        >
          <ArrowLeft size={16} /> 返回作品專案
        </Link>
        <div className="mt-8 max-w-3xl">
          <h1 className="font-display mt-3 text-4xl font-semibold text-[#3f312a] sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-5 text-sm leading-8 text-[#7c6b61]">
            {project.description}
          </p>
        </div>
        <div className="relative mt-6 h-80 overflow-hidden rounded-2xl bg-[#e4d7cd] lg:h-180">
          <Image
            src={project.image}
            alt={`${project.title}示意圖片`}
            fill
            sizes="1000px"
            className="object-fill"
          />
        </div>
        <div className="mt-10 grid gap-8 border-t border-[#e8dcd2] pt-9 md:grid-cols-[1fr_320px]">
          <div>
            <h2 className="font-display text-2xl font-bold text-[#49382f]">
              專案概述
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-[#77665e]">
              {project.details}
            </p>
            <p className="mt-5 text-xs text-[#9b8577]">
              * 此專案資料為作品集版型展示範例，非真實專案成果。
            </p>
          </div>
          <aside className="rounded-xl bg-[#f1eae3] p-6">
            <h2 className="text-sm font-semibold text-[#49382f]">使用技術</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-white px-3 py-1.5 text-xs text-[#75645a]"
                >
                  {t}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </Container>
    </main>
  );
}
