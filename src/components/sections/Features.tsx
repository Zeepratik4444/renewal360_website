import { Badge } from "@/components/ui/badge";

export function Features() {
  const features = [
    {
      icon: "✉️",
      name: "AI Email Sequences",
      outcome: "Every account gets personalised outreach — before they go silent",
      persona: "CSM",
      desc: "Renewal360 drafts personalised, context-aware renewal emails for every account. Your team approves. Sends go out automatically."
    },
    {
      icon: "🎯",
      name: "Risk Scoring",
      outcome: "Know which accounts are at risk — weeks before the renewal date",
      persona: "CSM + Exec",
      desc: "AI analyses product usage, communication frequency, and NPS signals to surface the accounts deserving immediate attention."
    },
    {
      icon: "📊",
      name: "Executive Dashboard",
      outcome: "Answer 'how much ARR is at risk?' in one glance",
      persona: "Executive",
      desc: "Track your 90/60/30-day renewal pipeline, team performance, and revenue at risk — all in one real-time view."
    },
    {
      icon: "✅",
      name: "Human Approval Workflow",
      outcome: "AI drafts, humans approve. You keep full control of every customer touchpoint",
      persona: "CSM + RevOps",
      desc: "Review, edit, and approve every AI-written email before it reaches a customer. Always in control — no blind automation."
    },
    {
      icon: "😊",
      name: "NPS Surveys",
      outcome: "Catch unhappy customers before they decide not to renew",
      persona: "CSM + Exec",
      desc: "Automated NPS collection at key moments in the customer journey. Unhappy scores trigger immediate CSM alerts."
    },
    {
      icon: "🔗",
      name: "CRM Integrations",
      outcome: "Works with your existing stack — no ripping and replacing",
      persona: "RevOps",
      desc: "Bi-directional sync with Salesforce, HubSpot, and Google Sheets. Your data stays in your CRM; we just make it actionable."
    },
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <Badge className="mb-4">Features</Badge>
        <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{fontFamily: "'Syne', sans-serif"}}>
          Everything you need. <br/> Nothing you don't.
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Unlike enterprise goliaths that require a Ph.D. to configure, Renewal360 focuses entirely on the 20% of features that drive 80% of your revenue retention.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((f) => (
          <div key={f.name} className="bg-white rounded-xl border border-border p-6 shadow-sm hover:-translate-y-1 transition-transform duration-200">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl mb-4">{f.icon}</div>
            <div className="flex items-center gap-2 mb-3">
              <h3 className="font-bold text-foreground">{f.name}</h3>
              <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full">{f.persona}</span>
            </div>
            <p className="text-primary font-semibold text-sm mb-3 italic">"{f.outcome}"</p>
            <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
