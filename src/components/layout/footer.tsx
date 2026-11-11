import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { site } from "@/lib/site";

export function Footer({ dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <footer className="container-page">
      <div className="flex flex-wrap justify-between gap-4 border-t border-line-1 pb-10 pt-8 text-[13px] text-muted">
        <span>{dict.footer.rights}</span>
        <div className="flex flex-wrap gap-6">
          <a href={site.github} className="transition-colors hover:text-text" rel="me noopener" target="_blank">
            GitHub
          </a>
          {site.linkedin && (
            <a href={site.linkedin} className="transition-colors hover:text-text" rel="me noopener" target="_blank">
              LinkedIn
            </a>
          )}
          <a href={site.cv} className="transition-colors hover:text-text" download>
            {dict.footer.cv}
          </a>
        </div>
      </div>
    </footer>
  );
}
