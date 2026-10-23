"use client";
import { 
  useMemo, useState, useEffect,
} from "react";

type Dispute = {
  id: string;
  customer: string;
  amount: string;
  reason: string;
  date: string;
  risk: "High" | "Medium" | "Low";
  status: "Evidence needed" | "Under review" | "Evidence ready";
  initials: string;
  color: string;
};

const disputes: Dispute[] = [
  {
    id: "DP-2026-1042",
    customer: "Olivia Martin",
    amount: "$1,249.00",
    reason: "Item not received",
    date: "Oct 22, 2026",
    risk: "High",
    status: "Evidence needed",
    initials: "OM",
    color: "bg-violet-100 text-violet-700",
  },

  {
    id: "DP-2026-1041",
    customer: "James Wilson",
    amount: "$389.50",
    reason: "Unrecognized transaction",
    date: "Oct 22, 2026",
    risk: "Medium",
    status: "Under review",
    initials: "JW",
    color: "bg-blue-100 text-blue-700",
  },

  {
    id: "DP-2026-1039",
    customer: "Sophia Chen",
    amount: "$89.99",
    reason: "Duplicate charge",
    date: "Oct 21, 2026",
    risk: "Low",
    status: "Evidence ready",
    initials: "SC",
    color: "bg-rose-100 text-rose-700",
  },

  {
    id: "DP-2026-1037",
    customer: "Noah Williams",
    amount: "$2,450.00",
    reason: "Item not as described",
    date: "Oct 20, 2026",
    risk: "High",
    status: "Under review",
    initials: "NW",
    color: "bg-amber-100 text-amber-700",
  },

  {
    id: "DP-2026-1034",
    customer: "Emma Thompson",
    amount: "$156.00",
    reason: "Refund not received",
    date: "Oct 19, 2026",
    risk: "Medium",
    status: "Evidence ready",
    initials: "ET",
    color: "bg-emerald-100 text-emerald-700",
  },
];

type RiskSignal = {
  title: string;
  explanation: string;
};

function getEvidence(reason: string): string[] {
  switch (reason) {
    case "Item not received":
      return [
        "Order confirmation and transaction details",
        "Shipping tracking and delivery confirmation",
        "Customer communication about delivery",
      ];
    
    case "Unrecognized transaction":
      return [
        "Transaction details and payment reference",
        "Available order and fulfillment records",
        "Customer communications or account activity records",
      ];
    
    case "Duplicate charge":
      return [
        "Transaction IDs and timestamps for both charges",
        "Payment processor records showing each charge",
        "Refund or reversal records, if applicable",
      ];

    case "Item not as described":
      return [
        "Original product listing and description",
        "Order details and fulfillment records",
        "Customer complaint and resolution communications",
      ];

    case "Refund not received":
      return [
        "Original transaction and refund policy",
        "Refund initiation and processing records",
        "Payment processor reference and customer communications",
      ];

    default:
      return [
        "Order confirmation and transaction details",
        "Relevant fulfillment or service records",
        "Customer communications and resolution history",
      ];  
  }
}

function getRiskSignals(dispute: Dispute): RiskSignal[] {
  const signals: RiskSignal[] = [];
  if (dispute.status==="Evidence needed") {
    signals.push({
      title: "Evidence collection needed",
      explanation: "This demo case is marked as needing evidence. Review the relevant records before deciding on a response.",
    })
  }

  return signals;
}

const metrics = [
  { 
    label: "Open disputes", 
    value: "24", 
    change: "+4 this week", 
    icon: "◈", 
    tone: "text-blue-600 bg-blue-50" 
  },

  { 
    label: "Amount at risk", 
    value: "$12,840", 
    change: "Across open cases", 
    icon: "$", 
    tone: "text-rose-600 bg-rose-50" },
  
  { 
    label: "Evidence ready", 
    value: "18", 
    change: "Awaiting review", 
    icon: "✓", 
    tone: "text-emerald-600 bg-emerald-50" 
  },
  
  { 
    label: "Response rate", 
    value: "94.2%", 
    change: "+2.4% this month", 
    icon: "↗", 
    tone: "text-violet-600 bg-violet-50" 
  },
];

