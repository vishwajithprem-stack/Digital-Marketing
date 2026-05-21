import { FormEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { GlassCard } from "../components/GlassCard";
import { useAppContext } from "../context/AppContext";
import { Role } from "../types";

export function AuthPage() {
  const { signUp, login, user } = useAppContext();
  const [signup, setSignup] = useState({ name: "", email: "", password: "", role: "student" as Role });
  const [signin, setSignin] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  if (user) {
    return <Navigate to="/welcome" replace />;
  }

  const handleSignup = (event: FormEvent) => {
    event.preventDefault();
    const result = signUp(signup.name, signup.email, signup.password, signup.role);
    setMessage(result.message);
  };

  const handleSignin = (event: FormEvent) => {
    event.preventDefault();
    const result = login(signin.email, signin.password);
    setMessage(result.message);
  };

  return (
    <div className="min-h-screen bg-aura px-4 py-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-8 lg:grid-cols-[1fr_1fr]">
        <section className="section-shell surface-grid relative overflow-hidden rounded-[2.25rem] p-8 md:p-12">
          <div className="pointer-events-none absolute right-[-4rem] top-[-3rem] h-44 w-44 rounded-full bg-cyan-400/15 blur-3xl" />
          <div className="pointer-events-none absolute bottom-[-4rem] left-[10%] h-40 w-40 rounded-full bg-violet-500/15 blur-3xl" />
          <p className="eyebrow-chip mb-4">Dedicated Authentication</p>
          <h1 className="display-title max-w-3xl text-4xl font-bold leading-[0.95] text-white md:text-6xl">
            Sign in to unlock the <span className="headline-gradient">full academy experience</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-mist/85">
            The academy is now fully gated. Learners must log in before they can access lessons, certifications, dashboards, revision tools, labs, and the capstone workspace.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ["Secure Entry", "Only authenticated users can open academy pages."],
              ["Dedicated Access", "Authentication now has its own focused entry screen."],
              ["Local Demo Mode", "Credentials are still stored locally for this browser-only MVP."],
            ].map(([title, text]) => (
              <div key={title} className="metric-tile rounded-[1.5rem]">
                <h2 className="font-display text-lg font-bold text-white">{title}</h2>
                <p className="mt-3 text-sm text-slate-300">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-[1.5rem] border border-amber-300/15 bg-amber-300/10 p-5 text-sm leading-7 text-amber-100">
            This is demo authentication only. It stores account data in browser storage on this device and is not suitable for sensitive real-world use.
          </div>
        </section>

        <div className="grid gap-6">
          <GlassCard>
            <h2 className="font-display text-2xl font-bold text-white">Create Account</h2>
            <p className="mt-2 text-slate-300">Set up a local learner account to enter the academy.</p>
            <form onSubmit={handleSignup} className="mt-5 space-y-4">
              <input
                value={signup.name}
                onChange={(e) => setSignup({ ...signup, name: e.target.value })}
                placeholder="Name"
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none"
              />
              <input
                value={signup.email}
                onChange={(e) => setSignup({ ...signup, email: e.target.value })}
                placeholder="Email"
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none"
              />
              <input
                value={signup.password}
                type="password"
                onChange={(e) => setSignup({ ...signup, password: e.target.value })}
                placeholder="Password"
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none"
              />
              <select
                value={signup.role}
                onChange={(e) => setSignup({ ...signup, role: e.target.value as Role })}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none"
              >
                <option value="student">Student</option>
                <option value="mentor">Mentor</option>
                <option value="admin">Admin</option>
              </select>
              <button type="submit" className="primary-btn w-full justify-center text-center">
                Create Local Account
              </button>
            </form>
          </GlassCard>

          <GlassCard>
            <h2 className="font-display text-2xl font-bold text-white">Login</h2>
            <p className="mt-2 text-slate-300">Use your local account to access the academy pages.</p>
            <form onSubmit={handleSignin} className="mt-5 space-y-4">
              <input
                value={signin.email}
                onChange={(e) => setSignin({ ...signin, email: e.target.value })}
                placeholder="Email"
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none"
              />
              <input
                value={signin.password}
                type="password"
                onChange={(e) => setSignin({ ...signin, password: e.target.value })}
                placeholder="Password"
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none"
              />
              <button type="submit" className="secondary-btn w-full justify-center text-center">
                Login Locally
              </button>
            </form>
            {message && <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-slate-200">{message}</div>}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
