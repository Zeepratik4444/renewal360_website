// ─── Types ────────────────────────────────────────────────────────────────────

export type Currency = "INR" | "USD" | "EUR" | "GBP";
export type BillingCycle = "monthly" | "yearly";

export interface PricingTier {
    name: string;
    monthlyPrice: string;
    yearlyPrice: string;
    description: string;
    features: string[];
    cta: string;
    ctaLink: string;
    highlight?: boolean;
    highlightText?: string;
    /** Short competitive note shown on the homepage pricing section */
    gainsightNote?: string;
}

// ─── Shared feature highlights (4-5 per tier, action-oriented) ────────────────
// Full feature breakdown lives in the comparison table on PricingPage

const FREE_FEATURES = [
    "25 Active Accounts",
    "Unlimited Seats / Users",
    "AI Renewal Sequences & Email Workflows",
    "Basic Health Scoring",
    "Google Sheets Integration",
];

const SMB_FEATURES = [
    "200 Active Accounts",
    "Unlimited Seats / Users",
    "Smart AI Objection Handling",
    "HubSpot + Slack Integration",
    "Onboarding Consultation",
];

const GROWTH_FEATURES = [
    "1,000 Active Accounts",
    "Unlimited Seats / Users",
    "Revenue at Risk Dashboard & NPS Surveys",
    "Weighted Health Scoring (5-Factor)",
    "Reporting Dashboard & Team Leaderboard",
];

const SCALE_FEATURES = [
    "Unlimited Active Accounts",
    "Unlimited Seats / Users",
    "Salesforce + Pipedrive Integration",
    "Dedicated Success Manager",
    "Priority Slack Support & Custom Reports",
];

// ─── Plan Data ────────────────────────────────────────────────────────────────
// Aligned with Pricing Refactor Strategy (March 2026)
// Plans: Free → SMB → Growth ⭐ → Scale
// Core usage lever: Active Accounts | Seats: Unlimited at all tiers

