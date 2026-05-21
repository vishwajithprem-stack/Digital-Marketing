import { GlassCard } from "../components/GlassCard";
import { ProgressBar } from "../components/ProgressBar";
import { SectionHeading } from "../components/SectionHeading";
import { useAppContext } from "../context/AppContext";

export function CapstonePage() {
  const { state, catalog, submitCapstone } = useAppContext();
  const completedLessons = Object.values(state.progress).filter(Boolean).length;
  const unlockPercent = Math.round((completedLessons / catalog.lessons.length) * 100);
  const unlocked = unlockPercent >= 60;

  return (
    <section>
      <SectionHeading
        eyebrow="Capstone"
        title="Final applied assessment"
        subtitle="The capstone combines strategy, channel thinking, KPI planning, and communication into one culminating challenge."
      />
      <GlassCard className="mb-6">
        <p className="text-slate-300">Unlock target: complete at least 60% of lessons. Current progress: {unlockPercent}%.</p>
        <div className="mt-4">
          <ProgressBar value={unlockPercent} />
        </div>
      </GlassCard>
      <GlassCard>
        <h3 className="text-2xl font-semibold text-white">Capstone Prompt</h3>
        <p className="mt-4 text-slate-300">
          Build a 90-day growth strategy for a fictional brand. Your plan should define audience, acquisition channels, content system, lifecycle follow-up, KPI dashboard, and certification-informed skill rationale.
        </p>
        <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/40 p-5">
          <ul className="space-y-3 text-slate-200">
            <li>Choose one learner goal path such as SEO Specialist, Performance Marketer, or Content Strategist.</li>
            <li>Define a multichannel plan using at least three tactics from the course library.</li>
            <li>List leading KPIs, lagging KPIs, and one reporting cadence.</li>
            <li>Explain how you would test and improve results over 90 days.</li>
          </ul>
        </div>
        <button
          onClick={submitCapstone}
          disabled={!unlocked || state.capstoneSubmitted}
          className="mt-6 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-6 py-3 font-medium text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {state.capstoneSubmitted ? "Capstone Submitted" : "Submit Capstone Completion"}
        </button>
      </GlassCard>
    </section>
  );
}
