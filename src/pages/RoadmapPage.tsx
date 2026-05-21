import { GlassCard } from "../components/GlassCard";
import { SectionHeading } from "../components/SectionHeading";
import { useAppContext } from "../context/AppContext";

export function RoadmapPage() {
  const { catalog } = useAppContext();

  return (
    <section>
      <SectionHeading
        eyebrow="Roadmap"
        title="Basic to Master digital marketing roadmap"
        subtitle="This guided sequence builds channel knowledge, execution confidence, and strategic decision-making from fundamentals to capstone."
      />
      <div className="space-y-5">
        {catalog.roadmap.map((step, index) => (
          <GlassCard key={step.id} className="relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-cyan-400 to-violet-500" />
            <div className="pl-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-cyan-200">Stage {index + 1}</span>
              </div>
              <p className="mt-3 text-slate-300">{step.focus}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {step.skills.map((skill) => (
                  <span key={skill} className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
