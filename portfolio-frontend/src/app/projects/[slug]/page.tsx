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
  const apiUrl = process.env.NEXT_PUBLIC_FASTAPI_URL;

  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_FASTAPI_URL 尚未設定");
  }

  const response = await fetch(`${apiUrl}/projects`, {
    cache: "no-store",
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

        <div className="mt-10 grid items-start gap-16 border-t border-[#e8dcd2] pt-9 md:grid-cols-[minmax(0,1fr)_320px]">
          {/* 左側：專案概述 */}
          <div className="min-w-0">
            <h2 className="font-display text-2xl font-bold text-[#49382f]">
              專案介紹
            </h2>

            <p className="mt-5 w-full whitespace-pre-line text-justify text-base leading-9 text-[#77665e]">
              {project.details}
            </p>
          </div>

          {/* 右側：使用技術 */}
          <aside className="self-start rounded-xl bg-[#f1eae3] p-6">
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
