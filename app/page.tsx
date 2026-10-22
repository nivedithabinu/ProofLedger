const disputes = [
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

const metrics = [
  {
    label: "Open disputes",
    value: "24",
    change: "+4 this week",
    icon: "◈",
    tone: "text-blue-600 bg-blue-50",
  },

  {
    label: "Amount at risk",
    value: "$12,840",
    change: "Across open cases",
    icon: "$",
    tone: "text-rose-600 bg-rose-50",
  },

  {
    label: "Evidence ready",
    value: "18",
    change: "Awaiting review",
    icon: "✓",
    tone: "text-emerald-600 bg-emerald-50",
  },

  {
    label: "Response rate",
    value: "94.2%",
    change: "+2.4% this month",
    icon: "↗",
    tone: "text-violet-600 bg-violet-50",
  },
];

function RiskBadge({ risk }: { risk: string }) {
  const styles: Record<string, string> = {
    High: "bg-rose-50 text-rose-700 ring-rose-200",
    Medium: "bg-amber-50 text-amber-700 ring-amber-200",
    Low: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  };

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styles[risk]}`}>
      <span className="mr-1.5">●</span>
      {risk}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "Evidence needed": "bg-rose-50 text-rose-700",
    "Under review": "bg-blue-50 text-blue-700",
    "Evidence ready": "bg-emerald-50 text-emerald-700",
  };

  return (
    <span className={`inline-flex rounded-md px-2 py-1 text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f6f8fc] text-slate-800">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 flex-col bg-[#10182b] text-slate-300 lg:flex">
          <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-xl font-bold text-white">P</div>
            <div>
              <p className="text-lg font-bold tracking-tight text-white">ProofLedger</p>
              <p className="text-xs text-slate-400">Dispute intelligence</p>
            </div>
          </div>

          <div className="px-4 py-6">
            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Workspace</p>
            <nav className="space-y-1">
              <a href="#overview" className="flex items-center gap-3 rounded-lg bg-blue-500/15 px-3 py-3 text-sm font-semibold text-blue-300">
                <span>▦</span> Overview
              </a>

              <a href="#disputes" className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition hover:bg-white/5 hover:text-white">
                <span>◈</span> Disputes
                <span className="ml-auto rounded-md bg-white/10 px-2 py-0.5 text-xs">24</span>
              </a>

              <a href="#investigation" className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition hover:bg-white/5 hover:text-white">
                <span>⌕</span> Investigations
              </a>

              <a href="#proof-records" className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition hover:bg-white/5 hover:text-white">
                <span>▤</span> Proof Records
              </a>
            </nav>

            <p className="mb-3 mt-9 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Management</p>
            <nav className="space-y-1">
              <a href="#activity" className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition hover:bg-white/5 hover:text-white">
                <span>◷</span> Activity log
              </a>

              <a href="#settings" className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition hover:bg-white/5 hover:text-white">
                <span>⚙</span> Settings
              </a>
            </nav>
          </div>

          <div className="mt-auto p-4">
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-semibold text-white">Demo environment</span>
              </div>
              <p className="text-xs leading-5 text-slate-400">Sample data only. No live PayPal account connected.</p>
            </div>

            <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-400/20 text-sm font-bold text-indigo-200">NB</div>
              <div>
                <p className="text-sm font-medium text-white">Merchant workspace</p>
                <p className="text-xs text-slate-400">Demo account</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main workspace */}
        <section id="overview" className="min-w-0 flex-1">
          <header className="flex min-h-20 flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 py-4 sm:px-8">
            <div>
              <p className="text-xs text-slate-500">Workspace / Overview</p>
              <h1 className="mt-1 text-xl font-bold tracking-tight text-slate-900">Risk & dispute overview</h1>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-600 sm:flex">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />Demo mode</span>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-700">NB</div>
            </div>
          </header>

          <div className="mx-auto max-w-[1500px] space-y-7 p-5 sm:p-8">
            {/* Welcome */}
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-blue-600">THURSDAY, OCTOBER 22</p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Good evening 👋</h2>
                <p className="mt-2 text-sm text-slate-500">Here&apos;s what&apos;s happening with your disputes today.</p>
              </div>

              <a href="#disputes" className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
                View disputes <span>→</span>
              </a>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {metrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-500">
                      {metric.label}
                    </p>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg font-bold ${metric.tone}`}>{metric.icon}</div>
                  </div>
                  <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900">{metric.value}</p>
                  <p className="mt-2 text-xs text-slate-500">{metric.change}</p>
                </div>
              ))}
            </div>

            {/* Priority alert */}
            <div id="investigation" className="flex flex-col gap-4 rounded-2xl border border-amber-200 bg-amber-50/70 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg text-amber-700">!</div>
                <div>
                  <p className="font-semibold text-slate-900">3 disputes need your attention</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">Review high-risk cases and prepare evidence before their response deadlines.</p>
                </div>
              </div>

              <a href="#disputes" className="shrink-0 self-start rounded-lg border border-amber-300 bg-white px-4 py-2.5 text-sm font-semibold text-amber-800 transition hover:bg-amber-100 sm:self-center">Review cases</a>
            </div>

            {/* Table */}
            <div id="disputes" className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-5 sm:px-6">
                <div>
                  <h3 className="font-bold text-slate-900">Recent disputes</h3>
                  <p className="mt-1 text-xs text-slate-500">Track cases and prioritize your next action.</p>
                </div>
                <span className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600">5 sample cases</span>
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
                      <th className="px-4 py-4 font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {disputes.map((dispute) => (
                      <tr key={dispute.id} className="transition hover:bg-slate-50/80">
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${dispute.color}`}>{dispute.initials}</div>
                            <span className="font-semibold text-slate-800">{dispute.customer}</span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 font-mono text-xs text-slate-500">{dispute.id}</td>
                        <td className="whitespace-nowrap px-4 py-4 font-semibold text-slate-800">{dispute.amount}</td>
                        <td className="whitespace-nowrap px-4 py-4 text-slate-600">{dispute.reason}</td>
                        <td className="whitespace-nowrap px-4 py-4"><RiskBadge risk={dispute.risk} /></td>
                        <td className="whitespace-nowrap px-4 py-4">
                          <StatusBadge status={dispute.status} />
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-xs text-slate-500">{dispute.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 px-6 py-4 text-xs text-slate-500">
                <span>Showing 5 of 24 sample disputes</span>
                <a href="#proof-records" className="font-semibold text-blue-600 hover:text-blue-800">Explore Proof Records →</a>
              </div>
            </div>

            {/* Product workflow */}
            <div id="proof-records" className="grid gap-5 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-600">How it works</p>
                <h3 className="mt-2 text-lg font-bold text-slate-900">Every decision needs proof.</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">ProofLedger is designed to connect dispute signals, evidence, recommendations, and merchant decisions in one auditable workflow.</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["Detect", "Investigate", "Prove", "Decide", "Audit"].map(
                    (step, index) => (
                      <span key={step} className="inline-flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                        <span className="text-blue-600">{index + 1}.</span>
                        {step}
                      </span>
                    ),
                  )}
                </div>
              </div>

              <div id="activity" className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-violet-600">Investigation workspace</p>
                    <h3 className="mt-2 text-lg font-bold text-slate-900">Evidence before decisions</h3>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-xl text-violet-600">◈</div>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-500">The next stage will add transaction context, explainable risk signals, evidence checklists, and human-approved recommendations.</p>
                <div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-700">Investigation engine</p>
                  <p className="mt-1 text-xs text-slate-500">Planned feature · Not connected yet</p>
                </div>
              </div>
            </div>

            <footer id="settings" className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 py-5 text-xs text-slate-400">
              <span>ProofLedger © 2026</span>
              <span>Prototype · All dispute data is fictional</span>
            </footer>
          </div>
        </section>
      </div>
    </main>
  );
}