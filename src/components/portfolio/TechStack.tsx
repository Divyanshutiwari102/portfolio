import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal, SectionHeading } from "./Reveal";
import { skillGroups } from "@/data/portfolio";



type Key = { label: string; short: string; note: string; hue: number };

const notes: Record<string, string> = {
  Java: "my primary language — where the heavy lifting happens",
  "Spring Boot": "layered services, clean contracts, boring reliability",
  "Spring Security": "auth that fails closed, not open",
  PostgreSQL: "indexes first, excuses later",
  Redis: "the 40% latency drop nobody notices",
  Kafka: "events over polling, always",
  Docker: "if it runs here, it runs there",
  "AWS EC2": "where the APIs actually live",
  React: "the surface people touch",
  Rust: "for the solver paths that must not be slow",
  FastAPI: "the AI service lane",
  Neo4j: "relationships as first-class data",
  pgvector: "HNSW beats a cosine for-loop every time",
  LangChain: "retrieval plumbing for RAG",
  MongoDB: "flexible documents, strict validation",
  "CI/CD Pipelines": "ship 3x faster, break 3x less",
  JUnit: "green before merge",
  "Tailwind CSS": "styling without the cascade fights",
  LangGraph: "stateful agent graphs, not prompt spaghetti",
  "Agentic Workflows": "tools, memory and loops that actually finish",
  "LLM Orchestration": "routing, fallbacks and cost control",
  "Prompt Engineering": "eval-driven, not vibes-driven",
  Kubernetes: "rollouts without downtime",
  Prometheus: "metrics before opinions",
  Grafana: "the dashboard I stare at during releases",
  "Swagger / OpenAPI": "contracts other teams can trust",
  Linux: "where everything ends up running",
  JIRA: "scope stays visible",
  Slack: "async by default",
  Mockito: "fast tests, no live dependencies",
  TypeScript: "types on the surface too",
  "Hugging Face": "models without reinventing them",
};

const shorts: Record<string, string> = {
  "Java (Primary)": "Java",
  "Spring Boot": "Boot",
  "Spring Security": "Sec",
  "Spring Data JPA": "JPA",
  "RESTful APIs": "REST",
  Microservices: "µSvc",
  JWT: "JWT",
  RBAC: "RBAC",
  Docker: "Dock",
  "CI/CD Pipelines": "CI/CD",
  "GitHub Actions": "GHA",
  Linux: "Linux",
  Maven: "MVN",
  Git: "Git",
  PostgreSQL: "PSQL",
  MySQL: "SQL",
  Redis: "Redis",
  Kafka: "Kafka",
  MongoDB: "Mongo",
  Neo4j: "Neo4j",
  pgvector: "pgv",
  Pinecone: "Pine",
  "React.js": "React",
  "Redux Toolkit": "Redux",
  "Tailwind CSS": "TW",
  LangChain: "LC",
  "RAG Pipelines": "RAG",
  "Vector Embeddings": "Vec",
  JUnit: "JUnit",
  "Spring Actuator": "Act",
  LangGraph: "LGraph",
  "Agentic Workflows": "Agents",
  "LLM Orchestration": "LLMOps",
  "Prompt Engineering": "Prompt",
  "Hugging Face": "HF",
  "OpenAI / Gemini APIs": "LLM API",
  "Model Context Protocol": "MCP",
  Kubernetes: "K8s",
  Prometheus: "Prom",
  Grafana: "Graf",
  "Swagger / OpenAPI": "Swagr",
  "AWS EC2": "EC2",
  "AWS S3": "S3",
  JIRA: "Jira",
  Slack: "Slack",
  Mockito: "Mock",
  Postman: "Post",
  "Load Testing": "Load",
  TypeScript: "TS",
  "Framer Motion": "Motion",
};

const keys: Key[] = skillGroups
  .flatMap((g) => g.items)
  .map((label, i) => {
    const clean = label.replace(" (Primary)", "").replace(".js", "");
    return {
      label: clean,
      short: shorts[label] ?? clean.slice(0, 5),
      note: notes[clean] ?? `part of how I ship — ${clean.toLowerCase()}`,
      hue: (i * 47) % 360,
    };
  });

export function TechStack() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [pressed, setPressed] = useState<number | null>(null);
  const timers = useRef<number[]>([]);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(!!entry?.isIntersecting),
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(
    () => () => {
      timers.current.forEach((t) => window.clearTimeout(t));
    },
    [],
  );

  // keycap press
  const tap = useCallback((index: number) => {
    setActive(index);
    setPressed(index);
    timers.current.push(
      window.setTimeout(() => setPressed(null), 140),
    );
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % keys.length), 2200);
    return () => clearInterval(id);
  }, [paused]);

  // real typing plays the keyboard — and the cat taps along
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key.length !== 1) return;
      const code = e.key.toLowerCase().charCodeAt(0);
      tap(code % keys.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tap]);

  const current = keys[active]!;

  return (
    <section id="skills" className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading index="02" label="skills" title="Tech stack" />
        <Reveal delay={60}>
          <p className="mt-4 font-mono text-xs text-muted-foreground">
            (hint: hover a key — or just start typing, the board plays along)
          </p>
        </Reveal>
      </div>

      <div className="relative mx-auto mt-10 max-w-6xl px-5 sm:px-8">
        {/* rotating label */}
        <div className="pointer-events-none absolute left-4 top-0 z-10 max-w-[46%] -rotate-6 sm:left-10">
          <p
            key={current.label}
            className="animate-fade-in font-display text-2xl font-bold leading-none sm:text-4xl md:text-5xl"
          >
            {current.label}
          </p>
          <p className="mt-2 max-w-xs text-xs text-muted-foreground sm:text-sm">
            {current.note}
          </p>
        </div>

        <div ref={stageRef} className="keyboard-stage relative">
          <div
            className="keyboard-spin"
            data-live={inView && !paused}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >

            <div className="keyboard-deck">

              {keys.map((k, i) => (
                <button
                  key={k.label}
                  type="button"
                  onMouseEnter={() => tap(i)}
                  onFocus={() => setActive(i)}
                  data-active={i === active}
                  data-pressed={i === pressed}
                  className="keycap"
                  style={{ "--cap-hue": String(k.hue) } as Record<string, string>}

                  aria-label={k.label}
                >
                  <span className="keycap-text">{k.short}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>


      <div className="mx-auto mt-16 grid max-w-6xl gap-5 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
        {skillGroups.map((g, i) => (
          <Reveal key={g.title} delay={i * 80}>
            <div className="card-hover glass h-full rounded-2xl p-6">
              <h3 className="font-display text-lg font-semibold">{g.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
