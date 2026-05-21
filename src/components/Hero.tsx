import { Link } from "react-router-dom";
import { GlassCard } from "./GlassCard";

export function Hero() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
      <div className="section-shell surface-grid relative overflow-hidden rounded-[2.25rem] p-8 md:p-12">
        <div className="pointer-events-none absolute right-[-5rem] top-[-3rem] h-48 w-48 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-4rem] left-[-3rem] h-44 w-44 rounded-full bg-violet-500/15 blur-3xl" />
        <p className="eyebrow-chip mb-5">Free Browser-Only Marketing Lab</p>
        <h1 className="display-title max-w-4xl text-4xl font-bold leading-[0.95] text-white md:text-6xl xl:text-7xl">
          Learn growth strategy in a <span className="headline-gradient">premium offline academy</span> designed for focused skill-building.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-mist/85">
          Study digital marketing foundations, build weekly momentum, revise smarter, and generate certificates without any backend, API key, or paid service.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/courses" className="primary-btn">
            Explore Courses
          </Link>
          <Link to="/certificates" className="secondary-btn">
            View Certificates
          </Link>
        </div>
        <div className="mt-8 grid max-w-3xl gap-4 sm:grid-cols-3">
          {[
            ["Role Paths", "Choose guided learning tracks by career goal"],
            ["Revision Mode", "Flashcards, case studies, and notes that stay local"],
            ["Certification Prep", "Track readiness across free official certificates"],
          ].map(([title, text]) => (
            <div key={title} className="rounded-[1.4rem] border border-white/10 bg-slate-950/35 p-4">
              <p className="font-display text-base font-bold text-white">{title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
            </div>
          ))}
        </div>
      </div>
      <GlassCard className="grid gap-5 self-stretch">
        <div>
          <p className="eyebrow-chip">What You Get</p>
          <ul className="mt-5 space-y-3 text-slate-200">
            <li>Offline roadmap from fundamentals to capstone strategy</li>
            <li>Interactive labs for SEO, ads, ROI, email, analytics, and funnel math</li>
            <li>Local demo auth, bookmarks, notes, blog content, and certification tracking</li>
            <li>Certificate generation with `jsPDF` and dashboard charts with `Recharts`</li>
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            ["12", "Roadmap Stages"],
            ["8", "Offline Labs"],
            ["100%", "Static Browser App"],
            ["0", "API Keys Needed"],
          ].map(([value, label]) => (
            <div key={label} className="metric-tile">
              <p className="font-display text-3xl font-bold text-white">{value}</p>
              <p className="mt-1 text-sm text-slate-400">{label}</p>
            </div>
          ))}
        </div>
        <div className="rounded-[1.5rem] border border-cyan-300/10 bg-gradient-to-br from-cyan-400/10 to-violet-500/10 p-5">
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-200">Learner Signal</p>
          <p className="mt-3 font-display text-2xl font-bold text-white">From roadmap to capstone in one local workspace.</p>
        </div>
      </GlassCard>
    </section>
  );
}