export const PRICING_DATA: Record<Currency, PricingTier[]> = {
    INR: [
        {
            name: "Free",
            monthlyPrice: "₹0",
            yearlyPrice: "₹0",
            description: "For individual CSMs running a pilot cohort",
            features: FREE_FEATURES,
            cta: "Start Free Trial",
            ctaLink: "/contact",
            gainsightNote: "7-day full Scale trial included",
        },
        {
            name: "SMB",
            monthlyPrice: "₹12,000",
            yearlyPrice: "₹9,600",
            description: "For 2–5 person CS teams at early-stage SaaS",
            features: SMB_FEATURES,
            cta: "Get Started",
            ctaLink: "/contact",
            gainsightNote: "Traditional enterprise platforms start at ₹25,00,000/year",
        },
        {
            name: "Growth",
            monthlyPrice: "₹49,000",
            yearlyPrice: "₹39,200",
            description: "For mid-market teams needing churn intelligence",
            features: GROWTH_FEATURES,
            cta: "Get Started",
            ctaLink: "/contact",
            highlight: true,
            highlightText: "Most Popular",
            gainsightNote: "Enterprise equivalent: ₹6–10L/month",
        },
        {
            name: "Scale",
            monthlyPrice: "₹99,000",
            yearlyPrice: "₹79,200",
            description: "For large CS orgs needing a dedicated partner",
            features: SCALE_FEATURES,
            cta: "Contact Sales",
            ctaLink: "/contact",
            gainsightNote: "Enterprise-grade features at a fraction of the cost",
        },
    ],

    USD: [
        {
            name: "Free",
            monthlyPrice: "$0",
            yearlyPrice: "$0",
            description: "For individual CSMs running a pilot cohort",
            features: FREE_FEATURES,
            cta: "Start Free Trial",
            ctaLink: "/contact",
            gainsightNote: "7-day full Scale trial included",
        },
        {
            name: "SMB",
            monthlyPrice: "$199",
            yearlyPrice: "$159",
            description: "For 2–5 person CS teams at early-stage SaaS",
            features: SMB_FEATURES,
            cta: "Get Started",
            ctaLink: "/contact",
            gainsightNote: "Traditional enterprise platforms start at $30,000/year",
        },
        {
            name: "Growth",
            monthlyPrice: "$599",
            yearlyPrice: "$479",
            description: "For mid-market teams needing churn intelligence",
            features: GROWTH_FEATURES,
            cta: "Get Started",
            ctaLink: "/contact",
            highlight: true,
            highlightText: "Most Popular",
            gainsightNote: "Enterprise equivalent: $8,000–$12,000/month",
        },
        {
            name: "Scale",
            monthlyPrice: "$999",
            yearlyPrice: "$799",
            description: "For large CS orgs needing a dedicated partner",
            features: SCALE_FEATURES,
            cta: "Contact Sales",
            ctaLink: "/contact",
            gainsightNote: "Enterprise-grade features at a fraction of the cost",
        },
    ],

    EUR: [
        {
            name: "Free",
            monthlyPrice: "€0",
            yearlyPrice: "€0",
            description: "For individual CSMs running a pilot cohort",
            features: FREE_FEATURES,
            cta: "Start Free Trial",
            ctaLink: "/contact",
            gainsightNote: "7-day full Scale trial included",
        },
        {
            name: "SMB",
            monthlyPrice: "€179",
            yearlyPrice: "€143",
            description: "For 2–5 person CS teams at early-stage SaaS",
            features: SMB_FEATURES,
            cta: "Get Started",
            ctaLink: "/contact",
            gainsightNote: "Traditional enterprise platforms start at €28,000/year",
        },
        {
            name: "Growth",
            monthlyPrice: "€549",
            yearlyPrice: "€439",
            description: "For mid-market teams needing churn intelligence",
            features: GROWTH_FEATURES,
            cta: "Get Started",
            ctaLink: "/contact",
            highlight: true,
            highlightText: "Most Popular",
            gainsightNote: "Enterprise equivalent: €7,000–€11,000/month",
        },
        {
            name: "Scale",
            monthlyPrice: "€929",
            yearlyPrice: "€743",
            description: "For large CS orgs needing a dedicated partner",
            features: SCALE_FEATURES,
            cta: "Contact Sales",
            ctaLink: "/contact",
            gainsightNote: "Enterprise-grade features at a fraction of the cost",
        },
    ],

    GBP: [
        {
            name: "Free",
            monthlyPrice: "£0",
            yearlyPrice: "£0",
            description: "For individual CSMs running a pilot cohort",
            features: FREE_FEATURES,
            cta: "Start Free Trial",
            ctaLink: "/contact",
            gainsightNote: "7-day full Scale trial included",
        },
        {
            name: "SMB",
            monthlyPrice: "£159",
            yearlyPrice: "£127",
            description: "For 2–5 person CS teams at early-stage SaaS",
            features: SMB_FEATURES,
            cta: "Get Started",
            ctaLink: "/contact",
            gainsightNote: "Traditional enterprise platforms start at £25,000/year",
        },
        {
            name: "Growth",
            monthlyPrice: "£499",
            yearlyPrice: "£399",
            description: "For mid-market teams needing churn intelligence",
            features: GROWTH_FEATURES,
            cta: "Get Started",
            ctaLink: "/contact",
            highlight: true,
            highlightText: "Most Popular",
            gainsightNote: "Enterprise equivalent: £7,000–£10,000/month",
        },
        {
            name: "Scale",
            monthlyPrice: "£829",
            yearlyPrice: "£663",
            description: "For large CS orgs needing a dedicated partner",
            features: SCALE_FEATURES,
            cta: "Contact Sales",
            ctaLink: "/contact",
            gainsightNote: "Enterprise-grade features at a fraction of the cost",
        },
    ],
};

// ─── Add-ons ──────────────────────────────────────────────────────────────────

