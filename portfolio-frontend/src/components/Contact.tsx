"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Github, Instagram, Linkedin, Mail } from "lucide-react";
import Container from "./Container";
import { site } from "@/lib/site";

type Fields = { name: string; email: string; subject: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
const initial: Fields = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState<Fields>(initial);
  const [errors, setErrors] = useState<Errors>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  function update(field: keyof Fields, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setSubmitStatus("idle");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) return;

    setSubmitStatus("idle");

    const next: Errors = {};

    if (!form.name.trim()) {
      next.name = "請填寫姓名";
    } else if (form.name.trim().length > 120) {
      next.name = "姓名不可超過 120 個字";
    }

    if (!form.email.trim()) {
      next.email = "請填寫 Email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = "Email 格式不正確";
    } else if (form.email.trim().length > 254) {
      next.email = "Email 長度不可超過 254 個字";
    }

    if (!form.subject.trim()) {
      next.subject = "請填寫主旨";
    } else if (form.subject.trim().length > 200) {
      next.subject = "主旨不可超過 200 個字";
    }

    if (!form.message.trim()) {
      next.message = "請填寫訊息內容";
    } else if (form.message.trim().length > 5000) {
      next.message = "訊息內容不可超過 5000 個字";
    }

    setErrors(next);

    if (Object.keys(next).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_FASTAPI_URL ?? "http://127.0.0.1:8000";

      const response = await fetch(`${apiUrl}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Contact API error: ${response.status}`);
      }

      // FastAPI 已確認儲存成功
      setForm({ ...initial });
      setErrors({});
      setSubmitStatus("success");
    } catch (error) {
      console.error("Contact submission failed:", error);

      // 發生錯誤時，保留使用者輸入
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  const social = [
    { label: "GitHub", icon: Github, href: site.github },
    {
      label: "Email",
      icon: Mail,
      href: site.email ? `mailto:${site.email}` : "",
    },
    { label: "Instagram", icon: Instagram, href: site.instagram },
    { label: "LinkedIn", icon: Linkedin, href: site.linkedin },
  ];

  return (
    <section id="contact" className="pt-15 pb-15 scroll-mt-24 bg-[#eae0d7]">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[.95fr_1.05fr] lg:items-center lg:gap-16">
          <div>
            <p className="section-index">04 / GET IN TOUCH</p>
            <h2 className="section-heading mt-2">聯絡我</h2>
            <p className="mt-6 font-display text-[20px] font-bold leading-8 text-[#554035]">
              很高興你來到這裡！
            </p>
            <p className="mt-2 text-[16px] font-semibold leading-8 text-[#5d4336]">
              如果有事項需要討論，都歡迎發送通知給我
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {social.map(({ label, icon: Icon, href }) =>
                href ? (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="social-link"
                  >
                    <Icon size={18} />
                    <span>{label}</span>
                  </a>
                ) : (
                  <span key={label} className="social-link">
                    <Icon size={18} />
                    <span>{label}</span>
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="rounded-[18px] border border-[#eee5df] bg-white p-6 shadow-[0_12px_36px_rgba(91,65,48,.06)] sm:p-8">
            <h3 className="font-display text-xl font-semibold text-[#42342d]">
              寫封訊息給我
            </h3>
            <form
              noValidate
              onSubmit={handleSubmit}
              aria-busy={isSubmitting}
              className="mt-6 space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="姓名"
                  id="contact-name"
                  value={form.name}
                  error={errors.name}
                  onChange={(v) => update("name", v)}
                  placeholder="你的名字"
                />
                <Field
                  label="Email"
                  id="contact-email"
                  type="email"
                  value={form.email}
                  error={errors.email}
                  onChange={(v) => update("email", v)}
                  placeholder="you@email.com"
                />
              </div>
              <Field
                label="主旨"
                id="contact-subject"
                value={form.subject}
                error={errors.subject}
                onChange={(v) => update("subject", v)}
                placeholder="例如：合作提案"
              />
              <div>
                <label htmlFor="contact-message" className="field-label">
                  訊息內容 <span className="text-[#bf715c]">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? "contact-message-error" : undefined
                  }
                  placeholder="告訴我你的想法..."
                  className="form-input resize-y"
                />
                {errors.message && (
                  <p
                    id="contact-message-error"
                    className="mt-1 text-xs text-red-700"
                  >
                    {errors.message}
                  </p>
                )}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-[11px] leading-5 text-[#9b8b80]">
                  * 必填欄位
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="brown-button inline-flex items-center gap-2 px-6 py-3 text-xs disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    "傳送中..."
                  ) : (
                    <>
                      送出訊息 <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
              {submitStatus === "success" && (
                <p
                  role="status"
                  className="rounded-lg bg-[#edf5ec] px-4 py-3 text-xs text-[#426849]"
                >
                  訊息已成功送出！感謝你的聯絡。
                </p>
              )}

              {submitStatus === "error" && (
                <p
                  role="alert"
                  className="rounded-lg bg-[#fbeeed] px-4 py-3 text-xs text-[#a94b42]"
                >
                  訊息送出失敗，請稍後再試。你填寫的內容已保留。
                </p>
              )}
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
function Field({
  label,
  id,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
}: {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="field-label" htmlFor={id}>
        {label} <span className="text-[#bf715c]">*</span>
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className="form-input"
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
