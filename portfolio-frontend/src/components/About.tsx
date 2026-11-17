import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import { site } from "@/lib/site";
// for the icon
import {
  MessagesSquare,
  ScanSearch,
  BookOpenCheck,
  Brain,
  Mountain,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

const qualities = [
  {
    icon: MessagesSquare,
    title: "善於溝通合作",
  },
  {
    icon: ScanSearch,
    title: "謹慎細心",
  },
  {
    icon: BookOpenCheck,
    title: "從經驗中學習",
  },
  {
    icon: Brain,
    title: "獨立思考",
  },
  {
    icon: Mountain,
    title: "勇於挑戰",
  },
  {
    icon: ShieldCheck,
    title: "負責任",
  },
];

export default function About() {
  return (
    <section id="about" className="py-22 scroll-mt-24">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_.4fr_1.0fr]">
          <div>
            <p className="section-index">01 / ABOUT</p>
            <h2 className="section-heading mt-2">關於我</h2>
            <p className="mt-5 font-display text-[18px] font-bold leading-normal text-[#443a32]">
              "Forget the cage, cause we know how to make the key."
            </p>
            <p className="mt-5 text-[14px] leading-[2.1] text-[#796b62]">
              {site.introduction}
            </p>
            <Link
              href="/#contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#a47459] px-5 py-2 text-[13px] font-medium text-[#9b6448] transition hover:bg-[#9b6448] hover:text-white"
            >
              聯絡我 <ArrowUpRight size={15} />
            </Link>
          </div>
          <div className="relative h-90 w-75 overflow-hidden rounded-[18px] hidden lg:block">
            <Image
              src="/images/關於我.jpg"
              alt="關於我的生活照片"
              fill
              sizes="(min-width: 1024px) 25vw, 100vw"
              className="object-cover object-center"
              loading="eager"
            />
          </div>
          <div className="grid grid-cols-2 rounded-[18px] bg-[#f2ece6] px-6 py-4">
            {qualities.map(({ icon: Icon, title }) => (
              <div
                key={title}
                className="flex items-center gap-4 border-b border-[#ddcfc3] py-5 pl-3 nth-[5]:border-b-0 nth-[6]:border-b-0"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#85695a] text-[#735447]">
                  <Icon size={19} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#49382f]">
                    {title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
