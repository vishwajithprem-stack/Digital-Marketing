import { Link } from "react-router-dom";
import { GlassCard } from "../components/GlassCard";

export function IntroPage() {
  return (
    <div className="min-h-screen bg-aura px-4 py-8 md:py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl items-center">
        <div className="grid w-full gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="section-shell relative overflow-hidden rounded-[2.25rem] p-8 md:p-12">
            <div className="pointer-events-none absolute right-[-4rem] top-[-3rem] h-40 w-40 rounded-full bg-cyan-400/15 blur-3xl" />
            <div className="pointer-events-none absolute bottom-[-4rem] left-[20%] h-40 w-40 rounded-full bg-violet-500/15 blur-3xl" />
            <p className="eyebrow-chip mb-4">Intro Experience</p>
            <h1 className="display-title max-w-4xl text-4xl font-bold leading-[0.95] text-white md:text-6xl xl:text-7xl">
              Welcome to <span className="headline-gradient">Digital Marketing Academy</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-mist/85">
              Step into a cinematic learning experience built for marketers who want to study SEO, ads, email, analytics, growth strategy, and certification readiness entirely in the browser.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                ["Learn", "Structured lessons, roadmap stages, blog content, and guided study flows."],
                ["Practice", "Offline labs, quizzes, case studies, and local progress tracking."],
                ["Grow", "Certificates, gamification, capstone work, and personalized study plans."],
              ].map(([title, text]) => (
                <div key={title} className="metric-tile rounded-[1.5rem]">
                  <h2 className="font-display text-lg font-bold text-white">{title}</h2>
                  <p className="mt-3 text-sm text-slate-300">{text}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/home" className="primary-btn">
                Enter Academy
              </Link>
              <Link to="/auth" className="secondary-btn">
                Demo Login
              </Link>
            </div>
          </section>

          <div className="grid gap-5">
            <GlassCard>
              <p className="eyebrow-chip">Inside The Academy</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[
                  ["12", "Roadmap stages"],
                  ["8", "Offline labs"],
                  ["6", "Revision flashcards"],
                  ["100%", "Browser powered"],
                ].map(([value, label]) => (
                  <div key={label} className="metric-tile">
                    <p className="font-display text-3xl font-bold text-white">{value}</p>
                    <p className="mt-1 text-sm text-slate-400">{label}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
            <GlassCard>
              <p className="eyebrow-chip">Why This MVP Matters</p>
              <ul className="mt-4 space-y-3 text-slate-300">
                <li>No API keys, no backend, no paid AI services, and no external database.</li>
                <li>Everything from certificates to study progress is stored locally in browser storage.</li>
                <li>The intro page creates a stronger first impression before learners enter the main workspace.</li>
              </ul>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
