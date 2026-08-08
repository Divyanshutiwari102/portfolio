import { Briefcase, GraduationCap, Trophy } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { experience, recognition, education } from "@/data/portfolio";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <SectionHeading index="03" label="experience" title="Where I've worked" />
      <div className="mt-12 space-y-5">
        {experience.map((e, i) => (
          <Reveal key={e.company} delay={i * 100}>
            <article className="card-hover glass rounded-2xl p-6 sm:p-8">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:flex-wrap sm:justify-between">
                <div className="flex min-w-0 items-start gap-3">
                  <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg border border-border text-highlight">
                    <Briefcase className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-xl font-semibold">
                      {e.role}
                    </h3>
                    <p className="text-sm text-muted-foreground">{e.company}</p>
                  </div>
                </div>
                <span className="eyebrow shrink-0 whitespace-nowrap">
                  {e.period}
                </span>
              </div>

              <ul className="mt-6 space-y-2.5">
                {e.points.map((p) => (
                  <li
                    key={p}
                    className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-highlight/70" />
                    {p}
                  </li>
                ))}
              </ul>

              <ul className="mt-6 flex flex-wrap gap-2">
                {e.stack.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-muted-foreground"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Recognition() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <SectionHeading
        index="06"
        label="recognition"
        title="Education & achievements"
      />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        <Reveal>
          <div className="card-hover glass h-full rounded-2xl p-6">
            <span className="grid size-9 place-items-center rounded-lg border border-border text-highlight">
              <GraduationCap className="size-4" />
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold">
              {education.degree}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {education.school}
            </p>
            <p className="eyebrow mt-4">
              {education.period} · {education.detail}
            </p>
          </div>
        </Reveal>

        {recognition.map((r, i) => (
          <Reveal key={r.title} delay={(i + 1) * 90}>
            <div className="card-hover glass h-full rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <span className="grid size-9 place-items-center rounded-lg border border-border text-highlight">
                  <Trophy className="size-4" />
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {r.index}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">
                {r.title}
              </h3>
              {r.href ? (
                <a
                  href={r.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-1 inline-block text-sm text-highlight transition-opacity hover:opacity-80"
                >
                  {r.subtitle}
                </a>
              ) : (
                <p className="mt-1 text-sm text-muted-foreground">
                  {r.subtitle}
                </p>
              )}
              <p className="mt-4 text-sm text-muted-foreground/80">{r.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
