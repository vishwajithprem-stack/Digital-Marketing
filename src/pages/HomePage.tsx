import { Hero } from "../components/Hero";
import { GlassCard } from "../components/GlassCard";
import { SectionHeading } from "../components/SectionHeading";
import { useAppContext } from "../context/AppContext";

export function HomePage() {
  const { catalog, state } = useAppContext();
  const selectedTrack = catalog.tracks.find((track) => track.id === state.selectedTrackId);

  return (
    <div className="space-y-14">
      <Hero />

      <section className="section-shell">
        <SectionHeading
          eyebrow="Academy Areas"
          title="Train across the channels that modern marketers actually use"
          subtitle="Every module is designed to move from principles into action with local tracking, revision tools, and reusable frameworks."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["Search and SEO", "Intent mapping, technical clarity, content architecture, and discoverability."],
            ["Paid Acquisition", "Campaign planning, spend allocation, ad relevance, and ROI thinking."],
            ["Lifecycle Growth", "Email strategy, funnels, retention loops, and performance reporting."],
            ["AI-Era Marketing", "AEO, GEO, prompt workflows, and practical automation concepts."],
          ].map(([title, summary]) => (
            <GlassCard key={title} className="transition duration-300 hover:-translate-y-1">
              <h3 className="font-display text-xl font-bold text-white">{title}</h3>
              <p className="mt-3 text-slate-300">{summary}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <GlassCard>
          <SectionHeading
            eyebrow="Featured Lessons"
            title="Meaningful content, not placeholders"
            subtitle="The lesson library blends practical strategy with watch-and-apply exercises, prerequisites, and revision support."
          />
          <div className="space-y-4">
            {catalog.lessons.slice(0, 4).map((lesson) => (
              <div key={lesson.id} className="metric-tile rounded-[1.35rem]">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-display text-lg font-bold text-white">{lesson.title}</h3>
                  <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-cyan-200">{lesson.duration}</span>
                </div>
                <p className="mt-2 text-slate-300">{lesson.summary}</p>
              </div>
            ))}
          </div>
        </GlassCard>
        <div className="grid gap-6">
          <GlassCard>
            <SectionHeading
              eyebrow="Why Offline"
              title="A complete static MVP keeps the learning loop simple"
              subtitle="Everything from practice to certificates works locally so learners can study without infrastructure friction."
            />
            <ul className="space-y-4 text-slate-300">
              <li>Local storage remembers your login, notes, bookmarks, progress, badges, and revision activity.</li>
              <li>No backend means no server bill, API rate limits, or vendor lock-in for the MVP stage.</li>
              <li>GitHub Pages deployment makes sharing simple for portfolios, demos, and internal concept validation.</li>
            </ul>
          </GlassCard>
          <GlassCard className="animate-glow-pulse">
            <p className="eyebrow-chip">Current Focus</p>
            <h3 className="mt-4 font-display text-2xl font-bold text-white">
              {selectedTrack ? selectedTrack.title : "Pick a role path to personalize the academy"}
            </h3>
            <p className="mt-3 text-slate-300">
              {selectedTrack
                ? selectedTrack.summary
                : "Choose a path on the Courses page to surface more relevant course and certification recommendations."}
            </p>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