export const ADD_ONS: Record<Currency, string> = {
    INR: "₹35,000 / month",
    USD: "$349 / month",
    EUR: "€299 / month",
    GBP: "£299 / month",
};

// ─── Currency symbols (for display) ──────────────────────────────────────────

export const CURRENCY_LABELS: Record<Currency, string> = {
    INR: "₹ INR",
    USD: "$ USD",
    EUR: "€ EUR",
    GBP: "£ GBP",
};

// ─── Feature Comparison Table Data ────────────────────────────────────────────
// Used by PricingPage to render the full comparison table below cards

export interface ComparisonRow {
    feature: string;
    free: string;
    smb: string;
    growth: string;
    scale: string;
}

export interface ComparisonSection {
    category: string;
    rows: ComparisonRow[];
}

export const FEATURE_COMPARISON: ComparisonSection[] = [
    {
        category: "Core Usage",
        rows: [
            { feature: "Active Accounts", free: "25", smb: "200", growth: "1,000", scale: "Unlimited" },
            { feature: "Seats / Users", free: "Unlimited", smb: "Unlimited", growth: "Unlimited", scale: "Unlimited" },
        ],
    },
    {
        category: "AI & Automation",
        rows: [
            { feature: "AI Renewal Sequences", free: "✓", smb: "✓", growth: "✓", scale: "✓" },
            { feature: "Email Approval Workflow", free: "✓", smb: "✓", growth: "✓", scale: "✓" },
            { feature: "Objection Handling AI", free: "Basic", smb: "Smart AI", growth: "Smart AI", scale: "Smart AI" },
            { feature: "Advanced Follow-Ups", free: "—", smb: "✓", growth: "✓", scale: "✓" },
        ],
    },
    {
        category: "Risk Intelligence",
        rows: [
            { feature: "Basic Health Scoring", free: "✓", smb: "✓", growth: "✓", scale: "✓" },
            { feature: "Weighted Health Scoring (5-Factor)", free: "—", smb: "—", growth: "✓", scale: "✓" },
            { feature: "NPS Survey System", free: "—", smb: "—", growth: "✓", scale: "✓" },
            { feature: "Revenue at Risk Dashboard", free: "—", smb: "—", growth: "✓", scale: "✓" },
            { feature: "At-Risk Alerts", free: "—", smb: "✓", growth: "✓", scale: "✓" },
        ],
    },
    {
        category: "Integrations",
        rows: [
            { feature: "Google Sheets", free: "✓", smb: "✓", growth: "✓", scale: "✓" },
            { feature: "HubSpot CRM", free: "—", smb: "✓", growth: "✓", scale: "✓" },
            { feature: "Slack Alerts", free: "—", smb: "✓", growth: "✓", scale: "✓" },
            { feature: "Salesforce", free: "—", smb: "—", growth: "—", scale: "✓" },
            { feature: "Pipedrive", free: "—", smb: "—", growth: "—", scale: "✓" },
        ],
    },
    {
        category: "Reporting & Summaries",
        rows: [
            { feature: "Executive Summary", free: "Weekly (Basic)", smb: "Weekly", growth: "Advanced", scale: "Custom" },
            { feature: "Reporting Dashboard", free: "—", smb: "—", growth: "✓", scale: "Custom" },
            { feature: "Team Performance Leaderboard", free: "—", smb: "—", growth: "✓", scale: "✓" },
        ],
    },
    {
        category: "Support & Onboarding",
        rows: [
            { feature: "Email Support", free: "✓", smb: "✓", growth: "✓", scale: "✓" },
            { feature: "Onboarding Consultation", free: "—", smb: "✓", growth: "✓", scale: "✓" },
            { feature: "Priority Slack Support", free: "—", smb: "—", growth: "—", scale: "✓" },
            { feature: "Dedicated Success Manager", free: "—", smb: "—", growth: "—", scale: "✓" },
        ],
    },
];