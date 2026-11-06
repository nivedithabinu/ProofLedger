import type { TransactionRecord } from "@/types";
import { getTransactionRiskSignals } from "@/lib/risk";

type TransactionIntelligenceProps = {
    selectedTransaction: TransactionRecord | undefined;
};

export default function TransactionIntelligence({
    selectedTransaction,
}: TransactionIntelligenceProps) {
    if (!selectedTransaction) return null;
    const riskSignals = getTransactionRiskSignals(selectedTransaction);
    return (
    <>
    {/* Transaction Overview */}
    <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
                <h3 className="text-lg font-semibold text-slate-900">Transaction Overview</h3>
                <p className="mt-1 text-sm text-slate-500">Payment details associated with this dispute</p></div>
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
    </div>

    {/* Customer Context */}
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
                <p className="mt-2 text-lg font-semibold text-slate-900">
                    {selectedTransaction.previousTransactions > 0 ? `${((selectedTransaction.successfulPayments / selectedTransaction.previousTransactions) * 100).toFixed(1)}%`: "N/A"}
                </p>
            </div>
        </div>

        <p className="mt-4 text-xs text-slate-500">Customer history is fictional demo data. It does not represent verified PayPal customer records.</p>
    </div>

    {/* Transaction Risk Signals */}
    <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
                <h3 className="text-lg font-semibold text-slate-900">Transaction Risk Signals</h3>
                <p className="mt-1 text-sm text-slate-500">Rule-based indicators identified from transaction history</p>
            </div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">Explainable Assessment</span>
        </div>
        {riskSignals.length > 0 ? (
            <div className="mt-5 space-y-3">
                {riskSignals.map((signal, index) => (
                    <div key={index} className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                        <div className="flex items-start gap-3">
                            <span className="mt-0.5 text-amber-600">⚠</span>
                            <div>
                                <p className="text-sm font-semibold text-slate-900">{signal.title}</p>
                                <p className="mt-1 text-sm text-slate-600">{signal.explanation}</p>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
                ) : (
                <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4">
                    <p className="text-sm font-semibold text-green-800">No predefined risk indicators triggered</p>
                    <p className="mt-1 text-sm text-green-700">The available transaction history did not trigger any of the configured rules. This does not guarantee that the transaction is risk-free.</p>
                </div>
            )}

            <p className="mt-4 text-xs text-slate-500">These indicators are based on predefined demonstration rules and fictional data. They are not validated fraud predictions.</p>
        </div>

        {/* Transaction Timeline */}
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
                ))}
            </div>

            <p className="mt-4 border-t border-slate-200 pt-3 text-xs text-slate-500">Timeline events are fictional demonstration data and have not been retrieved from PayPal or another payment provider.</p>
        </div>
        </>
    );
}