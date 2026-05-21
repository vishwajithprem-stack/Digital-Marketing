import { GlassCard } from "../components/GlassCard";
import { SectionHeading } from "../components/SectionHeading";
import { useAppContext } from "../context/AppContext";

export function CertificatesPage() {
  const { catalog, state, createCertificate, updateCertificationPrep, updateExternalCertificate, user } = useAppContext();
  const prepChecklist = ["Review core lessons", "Complete quiz practice", "Revisit flashcards", "Finish certification worksheet"];

  return (
    <section>
      <SectionHeading
        eyebrow="Certificates"
        title="Generate local certificates and prepare for outside credentials"
        subtitle="Each course supports a local PDF certificate plus free external certification paths with checklist-based prep tracking."
      />
      {!user && (
        <GlassCard className="mb-6">
          <p className="text-slate-300">Create or log into a local demo account to personalize certificates with your name.</p>
        </GlassCard>
      )}
      <GlassCard className="mb-6">
        <p className="text-slate-300">
          This directory stays free-only. Certification prep mode helps learners review lessons, flashcards, quiz practice, and worksheets before attempting the external path.
        </p>
      </GlassCard>
      <div className="grid gap-5 lg:grid-cols-3">
        {catalog.courses.map((course) => {
          const relatedPaths = catalog.certificationPaths.filter((path) => path.courseId === course.id);
          return (
            <GlassCard key={course.id}>
              <h3 className="text-xl font-semibold text-white">{course.title}</h3>
              <p className="mt-3 text-slate-300">{course.summary}</p>
              <button
                onClick={() => createCertificate(course.title)}
                disabled={!user}
                className="mt-6 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-5 py-2 font-medium text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Generate Local PDF Certificate
              </button>
              <div className="mt-6 space-y-4">
                <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">External Certification Paths</p>
                {relatedPaths.map((path) => {
                  const progress = state.externalCertificates.find((item) => item.pathId === path.id);
                  const prep = state.certificationPrep.find((entry) => entry.pathId === path.id);
                  const readiness = Math.round(
                    (prepChecklist.filter((item) => prep?.checklist[item]).length / prepChecklist.length) * 100,
                  );
                  return (
                    <div key={path.id} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <h4 className="text-lg font-semibold text-white">{path.title}</h4>
                        <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100">
                          {path.provider} • {path.cost}
                        </span>
                      </div>
                      <p className="mt-3 text-slate-300">{path.summary}</p>
                      <p className="mt-3 text-sm text-slate-400">Readiness: {readiness}%</p>
                      <div className="mt-4 flex flex-wrap gap-3">
                        <a
                          href={path.url}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full border border-white/10 px-4 py-2 text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
                        >
                          Open Official Path
                        </a>
                        <button
                          onClick={() => updateExternalCertificate(path.id, "started")}
                          disabled={!user}
                          className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-cyan-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Mark Started
                        </button>
                        <button
                          onClick={() => updateExternalCertificate(path.id, "earned")}
                          disabled={!user}
                          className="rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-2 text-violet-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Mark Earned
                        </button>
                      </div>
                      {progress && (
                        <p className="mt-3 text-sm text-slate-400">
                          Status: {progress.status}
                          {progress.completionDate ? ` • ${progress.completionDate}` : ""}
                        </p>
                      )}
                      <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                        <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Certification Prep Mode</p>
                        <div className="mt-3 space-y-2">
                          {prepChecklist.map((item) => {
                            const checked = prep?.checklist[item] || false;
                            return (
                              <button
                                key={item}
                                onClick={() => updateCertificationPrep(path.id, item)}
                                className={`block w-full rounded-2xl border px-3 py-2 text-left text-sm ${
                                  checked ? "border-cyan-300 bg-cyan-400/10 text-cyan-100" : "border-white/10 bg-slate-950/40 text-slate-200"
                                }`}
                              >
                                {checked ? "Done" : "Pending"} • {item}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </GlassCard>
          );
        })}
      </div>
      <div className="mt-8 space-y-4">
        {state.certificates.map((certificate) => (
          <GlassCard key={certificate.id}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-white">{certificate.courseName}</h3>
                <p className="mt-1 text-slate-300">{certificate.studentName} • {certificate.completionDate}</p>
              </div>
              <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-sm text-cyan-100">{certificate.id}</span>
            </div>
          </GlassCard>
        ))}
      </div>
      <div className="mt-8 space-y-4">
        {state.externalCertificates.length > 0 && (
          <>
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Tracked External Certifications</p>
            {state.externalCertificates.map((record) => {
              const path = catalog.certificationPaths.find((item) => item.id === record.pathId);
              if (!path) return null;
              return (
                <GlassCard key={record.pathId}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{path.title}</h3>
                      <p className="mt-1 text-slate-300">{path.provider} • {record.status}</p>
                    </div>
                    {record.completionDate && (
                      <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-sm text-cyan-100">
                        {record.completionDate}
                      </span>
                    )}
                  </div>
                </GlassCard>
              );
            })}
          </>
        )}
      </div>
    </section>
  );
}
