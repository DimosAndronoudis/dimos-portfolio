export interface SkillGroup {
  id: string;
  title: string;
  /** What you actually do with these — not a category name repeated. */
  caption: string;
  items: string[];
}

/** Groups and items taken from the CV, in the CV's own order. */
export const skillGroups: SkillGroup[] = [
  {
    id: "ai-llm",
    title: "AI & LLM Engineering",
    caption: "Getting models to answer from your data and act on your systems",
    items: [
      "Generative AI",
      "RAG",
      "AI agents",
      "LangChain",
      "LangGraph",
      "MCP",
      "Prompt & context engineering",
      "Tool calling",
      "Structured outputs",
      "Embeddings",
      "Fine-tuning",
      "Model evaluation",
    ],
  },
  {
    id: "backend",
    title: "Backend & Data",
    caption: "The service the model lives inside",
    items: [
      "Python",
      "SQL",
      "FastAPI",
      "REST APIs",
      "WebSockets",
      "Qdrant",
      "Redis",
      "API & database integration",
    ],
  },
  {
    id: "production",
    title: "Production AI",
    caption: "What keeps it running after the demo",
    items: [
      "Docker",
      "Kubernetes",
      "Jenkins CI/CD",
      "MLOps / LLMOps",
      "Testing",
      "Deployment",
      "Monitoring",
      "Caching",
      "Authentication",
      "Reliability & fallbacks",
    ],
  },
  {
    id: "ml",
    title: "Machine Learning",
    caption: "The layer under the API",
    items: ["PyTorch", "TensorFlow", "scikit-learn", "Hugging Face", "NLP", "Deep learning"],
  },
];
