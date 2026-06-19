import { createFileRoute } from "@tanstack/react-router";
import IndustriesHero from "@/components/IndustriesHero";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "آلیاژهای اطلس — تأمین مواد اولیه صنعتی" },
      {
        name: "description",
        content:
          "تأمین آلیاژها و مواد اولیه تخصصی برای صنایع خودرو، هوافضا، نفت، ساخت‌وساز، الکترونیک و ماشین‌سازی.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <IndustriesHero />;
}
