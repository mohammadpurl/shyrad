export const SITE = {
  name: "شایراد تجارت پارس",
  nameEn: "Sayrad Tejarat Pars",
  tagline: "تأمین مطمئن مواد اولیه ویژه صنایع پیشرفته",
  description:
    "بیش از ۳۰ سال تجربه در تأمین مواد اولیه صنعتی برای صنایع شیشه، سرامیک، نسوز، بهداشتی و ریخته‌گری با شبکه تأمین بین‌المللی.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sayradtejarat.com",
  phone: "021-58695000",
  phoneDisplay: "۰۲۱-۵۸۶۹۵۰۰۰",
  email: "info@shyrad.com",
  address: "تهران، خیابان آفریقا، خیابان یزدان‌پناه، پلاک ۷۶",
  locale: "fa_IR",
  logo: "/images/Logo.png",
  favicon: "/favicon.ico",
} as const;

export const OFFICES = [
  {
    id: "tehran",
    title: "دفتر مرکزی",
    address: "تهران، خیابان آفریقا، خیابان یزدان‌پناه، پلاک ۷۶",
    phones: [
      { display: "۰۲۱-۵۸۶۹۵۰۰۰", tel: "02158695000" },
      { display: "۰۲۱-۸۸۶۵۳۹۲۹", tel: "02188653929" },
    ],
    email: "info@shyrad.com",
  },
  {
    id: "yazd",
    title: "دفتر یزد",
    address: "یزد، بلوار جمهوری، نبش کوچه نسیم، برج آسمان، واحد ۴۶",
    phones: [{ display: "۰۳۵-۳۸۴۱۰۷۴۲", tel: "03538410742" }],
  },
] as const;

export const NAV_LINKS = [
  { href: "/", label: "خانه" },
  { href: "/about", label: "درباره ما" },
  { href: "/products", label: "محصولات" },
  { href: "/industries", label: "صنایع" },
  { href: "/global-supply", label: "تأمین جهانی" },
  { href: "/blog", label: "اخبار" },
  { href: "/contact", label: "تماس با ما" },
] as const;

export { INDUSTRIES } from "./industries-data";

export const HERO_STATS = [
  { value: 1000, suffix: "+", label: "مشتری صنعتی" },
  { value: 100, suffix: "+", label: "تأمین‌کننده جهانی" },
  { value: 30, suffix: "+", label: "سال تجربه" },
] as const;

export const STATS = [
  { value: 30, suffix: "+", label: "سال تجربه" },
  { value: 1000, suffix: "+", label: "پروژه موفق" },
  { value: 6, suffix: "", label: "صنعت تخصصی" },
  { value: 0, suffix: "", label: "شبکه تأمین بین‌المللی", isText: true },
] as const;

export const PROCESS_STEPS = [
  {
    title: "تحلیل نیاز",
    description: "بررسی دقیق نیاز فنی و حجمی پروژه شما",
    icon: "search" as const,
  },
  {
    title: "انتخاب تأمین‌کننده",
    description: "انتخاب بهترین منابع جهانی با استانداردهای کیفی",
    icon: "handshake" as const,
  },
  {
    title: "کنترل کیفیت",
    description: "بازرسی و آزمایش قبل از ارسال",
    icon: "shield-check" as const,
  },
  {
    title: "واردات و لجستیک",
    description: "مدیریت کامل فرآیند گمرکی و حمل",
    icon: "ship" as const,
  },
  {
    title: "تحویل در کارخانه",
    description: "تحویل به‌موقع در محل تولید شما",
    icon: "factory" as const,
  },
] as const;

export const SUPPLY_COUNTRIES = [
  { name: "آلمان", code: "DE", x: 48, y: 28 },
  { name: "ایتالیا", code: "IT", x: 50, y: 38 },
  { name: "ترکیه", code: "TR", x: 54, y: 38 },
  { name: "چین", code: "CN", x: 72, y: 38 },
  { name: "هند", code: "IN", x: 68, y: 48 },
  { name: "اسپانیا", code: "ES", x: 44, y: 40 },
] as const;

export const WHY_CHOOSE_US = [
  {
    title: "تأمین از معتبرترین منابع جهانی",
    description: "همکاری مستقیم با تولیدکنندگان برتر دنیا",
    icon: "ship" as const,
  },
  {
    title: "کنترل کیفیت سخت‌گیرانه",
    description: "ارائه مواد اولیه با بالاترین استانداردهای کیفی",
    icon: "badge-check" as const,
  },
  {
    title: "تحویل مطمئن و به‌موقع",
    description: "تعهد در زمان‌بندی و پشتیبانی کامل",
    icon: "clock" as const,
  },
  {
    title: "مشاوره تخصصی",
    description: "ارائه راهکارهای بهینه توسط متخصصین مجرب",
    icon: "headphones" as const,
  },
] as const;

export const SOCIAL_LINKS = [
  { href: "https://linkedin.com", label: "LinkedIn", icon: "linkedin" as const },
  { href: "https://instagram.com", label: "Instagram", icon: "instagram" as const },
  { href: "https://wa.me/989121234567", label: "WhatsApp", icon: "message-circle" as const },
] as const;
