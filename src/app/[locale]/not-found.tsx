import Link from "next/link";
import { localePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { btnPrimary } from "@/lib/ui";

export default async function NotFound() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  return (
    <div className="container-page flex min-h-[70svh] flex-col items-start justify-center pb-24 pt-40">
      <p className="mb-4 text-[13px] text-accent">404</p>
      <h1 className="m-0 font-serif text-[clamp(52px,7vw,96px)] font-normal leading-none">{dict.notFound.title}</h1>
      <p className="mb-10 mt-5 text-base text-text-2">{dict.notFound.body}</p>
      <Link href={localePath(locale)} className={btnPrimary}>
        {dict.notFound.home}
      </Link>
    </div>
  );
}
