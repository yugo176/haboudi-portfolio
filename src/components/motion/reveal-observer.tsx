"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const ONCE = "[data-reveal]:not([data-shown]), [data-curtain]:not([data-shown]), [data-words]:not([data-shown])";

/**
 * Un seul observateur pour tout le site : il ajoute data-shown aux éléments marqués quand ils
 * entrent à l'écran (une fois), et data-running aux schémas animés tant qu'ils sont visibles.
 * Il n'intercepte jamais le défilement : tout se joue en CSS, au passage.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const show = (el: Element) => el.setAttribute("data-shown", "");

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(ONCE).forEach(show);
      document.querySelectorAll("[data-flow]").forEach((el) => el.setAttribute("data-running", ""));
      return;
    }

    const once = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show(entry.target);
            once.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const live = new IntersectionObserver((entries) => {
      for (const entry of entries) entry.target.toggleAttribute("data-running", entry.isIntersecting);
    });

    const scan = () => {
      document.querySelectorAll(ONCE).forEach((el) => once.observe(el));
      document.querySelectorAll("[data-flow]").forEach((el) => live.observe(el));
    };
    scan();

    // Filet de sécurité : si l'observateur est retardé (onglet en arrière-plan, navigateur
    // économe…), tout élément déjà atteint par le défilement s'affiche quand même.
    let last = 0;
    const catchUp = () => {
      last = performance.now();
      const limit = window.innerHeight * 0.96;
      document.querySelectorAll(ONCE).forEach((el) => {
        if (el.getBoundingClientRect().top < limit) {
          show(el);
          once.unobserve(el);
        }
      });
    };
    // Limité à une vérification tous les 120 ms : le défilement reste fluide.
    let trailing: number | undefined;
    const onScroll = () => {
      if (performance.now() - last > 120) catchUp();
      clearTimeout(trailing);
      trailing = window.setTimeout(catchUp, 150);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    const late = window.setTimeout(catchUp, 1200);

    // Nouveaux éléments (changement de filtre, de vue…) : on les observe aussi.
    const mutations = new MutationObserver(scan);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      once.disconnect();
      live.disconnect();
      mutations.disconnect();
      clearTimeout(late);
      clearTimeout(trailing);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return null;
}
