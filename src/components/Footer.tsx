export function Footer() {
  return (
    <footer className="mt-20 px-4 pb-8">
      <div className="mx-auto grid max-w-7xl gap-6 rounded-[2rem] border border-white/10 bg-white/[0.04] px-6 py-8 shadow-neon md:grid-cols-[1.2fr_0.8fr] md:px-8">
        <div>
          <p className="display-title text-xl font-bold text-white">Digital Marketing Academy</p>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
            A browser-only learning platform built with free open-source tools for modern marketing education, revision, certification prep, and portfolio-ready practice.
          </p>
        </div>
        <div className="grid gap-2 text-sm text-slate-400">
          <p>Local authentication, study progress, notes, quiz scores, and certificates stay in your browser storage.</p>
          <p>No backend, no paid AI API, no database server, and no required payment service.</p>
        </div>
      </div>
    </footer>
  );
}
