import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$499",
      interval: "/mo",
      annual: "From $5,988/year",
      gainsightNote: "Gainsight starts at $30,000/year",
      desc: "Perfect for scaling startups with simple renewal processes.",
      features: [
        "Up to 250 Active Customers",
        "Email Sequence Automation",
        "Basic Risk Scoring",
        "1 System Integration (HubSpot or Sheets)",
        "Standard email support"
      ],
      popular: false,
      cta: "Start Free Pilot"
    },
    {
      name: "Scale",
      price: "$1,799",
      interval: "/mo",
      annual: "$21,588/year",
      gainsightNote: "Gainsight equivalent: $8,000–$12,000/month",
      desc: "For mid-market teams needing deep insights and multi-channel outreach.",
      features: [
        "Up to 1,000 Active Customers",
        "Advanced AI Email Drafting",
        "Predictive Risk Scoring",
        "Salesforce + HubSpot Integrations",
        "NPS Surveys & Alerts",
        "Dedicated Success Manager"
      ],
      popular: true,
      cta: "Start Free Pilot"
    },
    {
      name: "Enterprise",
      price: "Custom",
      interval: "",
      annual: "Talk to sales",
      gainsightNote: "Comparable to Gainsight — at a fraction of the cost",
      desc: "For large organisations with complex, multi-product renewals.",
      features: [
        "Unlimited Customers",
        "Custom AI Model Training",
        "Advanced BI Integrations",
        "SLA & Priority Support",
        "White-glove Onboarding",
        "Multi-region data residency"
      ],
      popular: false,
      cta: "Contact Sales"
    }
  ];

  return (
    <section className="py-24 bg-slate-50/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{fontFamily: "'Syne', sans-serif"}}>
            Straightforward pricing. No lock-in.
          </h2>
          <p className="text-lg text-muted-foreground">
            Start free with 25 accounts. Scale as your team grows. Cancel anytime with 30 days notice.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {plans.map(plan => (
            <Card key={plan.name} className={`relative flex flex-col ${plan.popular ? 'border-primary shadow-lg scale-105 z-10' : 'border-border shadow-sm'}`}>
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              <CardHeader className="text-center pt-8">
                <CardTitle className="text-xl mb-2">{plan.name}</CardTitle>
                <div className="flex items-baseline justify-center gap-1 mb-1">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  <span className="text-muted-foreground font-medium">{plan.interval}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-1">{plan.annual}</p>
                <p className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full inline-block">{plan.gainsightNote}</p>
                <CardDescription className="mt-3">{plan.desc}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <span className="text-green-500 font-bold shrink-0">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                  {plan.cta}
                </Button>
                <p className="text-xs text-muted-foreground text-center">No credit card required</p>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* ROI nudge note */}
        <div className="mt-12 bg-blue-50 border border-blue-100 rounded-xl p-6 text-center max-w-2xl mx-auto">
          <p className="text-sm text-blue-900 font-medium">
            💡 At just 5% better retention, most teams using Renewal360 recover <strong>2–5× their annual subscription cost</strong> in recovered ARR within the first quarter.
          </p>
        </div>
      </div>
    </section>
  )
}
