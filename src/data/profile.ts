/** Single source of truth for identity + contact. From CV.pdf. */
export const profile = {
  name: "Dimos Andronoudis",
  role: "AI Engineer",
  roles: "AI Engineer · Forward Deployed Engineer",
  discipline: "Applied AI & Forward Deployed Systems",
  headline: "I turn business requirements into AI systems that ship.",
  summary:
    "AI Engineer with an M.Sc. in Natural Language Processing, building production generative AI systems, RAG pipelines, AI agents and backend services. I own delivery end to end — scoping, prototyping, testing, deployment and the iteration after.",
  location: "Athens, Greece (willing to relocate)",
  email: "dimos.andronoudis92@gmail.com",
  github: "https://github.com/DimosAndronoudis",
  githubHandle: "DimosAndronoudis",
  linkedin: "https://www.linkedin.com/in/dimos-andronoudis-161118282",
  cvPath: "/cv/dimos-andronoudis-cv.pdf",
  spotify:
    "https://open.spotify.com/artist/3BJ5J3Ek4m9c6wpotE0nHg?si=4mjtq_TxT5eb5byx7xfAJQ",
  languages: "Greek (native) · English (C2, Cambridge)",
} as const;

/**
 * The delivery loop from the CV summary. This is the page's structural motif:
 * every project card renders its own pipeline in the same visual language.
 */
export const deliveryLoop = [
  { step: "Scope", note: "Business requirement" },
  { step: "Prototype", note: "Fastest honest version" },
  { step: "Evaluate", note: "Grounding & quality" },
  { step: "Deploy", note: "API, auth, monitoring" },
  { step: "Iterate", note: "Latency, cost, accuracy" },
] as const;

export const navSections = [
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "research", label: "Research" },
  { id: "contact", label: "Contact" },
] as const;
