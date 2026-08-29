export type ProjectCategory =
  | "rag"
  | "agents"
  | "finetune"
  | "speech"
  | "voice"
  | "narration"
  | "docs"
  | "product";

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: ProjectCategory;
  technologies: string[];
  githubUrl: string;
  demoUrl?: string;
  featured: boolean;
  highlights: string[];
  status?: "shipped" | "in-progress";
  /** True while the copy is still scaffold placeholder, not yours. */
  needsReview?: boolean;
}

/**
 * Each category renders its own pipeline strip, so the architecture of the
 * system is legible before anyone clicks through to the repo.
 */
export const pipelines: Record<ProjectCategory, string[]> = {
  rag: ["Docs", "Chunk", "Embed", "Retrieve", "Rerank", "LLM", "Answer"],
  agents: ["Goal", "Planner", "Tools", "API", "Result"],
  finetune: ["Base model", "Dataset", "LoRA / TRL", "Eval", "Adapter"],
  speech: ["Audio", "ASR", "Intent (LLM)", "Action"],
  voice: ["Reference clip", "Speaker embedding", "GLM-TTS", "Speech"],
  narration: ["Script", "Emotion classifier", "Voice profile", "TTS", "Narration"],
  docs: ["Paper", "Sections", "Claims", "Schema", "JSON"],
  product: ["Sources", "Ingest", "API", "UI"],
};

export const categoryLabels: Record<ProjectCategory, string> = {
  rag: "Retrieval",
  agents: "Agents",
  finetune: "Fine-tuning",
  speech: "Speech",
  voice: "Voice cloning",
  narration: "Narration",
  docs: "Document intelligence",
  product: "Product",
};

