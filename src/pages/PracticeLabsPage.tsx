import { useMemo, useState } from "react";
import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { GlassCard } from "../components/GlassCard";
import { SectionHeading } from "../components/SectionHeading";

export function PracticeLabsPage() {
  const [seoInputs, setSeoInputs] = useState({ keywords: 8, backlinks: 12, speed: 82, contentDepth: 7 });
  const [adsInputs, setAdsInputs] = useState({ budget: 2000, cpc: 1.6, ctr: 4.2, conversionRate: 5.4 });
  const [emailTopic, setEmailTopic] = useState("new productivity workshop");
  const [calendarTheme, setCalendarTheme] = useState("AI-powered marketing for small businesses");
  const [captionTopic, setCaptionTopic] = useState("launching a free SEO checklist");
  const [analyticsInputs, setAnalyticsInputs] = useState({ visitors: 18000, leads: 950, customers: 132, revenue: 26400 });
  const [roiInputs, setRoiInputs] = useState({ revenue: 42000, spend: 12000 });
  const [funnelInputs, setFunnelInputs] = useState({ awareness: 10000, interest: 2600, leads: 780, sales: 156 });

  const seoScore = Math.min(
    100,
    Math.round(seoInputs.keywords * 2 + seoInputs.backlinks * 1.5 + seoInputs.speed * 0.35 + seoInputs.contentDepth * 4),
  );

  const estimatedClicks = Math.round(adsInputs.budget / adsInputs.cpc);
  const estimatedConversions = Math.round(estimatedClicks * (adsInputs.conversionRate / 100));
  const estimatedImpressions = Math.round(estimatedClicks / (adsInputs.ctr / 100));

  const emailSuggestions = [
    `How ${emailTopic} can help your team win this quarter`,
    `A practical guide to ${emailTopic} without the overwhelm`,
    `Ready to improve results? Start with ${emailTopic}`,
  ];

  const contentCalendar = useMemo(
    () => [
      `Monday: Publish a thought-leadership post on ${calendarTheme}`,
      `Wednesday: Share a carousel with 5 practical tips about ${calendarTheme}`,
      `Friday: Send an email recap with one CTA and one case-study insight`,
      `Saturday: Record a short-form video answering a common objection`,
    ],
    [calendarTheme],
  );

  const captionOptions = [
    `Testing a smarter approach to ${captionTopic}. Swipe for the framework we use before launching any campaign.`,
    `${captionTopic} is easier when you simplify the message, sharpen the CTA, and measure the right KPI.`,
    `A quick marketing win: turn one idea about ${captionTopic} into a post, email, and lead magnet.`,
  ];

  const analyticsData = [
    { name: "Visitors", value: analyticsInputs.visitors },
    { name: "Leads", value: analyticsInputs.leads },
    { name: "Customers", value: analyticsInputs.customers },
  ];

  const conversionRate = analyticsInputs.visitors ? ((analyticsInputs.customers / analyticsInputs.visitors) * 100).toFixed(2) : "0.00";
  const roi = roiInputs.spend ? (((roiInputs.revenue - roiInputs.spend) / roiInputs.spend) * 100).toFixed(1) : "0.0";
  const funnelRates = {
    awarenessToInterest: funnelInputs.awareness ? ((funnelInputs.interest / funnelInputs.awareness) * 100).toFixed(1) : "0.0",
    interestToLeads: funnelInputs.interest ? ((funnelInputs.leads / funnelInputs.interest) * 100).toFixed(1) : "0.0",
    leadsToSales: funnelInputs.leads ? ((funnelInputs.sales / funnelInputs.leads) * 100).toFixed(1) : "0.0",
  };

  const labCard = "grid gap-4 lg:grid-cols-2";
  const inputClass = "rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none";

  return (
    <section>
      <SectionHeading
        eyebrow="Practice Labs"
        title="Offline calculators and generators for daily marketing work"
        subtitle="All labs run locally with formulas and simple logic, so the full MVP stays free and browser-only."
      />
      <div className="space-y-6">
        <GlassCard className={labCard}>
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-white">SEO Score Calculator</h3>
            <input className={inputClass} type="number" value={seoInputs.keywords} onChange={(e) => setSeoInputs({ ...seoInputs, keywords: Number(e.target.value) })} placeholder="Keyword coverage" />
            <input className={inputClass} type="number" value={seoInputs.backlinks} onChange={(e) => setSeoInputs({ ...seoInputs, backlinks: Number(e.target.value) })} placeholder="Backlinks" />
            <input className={inputClass} type="number" value={seoInputs.speed} onChange={(e) => setSeoInputs({ ...seoInputs, speed: Number(e.target.value) })} placeholder="Page speed" />
            <input className={inputClass} type="number" value={seoInputs.contentDepth} onChange={(e) => setSeoInputs({ ...seoInputs, contentDepth: Number(e.target.value) })} placeholder="Content depth" />
          </div>
          <div className="rounded-3xl border border-cyan-400/15 bg-cyan-400/10 p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-200">Estimated SEO Score</p>
            <p className="mt-4 text-5xl font-semibold text-white">{seoScore}/100</p>
            <p className="mt-4 text-slate-200">Boost this score by improving page speed, strengthening topical depth, and building relevance around one primary intent.</p>
          </div>
        </GlassCard>

        <GlassCard className={labCard}>
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-white">Google Ads Budget Planner</h3>
            <input className={inputClass} type="number" value={adsInputs.budget} onChange={(e) => setAdsInputs({ ...adsInputs, budget: Number(e.target.value) })} placeholder="Budget" />
            <input className={inputClass} type="number" step="0.1" value={adsInputs.cpc} onChange={(e) => setAdsInputs({ ...adsInputs, cpc: Number(e.target.value) })} placeholder="Estimated CPC" />
            <input className={inputClass} type="number" step="0.1" value={adsInputs.ctr} onChange={(e) => setAdsInputs({ ...adsInputs, ctr: Number(e.target.value) })} placeholder="CTR %" />
            <input className={inputClass} type="number" step="0.1" value={adsInputs.conversionRate} onChange={(e) => setAdsInputs({ ...adsInputs, conversionRate: Number(e.target.value) })} placeholder="Conversion rate %" />
          </div>
          <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/50 p-6 text-slate-200">
            <p>Estimated Clicks: <span className="font-semibold text-white">{estimatedClicks}</span></p>
            <p>Estimated Conversions: <span className="font-semibold text-white">{estimatedConversions}</span></p>
            <p>Estimated Impressions: <span className="font-semibold text-white">{estimatedImpressions}</span></p>
          </div>
        </GlassCard>

        <div className="grid gap-6 lg:grid-cols-2">
          <GlassCard>
            <h3 className="text-xl font-semibold text-white">Email Subject Line Generator</h3>
            <input className={`${inputClass} mt-4 w-full`} value={emailTopic} onChange={(e) => setEmailTopic(e.target.value)} />
            <div className="mt-4 space-y-3 text-slate-200">
              {emailSuggestions.map((line) => (
                <div key={line} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">{line}</div>
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="text-xl font-semibold text-white">Content Calendar Generator</h3>
            <input className={`${inputClass} mt-4 w-full`} value={calendarTheme} onChange={(e) => setCalendarTheme(e.target.value)} />
            <div className="mt-4 space-y-3 text-slate-200">
              {contentCalendar.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">{item}</div>
              ))}
            </div>
          </GlassCard>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <GlassCard>
            <h3 className="text-xl font-semibold text-white">Social Media Caption Generator</h3>
            <input className={`${inputClass} mt-4 w-full`} value={captionTopic} onChange={(e) => setCaptionTopic(e.target.value)} />
            <div className="mt-4 space-y-3 text-slate-200">
              {captionOptions.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">{item}</div>
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="text-xl font-semibold text-white">Analytics KPI Dashboard</h3>
            <div className="grid gap-3 md:grid-cols-2">
              <input className={inputClass} type="number" value={analyticsInputs.visitors} onChange={(e) => setAnalyticsInputs({ ...analyticsInputs, visitors: Number(e.target.value) })} placeholder="Visitors" />
              <input className={inputClass} type="number" value={analyticsInputs.leads} onChange={(e) => setAnalyticsInputs({ ...analyticsInputs, leads: Number(e.target.value) })} placeholder="Leads" />
              <input className={inputClass} type="number" value={analyticsInputs.customers} onChange={(e) => setAnalyticsInputs({ ...analyticsInputs, customers: Number(e.target.value) })} placeholder="Customers" />
              <input className={inputClass} type="number" value={analyticsInputs.revenue} onChange={(e) => setAnalyticsInputs({ ...analyticsInputs, revenue: Number(e.target.value) })} placeholder="Revenue" />
            </div>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#56f0ff" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-slate-200">Conversion Rate: <span className="font-semibold text-white">{conversionRate}%</span></p>
          </GlassCard>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <GlassCard>
            <h3 className="text-xl font-semibold text-white">Campaign ROI Calculator</h3>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <input className={inputClass} type="number" value={roiInputs.revenue} onChange={(e) => setRoiInputs({ ...roiInputs, revenue: Number(e.target.value) })} placeholder="Revenue" />
              <input className={inputClass} type="number" value={roiInputs.spend} onChange={(e) => setRoiInputs({ ...roiInputs, spend: Number(e.target.value) })} placeholder="Spend" />
            </div>
            <div className="mt-6 rounded-3xl border border-violet-400/20 bg-violet-400/10 p-5">
              <p className="text-sm uppercase tracking-[0.25em] text-violet-200">ROI</p>
              <p className="mt-3 text-4xl font-semibold text-white">{roi}%</p>
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="text-xl font-semibold text-white">Marketing Funnel Calculator</h3>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <input className={inputClass} type="number" value={funnelInputs.awareness} onChange={(e) => setFunnelInputs({ ...funnelInputs, awareness: Number(e.target.value) })} placeholder="Awareness" />
              <input className={inputClass} type="number" value={funnelInputs.interest} onChange={(e) => setFunnelInputs({ ...funnelInputs, interest: Number(e.target.value) })} placeholder="Interest" />
              <input className={inputClass} type="number" value={funnelInputs.leads} onChange={(e) => setFunnelInputs({ ...funnelInputs, leads: Number(e.target.value) })} placeholder="Leads" />
              <input className={inputClass} type="number" value={funnelInputs.sales} onChange={(e) => setFunnelInputs({ ...funnelInputs, sales: Number(e.target.value) })} placeholder="Sales" />
            </div>
            <div className="mt-5 space-y-3 text-slate-200">
              <p>Awareness to Interest: <span className="font-semibold text-white">{funnelRates.awarenessToInterest}%</span></p>
              <p>Interest to Leads: <span className="font-semibold text-white">{funnelRates.interestToLeads}%</span></p>
              <p>Leads to Sales: <span className="font-semibold text-white">{funnelRates.leadsToSales}%</span></p>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
