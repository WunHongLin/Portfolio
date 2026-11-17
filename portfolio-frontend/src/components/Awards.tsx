"use client";

import Image from "next/image";
import Container from "./Container";
import { Award, BookOpenCheck } from "lucide-react";
import type { AwardApiResponse } from "@/types/award";
import type { certificateApiResponse } from "@/types/certificate";
import { useState, useEffect } from "react";

const awardPhotos = [
  { src: "/images/awards1.jpg" },
  { src: "/images/awards2.jpg" },
  { src: "/images/awards3.jpg" },
  { src: "/images/awards4.jpg" },
  { src: "/images/awards5.jpg" },
  { src: "/images/awards6.jpg" },
];

export default function Awards() {
  const [awards, setAward] = useState<AwardApiResponse[]>([]);
  const [certificates, setCertificate] = useState<certificateApiResponse[]>([]);

  // 取得award資料
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/award`)
      .then((res) => res.json())
      .then((data: AwardApiResponse[]) => {
        setAward(data);
      })
      .catch((error) => console.log("連線錯誤 (award)", error));
  }, []);

  // 取得certificate資料
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/certificates`)
      .then((res) => res.json())
      .then((data: certificateApiResponse[]) => {
        setCertificate(data);
      })
      .catch((error) => console.log("連線錯誤 (certificate)", error));
  }, []);

  return (
    <section id="awards" className="pt-15 pb-18 scroll-mt-24">
      <Container>
        <div className="mb-8 flex flex-wrap items-end gap-6">
          <div>
            <p className="section-index">03 / AWARDS</p>
            <h2 className="section-heading mt-2">獲獎紀錄&證照</h2>
          </div>
        </div>
        <div className="grid items-start gap-8 lg:grid-cols-[1.2fr_0.9fr] lg:gap-15">
          <div className="grid w-full h-150 gap-2 grid-cols-2 grid-rows-3 lg:w-175 lg:h-170">
            {awardPhotos.map((photo) => (
              <div
                key={photo.src}
                className="relative overflow-hidden rounded-xl"
              >
                <Image
                  src={photo.src}
                  alt=""
                  fill
                  sizes="300px"
                  className="object-cover"
                  loading="eager"
                />
              </div>
            ))}
          </div>

          <div className="space-y-10">
            {/* 獲獎紀錄 */}
            <section aria-labelledby="awards-list-title">
              <div className="mb-6 flex items-center gap-3">
                <Award size={20} className="text-[#b27b60]" />

                <h3
                  id="awards-list-title"
                  className="text-xl font-semibold text-[#4b3930]"
                >
                  獲獎紀錄
                </h3>
              </div>

              <div className="ml-1 border-l border-[#d2b8a6]">
                {awards.map((award) => (
                  <div
                    key={award.id}
                    className="relative grid grid-cols-[56px_1fr] gap-4
           border-b border-[#eee4dc] py-4 pl-8
           last:border-b-0
           sm:grid-cols-[65px_1fr] sm:gap-6"
                  >
                    {/* 時間軸圓點 */}
                    <span
                      aria-hidden="true"
                      className="absolute -left-1.5 top-1/2
                       size-3 -translate-y-1/2
                       rounded-full bg-[#b27b60]"
                    />

                    {/* 獲獎年份 */}
                    <span className="text-[13px] font-semibold text-[#ae765a]">
                      {award.year}
                    </span>

                    {/* 獲獎內容 */}
                    <div>
                      <h4 className="text-[14px] font-semibold text-[#4b3930]">
                        {award.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 專業證照 */}
            <section aria-labelledby="certificates-title">
              <div className="mb-6 flex items-center gap-3">
                <BookOpenCheck size={20} className="text-[#b27b60]" />

                <h3
                  id="certificates-title"
                  className="text-xl font-semibold text-[#4b3930]"
                >
                  證照
                </h3>
              </div>

              {certificates.length > 0 ? (
                <div className="ml-1 border-l border-[#d2b8a6]">
                  {certificates.map((certificate) => (
                    <div
                      key={certificate.id}
                      className="relative grid grid-cols-[56px_1fr] gap-4
                     border-b border-[#eee4dc] py-4 pl-8
                     last:border-b-0
                     sm:grid-cols-[65px_1fr] sm:gap-6"
                    >
                      {/* 時間軸圓點 */}
                      <span
                        aria-hidden="true"
                        className="absolute -left-1.5 top-1/2
                       size-3 -translate-y-1/2
                       rounded-full bg-[#b27b60]"
                      />

                      {/* 獲獎年份 */}
                      <span className="text-[13px] font-semibold text-[#ae765a]">
                        {certificate.year}
                      </span>

                      {/* 獲獎內容 */}
                      <div>
                        <h4 className="text-[14px] font-semibold text-[#4b3930]">
                          {certificate.name}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[#8c8076]">證照資料整理中。</p>
              )}
            </section>
          </div>
        </div>
      </Container>
    </section>
  );
}
