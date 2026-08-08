import { useEffect, useState } from "react";
import { Github, Lock, Maximize2 } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { ProjectModal } from "./ProjectModal";
import type { Project } from "@/data/portfolio";

import { projects } from "@/data/portfolio";
import beamlab from "@/assets/proj-beamlab.jpg?w=480;800;1200&format=webp&as=srcset";
import beamlabFallback from "@/assets/proj-beamlab.jpg?w=800&format=jpg";
import scripturesync from "@/assets/proj-scripturesync.jpg?w=480;800;1200&format=webp&as=srcset";
import scripturesyncFallback from "@/assets/proj-scripturesync.jpg?w=800&format=jpg";
import rag from "@/assets/proj-rag.jpg?w=480;800;1200&format=webp&as=srcset";
import ragFallback from "@/assets/proj-rag.jpg?w=800&format=jpg";
import traffic from "@/assets/proj-traffic.jpg?w=480;800;1200&format=webp&as=srcset";
import trafficFallback from "@/assets/proj-traffic.jpg?w=800&format=jpg";
import netwatch from "@/assets/proj-netwatch.jpg?w=480;800;1200&format=webp&as=srcset";
import netwatchFallback from "@/assets/proj-netwatch.jpg?w=800&format=jpg";
import nexova from "@/assets/proj-nexova.jpg?w=480;800;1200&format=webp&as=srcset";
import nexovaFallback from "@/assets/proj-nexova.jpg?w=800&format=jpg";
import taskmanager from "@/assets/proj-taskmanager.jpg?w=480;800;1200&format=webp&as=srcset";
import taskmanagerFallback from "@/assets/proj-taskmanager.jpg?w=800&format=jpg";
import connection from "@/assets/proj-connection.jpg?w=480;800;1200&format=webp&as=srcset";
import connectionFallback from "@/assets/proj-connection.jpg?w=800&format=jpg";

const filters = ["All", "AI", "Backend", "Systems", "Full Stack"] as const;

const covers: Record<string, string> = {
  "BeamLab — Structural Engineering Platform": beamlab,
  "ScriptureSync — Cross-Religion Knowledge Graph": scripturesync,
  "Adaptive RAG — Distributed Document Retrieval": rag,
  "AI-Based Traffic Management System": traffic,
  "NetWatch — Deep Packet Inspection": netwatch,
  "Nexova — E-Commerce Platform": nexova,
  TaskManager: taskmanager,
  "Connection Bano": connection,
};

const coverFallbacks: Record<string, string> = {
  "BeamLab — Structural Engineering Platform": beamlabFallback,
  "ScriptureSync — Cross-Religion Knowledge Graph": scripturesyncFallback,
  "Adaptive RAG — Distributed Document Retrieval": ragFallback,
  "AI-Based Traffic Management System": trafficFallback,
  "NetWatch — Deep Packet Inspection": netwatchFallback,
  "Nexova — E-Commerce Platform": nexovaFallback,
  TaskManager: taskmanagerFallback,
  "Connection Bano": connectionFallback,
};

export function Projects() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const shown =
    active === "All" ? projects : projects.filter((p) => p.tag === active);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected]);



  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <SectionHeading index="04" label="projects" title="What I've built" />

      <Reveal delay={80}>
        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              className={`rounded-full border px-4 py-1.5 text-xs transition-colors duration-300 ${
                active === f
                  ? "border-highlight/60 bg-highlight/15 text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {shown.map((p, i) => (
          <Reveal key={p.title} delay={i * 70}>
            <article
              role="button"
              tabIndex={0}
              onClick={() => setSelected(p)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelected(p);
                }
              }}
              aria-label={`Open details for ${p.title}`}
              className="card-hover glass group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl text-left outline-none focus-visible:ring-2 focus-visible:ring-highlight/60"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                <img
                  src={coverFallbacks[p.title]}
                  srcSet={covers[p.title]}
                  sizes="(min-width: 1024px) 560px, (min-width: 768px) 45vw, 92vw"
                  alt={`${p.title} cover image`}
                  loading="lazy"
                  decoding="async"
                  width={1200}
                  height={750}
                  className="absolute inset-0 size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.08]"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

                <span className="absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-border bg-card/80 opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                  <Maximize2 className="size-4" />
                </span>
                <div className="absolute bottom-4 left-5 right-5">
                  <h3 className="font-display text-lg font-semibold sm:text-xl">
                    {p.title}
                  </h3>
                  <span className="mt-2 inline-block rounded-md border border-border bg-secondary/70 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur">
                    {p.tag} · {p.period}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>

                <ul className="mt-5 space-y-2">
                  {p.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex gap-3 text-sm text-muted-foreground/85"
                    >
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-highlight/70" />
                      {h}
                    </li>
                  ))}
                </ul>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-border bg-secondary/40 px-3 py-1 font-mono text-[11px] text-muted-foreground"
                    >
                      {s}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap items-center gap-2 pt-1">
                  {p.privateRepo ? (
                    <span className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs text-muted-foreground">
                      <Lock className="size-3.5" /> Private repo
                    </span>
                  ) : (
                    p.repo && (
                      <a
                        href={p.repo}
                        target="_blank"
                        rel="noreferrer noopener"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs transition-colors hover:bg-secondary"
                      >
                        <Github className="size-3.5" /> Repo
                      </a>
                    )
                  )}
                  <span className="font-mono text-[11px] text-muted-foreground/70">
                    click card for details
                  </span>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <ProjectModal
        project={selected}
        cover={selected ? coverFallbacks[selected.title] : undefined}
        coverSrcSet={selected ? covers[selected.title] : undefined}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
