import { useState } from "react";
import { GlassCard } from "../components/GlassCard";
import { SectionHeading } from "../components/SectionHeading";
import { useAppContext } from "../context/AppContext";

export function RevisionPage() {
  const { catalog, state, toggleFlashcardComplete, saveCaseStudyResponse } = useAppContext();
  const [responses, setResponses] = useState<Record<string, string>>({});

  return (
    <section className="space-y-10">
      <SectionHeading
        eyebrow="Revision"
        title="Flashcards, case studies, and review practice"
        subtitle="Strengthen recall with quick revision cards, then apply the ideas through mini scenarios that mirror real marketing decisions."
      />

      <div>
        <h3 className="mb-4 text-2xl font-semibold text-white">Flashcards</h3>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {catalog.flashcards.map((card) => (
            <GlassCard key={card.id}>
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">{card.category}</p>
              <h4 className="mt-3 text-lg font-semibold text-white">{card.front}</h4>
              <p className="mt-3 text-slate-300">{card.back}</p>
              <button
                onClick={() => toggleFlashcardComplete(card.id)}
                className="mt-5 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-cyan-100"
              >
                {state.completedFlashcards.includes(card.id) ? "Mark Not Reviewed" : "Mark Reviewed"}
              </button>
            </GlassCard>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-2xl font-semibold text-white">Mini Case Studies</h3>
        <div className="space-y-5">
          {catalog.caseStudies.map((study) => {
            const existing = state.caseStudyProgress.find((entry) => entry.caseStudyId === study.id);
            return (
              <GlassCard key={study.id}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h4 className="text-xl font-semibold text-white">{study.title}</h4>
                  <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-cyan-200">{study.category}</span>
                </div>
                <p className="mt-3 text-slate-300">{study.scenario}</p>
                <p className="mt-3 text-slate-200">{study.prompt}</p>
                <textarea
                  value={responses[study.id] ?? existing?.response ?? ""}
                  onChange={(event) => setResponses((prev) => ({ ...prev, [study.id]: event.target.value }))}
                  className="mt-4 min-h-32 w-full rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-slate-100 outline-none"
                  placeholder="Write how you would approach this situation..."
                />
                <button
                  onClick={() => saveCaseStudyResponse(study.id, responses[study.id] ?? existing?.response ?? "")}
                  className="mt-4 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-5 py-2 font-medium text-slate-950"
                >
                  Save Response
                </button>
                <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Recommended Review</p>
                  <ul className="mt-3 space-y-2 text-slate-200">
                    {study.recommendedResponse.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
