import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const DEFAULT_HERO_IMAGE = "/images/Hero2.png";

type PageHeroProps = {
  title: string;
  description?: string;
  image?: string;
  breadcrumb?: string;
};

export function PageHero({
  title,
  description,
  image = DEFAULT_HERO_IMAGE,
  breadcrumb,
}: PageHeroProps) {
  return (
    <section
      className="relative flex min-h-[42vh] items-center overflow-hidden pt-32 xl:pt-20 lg:min-h-[48vh]"
      aria-labelledby="page-hero-heading"
    >
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-left"
      />

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-l from-navy-dark/92 via-navy-dark/50 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-dark/50 via-transparent to-navy-dark/15 lg:hidden"
        aria-hidden
      />

      <div className="section-container relative grid w-full items-center py-12 lg:grid-cols-2 lg:py-16">
        <div className="relative z-10 w-full text-start lg:max-w-none lg:justify-self-start">
          {breadcrumb && (
            <nav aria-label="مسیر صفحه" className="mb-4">
              <ol className="flex items-center gap-2 text-sm text-white/60">
                <li>
                  <Link href="/" className="transition-colors hover:text-gold">
                    خانه
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="text-gold">{breadcrumb}</li>
              </ol>
            </nav>
          )}
          <h1
            id="page-hero-heading"
            className={cn(
              "text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
            )}
          >
            {title}
          </h1>
          {description && (
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              {description}
            </p>
          )}
        </div>

        <div className="hidden lg:block" aria-hidden />
      </div>
    </section>
  );
}

export { DEFAULT_HERO_IMAGE };
