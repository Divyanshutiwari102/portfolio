export const profile = {
  name: "Divyanshu Tiwari",
  first: "Divyanshu",
  last: "Tiwari",
  role: "Backend-focused Full Stack Developer",
  location: "Greater Noida, India",
  email: "divyanshutiwari337@gmail.com",
  phone: "+91-8103361906",
  github: "https://github.com/Divyanshutiwari102",
  githubHandle: "Divyanshutiwari102",
  linkedin: "https://www.linkedin.com/in/divyanshu-tiwari-42b156289/",
  leetcode: "https://leetcode.com/u/divyanshutiwari337",
  summary:
    "I build systems designed to scale, perform, and hold up under real-world conditions — production-grade APIs, distributed backend services, and intelligent pipelines powered by modern AI.",
  bio: [
    "I've shipped 15+ production RESTful APIs on AWS EC2 with Spring Boot serving 10K+ monthly requests, and built cloud-native retrieval platforms with pgvector HNSW indexing, Redis caching and automated CI/CD.",
    "I prioritize reliability and correctness — centralized exception handling, consistent response contracts, indexing strategies, and thorough unit plus integration testing before anything reaches production.",
    "Outside of work I've solved 300+ LeetCode problems across data structures, algorithms and system design. Currently exploring knowledge graphs, polyglot microservices and AI/RAG systems at scale.",
  ],

};

export const facts = [
  { label: "Location", value: "Greater Noida, UP" },
  { label: "Education", value: "IILM University" },
  { label: "CGPA", value: "8.8 / 10" },
  { label: "Graduating", value: "Aug 2027" },
];

export const skillGroups = [
  {
    title: "Backend",
    items: [
      "Java (Primary)",
      "Spring Boot",
      "Spring Security",
      "Spring Data JPA",
      "RESTful APIs",
      "Microservices",
      "JWT",
      "RBAC",
    ],
  },
  {
    title: "AI Engineering — Agentic & Gen AI",
    items: [
      "LangChain",
      "LangGraph",
      "Agentic Workflows",
      "RAG Pipelines",
      "Vector Embeddings",
      "LLM Orchestration",
      "Prompt Engineering",
      "Hugging Face",
      "OpenAI / Gemini APIs",
      "Model Context Protocol",
    ],
  },
  {
    title: "Data & Messaging",
    items: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Neo4j",
      "pgvector",
      "Pinecone",
      "Redis",
      "Kafka",
    ],
  },
  {
    title: "Tools, Cloud & DevOps",
    items: [
      "Docker",
      "Kubernetes",
      "Prometheus",
      "Grafana",
      "Swagger / OpenAPI",
      "Linux",
      "AWS EC2",
      "AWS S3",
      "GitHub Actions",
      "CI/CD Pipelines",
      "Maven",
      "Git",
      "JIRA",
      "Slack",
    ],
  },
  {
    title: "Frontend",
    items: [
      "React.js",
      "Redux Toolkit",
      "Tailwind CSS",
      "TypeScript",
      "Framer Motion",
    ],
  },
  {
    title: "Testing & Observability",
    items: ["JUnit", "Mockito", "Postman", "Spring Actuator", "Load Testing"],
  },
];