function RiskBadge({ risk }: { risk: string }) {
  const styles: Record<string, string> = {
    High: "bg-rose-50 text-rose-700 ring-rose-200",
    Medium: "bg-amber-50 text-amber-700 ring-amber-200",
    Low: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  };

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styles[risk]}`}>● {risk}</span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "Evidence needed": "bg-rose-50 text-rose-700",
    "Under review": "bg-blue-50 text-blue-700",
    "Evidence ready": "bg-emerald-50 text-emerald-700",
  };

  return (
    <span className={`inline-flex rounded-md px-2 py-1 text-xs font-medium ${styles[status]}`}>{status}</span>
  );
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState<Dispute | null>(null);
  const [collectedEvidence, setCollectedEvidence] = useState<string[]>([]);
  const [evidenceLoaded, setEvidenceLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("proofledger-evidence");
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.every((item) => typeof item === "string")) {
          setCollectedEvidence(parsed);
        }
      }
    }

    catch {
      console.error("Unable to load saved evidence");
    }

    finally {
      setEvidenceLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!evidenceLoaded) return;
    try {
      localStorage.setItem("proofledger-evidence", JSON.stringify(collectedEvidence));
    }

    catch {
      console.error("Unable to save evidence.");
    }
  }, [collectedEvidence, evidenceLoaded]);

  const filteredDisputes = useMemo(() => {
    const query = search.trim().toLowerCase();
    return disputes.filter((dispute) => {
      const matchesSearch = [
        dispute.id,
        dispute.customer,
        dispute.reason,
      ].some((value) => value.toLowerCase().includes(query));

      const matchesRisk = riskFilter === "All" || dispute.risk === riskFilter;
      const matchesStatus = statusFilter === "All" || dispute.status === statusFilter;

      return matchesSearch && matchesRisk && matchesStatus;
    });

  },

  [search, riskFilter, statusFilter]);

  return (
    <main className="min-h-screen bg-[#f6f8fc] text-slate-800">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 flex-col bg-[#10182b] text-slate-300 lg:flex">
          <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-xl font-bold text-white">P</div>
            <div>
              <p className="text-lg font-bold text-white">ProofLedger</p>
              <p className="text-xs text-slate-400">Dispute intelligence</p>
            </div>
          </div>

          <div className="px-4 py-6">
            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Workspace</p>
            <nav className="space-y-1">
              <a href="#overview" className="block rounded-lg bg-blue-500/15 px-3 py-3 text-sm font-semibold text-blue-300">▦　Overview</a>
              <a href="#disputes" className="block rounded-lg px-3 py-3 text-sm hover:bg-white/5">◈　Disputes</a>
              <a href="#investigation" className="block rounded-lg px-3 py-3 text-sm hover:bg-white/5">⌕　Investigations</a>
              <a href="#proof-records" className="block rounded-lg px-3 py-3 text-sm hover:bg-white/5">▤　Proof Records</a>
            </nav>
          </div>

          <div className="mt-auto p-4">
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <p className="mb-2 text-xs font-semibold text-white">● Demo environment</p>
              <p className="text-xs leading-5 text-slate-400">Fictional sample data only. No live PayPal account connected.</p>
            </div>
          </div>
        </aside>

        <section id="overview" className="min-w-0 flex-1">
          <header className="flex min-h-20 flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 py-4 sm:px-8">
            <div>
              <p className="text-xs text-slate-500">Workspace / Overview</p>
              <h1 className="mt-1 text-xl font-bold text-slate-900">Risk & dispute overview</h1>
            </div>
            <span className="rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-600">● Demo mode</span>
          </header>

          <div className="mx-auto max-w-[1500px] space-y-7 p-5 sm:p-8">
            <div>
              <p className="text-sm font-medium text-blue-600">MERCHANT WORKSPACE</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Good evening 👋</h2>
              <p className="mt-2 text-sm text-slate-500">Investigate disputes, organize evidence, and make informed decisions.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">{metrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-500">{metric.label}</p>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg font-bold ${metric.tone}`}>{metric.icon}</div>
                  </div>
                  <p className="mt-4 text-3xl font-bold text-slate-900">{metric.value}</p>
                  <p className="mt-2 text-xs text-slate-500">{metric.change}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 rounded-2xl border border-amber-200 bg-amber-50/70 p-5 sm:flex-row sm:items-center">
              <div className="flex-1">
                <p className="font-semibold text-slate-900">Prioritize disputes that need attention</p>
                <p className="mt-1 text-sm text-slate-600">Review high-risk cases and identify missing evidence.</p>
              </div>
              <a href="#disputes" className="rounded-lg border border-amber-300 bg-white px-4 py-2.5 text-center text-sm font-semibold text-amber-800 hover:bg-amber-100">Review cases ↓</a>
            </div>

            <div id="disputes" className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
                <h3 className="font-bold text-slate-900">Dispute explorer</h3>
                <p className="mt-1 text-xs text-slate-500">Search cases, filter by risk, or open a dispute to investigate it.</p>

                <div className="mt-5 grid gap-3 md:grid-cols-3">
                  <div className="md:col-span-1">
                    <label htmlFor="dispute-search" className="mb-1.5 block text-xs font-semibold text-slate-600">Search disputes</label>
                    <input
                      id="dispute-search"
                      type="search"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Customer, ID, or reason..."
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label htmlFor="risk-filter" className="mb-1.5 block text-xs font-semibold text-slate-600">Risk level</label>
                    <select id="risk-filter" value={riskFilter} onChange={(event) => setRiskFilter(event.target.value)} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500">
                      <option>All</option>
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="status-filter" className="mb-1.5 block text-xs font-semibold text-slate-600">Case status</label>
                    <select id="status-filter" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500">
                      <option>All</option>
                      <option>Evidence needed</option>
                      <option>Under review</option>
                      <option>Evidence ready</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs text-slate-500">Showing <strong>{filteredDisputes.length}</strong> of {disputes.length} sample cases</p>
                  <button onClick={() => { 
                    setSearch(""); 
                    setRiskFilter("All"); 
                    setStatusFilter("All"); 
                  }} className="text-xs font-semibold text-blue-600 hover:text-blue-800">Clear filters</button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[850px] text-left text-sm">
                  <thead className="bg-slate-50/80 text-xs text-slate-500">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Customer</th>
                      <th className="px-4 py-4 font-semibold">Dispute ID</th>
                      <th className="px-4 py-4 font-semibold">Amount</th>
                      <th className="px-4 py-4 font-semibold">Reason</th>
                      <th className="px-4 py-4 font-semibold">Risk</th>
                      <th className="px-4 py-4 font-semibold">Status</th>
                      <th className="px-4 py-4 font-semibold">Open</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">{filteredDisputes.map((dispute) => (
                      <tr key={dispute.id} className="transition hover:bg-blue-50/50">
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${dispute.color}`}>{dispute.initials}</div>
                            <span className="font-semibold text-slate-800">{dispute.customer}</span>
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 font-mono text-xs text-slate-500">{dispute.id}</td>
                        <td className="whitespace-nowrap px-4 py-4 font-semibold">{dispute.amount}</td>
                        <td className="whitespace-nowrap px-4 py-4 text-slate-600">{dispute.reason}</td>
                        <td className="whitespace-nowrap px-4 py-4"><RiskBadge risk={dispute.risk} /></td>
                        <td className="whitespace-nowrap px-4 py-4"><StatusBadge status={dispute.status} /></td>
                        <td className="whitespace-nowrap px-4 py-4">

                          <button onClick={() => setSelected(dispute)} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-blue-700 hover:border-blue-300 hover:bg-blue-50">
                            Investigate →
                          </button>
                        </td>
                      </tr>
                    ))}

                    {filteredDisputes.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-6 py-12 text-center">
                          <p className="font-semibold text-slate-700">No matching disputes</p>
                          <p className="mt-1 text-sm text-slate-500">Try another search or clear your filters.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {selected && (
              <div id="investigation" className="rounded-2xl border border-blue-200 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-blue-600">Investigation workspace · Demo</p>
                    <h3 className="mt-2 text-xl font-bold text-slate-900">{selected.customer}</h3>
                    <p className="mt-1 font-mono text-xs text-slate-500">{selected.id}</p>
                  </div>
                  <button onClick={() => setSelected(null)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50">Close ✕</button>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs text-slate-500">Dispute amount</p><p className="mt-1 font-bold text-slate-900">{selected.amount}</p></div>
                  <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs text-slate-500">Reason</p><p className="mt-1 font-semibold text-slate-900">{selected.reason}</p></div>
                  <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs text-slate-500">Risk level</p><div className="mt-2"><RiskBadge risk={selected.risk} /></div></div>
                  <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs text-slate-500">Current status</p><div className="mt-2"><StatusBadge status={selected.status} /></div></div>
                </div>

                
<div className="mt-6 rounded-xl border border-amber-200 bg-amber-50/60 p-5">
  <div className="flex flex-wrap items-center justify-between gap-2">
    <h4 className="font-bold text-slate-900">
      Explainable risk assessment
    </h4>
    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-amber-800 ring-1 ring-amber-200">
      Rule-based demo
    </span>
  </div>

  <p className="mt-2 text-sm text-slate-600">
    These signals explain review priorities, not the probability
    of losing a dispute. They are generated from the sample case
    fields and have not been validated against real outcomes.
  </p>

  <div className="mt-4 space-y-3">
    {getRiskSignals(selected).map((signal) => (
      <div key={signal.title} className="rounded-lg border border-amber-100 bg-white p-4">
        <p className="text-sm font-semibold text-slate-900">
          {signal.title}
        </p>
        <p className="mt-1 text-sm leading-6 text-slate-600">
          {signal.explanation}
        </p>
      </div>
    ))}
  </div>
</div>

<h4 className="mt-6 font-bold text-slate-900">Recommended evidence</h4>
<p className="mt-1 text-sm text-slate-500">Check an item only after you have confirmed that the record is available.</p>

<p className="mt-2 text-sm font-medium text-slate-700">
  {getEvidence(selected.reason).filter((item) =>
  collectedEvidence.includes(`${selected.id}-${item}`)).length} of {getEvidence(selected.reason).length} records confirmed
</p>

<ul className="mt-4 space-y-3 text-sm text-slate-700">
  {getEvidence(selected.reason).map((item) => {
    const evidenceKey = `${selected.id}-${item}`;
    const isCollected = collectedEvidence.includes(evidenceKey);
    return (
      <li key={item}>
        <label className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 ${
            isCollected ? "border-emerald-200 bg-emerald-50" : "border-slate-100"}`}>
          <input type="checkbox" checked={isCollected} onChange={(event) => {
            setCollectedEvidence((previous) => event.target.checked ? [...previous, evidenceKey] : previous.filter((entry) => entry !== evidenceKey));
          }}
          className="mt-1 h-4 w-4 accent-emerald-600"/>
          <span>{item}</span>
        </label>
      </li>
    );
  })}
