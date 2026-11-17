import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import Container from "./Container";
import { site } from "@/lib/site";

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="relative overflow-hidden bg-[#55483f] sm:h-117.5 lg:h-132.5">
        <Image
          src="/images/背景.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#2e2927]/85 via-[#2e2927]/45 to-transparent" />
        <Container className="relative flex h-full items-center">
          <div className="max-w-240 pb-16 text-white">
            <h1
              id="hero-title"
              className="pb-4 border-b-2 font-display text-[16px] font-semibold leading-[1.55] tracking-[.06em] sm:text-3xl lg:text-[40px]"
            >
              Forget the cage，
              <br />
              cause we know how to make the key.
            </h1>
            <hr />
            <p className="mt-8 max-w-95 font-semibold leading-8 tracking-wider text-white/85 sm:text-2xl lg:text-[28px]">
              打破框架，突破自己
            </p>
          </div>
        </Container>
      </div>
      <Container className="relative z-10 -mt-22">
        <div className="profile-shadow grid items-center gap-5 rounded-[22px] border border-white/75 bg-[#fcfaf7] px-6 py-7 sm:grid-cols-[auto_1fr_auto] sm:px-10 lg:gap-10">
          <div className="relative mx-auto overflow-hidden rounded-full border-[6px] border-white shadow-lg sm:mx-0 sm:size-41.25">
            <Image
              src="/images/大頭貼.jpg"
              alt=""
              fill
              sizes="150px"
              className="object-cover"
            />
          </div>
          <div className="text-center sm:text-left">
            <p className="text-[12px] tracking-[.23em] text-[#aa795c] mb-2 font-bold">
              HELLO, I AM
            </p>
            <h2 className="font-display text-[30px] font-bold tracking-[.14em] text-[#342b26] sm:text-[32px] mb-2">
              {site.name}
            </h2>
            <p className="mt-2 text-sm tracking-widest text-[#76665e] mb-2">
              {site.role}
            </p>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-[#86776e] sm:justify-start mb-2">
              <MapPin size={13} />
              {site.location}
            </p>
          </div>

          <div className="flex flex-col gap-4 items-end">
            <Link
              href="file/履歷.pdf"
              target="_blank"
              className="brown-button mx-auto inline-flex items-center gap-3 px-6 py-3 text-sm sm:mx-0"
            >
              下載履歷 <ArrowUpRight size={17} />
            </Link>
            <Link
              href="/#projects"
              className="brown-button mx-auto inline-flex items-center gap-3 px-6 py-3 text-sm sm:mx-0"
            >
              探索我的作品 <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