export const experience = [
  {
    role: "CTO & Co-founding Engineer",
    company: "BeamLab — structural engineering platform (with the NIT Bhopal club)",
    period: "Present · Remote",
    points: [
      "Co-founding engineer and CTO of BeamLab, a professional structural engineering platform with web-based modeling, multi-backend analysis and AI-assisted workflows.",
      "Own the multi-runtime architecture: React + Vite frontend, Node/Express gateway for auth, billing and orchestration, Rust (Axum) high-performance solver and a Python FastAPI generation/validation service.",
      "Designed the layered validation strategy — frontend Zod schemas, gateway request contracts, Rust typed deserialization with physics guards and proxy contract assertions.",
      "Built the WASM solver path so large models route between browser, worker and cloud compute, with sparse-first assembly for performance.",
      "Run the production pipeline: pnpm/Turbo monorepo, Docker topology with MongoDB and Redis, GitHub Actions CI/CD and Azure deployments.",
    ],
    stack: [
      "React",
      "Rust / Axum",
      "Node / Express",
      "FastAPI",
      "WASM",
      "MongoDB",
      "Redis",
      "Azure",
    ],
  },
  {

    role: "Java Backend & Cloud Engineering Intern",
    company: "Code-B Solutions Pvt Ltd",
    period: "Mar 2026 – May 2026 · Mumbai (Remote)",
    points: [
      "Architected and deployed 15+ production-grade RESTful APIs on AWS EC2 with Spring Boot, serving 10K+ monthly requests using Domain-Driven Design for high availability and fault isolation.",
      "Established centralized exception handling, input validation and consistent response contracts, improving backend reliability by 30% across distributed service boundaries.",
      "Optimized PostgreSQL schemas with advanced indexing, cutting query latency by 45%; orchestrated Docker containerization and GitHub Actions CI/CD, reducing deployment cycle time 3×.",
      "Executed comprehensive unit and integration testing with cross-functional stakeholders, eliminating regression defects across production deployments.",
    ],
    stack: ["Spring Boot", "AWS EC2", "PostgreSQL", "Docker", "GitHub Actions"],
  },
  {
    role: "Software Developer Intern",
    company: "Bluestock Fintech",
    period: "May 2025 – Jul 2025 · Noida, UP",
    points: [
      "Designed and delivered 10+ production-grade RESTful APIs in Spring Boot, accelerating enterprise client integrations with documented response contracts and robust error handling.",
      "Processed and transformed 50K+ record datasets with Python and SQL, producing 2,500+ structured, labeled data features for downstream pipelines and BI workflows.",
      "Constructed 15+ reusable React.js components with Redux Toolkit, boosting frontend velocity by 40% and ensuring UI consistency across the enterprise product suite.",
    ],
    stack: ["Spring Boot", "Python", "SQL", "React", "Redux Toolkit"],
  },
];


export type Project = {
  title: string;
  tag: "AI" | "Backend" | "Systems" | "Full Stack";
  period: string;
  description: string;
  highlights: string[];
  stack: string[];
  repo?: string;
  privateRepo?: boolean;
};


