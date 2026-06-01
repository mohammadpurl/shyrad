"use client";

import { useState, type FormEvent } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { OFFICES } from "@/lib/constants";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        className="rounded-2xl border border-gold/30 bg-gold/10 p-8 text-center"
        role="status"
      >
        <p className="text-lg font-bold text-navy">پیام شما دریافت شد</p>
        <p className="mt-2 text-sm text-muted">
          کارشناسان ما در اسرع وقت با شما تماس خواهند گرفت.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl bg-white p-6 card-shadow-lg sm:p-8"
      aria-label="فرم تماس"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-navy">
            نام و نام خانوادگی
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="w-full rounded-xl border border-navy/10 bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/20"
          />
        </div>
        <div>
          <label htmlFor="company" className="mb-2 block text-sm font-medium text-navy">
            نام شرکت
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            className="w-full rounded-xl border border-navy/10 bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/20"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-navy">
            شماره تماس
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            dir="ltr"
            autoComplete="tel"
            className="w-full rounded-xl border border-navy/10 bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/20"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-navy">
            ایمیل
          </label>
          <input
            id="email"
            name="email"
            type="email"
            dir="ltr"
            autoComplete="email"
            className="w-full rounded-xl border border-navy/10 bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/20"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="mb-2 block text-sm font-medium text-navy">
          موضوع
        </label>
        <select
          id="subject"
          name="subject"
          required
          className="w-full rounded-xl border border-navy/10 bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/20"
        >
          <option value="price">استعلام قیمت</option>
          <option value="consultation">مشاوره تخصصی</option>
          <option value="partnership">همکاری تجاری</option>
          <option value="other">سایر</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-navy">
          پیام
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full resize-none rounded-xl border border-navy/10 bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/20"
        />
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-navy px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-navy-dark sm:w-auto"
      >
        <Send className="size-4" aria-hidden />
        ارسال پیام
      </button>
    </form>
  );
}

export function ContactInfo() {
  return (
    <div className="space-y-8">
      {OFFICES.map((office) => (
        <div key={office.id}>
          <h3 className="mb-4 text-sm font-bold text-navy">{office.title}</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-navy/5">
                <MapPin className="size-5 text-navy" aria-hidden />
              </div>
              <div>
                <p className="text-xs text-muted">آدرس</p>
                <p className="mt-1 font-medium text-navy">{office.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-navy/5">
                <Phone className="size-5 text-navy" aria-hidden />
              </div>
              <div>
                <p className="text-xs text-muted">تلفن</p>
                <div className="mt-1 space-y-1">
                  {office.phones.map((phone) => (
                    <a
                      key={phone.tel}
                      href={`tel:${phone.tel}`}
                      className="block font-medium text-navy transition-colors hover:text-gold"
                      dir="ltr"
                    >
                      {phone.display}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {"email" in office && office.email && (
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-navy/5">
                  <Mail className="size-5 text-navy" aria-hidden />
                </div>
                <div>
                  <p className="text-xs text-muted">ایمیل</p>
                  <a
                    href={`mailto:${office.email}`}
                    className="mt-1 block font-medium text-navy transition-colors hover:text-gold"
                  >
                    {office.email}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
