import { useState } from "react";
import { GlassCard } from "../components/GlassCard";
import { SectionHeading } from "../components/SectionHeading";
import { useAppContext } from "../context/AppContext";

export function LessonsPage() {
  const { catalog, state, toggleLessonComplete, saveNote, toggleBookmark, saveBookmarkToCollection, toggleStudyPlanLesson } = useAppContext();
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [noteFolders, setNoteFolders] = useState<Record<string, string>>({});
  const [noteTags, setNoteTags] = useState<Record<string, string>>({});

  return (
    <section>
      <SectionHeading
        eyebrow="Lessons"
        title="Study, bookmark, and save notes locally"
        subtitle="Each lesson includes prerequisites, study-plan actions, revision shortcuts, and free YouTube or resource links for continued learning."
      />
      <div className="space-y-6">
        {catalog.lessons.map((lesson) => (
          <GlassCard key={lesson.id}>
            <div className={`grid gap-6 ${state.accessibility.readingMode ? "lg:grid-cols-1" : "lg:grid-cols-[1.2fr_0.8fr]"}`}>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-2xl font-semibold text-white">{lesson.title}</h3>
                  <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-cyan-200">{lesson.module}</span>
                  <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">{lesson.level}</span>
                </div>
                <p className="mt-4 text-slate-300">{lesson.summary}</p>
                <ul className="mt-4 space-y-3 text-slate-200">
                  {lesson.content.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {lesson.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-xs text-violet-200">
                      {tag}
                    </span>
                  ))}
                </div>
                {lesson.prerequisiteIds && lesson.prerequisiteIds.length > 0 && (
                  <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                    <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Prerequisites</p>
                    <ul className="mt-3 space-y-2 text-slate-200">
                      {lesson.prerequisiteIds.map((id) => {
                        const prerequisite = catalog.lessons.find((item) => item.id === id);
                        return <li key={id}>{prerequisite?.title ?? id} {state.progress[id] ? "Completed" : "Not complete yet"}</li>;
                      })}
                    </ul>
                  </div>
                )}
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => toggleLessonComplete(lesson.id)}
                    disabled={lesson.prerequisiteIds?.some((id) => !state.progress[id])}
                    className="rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-5 py-2 font-medium text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {state.progress[lesson.id] ? "Mark Incomplete" : "Mark Complete"}
                  </button>
                  <button onClick={() => toggleBookmark(lesson.id)} className="rounded-full border border-white/10 px-5 py-2 text-slate-200">
                    {state.bookmarks.includes(lesson.id) ? "Remove Bookmark" : "Bookmark Lesson"}
                  </button>
                  <button onClick={() => toggleStudyPlanLesson(lesson.id)} className="rounded-full border border-white/10 px-5 py-2 text-slate-200">
                    {state.studyPlan.lessonIds.includes(lesson.id) ? "Remove from Study Plan" : "Add to Study Plan"}
                  </button>
                  <button onClick={() => saveBookmarkToCollection("Revision", lesson.id)} className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-cyan-100">
                    Save to Revision
                  </button>
                </div>
                <div className="mt-6">
                  <div className="grid gap-3 md:grid-cols-2">
                    <input
                      value={noteFolders[lesson.id] || ""}
                      onChange={(event) => setNoteFolders((prev) => ({ ...prev, [lesson.id]: event.target.value }))}
                      placeholder="Note folder"
                      className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none"
                    />
                    <input
                      value={noteTags[lesson.id] || ""}
                      onChange={(event) => setNoteTags((prev) => ({ ...prev, [lesson.id]: event.target.value }))}
                      placeholder="Tags separated by commas"
                      className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none"
                    />
                  </div>
                  <textarea
                    value={drafts[lesson.id] || ""}
                    onChange={(event) => setDrafts((prev) => ({ ...prev, [lesson.id]: event.target.value }))}
                    placeholder="Add your local lesson note..."
                    className="mt-3 min-h-28 w-full rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-slate-100 outline-none placeholder:text-slate-500"
                  />
                  <button
                    onClick={() => {
                      const note = drafts[lesson.id]?.trim();
                      if (!note) return;
                      saveNote(
                        lesson.id,
                        note,
                        noteFolders[lesson.id]?.trim() || "General",
                        (noteTags[lesson.id] || "").split(",").map((item) => item.trim()).filter(Boolean),
                      );
                      setDrafts((prev) => ({ ...prev, [lesson.id]: "" }));
                    }}
                    className="mt-3 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-cyan-100"
                  >
                    Save Note
                  </button>
                </div>
              </div>
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/40">
                {lesson.videoUrl ? (
                  <div>
                    <iframe
                      className="min-h-[320px] w-full"
                      src={lesson.videoUrl}
                      title={lesson.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    <div className="border-t border-white/10 p-4">
                      <a
                        href={lesson.watchUrl ?? lesson.resourceUrl ?? "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-400/15"
                      >
                        Open lesson resource
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="flex min-h-[320px] flex-col justify-between p-6">
                    <div>
                      <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Lesson Resource</p>
                      <h4 className="mt-3 text-xl font-semibold text-white">{lesson.resourceTitle ?? "Open the lesson resource"}</h4>
                      <p className="mt-3 text-slate-300">
                        Some resources are direct guided articles instead of video so learners can keep making progress even when a YouTube embed is not the best format.
                      </p>
                    </div>
                    {lesson.resourceUrl && (
                      <a
                        href={lesson.resourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-6 inline-flex w-fit rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-5 py-3 font-medium text-slate-950"
                      >
                        Open Free Resource
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
