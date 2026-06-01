import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { MotionWrapper } from "@/components/ui/MotionWrapper";

export function CTASection() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32" aria-labelledby="cta-heading">
      <Image
        src="/images/Footer.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-navy-dark/75" />

      <div className="section-container relative">
        <MotionWrapper className="mx-auto max-w-3xl text-center">
          <h2
            id="cta-heading"
            className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl"
          >
            آماده رشد کسب‌وکار خود هستید؟
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            برای مشاوره رایگان و استعلام قیمت با تیم متخصص ما تماس بگیرید.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/contact" variant="white">
              استعلام قیمت
            </Button>
            <Button href="/contact#consultation" variant="outline">
              درخواست مشاوره
            </Button>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
