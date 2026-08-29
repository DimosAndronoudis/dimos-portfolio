import { Masthead } from "@/components/masthead/Masthead";
import { Console, type ConsolePanel } from "@/components/console/Console";
import { Projects } from "@/components/panels/Projects";
import { Experience } from "@/components/panels/Experience";
import { Education } from "@/components/panels/Education";
import { Research } from "@/components/panels/Research";
import { Cv } from "@/components/panels/Cv";
import { LinkIndex } from "@/components/index/LinkIndex";
import { ContactAside } from "@/components/index/ContactAside";
import { SceneBackdrop } from "@/components/scene/SceneBackdrop";

const panels: ConsolePanel[] = [
  { id: "projects", label: "Projects", panel: <Projects /> },
  { id: "experience", label: "Experience", panel: <Experience /> },
  { id: "education", label: "Education", panel: <Education /> },
  { id: "research", label: "Research", panel: <Research /> },
  { id: "cv", label: "CV", panel: <Cv /> },
];

export default function Home() {
  return (
    <>
      <SceneBackdrop />

      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-5 py-24 sm:px-8 sm:py-32">
        <Masthead />

        <div className="mt-16">
          <Console panels={panels} />
        </div>

        <div className="mt-28 grid gap-10 border-t border-line pt-8 md:grid-cols-[1fr_15rem]">
          <LinkIndex />
          <ContactAside />
        </div>
      </main>
    </>
  );
}
