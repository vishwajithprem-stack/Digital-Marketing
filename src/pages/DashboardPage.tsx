import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { GlassCard } from "../components/GlassCard";
import { ProgressBar } from "../components/ProgressBar";
import { SectionHeading } from "../components/SectionHeading";
import { useAppContext } from "../context/AppContext";
import { calculateLevel, completionPercentage } from "../utils/gamification";

export function DashboardPage() {
  const { state, catalog, saveDailyCheckin } = useAppContext();
  const completedLessons = Object.values(state.progress).filter(Boolean).length;
  const completion = completionPercentage(completedLessons, catalog.lessons.length);
  const currentLevel = calculateLevel(state.xp);
  const chartData = [
    { name: "Completed", value: completedLessons },
    { name: "Remaining", value: Math.max(catalog.lessons.length - completedLessons, 0) },
  ];
  const scoreData = Object.entries(state.quizScores).map(([name, value]) => ({ name, value }));
  const today = new Date().toISOString().slice(0, 10);
  const selectedTrack = catalog.tracks.find((track) => track.id === state.selectedTrackId);
  const skillBuckets = ["SEO", "Google Ads", "Email Marketing", "Analytics", "Content Marketing", "Social Media"];
  const skillProgress = skillBuckets.map((skill) => {
    const related = catalog.lessons.filter((lesson) => lesson.tags.some((tag) => tag.toLowerCase().includes(skill.toLowerCase())));
    const complete = related.filter((lesson) => state.progress[lesson.id]).length;
    return { skill, value: related.length ? Math.round((complete / related.length) * 100) : 0 };
  });

  return (
    <section>
      <SectionHeading
        eyebrow="Dashboard"
        title="Track progress, mastery, habits, and readiness"
        subtitle="Your dashboard now connects completion, skill growth, streaks, check-ins, certification work, and capstone momentum."
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {[
          [`${completion}%`, "Progress Percentage"],
          [String(completedLessons), "Completed Lessons"],
          [String(state.xp), "XP Points"],
          [currentLevel, "Current Level"],
          [String(state.badges.length), "Badges"],
          [String(state.streak), "Streak"],
          [String(state.notes.length), "Saved Notes"],
          [String(state.certificates.length), "Certificates"],
        ].map(([value, label]) => (
          <GlassCard key={label}>
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">{label}</p>
            <p className="mt-4 text-3xl font-semibold text-white">{value}</p>
          </GlassCard>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <GlassCard>
          <h3 className="text-xl font-semibold text-white">Completion Overview</h3>
          <div className="mt-4">
            <ProgressBar value={completion} />
            <p className="mt-3 text-slate-300">You have completed {completedLessons} of {catalog.lessons.length} seeded lessons.</p>
          </div>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartData} dataKey="value" cx="50%" cy="50%" outerRadius={88} label>
                  <Cell fill="#56f0ff" />
                  <Cell fill="#312e81" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-xl font-semibold text-white">Quiz Score Snapshot</h3>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scoreData.length ? scoreData : [{ name: "No Scores Yet", value: 0 }]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="value" fill="#8b5cf6" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {state.badges.map((badge) => (
              <span key={badge} className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-sm text-cyan-100">
                {badge}
              </span>
            ))}
            {state.badges.length === 0 && <p className="text-slate-400">Finish lessons and quizzes to unlock badges.</p>}
          </div>
        </GlassCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <GlassCard>
          <h3 className="text-xl font-semibold text-white">Skill Mastery</h3>
          <div className="mt-5 space-y-4">
            {skillProgress.map((item) => (
              <div key={item.skill}>
                <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                  <span>{item.skill}</span>
                  <span>{item.value}%</span>
                </div>
                <ProgressBar value={item.value} />
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard>
          <h3 className="text-xl font-semibold text-white">Study Habits</h3>
          <p className="mt-3 text-slate-300">Weekly goal: {state.studyPlan.weeklyGoal} lessons • Sessions per week: {state.studyPlan.sessionsPerWeek}</p>
          <p className="mt-2 text-slate-300">Reminder days: {state.reminderSettings.studyDays.join(", ")}</p>
          {selectedTrack && <p className="mt-2 text-slate-300">Current path: {selectedTrack.title}</p>}
          <button
            onClick={saveDailyCheckin}
            disabled={state.dailyCheckins.includes(today)}
            className="mt-5 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-5 py-2 font-medium text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {state.dailyCheckins.includes(today) ? "Checked In Today" : "Daily Check-In"}
          </button>
          <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Capstone Status</p>
            <p className="mt-3 text-slate-200">{state.capstoneSubmitted ? "Capstone submitted successfully." : "Complete more lessons and submit your final capstone when ready."}</p>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
