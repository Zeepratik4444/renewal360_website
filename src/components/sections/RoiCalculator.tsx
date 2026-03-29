import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, ArrowRight, TrendingUp } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function RoiCalculator() {
  const [arr, setArr] = useState(5000000); // Default $5M
  const [improvement, setImprovement] = useState(3); // Default 3%

  const retainedRevenue = arr * (improvement / 100);
  const roiMultiplier = (retainedRevenue / 5988).toFixed(1);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white border-y border-blue-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Explainer */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold mb-6 border border-blue-500/30">
              <Calculator className="h-4 w-4" />
              ROI Calculator
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              What is a single percentage point of retention worth to you?
            </h2>
            <p className="text-lg text-blue-200 mb-8 leading-relaxed">
              Most B2B SaaS teams using Renewal360 see a 2% to 5% absolute increase in their renewal rates within the first 6 months simply by ensuring no account falls through the cracks.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-blue-100">
                <div className="h-2 w-2 bg-emerald-400 rounded-full"></div>
                At $5M ARR, a 3% bump is $150,000 injected straight to the bottom line.
              </li>
              <li className="flex items-center gap-3 text-blue-100">
                <div className="h-2 w-2 bg-emerald-400 rounded-full"></div>
                The platform costs $5,988/year.
              </li>
              <li className="flex items-center gap-3 text-blue-100">
                <div className="h-2 w-2 bg-emerald-400 rounded-full"></div>
                It pays for itself if it saves just one or two mid-market accounts.
              </li>
            </ul>
          </div>

          {/* Right Side: Interactive UI */}
          <Card className="bg-white/10 border-white/20 backdrop-blur-md shadow-2xl">
            <CardContent className="p-8">
              <div className="space-y-8">
                
                {/* ARR Slider */}
                <div>
                  <div className="flex justify-between items-end mb-4">
                    <label className="text-sm font-semibold text-blue-200 uppercase tracking-wider">
                      Your Current ARR
                    </label>
                    <span className="text-2xl font-bold text-white">
                      {formatCurrency(arr)}
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="1000000" 
                    max="50000000" 
                    step="500000" 
                    value={arr} 
                    onChange={(e) => setArr(Number(e.target.value))}
                    className="w-full h-2 bg-blue-950 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-xs text-blue-400 mt-2">
                    <span>$1M</span>
                    <span>$50M+</span>
                  </div>
                </div>

                {/* Improvement Slider */}
                <div>
                  <div className="flex justify-between items-end mb-4">
                    <label className="text-sm font-semibold text-blue-200 uppercase tracking-wider">
                      Expected Renewal Improvement
                    </label>
                    <span className="text-2xl font-bold text-white">
                      +{improvement}%
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="0.5" 
                    max="10" 
                    step="0.5" 
                    value={improvement} 
                    onChange={(e) => setImprovement(Number(e.target.value))}
                    className="w-full h-2 bg-blue-950 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <div className="flex justify-between text-xs text-blue-400 mt-2">
                    <span>0.5%</span>
                    <span>10%</span>
                  </div>
                </div>

                {/* Results Box */}
                <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-900/40 border border-emerald-500/30 rounded-xl p-6 mt-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 -mr-4 -mt-4 opacity-10">
                    <TrendingUp className="w-32 h-32 text-emerald-300" />
                  </div>
                  <div className="relative z-10">
                    <p className="text-emerald-200 text-sm font-bold uppercase tracking-widest mb-2">
                      New Retained Revenue
                    </p>
                    <div className="text-5xl font-extrabold text-emerald-400 mb-4">
                      {formatCurrency(retainedRevenue)}
                      <span className="text-lg text-emerald-200/50 font-medium ml-2">/ year</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-emerald-100 bg-emerald-950/50 px-3 py-2 rounded-lg inline-flex">
                      <span className="font-bold">{parseFloat(roiMultiplier).toLocaleString()}x ROI</span> 
                      <span>based on the $199/mo SMB plan</span>
                    </div>
                  </div>
                </div>

                <Link to="/contact" className="block mt-6">
                  <Button className="w-full bg-white text-blue-900 hover:bg-gray-100 text-lg py-6 font-bold">
                    Start reclaiming revenue <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>

              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  );
}
