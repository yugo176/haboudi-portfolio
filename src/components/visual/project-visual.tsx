import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { t, type Project } from "@/content";
import { projectImage } from "@/lib/project-image";
import { AiBars, Board, BrowserFrame, DocPage, PhoneShots, Phones } from "./drawn";

/**
 * Visuel d'un projet : la capture d'écran dans une fenêtre de navigateur si elle existe,
 * sinon un visuel dessiné selon son type. `tall` sert aux cartes en portrait.
 */
export function ProjectVisual({ project, locale, note, tall = false, sizes, maxShots }: { project: Project; locale: Locale; note: string; tall?: boolean; sizes?: string; maxShots?: number }) {
  const image = projectImage(project.slug);
  const title = t(project.title, locale);
  if (image) {
    return (
      <BrowserFrame domain={project.domain} note={note} tall={tall}>
        <Image src={image} alt={title} fill sizes={sizes ?? "(min-width: 1024px) 50vw, 100vw"} className="object-cover object-left-top" />
      </BrowserFrame>
    );
  }
  if (project.shots?.length) {
    return <PhoneShots max={maxShots} shots={project.shots.map((s) => ({ src: s.src, alt: t(s.alt, locale) }))} />;
  }
  switch (project.kind) {
    case "site":
      return <BrowserFrame domain={project.domain} note={note} tall={tall} />;
    case "app":
      return <Phones labels={project.screens ? t(project.screens, locale) : [title, title, title]} />;
    case "board":
      return <Board />;
    case "ai":
      return <AiBars />;
    case "doc":
      return <DocPage title={title} />;
  }
}
