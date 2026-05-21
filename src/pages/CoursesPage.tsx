import { GlassCard } from "../components/GlassCard";
import { SectionHeading } from "../components/SectionHeading";
import { useAppContext } from "../context/AppContext";

export function CoursesPage() {
  const { catalog, state, selectTrack, toggleStudyPlanLesson } = useAppContext();
  const selectedTrack = catalog.tracks.find((track) => track.id === state.selectedTrackId);

  return (
    <section>
      <SectionHeading
        eyebrow="Courses"
        title="Structured learning tracks for practical marketers"
        subtitle="Choose a role path, follow recommended courses, and build a study plan that turns broad interest into focused progress."
      />
      <div className="mb-8 grid gap-5 lg:grid-cols-3">
        {catalog.tracks.map((track) => (
          <GlassCard key={track.id} className={state.selectedTrackId === track.id ? "border-cyan-300/30" : ""}>
            <h3 className="text-xl font-semibold text-white">{track.title}</h3>
            <p className="mt-3 text-slate-300">{track.summary}</p>
            <p className="mt-3 text-sm text-slate-400">Target role: {track.targetRole}</p>
            <button onClick={() => selectTrack(track.id)} className="mt-5 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-cyan-100">
              {state.selectedTrackId === track.id ? "Selected Path" : "Choose Path"}
            </button>
          </GlassCard>
        ))}
      </div>
      {selectedTrack && (
        <GlassCard className="mb-8">
          <h3 className="text-xl font-semibold text-white">Current Personalized Path</h3>
          <p className="mt-3 text-slate-300">{selectedTrack.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {selectedTrack.recommendedCourseIds.map((id) => {
              const course = catalog.courses.find((item) => item.id === id);
              return course ? (
                <span key={id} className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-sm text-cyan-100">
                  {course.title}
                </span>
              ) : null;
            })}
          </div>
        </GlassCard>
      )}
      <div className="grid gap-5 lg:grid-cols-3">
        {catalog.courses.map((course) => (
          <GlassCard key={course.id}>
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xl font-semibold text-white">{course.title}</h3>
              <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-cyan-200">{course.level}</span>
            </div>
            <p className="mt-4 text-slate-300">{course.summary}</p>
            <p className="mt-4 text-sm text-slate-400">Duration: {course.duration}</p>
            <div className="mt-5">
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Outcomes</p>
              <ul className="mt-3 space-y-2 text-slate-200">
                {course.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            </div>
            <div className="mt-5">
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Lessons</p>
              <div className="mt-3 space-y-2">
                {course.lessons.map((lessonId) => {
                  const lesson = catalog.lessons.find((item) => item.id === lessonId);
                  if (!lesson) return null;
                  return (
                    <div key={lessonId} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-950/40 p-3">
                      <span className="text-sm text-slate-200">{lesson.title}</span>
                      <button onClick={() => toggleStudyPlanLesson(lessonId)} className="rounded-full border border-white/10 px-3 py-1 text-xs text-cyan-100">
                        {state.studyPlan.lessonIds.includes(lessonId) ? "Planned" : "Add to Plan"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
