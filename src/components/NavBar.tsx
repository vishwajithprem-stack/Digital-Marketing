import { Link, NavLink } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const navItems = [
  ["Home", "/home"],
  ["Courses", "/courses"],
  ["Roadmap", "/roadmap"],
  ["Lessons", "/lessons"],
  ["Labs", "/labs"],
  ["Revision", "/revision"],
  ["Quiz", "/quiz"],
  ["Search", "/search"],
  ["Resources", "/resources"],
  ["Dashboard", "/dashboard"],
  ["Certificates", "/certificates"],
  ["Capstone", "/capstone"],
  ["Blog", "/blog"],
  ["Profile", "/profile"],
] as const;

export function NavBar() {
  const { user, logout } = useAppContext();

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 md:px-4">
      <div className="mx-auto max-w-7xl rounded-[1.75rem] border border-white/10 bg-night/70 px-4 py-4 shadow-neon backdrop-blur-2xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Link to="/home" className="display-title text-lg font-bold text-white md:text-xl">
            Digital Marketing <span className="headline-gradient">Academy</span>
          </Link>
          <nav className="flex flex-wrap gap-2 text-sm">
            {navItems.map(([label, href]) => (
              <NavLink
                key={href}
                to={href}
                className={({ isActive }) =>
                  `rounded-full px-3 py-2 transition duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-400/20 to-violet-400/20 text-cyan-200 shadow-[inset_0_0_0_1px_rgba(103,232,249,0.2)]"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-3 text-sm">
            {user ? (
              <>
                <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-cyan-200">
                  {user.name} • {user.role}
                </span>
                <button onClick={logout} className="secondary-btn px-4 py-2 text-sm">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/auth" className="primary-btn px-4 py-2 text-sm">
                Demo Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
