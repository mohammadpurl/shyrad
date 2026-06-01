import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/metadata";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { SITE } from "@/lib/constants";
import { BLOG_POSTS, getPostBySlug } from "@/lib/blog-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { Calendar, Clock, ArrowRight } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return createMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "خانه", url: SITE.url },
            { name: "اخبار", url: `${SITE.url}/blog` },
            { name: post.title, url: `${SITE.url}/blog/${slug}` },
          ]),
          articleSchema({
            title: post.title,
            description: post.excerpt,
            slug,
            datePublished: post.datePublished,
            dateModified: post.dateModified,
          }),
        ]}
      />

      <article className="pt-24 pb-20 lg:pt-28">
        <div className="section-container max-w-3xl">
          <nav aria-label="مسیر صفحه" className="mb-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-gold"
            >
              <ArrowRight className="size-4" />
              بازگشت به اخبار
            </Link>
          </nav>

          <header>
            <span className="text-sm font-bold text-gold">{post.category}</span>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-navy sm:text-4xl">
              {post.title}
            </h1>
            <div className="mt-4 flex items-center gap-4 text-sm text-muted">
              <span className="flex items-center gap-1">
                <Calendar className="size-4" aria-hidden />
                {new Date(post.datePublished).toLocaleDateString("fa-IR")}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="size-4" aria-hidden />
                {post.readTime}
              </span>
            </div>
          </header>

          <div className="prose prose-lg mt-10 max-w-none">
            {post.content.split("\n\n").map((paragraph, i) => (
              <p key={i} className="mb-4 leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
