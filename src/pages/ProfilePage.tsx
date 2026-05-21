import { useState } from "react";
import { GlassCard } from "../components/GlassCard";
import { SectionHeading } from "../components/SectionHeading";
import { useAppContext } from "../context/AppContext";

export function ProfilePage() {
  const { user, updateProfile, state, catalog, updateStudyPlan, updateAccessibility, updateReminderSettings } = useAppContext();
  const [bio, setBio] = useState(user?.bio ?? "");
  const [goal, setGoal] = useState(user?.goal ?? "");
  const [noteSearch, setNoteSearch] = useState("");
  const [reminderMessage, setReminderMessage] = useState(state.reminderSettings.message);

  if (!user) {
    return (
      <GlassCard>
        <p className="text-slate-300">Log in with a local demo account to view and edit your profile, notes, bookmarks, and learning activity.</p>
      </GlassCard>
    );
  }

  const bookmarkedLessons = catalog.lessons.filter((lesson) => state.bookmarks.includes(lesson.id));
  const personalNotes = state.notes.filter((note) =>
    catalog.lessons.some((lesson) => lesson.id === note.lessonId) &&
    [note.content, note.folder, ...note.tags].join(" ").toLowerCase().includes(noteSearch.toLowerCase()),
  );

  return (
    <section>
      <SectionHeading
        eyebrow="Profile"
        title="Manage your local learner profile"
        subtitle="Everything here is saved only in the browser on this device, including your role, notes, goals, study preferences, and learning activity."
      />
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <GlassCard>
          <h3 className="text-2xl font-semibold text-white">{user.name}</h3>
          <p className="mt-2 text-slate-400">{user.email} • {user.role}</p>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="mt-5 min-h-28 w-full rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-slate-100 outline-none" />
          <textarea value={goal} onChange={(e) => setGoal(e.target.value)} className="mt-4 min-h-24 w-full rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-slate-100 outline-none" />
          <button onClick={() => updateProfile({ bio, goal })} className="mt-4 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-5 py-2 font-medium text-slate-950">
            Save Profile
          </button>
          <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Study Plan</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <input type="number" value={state.studyPlan.weeklyGoal} onChange={(e) => updateStudyPlan({ weeklyGoal: Number(e.target.value) })} className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none" />
              <input type="number" value={state.studyPlan.sessionsPerWeek} onChange={(e) => updateStudyPlan({ sessionsPerWeek: Number(e.target.value) })} className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none" />
            </div>
          </div>
        </GlassCard>
        <div className="space-y-6">
          <GlassCard>
            <h3 className="text-xl font-semibold text-white">Bookmarked Lessons</h3>
            <div className="mt-4 space-y-3">
              {bookmarkedLessons.length ? bookmarkedLessons.map((lesson) => (
                <div key={lesson.id} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-slate-200">
                  {lesson.title}
                </div>
              )) : <p className="text-slate-400">No bookmarks yet.</p>}
            </div>
            <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Bookmark Collections</p>
              <div className="mt-3 space-y-2 text-slate-200">
                {Object.entries(state.bookmarkCollections).map(([name, ids]) => (
                  <p key={name}>{name}: {ids.length} lesson(s)</p>
                ))}
              </div>
            </div>
          </GlassCard>
          <GlassCard>
            <h3 className="text-xl font-semibold text-white">Saved Notes</h3>
            <input value={noteSearch} onChange={(e) => setNoteSearch(e.target.value)} placeholder="Search notes, folders, or tags..." className="mt-4 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none" />
            <div className="mt-4 space-y-3">
              {personalNotes.length ? personalNotes.map((note) => (
                <div key={note.id} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-sm text-slate-400">{new Date(note.createdAt).toLocaleString()}</p>
                  <p className="mt-1 text-sm text-cyan-200">{note.folder} • {note.tags.join(", ") || "No tags"}</p>
                  <p className="mt-2 text-slate-200">{note.content}</p>
                </div>
              )) : <p className="text-slate-400">No notes saved yet.</p>}
            </div>
          </GlassCard>
          <GlassCard>
            <h3 className="text-xl font-semibold text-white">Accessibility and Habits</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              <button onClick={() => updateAccessibility({ readingMode: !state.accessibility.readingMode })} className="rounded-full border border-white/10 px-4 py-2 text-slate-200">Reading Mode: {state.accessibility.readingMode ? "On" : "Off"}</button>
              <button onClick={() => updateAccessibility({ highContrast: !state.accessibility.highContrast })} className="rounded-full border border-white/10 px-4 py-2 text-slate-200">High Contrast: {state.accessibility.highContrast ? "On" : "Off"}</button>
              <button onClick={() => updateAccessibility({ fontScale: state.accessibility.fontScale === "default" ? "large" : "default" })} className="rounded-full border border-white/10 px-4 py-2 text-slate-200">Font Size: {state.accessibility.fontScale}</button>
            </div>
            <textarea value={reminderMessage} onChange={(e) => setReminderMessage(e.target.value)} className="mt-4 min-h-24 w-full rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-slate-100 outline-none" />
            <button onClick={() => updateReminderSettings(state.reminderSettings.studyDays, reminderMessage, state.reminderSettings.enabled)} className="mt-4 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-cyan-100">
              Save Reminder Message
            </button>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