/** Adding a project = adding one object here. Nothing else changes. */
export const projects: Project[] = [
  {
    id: "gr-legal-rag",
    title: "GR-Legal-RAG",
    shortDescription:
      "High-precision retrieval over Greek legal documents, government gazettes and ministerial circulars.",
    fullDescription:
      "A RAG pipeline built for a domain where a plausible-sounding wrong answer is worse than no answer. The work sits in grounded retrieval and answer quality rather than in the generation step: how Greek legal text is chunked, what gets retrieved, and how confidently the system is allowed to answer.",
    category: "rag",
    technologies: ["Python", "RAG", "Embeddings", "Vector search", "LLM evaluation"],
    githubUrl: "https://github.com/DimosAndronoudis/GR-Legal-RAG",
    featured: true,
    status: "shipped",
    highlights: [
      "Domain corpus: gazettes, circulars and legal documents in Greek",
      "Focus on grounded retrieval — answers traceable to source",
      "Answer-quality evaluation rather than vibe-checking",
    ],
  },
  {
    id: "nanosupport",
    title: "NanoSupport",
    shortDescription:
      "A fine-tuning pipeline that turns 0.5B instruction models into concise customer-support agents.",
    fullDescription:
      "Most support bots are a 70B model behind an API and a hosting bill. NanoSupport goes the other way: a lightweight Unsloth + TRL pipeline that adapts 0.5B instruction models into focused support agents that run with minimal hardware overhead.",
    category: "finetune",
    technologies: ["Unsloth", "TRL", "Hugging Face", "PyTorch", "LoRA"],
    githubUrl: "https://github.com/DimosAndronoudis/NanoSupport",
    featured: true,
    status: "shipped",
    highlights: [
      "0.5B instruction models adapted for a narrow, well-defined job",
      "Minimal hardware overhead — trainable and servable cheaply",
      "Unsloth + TRL fine-tuning pipeline, reproducible end to end",
    ],
  },
  {
    id: "ai-voicecontrol",
    title: "AI-VoiceControl",
    shortDescription:
      "Low-latency voice control that turns speech into Spotify playback and library actions.",
    fullDescription:
      "Faster-Whisper for transcription, an LLM for intent reasoning, FastAPI holding it together. The engineering problem is latency: every stage between the microphone and the action has a budget, and the LLM step is the expensive one.",
    category: "speech",
    technologies: ["Faster-Whisper", "FastAPI", "LLM intent parsing", "Spotify API", "Python"],
    githubUrl: "https://github.com/DimosAndronoudis/AI-VoiceControl",
    featured: true,
    status: "shipped",
    highlights: [
      "Faster-Whisper transcription tuned for low latency",
      "LLM-based intent reasoning instead of brittle keyword matching",
      "FastAPI service driving the Spotify playback and library API",
    ],
  },
  {
    id: "ai-wav-hunter",
    title: "AI_WAV_Hunter",
    shortDescription:
      "An agent that takes a plain-English sample brief, browses Freesound itself, and downloads what matches.",
    fullDescription:
      "Ask for \"cinematic thunder\" or a \"vintage 808 kick\" and the agent navigates Freesound, extracts metadata and pulls the public previews — no manual browsing. A LangGraph agent drives Playwright through MCP, with a token budget to keep the run cheap.",
    category: "agents",
    technologies: ["Gemini 2.0", "LangGraph", "LangChain", "Playwright MCP", "FastAPI", "React"],
    githubUrl: "https://github.com/DimosAndronoudis/AI_WAV_Hunter",
    featured: true,
    highlights: [
      "Agentic browsing through Playwright MCP",
      "Streamed progress over server-sent events",
      "Token budgeting and defensive JSON parsing around the LLM",
    ],
  },
  {
    id: "meltemi",
    title: "Meltemi",
    shortDescription:
      "A live app showing weather and environmental conditions for beaches across Greece.",
    fullDescription:
      "A shipped consumer app rather than a demo: ingest environmental data sources, normalise them per beach, and answer the one question a person actually has before driving an hour to the coast.",
    category: "product",
    technologies: ["Python", "REST APIs", "Data ingestion"],
    githubUrl: "https://github.com/DimosAndronoudis/Meltemi",
    demoUrl: "https://www.meltemilive.com",
    featured: true,
    status: "shipped",
    highlights: [
      "Multi-source environmental data, normalised per location",
      "Shipped and live at meltemilive.com",
    ],
  },
  {
    id: "ai-paperlens",
    title: "AI-PaperLens",
    shortDescription:
      "Distils an academic paper into structured, machine-readable JSON — sections, figures and claims mapped to their evidence.",
    fullDescription:
      "A pipeline that reads a research paper and emits schema-validated JSON: seven standard sections, classified figures and tables, and research claims linked to supporting evidence with confidence ratings. It also pulls live GitHub metrics for the paper's repo, so a study and its code are read together.",
    category: "docs",
    technologies: ["Python", "Google Gemini", "GitHub API", "LangSmith", "JSON Schema"],
    githubUrl: "https://github.com/DimosAndronoudis/AI-PaperLens",
    featured: false,
    highlights: [
      "Seven-section extraction with figure and table classification",
      "Claims mapped to evidence with confidence ratings",
      "Every output validated against JSON Schema 2020-12",
    ],
  },
  {
    id: "myvoice-studio",
    title: "MyVoice-Studio",
    shortDescription:
      "Zero-shot voice cloning: register five to ten seconds of a voice, then synthesise expressive speech in it.",
    fullDescription:
      "A voice cloning toolkit and web UI built on GLM-TTS. No training run — a few seconds of reference audio produces a speaker embedding, and synthesis follows from there. Ships as both a CLI and a Gradio interface.",
    category: "voice",
    technologies: ["GLM-TTS", "PyTorch", "torchaudio", "Gradio", "CAM++"],
    githubUrl: "https://github.com/DimosAndronoudis/MyVoice-Studio",
    featured: false,
    highlights: [
      "Zero-shot cloning from 5–10 seconds of reference audio",
      "Speaker verification models for voice embeddings",
      "CLI and Gradio UI over the same core",
    ],
  },
  {
    id: "toneteller",
    title: "ToneTeller",
    shortDescription:
      "Emotion-aware narration — classifies each sentence, then voices it with a matching cloned voice profile.",
    fullDescription:
      "A script is split into sentences, each classified into one of six emotions, and each voiced with the cloned profile registered for that emotion. The segments concatenate into a narration that changes tone with the text instead of reading flat.",
    category: "narration",
    technologies: ["GLM-TTS", "DistilRoBERTa", "Hugging Face", "Gradio", "Python"],
    githubUrl: "https://github.com/DimosAndronoudis/ToneTeller",
    featured: false,
    highlights: [
      "Six-way emotion classification per sentence",
      "One cloned voice profile registered per emotion",
      "CLI and web UI over the same narration pipeline",
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);

export const liveProjects = projects.filter((p) => p.demoUrl);
