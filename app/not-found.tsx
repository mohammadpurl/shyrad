import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-32 text-center">
      <p className="text-6xl font-bold text-gold">۴۰۴</p>
      <h1 className="mt-4 text-2xl font-bold text-navy">صفحه یافت نشد</h1>
      <p className="mt-2 text-muted">صفحه‌ای که به دنبال آن هستید وجود ندارد.</p>
      <div className="mt-8">
        <Button href="/" variant="primary">
          بازگشت به خانه
        </Button>
      </div>
    </section>
  );
}
