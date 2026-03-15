import { Card, CardContent } from "@/components/ui/card";
import { Users, Settings, TrendingUp } from "lucide-react";

export function PersonaCards() {
  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            One platform. Built for the entire revenue team.
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Renewal360 unites your client-facing reps, operational backbone, and strategic leadership around a single source of truth.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-blue-50/50 border-blue-100 hover:shadow-md transition-shadow">
            <CardContent className="pt-8">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="text-blue-600 h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">For Customer Success</h3>
              <p className="text-blue-700 font-medium italic mb-4">
                "Never write another renewal email from scratch."
              </p>
              <ul className="space-y-3 text-sm text-gray-600 mb-2">
                <li className="flex gap-3 items-start">
                  <span className="text-blue-500 font-bold">✓</span>
                  <span>AI drafts tailored context per account</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-blue-500 font-bold">✓</span>
                  <span>Human-in-the-loop email approval</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-blue-500 font-bold">✓</span>
                  <span>Stop chasing clients internally</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-emerald-50/50 border-emerald-100 hover:shadow-md transition-shadow">
            <CardContent className="pt-8">
              <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <Settings className="text-emerald-600 h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">For RevOps</h3>
              <p className="text-emerald-700 font-medium italic mb-4">
                "7-day deployment. Syncs via API. Zero workflow disruption."
              </p>
              <ul className="space-y-3 text-sm text-gray-600 mb-2">
                <li className="flex gap-3 items-start">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>Native CRM integrations off the shelf</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>No custom coding or IT resources required</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>SOC 2-ready data security compliance</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-purple-50/50 border-purple-100 hover:shadow-md transition-shadow">
            <CardContent className="pt-8">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="text-purple-600 h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">For Executives</h3>
              <p className="text-purple-700 font-medium italic mb-4">
                "Know exactly what ARR is at risk 90 days out."
              </p>
              <ul className="space-y-3 text-sm text-gray-600 mb-2">
                <li className="flex gap-3 items-start">
                  <span className="text-purple-500 font-bold">✓</span>
                  <span>Real-time renewal pipeline visibility</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-purple-500 font-bold">✓</span>
                  <span>Predictable revenue forecasting</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-purple-500 font-bold">✓</span>
                  <span>Direct impact on NRR targets</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
