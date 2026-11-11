import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/seo";
import { site, whatsappLink } from "@/lib/site";
import { CopyButton } from "@/components/ui/copy-button";
import { ContactForm } from "@/components/contact/contact-form";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  return pageMetadata({ locale, path: "/contact", title: dict.nav.contact, description: dict.contactPage.intro });
}

function ChannelRow({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener" className="flex items-center justify-between gap-4 border-b border-line-2 py-5 transition-colors hover:text-accent">
      <span>
        <span className="mb-1 block text-xs text-muted">{label}</span>
        <span className="text-base">{value}</span>
      </span>
      <span aria-hidden className="text-accent">
        ↗
      </span>
    </a>
  );
}

export default async function ContactPage() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  const c = dict.contactPage;

  return (
    <div className="container-page">
      <div className="flex flex-wrap items-start gap-18 pb-28 pt-36 md:pt-44">
        <div className="min-w-0 flex-[1_1_380px]" data-reveal>
          <p className="mb-4.5 text-[13px] text-accent">{c.label}</p>
          <h1 className="m-0 font-serif text-[clamp(52px,6vw,88px)] font-normal leading-[0.98] tracking-[-0.01em]">
            {c.title}
            <br />
            <span className="italic text-accent">{c.titleEm}</span>
          </h1>
          <p className="mt-7 max-w-[420px] text-base leading-[1.7] text-text-2">{c.intro}</p>

          <div className="mt-14 border-t border-line-2">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line-2 py-5">
              <span>
                <span className="mb-1 block text-xs text-muted">{c.email}</span>
                <a href={`mailto:${site.email}`} className="text-base transition-colors hover:text-accent">
                  {site.email}
                </a>
              </span>
              <CopyButton
                value={site.email}
                label={c.copy}
                copiedLabel={c.copied}
                showIcon={false}
                className="min-h-11 cursor-pointer rounded-full border border-line-3 bg-transparent px-4 py-2.5 text-[13px] text-text transition-colors hover:border-accent"
              />
            </div>
            <ChannelRow label={c.whatsapp} value={site.whatsappDisplay} href={whatsappLink()} />
            {site.linkedin && <ChannelRow label={c.linkedin} value={site.fullName} href={site.linkedin} />}
            <ChannelRow label={c.github} value={site.githubHandle} href={site.github} />
          </div>
          <p className="mt-7 text-[13px] text-muted">{c.location}</p>
        </div>

        <div className="relative min-w-0 flex-[1.25_1_480px] rounded-3xl border border-line-1 bg-surface-1 p-6 md:p-11" data-reveal style={{ "--reveal-delay": "0.15s" } as CSSProperties}>
          <ContactForm locale={locale} labels={c} />
        </div>
      </div>
    </div>
  );
}
