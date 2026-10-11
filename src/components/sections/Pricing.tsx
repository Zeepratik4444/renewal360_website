import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { usePricing } from "@/hooks/usePricing";
import { getYearlyTotal } from "@/lib/pricing";

export function Pricing() {
  const { currency, isAnnual, setIsAnnual, isDetecting, plans, getPrice } = usePricing();

  return (
    <section className="border-t border-border bg-card py-24 sm:py-32" id="pricing">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="eyebrow">Pricing</p>
          <h2 className="mb-4 mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Straightforward pricing. No lock-in.
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Every signup gets <strong>7 days of full Scale access</strong> - then
            choose the plan that fits. No credit card required.
          </p>
        </div>

        {/* Billing toggle */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-1 p-1 rounded-full border border-border bg-background text-sm font-medium">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-1.5 rounded-full transition-all ${!isAnnual
                  ? "bg-foreground text-background"
                  : "text-slate-500 hover:text-slate-700"
                }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-all ${isAnnual
                  ? "bg-foreground text-background"
                  : "text-slate-500 hover:text-slate-700"
                }`}
            >
              Yearly
              <span className="bg-brand-soft text-brand-deep text-xs font-semibold px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Plan cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col bg-background transition-transform duration-200 hover:-translate-y-1 ${plan.highlight
                  ? "z-10 border-brand ring-1 ring-brand/30 shadow-[0_30px_60px_-30px_rgb(47_71_214/0.45)]"
                  : "border-border"
                }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 brand-gradient-bg text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-[0.12em] whitespace-nowrap">
                  {plan.highlightText}
                </div>
              )}

              <CardHeader className="text-center pt-8">
                <CardTitle className="text-xl mb-2">{plan.name}</CardTitle>

                {/* The amount gets a line to itself and scales with the card, so long prices never spill out. */}
                <div className="@container mb-1">
                  <p className="whitespace-nowrap text-[length:clamp(1.75rem,15cqw,2.75rem)] font-semibold leading-none tracking-tight tabular-nums">
                    {isDetecting ? "…" : getPrice(plan)}
                  </p>
                  <p className="mt-2 text-sm font-medium text-muted-foreground">
                    {plan.name === "Free"
                      ? "forever"
                      : isAnnual
                        ? "per month, billed yearly"
                        : "per month"}
                  </p>
                  {isAnnual && plan.name !== "Free" && !isDetecting && (
                    <p className="mt-1 text-xs text-muted-foreground tabular-nums">
                      {getYearlyTotal(plan, currency)} per year
                    </p>
                  )}
                </div>

                {plan.gainsightNote && (
                  <p className="text-xs text-brand-deep font-medium bg-brand-soft px-2.5 py-1 rounded-full inline-block mt-1">
                    {plan.gainsightNote}
                  </p>
                )}

                <CardDescription className="mt-3 text-sm">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <span className="text-brand font-bold shrink-0">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="flex-col gap-2">
                <Link to={plan.ctaLink} className="w-full">
                  <Button
                    className="w-full"
                    variant={plan.highlight ? "gradient" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </Link>
                <p className="text-xs text-muted-foreground text-center">
                  No credit card required
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* ROI nudge */}
        <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-border bg-background p-6 text-center">
          <p className="text-sm font-medium text-foreground">
            At just 5% better retention, most teams using Renewal360 recover{" "}
            <strong>2–5× their annual subscription cost</strong> in recovered ARR
            within the first quarter.
          </p>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Need more detail?{" "}
          <Link to="/pricing" className="text-primary font-medium hover:underline">
            View full pricing →
          </Link>
        </p>
      </div>
    </section>
  );
}