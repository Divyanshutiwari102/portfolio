import { Github, Lock, X } from "lucide-react";
import type { Project } from "@/data/portfolio";

type Props = {
  project: Project | null;
  cover?: string | undefined;
  coverSrcSet?: string | undefined;
  onClose: () => void;
};

export function ProjectModal({ project, cover, coverSrcSet, onClose }: Props) {
  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      className="fixed inset-0 z-[200] flex items-end justify-center overflow-y-auto bg-background/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="animate-scale-in glass relative w-full max-w-2xl overflow-hidden rounded-t-3xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-4 top-4 z-10 grid size-9 place-items-center rounded-full border border-border bg-card/80 backdrop-blur transition-colors hover:bg-secondary"
        >
          <X className="size-4" />
        </button>

        {cover && (
          <div className="relative aspect-[16/9] overflow-hidden bg-secondary">
            <img
              src={cover}
              srcSet={coverSrcSet}
              sizes="(min-width: 640px) 672px, 100vw"
              loading="lazy"
              decoding="async"
              width={1200}
              height={675}
              alt={`${project.title} cover image`}
              className="absolute inset-0 size-full object-cover"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
          </div>
        )}


        <div className="max-h-[60vh] overflow-y-auto p-6 sm:p-8">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {project.tag} · {project.period}
          </span>
          <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl">{project.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

          <ul className="mt-6 space-y-2">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-sm text-muted-foreground/85">
                <span className="mt-1.5 size-1 shrink-0 rounded-full bg-highlight/70" />
                {h}
              </li>
            ))}
          </ul>

          <p className="mt-7 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            tech stack
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <li
                key={s}
                className="rounded-full border border-border bg-secondary/40 px-3 py-1 font-mono text-[11px] text-muted-foreground"
              >
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            {project.privateRepo ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-xs text-muted-foreground">
                <Lock className="size-3.5" /> Private repo
              </span>
            ) : (
              project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-medium text-primary-foreground transition-transform duration-300 hover:scale-[1.03]"
                >
                  <Github className="size-3.5" /> View repository
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
