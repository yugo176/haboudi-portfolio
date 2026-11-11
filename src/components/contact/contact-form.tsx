"use client";

import { Check } from "lucide-react";
import { useActionState, useEffect, useRef, useState } from "react";
import { sendContact } from "@/lib/actions/contact";
import { initialContactState, PROJECT_TYPES, TIMELINES, type ContactErrorCode, type ContactValues } from "@/lib/validations/contact";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { site, whatsappLink } from "@/lib/site";

type Labels = Dictionary["contactPage"];

const field =
  "w-full rounded-xl border border-line-2 bg-surface-1 px-4 py-3.5 text-[15px] text-text outline-none transition-[border-color,box-shadow] placeholder:text-dim focus:border-accent focus:shadow-[0_0_0_3px_rgba(156,195,230,0.15)] aria-[invalid=true]:border-[#f2a7a0]";
const pillSpan =
  "inline-flex min-h-11 cursor-pointer items-center rounded-full border border-line-3 px-4.5 py-2.5 text-sm text-soft transition-colors peer-checked:border-accent peer-checked:bg-accent peer-checked:text-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-accent hover:border-soft";

function ErrorText({ id, code, labels }: { id: string; code?: ContactErrorCode; labels: Labels }) {
  if (!code) return null;
  return (
    <p id={id} className="mt-1.5 text-[13px] text-[#f2a7a0]">
      {labels.errors[code]}
    </p>
  );
}

function Form({ locale, labels, onSent }: { locale: Locale; labels: Labels; onSent: (name: string) => void }) {
  const [state, action, pending] = useActionState(sendContact, initialContactState);
  const f = labels.form;
  const values: Partial<ContactValues> = "values" in state ? state.values : {};
  const errors = state.status === "invalid" ? state.errors : {};
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "sent") onSent(state.name);
    // Erreur : on place le curseur sur le premier champ à corriger.
    if (state.status === "invalid") {
      const first = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"] input, input[aria-invalid="true"], textarea[aria-invalid="true"]');
      first?.focus();
    }
  }, [state, onSent]);

  const errorProps = (name: keyof ContactValues) => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `err-${name}` : undefined,
  });

  return (
    <form ref={formRef} action={action} noValidate className="flex flex-col gap-7.5">
      <input type="hidden" name="locale" value={locale} />
      {/* Champ piège anti-robot : invisible pour les humains. */}
      <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
        <label>
          Site <input type="text" name="site" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <fieldset className="m-0 border-0 p-0" {...errorProps("types")}>
        <legend className="mb-3.5 p-0 text-sm">
          {f.types} <span className="text-muted">· {f.typesHint}</span>
        </legend>
        <div className="flex flex-wrap gap-2.5">
          {PROJECT_TYPES.map((t) => (
            <label key={t}>
              <input
               
                type="checkbox"
                name="types"
                value={t}
                defaultChecked={values.types?.includes(t)}
                className="peer sr-only"
              />
              <span className={pillSpan}>{f.typeOptions[t]}</span>
            </label>
          ))}
        </div>
        <ErrorText id="err-types" code={errors.types} labels={labels} />
      </fieldset>

      <fieldset className="m-0 border-0 p-0">
        <legend className="mb-3.5 p-0 text-sm">
          {f.timeline} <span className="text-muted">· {f.optional}</span>
        </legend>
        <div className="flex flex-wrap gap-2.5">
          {TIMELINES.map((t) => (
            <label key={t}>
              <input type="radio" name="timeline" value={t} defaultChecked={values.timeline === t} className="peer sr-only" />
              <span className={pillSpan}>{f.timelineOptions[t]}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-4.5">
        <div>
          <label htmlFor="c-name" className="mb-2 block text-sm">
            {f.name}
          </label>
          <input id="c-name" name="name" type="text" autoComplete="name" placeholder={f.namePlaceholder} defaultValue={values.name} className={field} {...errorProps("name")} />
          <ErrorText id="err-name" code={errors.name} labels={labels} />
        </div>
        <div>
          <label htmlFor="c-email" className="mb-2 block text-sm">
            {f.emailLabel}
          </label>
          <input id="c-email" name="email" type="email" autoComplete="email" inputMode="email" placeholder={f.emailPlaceholder} defaultValue={values.email} className={field} {...errorProps("email")} />
          <ErrorText id="err-email" code={errors.email} labels={labels} />
        </div>
      </div>

      <div>
        <label htmlFor="c-company" className="mb-2 block text-sm">
          {f.company} <span className="text-muted">· {f.optional}</span>
        </label>
        <input id="c-company" name="company" type="text" autoComplete="organization" placeholder={f.companyPlaceholder} defaultValue={values.company} className={field} />
      </div>

      <div>
        <label htmlFor="c-msg" className="mb-2 block text-sm">
          {f.message}
        </label>
        <textarea id="c-msg" name="message" rows={5} placeholder={f.messagePlaceholder} defaultValue={values.message} className={`${field} min-h-36 resize-y leading-[1.6]`} {...errorProps("message")} />
        <ErrorText id="err-message" code={errors.message} labels={labels} />
      </div>

      {(state.status === "failed" || state.status === "unavailable") && (
        <div role="alert" className="rounded-xl border border-line-3 bg-surface-3 p-4 text-sm leading-[1.6] text-text-2">
          {labels.errors[state.status === "failed" ? "send_failed" : "unavailable"]}{" "}
          <a href={`mailto:${site.email}`} className="text-accent underline-offset-4 hover:underline">
            {site.email}
          </a>{" "}
          ·{" "}
          <a href={whatsappLink()} target="_blank" rel="noopener" className="text-accent underline-offset-4 hover:underline">
            WhatsApp
          </a>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4.5">
        <p className="m-0 max-w-[300px] text-xs leading-[1.6] text-muted">{f.privacy}</p>
        <button
          type="submit"
          disabled={pending}
          className="min-h-13 cursor-pointer rounded-full border-0 bg-text px-7 py-4 text-[15px] font-medium text-ink transition-colors hover:bg-accent disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? f.sending : `${f.submit} →`}
        </button>
      </div>
    </form>
  );
}

/** Formulaire guidé ; après l'envoi, un écran de confirmation remplace le formulaire. */
export function ContactForm({ locale, labels }: { locale: Locale; labels: Labels }) {
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [round, setRound] = useState(0);
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (sentTo !== null) heading.current?.focus();
  }, [sentTo]);

  if (sentTo !== null) {
    return (
      <div role="status" className="flex min-h-[520px] flex-col items-start justify-center gap-4.5">
        <span className="flex size-14 items-center justify-center rounded-full border border-accent text-accent">
          <Check size={24} aria-hidden />
        </span>
        <h2 ref={heading} tabIndex={-1} className="m-0 font-serif text-[40px] font-normal leading-[1.05] outline-none">
          {labels.success.title} {sentTo} <span className="italic text-accent">{labels.success.titleEm}</span>
        </h2>
        <p className="m-0 max-w-[420px] text-[15px] leading-[1.7] text-text-2">{labels.success.body}</p>
        <button
          type="button"
          onClick={() => {
            setSentTo(null);
            setRound((r) => r + 1);
          }}
          className="mt-2.5 min-h-12 cursor-pointer rounded-full border border-line-3 bg-transparent px-5.5 py-3 text-sm text-text transition-colors hover:border-accent"
        >
          {labels.success.again}
        </button>
      </div>
    );
  }

  return <Form key={round} locale={locale} labels={labels} onSent={setSentTo} />;
}
