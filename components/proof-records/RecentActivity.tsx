import type { AuditEntry } from "@/types";

type RecentActivityProps = {
    auditEntries: AuditEntry[];
};

export default function RecentActivity({
    auditEntries,
}: RecentActivityProps) {
    return (
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

        <p className="mt-5 border-t border-slate-100 pt-3 text-xs text-slate-400">Demo audit history stored in this browser. Not tamper-proof.</p>
    </div>
    );
}