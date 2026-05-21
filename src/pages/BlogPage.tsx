import { useState } from "react";
import { GlassCard } from "../components/GlassCard";
import { SectionHeading } from "../components/SectionHeading";
import { useAppContext } from "../context/AppContext";

export function BlogPage() {
  const { state } = useAppContext();
  const [query, setQuery] = useState("");

  const posts = state.customBlogs.filter((post) =>
    [post.title, post.category, post.excerpt, ...post.content].join(" ").toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <section>
      <SectionHeading
        eyebrow="Blog"
        title="Local JSON-powered articles with offline search"
        subtitle="The blog page uses client-side filtering against local content, so there is no external search service or backend dependency."
      />
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search blog topics locally..."
        className="mb-6 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none"
      />
      <div className="space-y-5">
        {posts.map((post) => (
          <GlassCard key={post.id}>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">{post.category}</span>
              <span className="text-sm text-slate-400">{post.publishedAt}</span>
            </div>
            <h3 className="mt-3 text-2xl font-semibold text-white">{post.title}</h3>
            <p className="mt-3 text-slate-300">{post.excerpt}</p>
            <div className="mt-4 space-y-3 text-slate-200">
              {post.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
