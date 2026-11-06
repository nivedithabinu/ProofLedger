import type { Dispatch, SetStateAction } from "react";
import type { Dispute, TransactionRecord, AuditEntry } from "@/types";
import {
    getEvidence,
    getEvidenceGuidance,
    getEvidencePriority,
    getEvidenceEventLinks,
} from "@/lib/evidence";

type EvidenceIntelligenceProps = {
    selected: Dispute;
    selectedTransaction: TransactionRecord | undefined;
    collectedEvidence: string[];

    setCollectedEvidence: Dispatch<SetStateAction<string[]>>;
    setAuditEntries: Dispatch<SetStateAction<AuditEntry[]>>;
};

export default function EvidenceIntelligence({
    selected,
    selectedTransaction,
    collectedEvidence,
    setCollectedEvidence,
    setAuditEntries,
}: EvidenceIntelligenceProps) {
    const evidenceItems = getEvidence(selected.reason);
    const collectedCount = evidenceItems.filter((evidence) => collectedEvidence.includes(`${selected.id}-${evidence}`)).length;
    const missingCount = evidenceItems.length - collectedCount;
    const completionPercentage = evidenceItems.length === 0 ? 0 : Math.round((collectedCount / evidenceItems.length) * 100);
    const missingEvidence = getEvidenceGuidance(selected.reason).filter((evidence) => !collectedEvidence.includes(`${selected.id}-${evidence.item}`));

    return (
    <>
    {/* Evidence completeness card */}
    <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="font-bold text-slate-900">Evidence completeness</h4>
            <span className="text-lg font-bold text-emerald-700">{completionPercentage}%</span>
        </div>

        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${completionPercentage}%` }}/>
        </div>

        <div className="mt-3 flex justify-between text-sm">
            <span className="text-emerald-700">{collectedCount} collected</span>
            <span className="text-slate-500">{missingCount} missing</span>
        </div>

        <p className="mt-3 text-sm font-medium text-slate-700">
            {missingCount === 0 ? "All recommended evidence has been confirmed. Ready for merchant review." : `${missingCount} recommended evidence item(s) still need confirmation.`}
        </p>
    </div>

    {/* Missing evidence detection */}
    <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50/50 p-5">
    <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
            <h4 className="font-bold text-slate-900">Missing Evidence Detection</h4>
            <p className="mt-1 text-sm text-slate-600">Evidence recommendations not yet confirmed by the merchant.</p>
        </div>

        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">{missingEvidence.length} outstanding</span>
    </div>

    {missingEvidence.length > 0 ? (
        <div className="mt-4 space-y-3">
            {missingEvidence.map((evidence) => {
                const priority = getEvidencePriority(selected.reason, evidence.category);
                return (
                <div key={evidence.item} className="rounded-lg border border-amber-100 bg-white p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-slate-800">{evidence.item}</p>
                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            priority === "High" ? "bg-rose-50 text-rose-700" : "bg-amber-50 text-amber-700"
                        }`}>{priority} review priority</span>
                    </div>

                    <p className="mt-2 text-xs leading-5 text-slate-500">{evidence.explanation}</p>
                </div>
                );
            })}
        </div>
        ) : (
        <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-sm font-semibold text-emerald-800">All recommended evidence items have been confirmed.</p>
            <p className="mt-1 text-xs text-emerald-700">The merchant can proceed to review the available records.</p>
        </div>
    )}

    <p className="mt-4 text-xs text-slate-500">Review priorities are generated using configurable demonstration rules. Outstanding means not yet confirmed, not necessarily unavailable.</p>
    </div>

    {/* Evidence-to-Transaction Links */}
    <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50/40 p-5">
    <h4 className="font-bold text-slate-900">Evidence-to-Transaction Links</h4>
    <p className="mt-1 text-sm text-slate-600">Suggested relationships between recommended evidence and recorded transaction events.</p>
    {selectedTransaction ? (
        <div className="mt-4 space-y-3">
            {getEvidenceEventLinks(getEvidenceGuidance(selected.reason), selectedTransaction.events).map((link) => (
                <div key={link.evidence} className="rounded-lg border border-slate-200 bg-white p-4">
                    <p className="text-sm font-semibold text-slate-800">{link.evidence}</p>
                    <div className="my-2 flex items-center gap-2 text-xs text-blue-600">
                        <span>↓ Suggested event relationship</span>
                    </div>
                    {link.event ? (
                        <>
                        <p className="text-sm font-medium text-emerald-700">{link.event.event}</p>
                        <p className="mt-1 text-xs text-slate-500">{new Date(link.event.timestamp).toLocaleString()}</p>
                    </>
                    ) : (
                    <p className="text-sm text-amber-700">No directly matching transaction event is currently recorded.</p>
                    )}
                </div>
            ))}
        </div>
        ) : (
        <p className="mt-4 text-sm text-slate-500">No transaction record is available for this dispute.</p>
    )}

    <p className="mt-4 text-xs text-slate-500">Suggested links are generated using demonstration matching rules. They do not establish that evidence exists or verify an event.</p>
    </div>

    {/* Evidence checklist */}
    <ul className="mt-4 space-y-3 text-sm text-slate-700">
        {getEvidenceGuidance(selected.reason).map((evidence) => {
            const item = evidence.item;
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
                }} className="mt-1 h-4 w-4 accent-emerald-600"/>

                <div className="flex-1">
                    <p className="font-medium text-slate-800">{item}</p>
                    <span className="mt-2 inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">{evidence.category}</span>
                    <p className="mt-2 text-xs leading-5 text-slate-500">Why it matters: {evidence.explanation}</p>
                </div>
            </label>
        </li>
        );
        })}
    </ul>
</>
);
}