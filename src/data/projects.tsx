import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ArrowUpRight } from "lucide-react";
import Link from "@/shims/next-link";
import { ReactNode } from "react";

const BASE_PATH = "/assets/projects-screenshots";

// Renders a brand SVG from /public as a monochrome glyph that inherits the
// surrounding text color (the skill dock styles every icon via currentColor).
const MaskIcon = ({ src, title }: { src: string; title?: string }) => (
  <span
    role="img"
    aria-label={title}
    className="block bg-current"
    style={{
      width: "1em",
      height: "1em",
      WebkitMaskImage: `url(${src})`,
      maskImage: `url(${src})`,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      WebkitMaskSize: "contain",
      maskSize: "contain",
    }}
  />
);

const ProjectsLinks = ({ live, repo }: { live?: string; repo?: string }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      {live && live !== "#" && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={live}
        >
          <Button variant={"default"} size={"sm"}>
            Visit Website
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
      {repo && repo !== "#" && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={repo}
        >
          <Button variant={"default"} size={"sm"}>
            Github
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};

const brand = (title: string, file: string): Skill => ({
  title,
  bg: "black",
  fg: "white",
  icon: <MaskIcon src={`/assets/logos/${file}`} title={title} />,
});

// Techs without a mono SVG in /public/assets/logos fall back to a text mark.
const mark = (title: string, label: string): Skill => ({
  title,
  bg: "black",
  fg: "white",
  icon: <span className="text-[0.6em] font-bold leading-none">{label}</span>,
});

const PROJECT_SKILLS = {
  // available brand marks
  react: brand("React.js", "react-mono.svg"),
  next: brand("Next.js", "nextdotjs-mono.svg"),
  ts: brand("TypeScript", "typescript-mono.svg"),
  js: brand("JavaScript", "javascript-mono.svg"),
  tailwind: brand("Tailwind CSS", "tailwind-css-mono.svg"),
  node: brand("Node.js", "nodedotjs-mono.svg"),
  express: brand("Express", "express-mono.svg"),
  python: brand("Python", "python-mono.svg"),
  postgres: brand("PostgreSQL", "postgresql-mono.svg"),
  mongo: brand("MongoDB", "mongodb-mono.svg"),
  redis: brand("Redis", "redis-mono.svg"),
  docker: brand("Docker", "docker-mono.svg"),
  turborepo: brand("Turborepo", "turborepo-mono.svg"),
  anthropic: brand("Anthropic Claude", "anthropic-mono.svg"),
  vercel: brand("Vercel", "vercel-mono.svg"),
  // text marks
  java: mark("Java 21", "Java"),
  spring: mark("Spring Boot", "Spr"),
  springSecurity: mark("Spring Security", "Sec"),
  jpa: mark("Spring Data JPA", "JPA"),
  rust: mark("Rust / Axum", "Rs"),
  wasm: mark("WebAssembly", "WA"),
  fastapi: mark("FastAPI", "API"),
  neo4j: mark("Neo4j", "Neo"),
  pinecone: mark("Pinecone", "Pc"),
  pgvector: mark("pgvector", "pgv"),
  langchain: mark("LangChain", "LC"),
  langgraph: mark("LangGraph", "LG"),
  kafka: mark("Kafka", "Kfk"),
  aws: mark("AWS EC2 / S3", "AWS"),
  azure: mark("Azure", "Az"),
  k8s: mark("Kubernetes", "K8s"),
  actions: mark("GitHub Actions", "CI"),
  yolo: mark("YOLOv8", "YOLO"),
  opencv: mark("OpenCV", "CV"),
  pytorch: mark("PyTorch", "PyT"),
  pcap: mark("Pcap4J", "Pcap"),
  websocket: mark("WebSocket", "WS"),
  redux: mark("Redux Toolkit", "RTK"),
  junit: mark("JUnit / Mockito", "Test"),
  swagger: mark("Swagger / OpenAPI", "API"),
};

export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode | any;
  github?: string;
  live?: string;
};

const projects: Project[] = [
  {
    id: "beamlab",
    category: "Engineering platform",
    title: "BeamLab",
    src: `${BASE_PATH}/beamlab/cover.jpg`,
    screenshots: ["cover.jpg"],
    skills: {
      frontend: [
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.tailwind,
        PROJECT_SKILLS.wasm,
      ],
      backend: [
        PROJECT_SKILLS.rust,
        PROJECT_SKILLS.node,
        PROJECT_SKILLS.express,
        PROJECT_SKILLS.fastapi,
        PROJECT_SKILLS.mongo,
        PROJECT_SKILLS.redis,
        PROJECT_SKILLS.docker,
        PROJECT_SKILLS.turborepo,
        PROJECT_SKILLS.azure,
      ],
    },
    // Private repo (commercial product) — intentionally no public source link.
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            A professional structural engineering platform — web modeling,
            multi-backend analysis and AI-assisted workflows.
          </TypographyP>
          <TypographyP className="font-mono">
            I am the CTO and co-founding engineer of BeamLab, built together with
            the NIT Bhopal club. It is a pnpm/Turbo monorepo with three execution
            lanes: a React + Vite frontend that can solve in the browser through
            WASM, a Node/Express gateway handling auth, billing and
            orchestration, and a Rust (Axum) solver for heavy models — plus a
            Python FastAPI service for generation, meshing and reporting.
          </TypographyP>
          <TypographyP className="font-mono">
            The source is private, so there is no public repository link.
          </TypographyP>

          <TypographyH3 className="my-4 mt-8">Architecture</TypographyH3>
          <p className="font-mono mb-2">
            Layered validation runs the whole way down: Zod schemas on the
            frontend, request contracts at the gateway, and typed Rust
            deserialization with physics guards plus proxy contract assertions.
            The solver assembles sparse-first for performance, and large models
            route between browser, worker and cloud compute automatically.
          </p>

          <TypographyH3 className="my-4 mt-8">Design codes &amp; delivery</TypographyH3>
          <p className="font-mono mb-2">
            IS / ACI / AISC / EC design-code engines back the analysis results,
            with report documents generated from the Python service. Production
            runs on a Docker topology with MongoDB and Redis, GitHub Actions
            CI/CD and Azure deployments.
          </p>
        </div>
      );
    },
  },
  {
    id: "scripturesync",
    category: "Knowledge graph + RAG",
    title: "ScriptureSync",
    src: `${BASE_PATH}/scripturesync/cover.jpg`,
    screenshots: ["cover.jpg"],
    skills: {
      frontend: [PROJECT_SKILLS.react, PROJECT_SKILLS.ts, PROJECT_SKILLS.tailwind],
      backend: [
        PROJECT_SKILLS.java,
        PROJECT_SKILLS.spring,
        PROJECT_SKILLS.neo4j,
        PROJECT_SKILLS.pinecone,
        PROJECT_SKILLS.langchain,
        PROJECT_SKILLS.fastapi,
        PROJECT_SKILLS.anthropic,
        PROJECT_SKILLS.docker,
      ],
    },
    github: "https://github.com/Divyanshutiwari102/scripturesync",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            15,000+ verses across four scriptures, connected through a knowledge
            graph and a semantic RAG pipeline.
          </TypographyP>
          <TypographyP className="font-mono">
            A cloud-native, polyglot microservice platform: a Java 21 / Spring
            Boot 3 gateway fronts a Python FastAPI AI service and a React client.
            A Neo4j knowledge graph links themes across scriptures using NLP
            topic modeling, while retrieval runs over four Pinecone namespaces
            for low-latency vector search at scale.
          </TypographyP>
          <ProjectsLinks repo={this.github} />

          <TypographyH3 className="my-4 mt-8">Retrieval pipeline</TypographyH3>
          <p className="font-mono mb-2">
            LangChain orchestrates embedding, retrieval and Claude-backed
            synthesis, with the graph supplying cross-tradition context that pure
            vector search misses — so an answer can cite parallel passages rather
            than one isolated verse.
          </p>
        </div>
      );
    },
  },
  {
    id: "rag",
    category: "Distributed retrieval",
    title: "Adaptive RAG",
    src: `${BASE_PATH}/rag/cover.jpg`,
    screenshots: ["cover.jpg"],
    skills: {
      frontend: [PROJECT_SKILLS.react, PROJECT_SKILLS.tailwind],
      backend: [
        PROJECT_SKILLS.java,
        PROJECT_SKILLS.spring,
        PROJECT_SKILLS.pgvector,
        PROJECT_SKILLS.postgres,
        PROJECT_SKILLS.redis,
        PROJECT_SKILLS.aws,
        PROJECT_SKILLS.docker,
        PROJECT_SKILLS.actions,
      ],
    },
    github: "https://github.com/Divyanshutiwari102/Adaptive-rag",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            A distributed document retrieval backend that picks its own strategy
            per query.
          </TypographyP>
          <TypographyP className="font-mono">
            Three routing strategies — vector search, keyword search and direct
            inference — run over a 10K+ document corpus. pgvector HNSW indexing
            (m=16, ef=64) replaced the original O(n) cosine scan, and a Redis
            caching layer cut repeated query latency by 40%.
          </TypographyP>
          <ProjectsLinks repo={this.github} />

          <TypographyH3 className="my-4 mt-8">Operations</TypographyH3>
          <p className="font-mono mb-2">
            Deployed on AWS EC2 with Docker and automated GitHub Actions CI/CD,
            with centralized exception handling and consistent response
            contracts across the service boundary.
          </p>
        </div>
      );
    },
  },
  {
    id: "traffic",
    category: "Computer vision",
    title: "AI Traffic Management",
    src: `${BASE_PATH}/traffic/cover.jpg`,
    screenshots: ["cover.jpg"],
    skills: {
      frontend: [PROJECT_SKILLS.python, PROJECT_SKILLS.opencv],
      backend: [
        PROJECT_SKILLS.yolo,
        PROJECT_SKILLS.pytorch,
        PROJECT_SKILLS.python,
      ],
    },
    github: "https://github.com/Divyanshutiwari102/AI-Based-Traffic-Management",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Signal timing that adapts to live lane congestion.
          </TypographyP>
          <TypographyP className="font-mono">
            A fine-tuned YOLOv8n detector on a 4-class labeled dataset reaches
            91.4% precision and 0.912 mAP@0.5. Class-weighted density scoring
            using HCM equivalency factors feeds an adaptive controller that
            improved throughput 38% and cut wait time 51% in simulation.
          </TypographyP>
          <ProjectsLinks repo={this.github} />

          <TypographyH3 className="my-4 mt-8">Evaluation</TypographyH3>
          <p className="font-mono mb-2">
            An automated quality evaluation framework scores 1,200+ detections so
            model regressions surface before they reach the control logic.
          </p>
        </div>
      );
    },
  },
  {
    id: "netwatch",
    category: "Systems / networking",
    title: "NetWatch DPI",
    src: `${BASE_PATH}/netwatch/cover.jpg`,
    screenshots: ["cover.jpg"],
    skills: {
      frontend: [PROJECT_SKILLS.next, PROJECT_SKILLS.ts, PROJECT_SKILLS.websocket],
      backend: [PROJECT_SKILLS.java, PROJECT_SKILLS.pcap, PROJECT_SKILLS.docker],
    },
    github: "https://github.com/Divyanshutiwari102/netwatch-dpi-system",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Real-time deep packet inspection with a live streaming dashboard.
          </TypographyP>
          <TypographyP className="font-mono">
            A concurrent packet processing pipeline in Java parses TLS SNI
            without decryption, and pushes per-flow metrics to a Next.js
            dashboard over WebSocket as traffic moves.
          </TypographyP>
          <ProjectsLinks repo={this.github} />
        </div>
      );
    },
  },
  {
    id: "taskmanager",
    category: "Backend service",
    title: "TaskManager",
    src: `${BASE_PATH}/taskmanager/cover.jpg`,
    screenshots: ["cover.jpg"],
    skills: {
      frontend: [PROJECT_SKILLS.react, PROJECT_SKILLS.tailwind],
      backend: [
        PROJECT_SKILLS.java,
        PROJECT_SKILLS.spring,
        PROJECT_SKILLS.springSecurity,
        PROJECT_SKILLS.jpa,
        PROJECT_SKILLS.postgres,
        PROJECT_SKILLS.swagger,
        PROJECT_SKILLS.junit,
      ],
    },
    github: "https://github.com/Divyanshutiwari102/TaskManager",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Task and workflow service with authenticated multi-user boards.
          </TypographyP>
          <TypographyP className="font-mono">
            A Spring Boot REST API with a layered service architecture,
            role-based access control and validated request payloads, paired with
            a React client that applies optimistic updates.
          </TypographyP>
          <ProjectsLinks repo={this.github} />
        </div>
      );
    },
  },
  {
    id: "nexova",
    category: "E-commerce",
    title: "Nexova",
    src: `${BASE_PATH}/nexova/cover.jpg`,
    screenshots: ["cover.jpg"],
    skills: {
      frontend: [
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.redux,
        PROJECT_SKILLS.js,
        PROJECT_SKILLS.tailwind,
      ],
      backend: [PROJECT_SKILLS.vercel],
    },
    github: "https://github.com/Divyanshutiwari102/Nexova",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            A shopping experience with catalog, cart state and checkout flow.
          </TypographyP>
          <TypographyP className="font-mono">
            Persistent cart state with Redux Toolkit, product filtering and
            search over a responsive catalog grid, deployed with optimized asset
            delivery.
          </TypographyP>
          <ProjectsLinks repo={this.github} />
        </div>
      );
    },
  },
  {
    id: "connection",
    category: "Full stack",
    title: "Connection Bano",
    src: `${BASE_PATH}/connection/cover.jpg`,
    screenshots: ["cover.jpg"],
    skills: {
      frontend: [PROJECT_SKILLS.next, PROJECT_SKILLS.ts, PROJECT_SKILLS.tailwind],
      backend: [PROJECT_SKILLS.postgres, PROJECT_SKILLS.node],
    },
    github: "https://github.com/Divyanshutiwari102/Connection-Bano",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            A networking platform for discovering and connecting with peers.
          </TypographyP>
          <TypographyP className="font-mono">
            TypeScript end-to-end with typed API contracts, profile discovery,
            connection requests and an activity feed — built on a
            component-driven UI with server-side data loading.
          </TypographyP>
          <ProjectsLinks repo={this.github} />
        </div>
      );
    },
  },
];
export default projects;
