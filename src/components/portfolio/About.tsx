import { Reveal, SectionHeading } from "./Reveal";
import { profile, facts } from "@/data/portfolio";


export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <SectionHeading index="01" label="about" title="Who I am" />
      <div className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5">
          <Reveal delay={60}>
            <p className="text-lg leading-relaxed text-foreground/90">
              {profile.summary}
            </p>
          </Reveal>
          {profile.bio.map((p, i) => (
            <Reveal key={i} delay={120 + i * 80}>
              <p className="leading-relaxed text-muted-foreground">{p}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140}>
          <dl className="glass grid grid-cols-2 gap-px overflow-hidden rounded-2xl">
            {facts.map((f) => (
              <div key={f.label} className="bg-surface-2 p-5">
                <dt className="eyebrow">{f.label}</dt>
                <dd className="mt-2 font-display text-base font-semibold">
                  {f.value}
                </dd>
              </div>
            ))}
            <div className="col-span-2 bg-surface-2 p-5">
              <dt className="eyebrow">Email</dt>
              <dd className="mt-2 truncate">
                <a
                  href={`mailto:${profile.email}`}
                  className="text-sm text-highlight transition-opacity hover:opacity-80"
                >
                  {profile.email}
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}


