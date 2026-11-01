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

type TransactionEvent = {
  event: string;
  timestamp: string;
};

type TransactionRecord = {
  transactionId: string;
  disputeId: string;
  orderId: string;
  transactionDate: string;
  amount: string;
  currency: string;
  paymentMethod: string;
  paymentStatus: "Completed" | "Pending" | "Refunded";
  customerId: string;
  accountAgeDays: number;
  previousTransactions: number;
  successfulPayments: number;
  previousDisputes: number;
  events: TransactionEvent[];
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


const transactions: TransactionRecord[] = [
  {
    transactionId: "TXN-2026-84721",
    disputeId: "DP-2026-1042",
    orderId: "ORD-2026-51021",
    transactionDate: "2026-10-18T10:30:00",
    amount: "$1,249.00",
    currency: "USD",
    paymentMethod: "PayPal",
    paymentStatus: "Completed",
    customerId: "CUS-10042",
    accountAgeDays: 420,
    previousTransactions: 12,
    successfulPayments: 11,
    previousDisputes: 1,
    events: [
      { event: "Payment initiated", timestamp: "2026-10-18T10:30:00" },
      { event: "Payment completed", timestamp: "2026-10-18T10:30:05" },
      { event: "Order shipped", timestamp: "2026-10-19T14:15:00" },
      { event: "Dispute opened", timestamp: "2026-10-22T11:00:00" },
    ],
  },

  {
    transactionId: "TXN-2026-84720",
    disputeId: "DP-2026-1041",
    orderId: "ORD-2026-51020",
    transactionDate: "2026-10-17T09:15:00",
    amount: "$389.50",
    currency: "USD",
    paymentMethod: "PayPal",
    paymentStatus: "Completed",
    customerId: "CUS-10041",
    accountAgeDays: 180,
    previousTransactions: 6,
    successfulPayments: 6,
    previousDisputes: 0,
    events: [
      { event: "Payment initiated", timestamp: "2026-10-17T09:15:00" },
      { event: "Payment completed", timestamp: "2026-10-17T09:15:04" },
      { event: "Dispute opened", timestamp: "2026-10-22T09:30:00" },
    ],
  },

  {
    transactionId: "TXN-2026-84719",
    disputeId: "DP-2026-1039",
    orderId: "ORD-2026-51019",
    transactionDate: "2026-10-16T12:00:00",
    amount: "$89.99",
    currency: "USD",
    paymentMethod: "PayPal",
    paymentStatus: "Completed",
    customerId: "CUS-10039",
    accountAgeDays: 730,
    previousTransactions: 24,
    successfulPayments: 24,
    previousDisputes: 0,
    events: [
      { event: "Payment initiated", timestamp: "2026-10-16T12:00:00" },
      { event: "Payment completed", timestamp: "2026-10-16T12:00:03" },
      { event: "Dispute opened", timestamp: "2026-10-21T13:00:00" },
    ],
  },

  {
    transactionId: "TXN-2026-84718",
    disputeId: "DP-2026-1037",
    orderId: "ORD-2026-51018",
    transactionDate: "2026-10-15T16:45:00",
    amount: "$2,450.00",
    currency: "USD",
    paymentMethod: "PayPal",
    paymentStatus: "Completed",
    customerId: "CUS-10037",
    accountAgeDays: 95,
    previousTransactions: 3,
    successfulPayments: 3,
    previousDisputes: 0,
    events: [
      { event: "Payment initiated", timestamp: "2026-10-15T16:45:00" },
      { event: "Payment completed", timestamp: "2026-10-15T16:45:06" },
      { event: "Order shipped", timestamp: "2026-10-17T10:00:00" },
      { event: "Dispute opened", timestamp: "2026-10-20T14:00:00" },
    ],
  },

  {
    transactionId: "TXN-2026-84717",
    disputeId: "DP-2026-1034",
    orderId: "ORD-2026-51017",
    transactionDate: "2026-10-14T11:20:00",
    amount: "$156.00",
    currency: "USD",
    paymentMethod: "PayPal",
    paymentStatus: "Completed",
    customerId: "CUS-10034",
    accountAgeDays: 365,
    previousTransactions: 15,
    successfulPayments: 15,
    previousDisputes: 0,
    events: [
      { event: "Payment initiated", timestamp: "2026-10-14T11:20:00" },
      { event: "Payment completed", timestamp: "2026-10-14T11:20:04" },
      { event: "Refund requested", timestamp: "2026-10-18T09:00:00" },
      { event: "Dispute opened", timestamp: "2026-10-19T15:00:00" },
    ],
  },
];

type RiskSignal = {
  title: string;
  explanation: string;
};

function getTransactionRiskSignals(transaction: TransactionRecord): RiskSignal[] {
  const signals: RiskSignal[] = [];
  const successRate = transaction.previousTransactions > 0 ? transaction.successfulPayments / transaction.previousTransactions : 0;
  const amount = Number(transaction.amount.replace(/[^0-9.]/g, ""));
  
  if (transaction.accountAgeDays<90) {
    signals.push({
      title: "New Customer Account",
      explanation: `This account is only ${transaction.accountAgeDays} days old. Newer accounts may warrant additional verification.`,
    });
  }

  if (transaction.previousDisputes >= 1) {
    signals.push({
      title: "Previous Dispute History",
      explanation: `This customer has ${transaction.previousDisputes} previous dispute(s). Review the historical context before making a decision.`,
    });
  }

  if (transaction.previousTransactions > 0 && successRate < 0.8) {
    signals.push({
      title: "Low Payment Success Rate",
      explanation: `Only ${(successRate * 100).toFixed(1)}% of previous transactions were successful. This may warrant further review.`,
    });
  }

  if (amount >= 2000) {
    signals.push({
      title: "High-Value Transaction",
      explanation: `The transaction amount is ${transaction.amount}. Consider additional verification for this higher-value payment.`,
    });
  }

  return signals;
}

type AuditEntry = {
  id: string;
  disputeId: string;
  action: "Evidence collected" | "Evidence unmarked";
  evidence: string;
  timestamp: string;
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
  const selectedTransaction = selected ? transactions.find((transaction)=>transaction.disputeId===selected.id) : undefined;
  const [collectedEvidence, setCollectedEvidence] = useState<string[]>([]);
  const [evidenceLoaded, setEvidenceLoaded] = useState(false);
  const [auditEntries, setAuditEntries] = useState<AuditEntry[]>([]);
  const [auditLoaded, setAuditLoaded] = useState(false);
  
  useEffect(() => {
    try {
      const saved = localStorage.getItem("proofledger-audit");
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.every((item) => item && typeof item.id === "string" && typeof item.disputeId === "string" && (item.action === "Evidence collected" || item.action === "Evidence unmarked") && typeof item.evidence === "string" && typeof item.timestamp === "string")) {
          setAuditEntries(parsed as AuditEntry[]);
        }
      }
    }

    catch {
      console.error("Unable to load audit history.");
    } 
    
    finally {
      setAuditLoaded(true);
    }
  }, []);

  useEffect(()=> {
    if (!auditLoaded) return;
    try {
      localStorage.setItem("proofledger-audit", JSON.stringify(auditEntries));
    }

    catch {
      console.error("Unable to save audit history");
    }
  }, [auditEntries, auditLoaded]);

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

            {selectedTransaction && (
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Transaction Overview</h3>
                    <p className="mt-1 text-sm text-slate-500">Payment details associated with this dispute</p>
                  </div>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">{selectedTransaction.paymentStatus}</span>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <p className="text-xs text-slate-500">Transaction ID</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">{selectedTransaction.transactionId}</p>
                  </div>
                <div>
                  <p className="text-xs text-slate-500">Order ID</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{selectedTransaction.orderId}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Transaction Amount</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{selectedTransaction.amount} {selectedTransaction.currency}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Payment Method</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{selectedTransaction.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Transaction Date</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{new Date(selectedTransaction.transactionDate).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Payment Status</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{selectedTransaction.paymentStatus}</p>
                </div>
              </div>

              <p className="mt-5 border-t border-slate-200 pt-3 text-xs text-slate-500">Demo data: Transaction information is fictional and is not retrieved from a live PayPal account.</p>
            </div>)}

            {selectedTransaction && (
              <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Customer Context</h3>
                  <p className="mt-1 text-sm text-slate-500">Historical account activity associated with this transaction</p>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-500">Customer ID</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">{selectedTransaction.customerId}</p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-500">Account Age</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">{selectedTransaction.accountAgeDays} days</p>
                  </div>
                  
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-500">Previous Transactions</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">{selectedTransaction.previousTransactions}</p>
                  </div>
                  
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-500">Successful Payments</p>
                    <p className="mt-2 text-lg font-semibold text-green-700">{selectedTransaction.successfulPayments}</p>
                  </div>
                  
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-500">Previous Disputes</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">{selectedTransaction.previousDisputes}</p>
                  </div>
                  
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-500">Payment Success Rate</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">{selectedTransaction.previousTransactions > 0 ? `${((selectedTransaction.successfulPayments/selectedTransaction.previousTransactions)*100).toFixed(1)}%` : "N/A"}</p>
                  </div>
                </div>
                
                <p className="mt-4 text-xs text-slate-500">Customer history is fictional demo data. It does not represent verified PayPal customer records.</p>
              </div>
            )}

            {selectedTransaction && (
              <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Transaction Risk Signals</h3>
                    <p className="mt-1 text-sm text-slate-500">Rule-based indicators identified from transaction history</p>
                  </div>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">Explainable Assessment</span>
                </div>
                
                {getTransactionRiskSignals(selectedTransaction).length > 0 ? (
                  <div className="mt-5 space-y-3">
                    {getTransactionRiskSignals(selectedTransaction).map((signal, index) => (
                      <div key={index} className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 text-amber-600">⚠</span>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{signal.title}</p>
                          <p className="mt-1 text-sm text-slate-600">{signal.explanation}</p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
              ) : (
              <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4">
                <p className="text-sm font-semibold text-green-800">No predefined risk indicators triggered</p>
                <p className="mt-1 text-sm text-green-700">The available transaction history did not trigger any of the configured rules. This does not guarantee that the transaction is risk-free.</p>
              </div>
            )}
            <p className="mt-4 text-xs text-slate-500">These indicators are based on predefined demonstration rules and fictional data. They are not validated fraud predictions.</p>
            </div>)}

            {selectedTransaction && (
              <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Transaction Timeline</h3>
                  <p className="mt-1 text-sm text-slate-500">Chronological history of events associated with this transaction</p>
                </div>
                <div className="mt-6 space-y-5">
                  {selectedTransaction.events.map((event, index) => (
                    <div key={`${event.event}-${index}`} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="h-3 w-3 rounded-full bg-blue-600 ring-4 ring-blue-100" />
                        {index !== selectedTransaction.events.length - 1 && (
                          <div className="mt-2 min-h-8 w-px flex-1 bg-slate-200" />
                        )}
                        </div>
                        <div className="pb-2">
                          <p className="text-sm font-semibold text-slate-900">{event.event}</p>
                          <p className="mt-1 text-xs text-slate-500">{new Date(event.timestamp).toLocaleString()}</p>
                        </div>
                      </div>
                    ))
                  }
                </div>
                
                <p className="mt-4 border-t border-slate-200 pt-3 text-xs text-slate-500">Timeline events are fictional demonstration data and have not been retrieved from PayPal or another payment provider.</p>
              </div>
            )}

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
    <h4 className="font-bold text-slate-900">Explainable risk assessment</h4>
    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-amber-800 ring-1 ring-amber-200">Rule-based demo</span>
  </div>

  <p className="mt-2 text-sm text-slate-600">These signals explain review priorities, not the probability of losing a dispute. They are generated from the sample case fields and have not been validated against real outcomes.</p>

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

{/* Evidence completeness calculations */}
{(() => {
  const evidenceItems = getEvidence(selected.reason);
  const collectedCount = evidenceItems.filter((evidence) => collectedEvidence.includes(`${selected.id}-${evidence}`)).length;
  const missingCount = evidenceItems.length-collectedCount;
  const completionPercentage = evidenceItems.length === 0 ? 0 : Math.round((collectedCount / evidenceItems.length) * 100);
  return (
    <>
    {/* Evidence completeness card */}
    <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h4 className="font-bold text-slate-900">Evidence completeness</h4>
        <span className="text-lg font-bold text-emerald-700">{completionPercentage}%</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${completionPercentage}%` }}/></div>
        <div className="mt-3 flex justify-between text-sm">
          <span className="text-emerald-700">{collectedCount} collected</span>
          <span className="text-slate-500">{missingCount} missing</span>
        </div>
        <p className="mt-3 text-sm font-medium text-slate-700">
          {missingCount === 0 ? "All recommended evidence has been confirmed. Ready for merchant review." : `${missingCount} recommended evidence item(s) still need confirmation.`}
        </p>
      </div>

      {/* Evidence checklist */}
      <ul className="mt-4 space-y-3 text-sm text-slate-700">
        {evidenceItems.map((item) => {
          const evidenceKey = `${selected.id}-${item}`;
          const isCollected = collectedEvidence.includes(evidenceKey);
          return (
            <li key={item}>
              <label className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 ${
                isCollected ? "border-emerald-200 bg-emerald-50" : "border-slate-100"
                }`}>
                <input type="checkbox" checked={isCollected} onChange={(event) => {
                  const checked = event.target.checked;
                  setCollectedEvidence((previous) => checked ? previous.includes(evidenceKey) ? previous : [...previous, evidenceKey] : previous.filter((entry) => entry !== evidenceKey));
                  const entry: AuditEntry = {
                    id: crypto.randomUUID(),
                    disputeId: selected.id,
                    action: checked ? "Evidence collected" : "Evidence unmarked",
                    evidence: item,
                    timestamp: new Date().toISOString(),
                  };

                  setAuditEntries((previous) => [entry, ...previous]);
                }} className="mt-1 h-4 w-4 accent-emerald-600" />
                <span>{item}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </>
  );
})()}

<div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
  <p className="text-sm font-semibold text-slate-800">Next step: merchant review</p>
  <p className="mt-1 text-sm leading-6 text-slate-500">
    Review the suggested records, confirm which evidence is available,
    and check the applicable response deadline. ProofLedger does not
    submit evidence or take payment actions automatically.
  </p>
</div>
</div>)}

<div id="proof-records" className="grid grid-cols-1 items-start gap-5 md:grid-cols-2">
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
  <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">Proof Records</p>
  <h3 className="mt-2 text-lg font-bold text-slate-900">Recent activity</h3>
  <p className="mt-1 text-sm text-slate-500">A history of evidence checklist changes in this browser.</p>
  <div className="mt-5 max-h-96 space-y-4 overflow-y-auto pr-2">
    {auditEntries.length === 0 ? (
      <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">No activity yet. Open a dispute and update its evidence checklist.</p>
    ) : (
      auditEntries.slice(0, 10).map((entry) => (
      <div key={entry.id} className="border-l-2 border-emerald-200 pl-4">
        <p className="text-sm font-semibold text-slate-800">{entry.action}</p>
        <p className="mt-1 text-sm text-slate-600">{entry.evidence}</p>
        <p className="mt-1 font-mono text-xs text-slate-400">{entry.disputeId}</p>
        <p className="mt-1 text-xs text-slate-500">{new Date(entry.timestamp).toLocaleString()}</p>
      </div>
      ))
    )}
  </div>

  <p className="mt-5 border-t border-slate-100 pt-3 text-xs text-slate-400">
    Demo audit history stored in this browser. Not tamper-proof.
  </p>
</div>

<div className="md:col-span-2 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
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