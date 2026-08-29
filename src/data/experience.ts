export interface ExperienceEntry {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  achievements: string[];
  stack?: string[];
  /** Roles before the pivot into AI — rendered compactly. */
  earlier?: boolean;
}

/** Newest first. From CV.pdf. */
export const experience: ExperienceEntry[] = [
  {
    id: "chemical-safety",
    role: "Junior Python Developer (AI)",
    organization: "Chemical Safety",
    period: "2025 — Present",
    location: "Athens, Greece",
    achievements: [
      "Own end-to-end delivery of Python and LLM solutions — from business requirements and technical scoping through implementation, testing, deployment support and continuous improvement — integrating SQL data, APIs and enterprise systems.",
      "Design agentic and multi-agent workflows with LangChain, LangGraph and MCP, orchestrating tools, APIs, enterprise data and multiple LLM providers.",
      "Architected a production FastAPI AI backend exposing RAG and LLM capabilities over REST and WebSocket APIs, with Qdrant retrieval, Redis-backed memory, authentication, multi-source ingestion and evaluation workflows.",
      "Improved reliability, latency and response quality through caching, retrieval-confidence logic, reranking, validation, monitoring, fact-checking and fallback strategies.",
      "Built document-intelligence, entity-resolution and browser-automation systems, including a production workflow combining deterministic services, search, scraping, agentic browsing, external integrations and parser-backed verification.",
    ],
    stack: ["Python", "FastAPI", "LangGraph", "MCP", "Qdrant", "Redis", "Docker"],
  },
  {
    id: "diagnostic-center",
    role: "Diagnosis Specialist",
    organization: "Diagnostic Center",
    period: "2022 — 2024",
    location: "Athens, Greece",
    achievements: [
      "Structured assessments, documentation, reporting and multidisciplinary collaboration.",
    ],
    earlier: true,
  },
  {
    id: "teaching",
    role: "Teacher",
    organization: "Schools",
    period: "2015 — 2022",
    location: "Athens, Greece",
    achievements: [
      "Teaching and adaptation of materials to varied needs — strengthening communication and requirements interpretation.",
    ],
    earlier: true,
  },
];

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  period: string;
}

export const education: EducationEntry[] = [
  {
    id: "msc-nlp",
    degree: "M.Sc. Natural Language Processing",
    institution: "National and Kapodistrian University of Athens",
    period: "2022 — 2025",
  },
  {
    id: "ma-internet-politics",
    degree: "M.A. Internet and Politics",
    institution: "National and Kapodistrian University of Athens",
    period: "2018 — 2020",
  },
  {
    id: "ba-policy",
    degree: "B.A. Educational and Social Policy",
    institution: "University of Macedonia",
    period: "2010 — 2015",
  },
];

export interface ResearchEntry {
  title: string;
  programme: string;
  period: string;
  summary: string;
  method: string[];
  links: { label: string; href: string }[];
}

export const research: ResearchEntry = {
  title: "Speech deepfake detection by knowledge distillation",
  programme: "M.Sc. thesis — Natural Language Processing, NKUA",
  period: "2025",
  summary:
    "A one-class teacher–student knowledge-distillation pipeline for speech deepfake detection: XLS-R teacher representations distilled into a lightweight student with an SVM inference path, so detection stays cheap at inference time.",
  method: [
    "XLS-R teacher representations",
    "One-class teacher–student distillation",
    "Lightweight student + SVM inference path",
  ],
  links: [],
};
