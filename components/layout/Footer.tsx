import {
  Share2,
  Camera,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { OFFICES, SITE, SOCIAL_LINKS } from "@/lib/constants";
import { Logo } from "@/components/icons/Logo";

const socialIcons = {
  linkedin: Share2,
  instagram: Camera,
  "message-circle": MessageCircle,
} as const;

function OfficeBlock({
  office,
}: {
  office: (typeof OFFICES)[number];
}) {
  return (
    <address className="not-italic" aria-label={office.title}>
      <h3 className="mb-4 text-sm font-bold text-gold">{office.title}</h3>

      <div className="flex items-start gap-3">
        <MapPin className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden />
        <p className="text-sm leading-relaxed text-white/80">{office.address}</p>
      </div>

      <div className="mt-4 flex items-start gap-3">
        <Phone className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden />
        <div className="space-y-1">
          {office.phones.map((phone) => (
            <a
              key={phone.tel}
              href={`tel:${phone.tel}`}
              className="block text-sm font-medium hover:text-gold"
              dir="ltr"
            >
              {phone.display}
            </a>
          ))}
        </div>
      </div>

      {"email" in office && office.email && (
        <div className="mt-4 flex items-start gap-3">
          <Mail className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden />
          <a
            href={`mailto:${office.email}`}
            className="text-sm font-medium hover:text-gold"
          >
            {office.email}
          </a>
        </div>
      )}
    </address>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy-dark text-white" role="contentinfo">
      <div className="section-container py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-4">
            <Logo variant="light" />
            <p className="text-sm leading-relaxed text-white/70">
              {SITE.description}
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = socialIcons[social.icon];
                return (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-gold hover:text-gold"
                    aria-label={social.label}
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {OFFICES.map((office) => (
            <OfficeBlock key={office.id} office={office} />
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/20">
        <div className="section-container flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} {SITE.name}. تمامی حقوق محفوظ است.
          </p>
          <p className="text-xs text-white/40">{SITE.nameEn}</p>
        </div>
      </div>
    </footer>
  );
}