</ul>

<div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
  <p className="text-sm font-semibold text-slate-800">Next step: merchant review</p>
  <p className="mt-1 text-sm leading-6 text-slate-500">
    Review the suggested records, confirm which evidence is available,
    and check the applicable response deadline. ProofLedger does not
    submit evidence or take payment actions automatically.
  </p>
</div>
</div>)}

<div id="proof-records" className="grid gap-5 lg:grid-cols-2">
  <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
  <p className="text-xs font-bold uppercase tracking-widest text-blue-600">How it works</p>
  <h3 className="mt-2 text-lg font-bold text-slate-900">Every decision needs proof.</h3>
  <p className="mt-2 text-sm leading-6 text-slate-500">Connect dispute signals, evidence, recommendations, and merchant decisions in one auditable workflow.</p>
  <div className="mt-5 flex flex-wrap gap-2">
    {["Detect", "Investigate", "Prove", "Decide", "Audit"].map((step, index) => (
      <span key={step} className="rounded-lg bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
        <span className="text-blue-600">{index + 1}. </span>{step}
        </span>
    ))}
  </div>
</div>

<div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
<p className="text-xs font-bold uppercase tracking-widest text-violet-600">Product roadmap</p>
<h3 className="mt-2 text-lg font-bold text-slate-900">Evidence before decisions</h3>
<p className="mt-3 text-sm leading-6 text-slate-500">Next: transaction context, explainable risk signals, evidence tracking, and human-approved recommendations.</p>
<div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
  <p className="text-sm font-semibold text-slate-700">Investigation engine</p>
  <p className="mt-1 text-xs text-slate-500">Planned feature · Not connected yet</p>
  </div>
  </div>
</div>

<footer className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 py-5 text-xs text-slate-400">
  <span>ProofLedger © 2026</span>
  <span>Prototype · All dispute data is fictional</span>
  </footer>
  </div>
  </section>
  </div>
  </main>
);
}