import { GlassCard } from "../components/GlassCard";
import { SectionHeading } from "../components/SectionHeading";
import { useAppContext } from "../context/AppContext";

export function ResourcesPage() {
  const { catalog } = useAppContext();

  const downloadTemplate = (title: string, template: string[]) => {
    const content = template.map((item) => `- ${item}:`).join("\n");
    const blob = new Blob([`${title}\n\n${content}\n`], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title.toLowerCase().replace(/\s+/g, "-")}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section>
      <SectionHeading
        eyebrow="Resources"
        title="Worksheets and reusable planning templates"
        subtitle="These browser-side worksheets help learners move from passive watching to active planning and documentation."
      />
      <div className="grid gap-5 lg:grid-cols-2">
        {catalog.worksheets.map((sheet) => (
          <GlassCard key={sheet.id}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-xl font-semibold text-white">{sheet.title}</h3>
              <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-cyan-200">{sheet.category}</span>
            </div>
            <p className="mt-3 text-slate-300">{sheet.description}</p>
            <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Template Fields</p>
              <ul className="mt-3 space-y-2 text-slate-200">
                {sheet.template.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => downloadTemplate(sheet.title, sheet.template)}
              className="mt-5 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-5 py-2 font-medium text-slate-950"
            >
              Download Worksheet
            </button>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
