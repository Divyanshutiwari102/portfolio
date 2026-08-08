import { Code2, ExternalLink } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { leetcode } from "@/data/portfolio";

export function LeetCode() {
  return (
    <section id="leetcode" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <SectionHeading
        index="05"
        label="leetcode"
        title="Algorithms & problem solving"
      />

      <div className="mt-12 grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <Reveal>
          <article className="card-hover glass flex h-full flex-col rounded-2xl p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-border text-highlight">
                <Code2 className="size-4" />
              </span>
              <a
                href={leetcode.url}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs transition-colors hover:bg-secondary"
              >
                @{leetcode.handle} <ExternalLink className="size-3.5" />
              </a>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              {leetcode.blurb}
            </p>

            <dl className="mt-8 grid gap-4 sm:grid-cols-3">
              {leetcode.stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-border bg-secondary/30 p-4"
                >
                  <dt className="eyebrow">{s.label}</dt>
                  <dd className="mt-2 font-display text-lg font-semibold">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </article>
        </Reveal>

        <Reveal delay={90}>
          <article className="card-hover glass h-full rounded-2xl p-6 sm:p-8">
            <span className="eyebrow">Topics covered</span>
            <ul className="mt-5 flex flex-wrap gap-2">
              {leetcode.topics.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-border bg-secondary/40 px-3 py-1 font-mono text-[11px] text-muted-foreground"
                >
                  {t}
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
