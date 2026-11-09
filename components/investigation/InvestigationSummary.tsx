import type { Dispute, TransactionRecord, InvestigationReport } from "@/types";
import { getEvidence } from "@/lib/evidence";

type InvestigationSummaryProps = {
    selected: Dispute;
    selectedTransaction: TransactionRecord | undefined;
    collectedEvidence: string[];
    investigationReport: InvestigationReport | null;
};

export default function InvestigationSummary({
    selected,
    selectedTransaction,
    collectedEvidence,
    investigationReport,
}: InvestigationSummaryProps) {
    const evidenceItems = getEvidence(selected.reason);
    const collectedItems = evidenceItems.filter((item) => collectedEvidence.includes(`${selected.id}-${item}`));
    const missingItems = evidenceItems.filter((item) => !collectedEvidence.includes(`${selected.id}-${item}`));
    const timeline = selectedTransaction?.events ?? [];

    return (
    <div className="mt-6 rounded-2xl border border-violet-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
                <p className="text-xs font-bold uppercase tracking-widest text-violet-600">Investigation intelligence</p>
                <h4 className="mt-2 text-xl font-bold text-slate-900">Investigation Summary</h4>
                <p className="mt-1 text-sm text-slate-500">A structured overview of the selected dispute and its supporting records.</p>
            </div>
            <span className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700">Rule-based demo</span>
        </div>

        {/* Dispute Overview */}
        <div className="mt-5 rounded-xl bg-slate-50 p-4">
            <h5 className="font-semibold text-slate-900">1. Dispute Overview</h5>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                    <p className="text-xs text-slate-500">Customer</p>
                    <p className="mt-1 text-sm font-medium">{selected.customer}</p>
                </div>
                <div>
                    <p className="text-xs text-slate-500">Dispute ID</p>
                    <p className="mt-1 font-mono text-sm">{selected.id}</p>
                </div>
                <div>
                    <p className="text-xs text-slate-500">Disputed Amount</p>
                    <p className="mt-1 text-sm font-medium">{selected.amount}</p>
                </div>
                <div>
                    <p className="text-xs text-slate-500">Dispute Reason</p>
                    <p className="mt-1 text-sm font-medium">{selected.reason}</p>
                </div>
            </div>
        </div>

        {/* Transaction Context */}
        <div className="mt-4 rounded-xl bg-slate-50 p-4">
            <h5 className="font-semibold text-slate-900">2. Transaction Context</h5>
            {selectedTransaction ? (
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div>
                        <p className="text-xs text-slate-500">Transaction ID</p>
                        <p className="mt-1 text-sm font-medium">{selectedTransaction.transactionId}</p>
                    </div>
                <div>
                    <p className="text-xs text-slate-500">Payment Status</p>
                    <p className="mt-1 text-sm font-medium">{selectedTransaction.paymentStatus}</p>
                </div>
                <div>
                    <p className="text-xs text-slate-500">Payment Method</p>
                    <p className="mt-1 text-sm font-medium">{selectedTransaction.paymentMethod}</p>
                </div>
                <div>
                    <p className="text-xs text-slate-500">Order ID</p>
                    <p className="mt-1 text-sm font-medium">{selectedTransaction.orderId}</p>
                </div>
            </div>
            ) : (
            <p className="mt-2 text-sm text-amber-700">No linked transaction record is available.</p>
            )}
        </div>

        {/* Customer History */}
        <div className="mt-4 rounded-xl bg-slate-50 p-4">
            <h5 className="font-semibold text-slate-900">3. Customer History</h5>
            {selectedTransaction ? (
                <p className="mt-2 text-sm leading-6 text-slate-600">
                    Customer account age: {selectedTransaction.accountAgeDays} days.
                    {" "}Previous transactions: {selectedTransaction.previousTransactions}.
                    {" "}Successful payments: {selectedTransaction.successfulPayments}.
                    {" "}Previous disputes: {selectedTransaction.previousDisputes}.
                </p>
            ) : (
            <p className="mt-2 text-sm text-slate-500">Customer transaction history is unavailable.</p>
            )}
        </div>

        {/* AI Investigation Findings */}
        <div className="mt-4 rounded-xl border border-violet-200 bg-violet-50/40 p-4">
        <h5 className="font-semibold text-slate-900">4. AI Investigation Findings</h5>
        {investigationReport ? (
            <div className="mt-3 space-y-4">
                <div>
                    <p className="text-xs font-semibold text-violet-700">GEMINI INVESTIGATION SUMMARY</p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{investigationReport.summary}</p>
                </div>
                <div>
                    <p className="text-sm font-semibold text-slate-800">Key findings</p>
                    <div className="mt-2 space-y-2">
                        {investigationReport.findings.map((finding, index) => (
                            <div key={index} className="rounded-lg border border-violet-100 bg-white p-3">
                                <p className="text-sm font-semibold text-slate-800">{finding.title}</p>
                                <p className="mt-1 text-sm text-slate-600">{finding.explanation}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <p className="text-sm font-semibold text-slate-800">Suggested next steps</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
                        {investigationReport.suggestedNextSteps.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ul>
                </div>
            </div>
            ) : (
            <p className="mt-2 text-sm text-slate-500">No AI investigation report generated yet. Run Gemini Investigation to include its findings in this Proof Record.</p>
        )}
        </div>

        {/* Evidence Status */}
        <div className="mt-4 rounded-xl bg-slate-50 p-4">
            <h5 className="font-semibold text-slate-900">5. Evidence Status</h5>
            <div className="mt-3 flex flex-wrap gap-3 text-sm">
                <span className="rounded-lg bg-emerald-100 px-3 py-2 font-medium text-emerald-800">{collectedItems.length} collected</span>
                <span className="rounded-lg bg-amber-100 px-3 py-2 font-medium text-amber-800">{missingItems.length} outstanding</span>
            </div>

            {collectedItems.length > 0 && (
                <div className="mt-4">
                    <p className="text-xs font-semibold text-slate-600">Merchant-confirmed records</p>
                    <ul className="mt-2 space-y-1">
                        {collectedItems.map((item) => (
                            <li key={item} className="text-sm text-emerald-700">✓ {item}</li>
                        ))}
                    </ul>
                </div>
            )}

            {missingItems.length > 0 && (
                <div className="mt-4">
                    <p className="text-xs font-semibold text-slate-600">Outstanding recommendations</p>
                    <ul className="mt-2 space-y-1">
                        {missingItems.map((item) => (
                            <li key={item} className="text-sm text-amber-700">• {item}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>

        {/* Timeline Findings */}
        <div className="mt-4 rounded-xl bg-slate-50 p-4">
            <h5 className="font-semibold text-slate-900">6. Transaction Timeline Findings</h5>
            {timeline.length > 0 ? (
                <ul className="mt-3 space-y-3">
                    {timeline.map((event, index) => (
                        <li key={`${event.event}-${index}`}>
                            <p className="text-sm font-medium text-slate-800">{event.event}</p>
                            <p className="mt-1 text-xs text-slate-500">{new Date(event.timestamp).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
                ) : (
                <p className="mt-2 text-sm text-slate-500">No transaction timeline events are available!</p>
            )}
        </div>

        {/* Next Step */}
        <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-4">
            <h5 className="font-semibold text-blue-900">7. Recommended Next Step</h5>
            <p className="mt-2 text-sm leading-6 text-blue-800">
                {missingItems.length > 0
                ? `Review and confirm the ${missingItems.length} outstanding evidence item(s). Then assess the available records before deciding how to respond.`
                : "All recommended evidence items have been confirmed by the merchant. Review the available records and applicable response deadline before deciding how to respond."}
            </p>
        </div>

        <p className="mt-4 border-t border-slate-200 pt-3 text-xs leading-5 text-slate-500">This summary is generated using deterministic rules and fictional demonstration data. Merchant confirmations are not independent evidence verification. It is not legal advice or a prediction of dispute outcomes.</p>
    </div>
    );
}