export const projects: Project[] = [
  {
    title: "BeamLab — Structural Engineering Platform",
    tag: "Systems",
    period: "Present",
    description:
      "Multi-runtime engineering platform for structural modeling, analysis, design checks and reporting — built as a pnpm/Turbo monorepo.",
    highlights: [
      "Three execution lanes: browser WASM compute, Node gateway policy layer, Rust solver compute",
      "Rust Axum solver with sparse-first assembly plus IS/ACI/AISC/EC design-code engines",
      "Python FastAPI service for generation, meshing, AI workflows and report documents",
      "Docker topology with MongoDB + Redis, GitHub Actions CI/CD and Azure deployment",
    ],
    stack: ["Rust", "React", "Node", "FastAPI", "WASM", "MongoDB", "Redis"],
    privateRepo: true,
  },

  {

    title: "ScriptureSync — Cross-Religion Knowledge Graph",
    tag: "AI",
    period: "Jun 2026 – Present",
    description:
      "Cloud-native platform connecting 15,000+ verses across four scriptures through a Neo4j knowledge graph and a semantic RAG pipeline.",
    highlights: [
      "Neo4j knowledge graph with NLP topic modeling across four scriptures",
      "Semantic RAG pipeline: LangChain + Pinecone + Claude behind a Java 21 / Spring Boot 3 gateway",
      "Polyglot microservices — Spring Boot gateway, Python FastAPI AI service, React frontend",
      "Vector search across 4 Pinecone namespaces for low-latency retrieval at scale",
    ],
    stack: ["Java 21", "Spring Boot 3", "Neo4j", "Pinecone", "LangChain", "FastAPI"],
    repo: "https://github.com/Divyanshutiwari102/scripturesync",
  },
  {
    title: "Adaptive RAG — Distributed Document Retrieval",
    tag: "AI",
    period: "Mar 2026 – May 2026",
    description:
      "Cloud-native distributed retrieval backend with three intelligent routing strategies over a 10K+ document corpus.",
    highlights: [
      "Vector search, keyword search and direct inference routing strategies",
      "pgvector HNSW indexing (m=16, ef=64) replacing O(n) cosine scans",
      "Redis caching layer cutting repeated query latency by 40%",
      "Deployed on AWS EC2 + Docker with automated GitHub Actions CI/CD",
    ],
    stack: ["Spring Boot", "pgvector", "PostgreSQL", "Redis", "AWS EC2", "Docker"],
    repo: "https://github.com/Divyanshutiwari102/Adaptive-rag",
  },
  {
    title: "AI-Based Traffic Management System",
    tag: "AI",
    period: "Jan 2026 – Mar 2026",
    description:
      "Computer-vision system that adapts signal timing to live lane congestion using a fine-tuned YOLOv8 detector.",
    highlights: [
      "Fine-tuned YOLOv8n on a 4-class labeled dataset — 91.4% precision, 0.912 mAP@0.5",
      "Automated quality evaluation framework scoring 1,200+ detections",
      "Class-weighted density scoring using HCM equivalency factors",
      "Adaptive signal control improving throughput 38% and cutting wait time 51%",
    ],
    stack: ["Python", "YOLOv8", "OpenCV", "PyTorch", "Matplotlib"],
    repo: "https://github.com/Divyanshutiwari102/AI-Based-Traffic-Management",
  },
  {
    title: "NetWatch — Deep Packet Inspection",
    tag: "Systems",
    period: "2026",
    description:
      "Real-time packet inspection engine with a live streaming dashboard.",
    highlights: [
      "TLS SNI parsing without decryption",
      "Concurrent packet processing pipeline in Java",
      "Live WebSocket dashboard with per-flow metrics",
    ],
    stack: ["Java", "Pcap4J", "Next.js", "WebSocket"],
    repo: "https://github.com/Divyanshutiwari102/netwatch-dpi-system",
  },

  {
    title: "Nexova — E-Commerce Platform",
    tag: "Full Stack",
    period: "2025",
    description:
      "Online shopping cart with catalog, cart state and checkout flow.",
    highlights: [
      "Persistent cart with Redux Toolkit",
      "Product filtering, search and responsive catalog grid",
      "Deployed on Vercel with optimized asset delivery",
    ],
    stack: ["React", "Redux Toolkit", "JavaScript", "Tailwind CSS"],
    repo: "https://github.com/Divyanshutiwari102/Nexova",
  },
  {
    title: "TaskManager",
    tag: "Backend",
    period: "2025",
    description:
      "Task and workflow service with authenticated multi-user boards.",
    highlights: [
      "Spring Boot REST API with layered service architecture",
      "Role-based access control and validated request payloads",
      "React client with optimistic updates",
    ],
    stack: ["Java", "Spring Boot", "React", "PostgreSQL"],
    repo: "https://github.com/Divyanshutiwari102/TaskManager",
  },
  {
    title: "Connection Bano",
    tag: "Full Stack",
    period: "2025",
    description:
      "Networking platform for discovering and connecting with peers.",
    highlights: [
      "TypeScript end-to-end with typed API contracts",
      "Profile discovery, connection requests and activity feed",
      "Component-driven UI with server-side data loading",
    ],
    stack: ["TypeScript", "Next.js", "PostgreSQL", "Tailwind CSS"],
    repo: "https://github.com/Divyanshutiwari102/Connection-Bano",
  },
];

export const recognition = [
  {
    index: "01",
    title: "Best Scalable Website Design",
    subtitle: "Winner — Codebyte 2023",
    detail: "Awarded for scalable system and interface design.",
  },
  {
    index: "02",
    title: "“Cook the Code” Hackathon",
    subtitle: "Finalist",
    detail: "Selected among final teams for end-to-end delivery.",
  },
  {
    index: "03",
    title: "Smart India Hackathon",
    subtitle: "Finalist — SIH",
    detail: "National-level finalist team at Smart India Hackathon.",
  },
  {
    index: "04",
    title: "300+ LeetCode Problems",
    subtitle: "DSA & System Design",
    detail: "Data structures, algorithms, OOP and system design.",
    href: profile.leetcode,
  },
];


export const education = {
  degree: "B.Tech in Computer Science & Engineering",
  school: "IILM University",
  period: "2023 – 2027",
  detail: "CGPA 8.8",
};

export const leetcode = {
  handle: "divyanshutiwari337",
  url: profile.leetcode,
  blurb:
    "Consistent problem solving across data structures, algorithms and system design — the habit behind every backend decision I make.",
  stats: [
    { label: "Problems solved", value: "300+" },
    { label: "Core topics", value: "DSA · OOP · SD" },
    { label: "Cadence", value: "Daily practice" },
  ],
  topics: [
    "Arrays & Strings",
    "Hashing",
    "Two Pointers",
    "Binary Search",
    "Linked Lists",
    "Trees & BST",
    "Graphs & BFS/DFS",
    "Dynamic Programming",
    "Heaps & Greedy",
    "Backtracking",
    "System Design",
  ],
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "LeetCode", href: "#leetcode" },
  { label: "Contact", href: "#contact" },
];

