import { useMemo, useState } from "react";
import { GlassCard } from "../components/GlassCard";
import { SectionHeading } from "../components/SectionHeading";
import { useAppContext } from "../context/AppContext";

export function SearchPage() {
  const { catalog, state } = useAppContext();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    if (!normalized) return [];

    const lessonMatches = catalog.lessons
      .filter((lesson) => [lesson.title, lesson.summary, lesson.module, ...lesson.tags, ...lesson.content].join(" ").toLowerCase().includes(normalized))
      .map((lesson) => ({ type: "Lesson", title: lesson.title, detail: lesson.summary }));

    const blogMatches = state.customBlogs
      .filter((post) => [post.title, post.category, post.excerpt, ...post.content].join(" ").toLowerCase().includes(normalized))
      .map((post) => ({ type: "Blog", title: post.title, detail: post.excerpt }));

    const certMatches = catalog.certificationPaths
      .filter((path) => [path.title, path.provider, path.summary].join(" ").toLowerCase().includes(normalized))
      .map((path) => ({ type: "Certification", title: path.title, detail: path.summary }));

    const roadmapMatches = catalog.roadmap
      .filter((step) => [step.title, step.focus, ...step.skills].join(" ").toLowerCase().includes(normalized))
      .map((step) => ({ type: "Roadmap", title: step.title, detail: step.focus }));

    return [...lessonMatches, ...blogMatches, ...certMatches, ...roadmapMatches];
  }, [catalog, query, state.customBlogs]);

  return (
    <section>
      <SectionHeading
        eyebrow="Search"
        title="Search across lessons, roadmap steps, blog posts, and certifications"
        subtitle="Use local search to find topics quickly without relying on any external search service."
      />
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search SEO, analytics, personas, certifications, or content topics..."
        className="mb-6 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none"
      />
      <div className="space-y-4">
        {results.map((result, index) => (
          <GlassCard key={`${result.type}-${index}`}>
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">{result.type}</p>
            <h3 className="mt-2 text-xl font-semibold text-white">{result.title}</h3>
            <p className="mt-3 text-slate-300">{result.detail}</p>
          </GlassCard>
        ))}
        {!results.length && query && <GlassCard><p className="text-slate-300">No local matches found for that search.</p></GlassCard>}
      </div>
    </section>
  );
}
