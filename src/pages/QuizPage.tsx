import { useState } from "react";
import { GlassCard } from "../components/GlassCard";
import { SectionHeading } from "../components/SectionHeading";
import { useAppContext } from "../context/AppContext";

export function QuizPage() {
  const { catalog, submitQuizScore, state } = useAppContext();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState<number | null>(null);
  const [poolSize, setPoolSize] = useState(4);

  const activeQuiz = catalog.quiz.slice(0, poolSize);

  const submitQuiz = () => {
    const correct = activeQuiz.filter((question) => answers[question.id] === question.answer).length;
    const nextScore = Math.round((correct / activeQuiz.length) * 100);
    setScore(nextScore);
    submitQuizScore(`main-quiz-${poolSize}`, nextScore);
  };

  const weakAreas = score !== null ? activeQuiz.filter((question) => answers[question.id] !== question.answer).map((question) => question.category) : [];

  return (
    <section>
      <SectionHeading
        eyebrow="Quiz"
        title="Test your marketing fundamentals"
        subtitle="Use quick quiz sets, retry mode, topic feedback, and answer explanations to identify weak areas and revise intentionally."
      />
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <button onClick={() => setPoolSize(4)} className="rounded-full border border-white/10 px-4 py-2 text-slate-200">Quick 4</button>
        <button onClick={() => setPoolSize(6)} className="rounded-full border border-white/10 px-4 py-2 text-slate-200">Full 6</button>
        <button onClick={() => { setAnswers({}); setScore(null); }} className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-cyan-100">
          Retry Quiz
        </button>
      </div>
      <div className="space-y-6">
        {activeQuiz.map((question, index) => (
          <GlassCard key={question.id}>
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Question {index + 1}</p>
            <h3 className="mt-2 text-xl font-semibold text-white">{question.prompt}</h3>
            <p className="mt-2 text-sm text-slate-400">{question.category} • {question.difficulty}</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {question.options.map((option) => (
                <button
                  key={option}
                  onClick={() => setAnswers((prev) => ({ ...prev, [question.id]: option }))}
                  className={`rounded-2xl border px-4 py-3 text-left transition ${
                    answers[question.id] === option
                      ? "border-cyan-300 bg-cyan-400/10 text-cyan-100"
                      : "border-white/10 bg-slate-950/40 text-slate-200 hover:border-white/20"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            {score !== null && (
              <p className="mt-4 text-sm text-slate-400">
                Correct answer: {question.answer}. {question.explanation}
              </p>
            )}
          </GlassCard>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button onClick={submitQuiz} className="rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-6 py-3 font-medium text-slate-950">
          Submit Quiz
        </button>
        {score !== null && <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-cyan-100">Latest Score: {score}% • Best: {Math.max(score, ...Object.values(state.quizScores))}%</span>}
      </div>
      {weakAreas.length > 0 && (
        <GlassCard className="mt-6">
          <h3 className="text-xl font-semibold text-white">Weak Area Feedback</h3>
          <p className="mt-3 text-slate-300">Review these topics next: {Array.from(new Set(weakAreas)).join(", ")}.</p>
        </GlassCard>
      )}
    </section>
  );
}
