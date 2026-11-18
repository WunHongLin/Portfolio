import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import Container from "./Container";
import { site } from "@/lib/site";

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative">
      {/* 背景區塊 */}
      <div className="relative h-[360px] overflow-hidden bg-[#55483f] sm:h-[470px] lg:h-[530px]">
        <Image
          src="/images/背景.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-linear-to-r from-[#2e2927]/85 via-[#2e2927]/45 to-transparent" />

        <Container className="relative flex h-full items-start pt-8 sm:items-center sm:pt-0">
          <div className="w-full max-w-[960px] text-white">
            <h1
              id="hero-title"
              className="max-w-full border-b-2 pb-4 font-display text-lg font-semibold leading-relaxed tracking-wide break-words sm:text-3xl lg:text-[40px]"
            >
              Forget the cage，
              <br />
              cause we know how to make the key.
            </h1>

            <p className="mt-5 font-semibold tracking-wider text-white/85 sm:mt-8 sm:text-2xl lg:text-[28px]">
              打破框架，突破自己
            </p>
          </div>
        </Container>
      </div>

      {/* 個人介紹卡片 */}
      <Container className="relative z-10 -mt-12 sm:-mt-20 lg:-mt-22">
        <div className="profile-shadow grid grid-cols-1 items-center gap-6 rounded-[22px] border border-white/75 bg-[#fcfaf7] px-5 py-8 sm:px-8 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-8 lg:px-10">
          {/* 大頭貼 */}
          <div className="relative mx-auto size-28 shrink-0 overflow-hidden rounded-full border-[6px] border-white shadow-lg sm:size-36 lg:mx-0 lg:size-40">
            <Image
              src="/images/大頭貼.jpg"
              alt="個人大頭貼"
              fill
              sizes="(min-width: 1024px) 160px, 144px"
              className="object-cover"
            />
          </div>

          {/* 個人資訊 */}
          <div className="min-w-0 text-center lg:text-left">
            <p className="mb-2 text-xs font-bold tracking-[.23em] text-[#aa795c]">
              HELLO, I AM
            </p>

            <h2 className="mb-2 font-display text-2xl font-bold tracking-[.08em] text-[#342b26] break-words sm:text-[32px]">
              {site.name}
            </h2>

            <p className="mt-2 text-sm tracking-wider text-[#76665e]">
              {site.role}
            </p>

            <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-[#86776e] lg:justify-start">
              <MapPin size={13} />
              {site.location}
            </p>
          </div>

          {/* 操作按鈕 */}
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:flex-col lg:items-stretch">
            <Link
              href="/file/履歷.pdf"
              target="_blank"
              className="brown-button inline-flex items-center justify-center gap-3 px-6 py-3 text-sm whitespace-nowrap"
            >
              下載履歷
              <ArrowUpRight size={17} />
            </Link>

            <Link
              href="/#projects"
              className="brown-button inline-flex items-center justify-center gap-3 px-6 py-3 text-sm whitespace-nowrap"
            >
              探索我的作品
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
