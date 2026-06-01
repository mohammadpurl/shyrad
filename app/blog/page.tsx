import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE } from "@/lib/constants";
import { BLOG_POSTS } from "@/lib/blog-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { Calendar, Clock } from "lucide-react";

export const metadata: Metadata = createMetadata({
  title: "اخبار و مقالات",
  description: "آخرین اخبار و مقالات تخصصی درباره مواد اولیه صنعتی و زنجیره تأمین.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "خانه", url: SITE.url },
          { name: "اخبار", url: `${SITE.url}/blog` },
        ])}
      />
      <PageHero
        title="اخبار و مقالات"
        description="تحلیل‌ها و اخبار تخصصی صنعت مواد اولیه"
        breadcrumb="اخبار"
      />

      <section className="py-20 lg:py-28">
        <div className="section-container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((post, index) => (
              <MotionWrapper key={post.slug} delay={index * 0.08}>
                <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white card-shadow-lg transition-shadow hover:card-shadow-lg">
                  <div className="h-2 bg-gradient-to-l from-gold to-gold-light" />
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-xs font-bold text-gold">
                      {post.category}
                    </span>
                    <h2 className="mt-2 text-lg font-bold text-navy">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="transition-colors hover:text-gold"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-4 text-xs text-muted">
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3.5" aria-hidden />
                        {new Date(post.datePublished).toLocaleDateString("fa-IR")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3.5" aria-hidden />
                        {post.readTime}
                      </span>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-4 text-sm font-bold text-navy transition-colors hover:text-gold"
                    >
                      ادامه مطلب ←
                    </Link>
                  </div>
                </article>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
