"use client";

type PayPalDispute = {
    dispute_id: string;
    status?: string;
    reason?: string;
    dispute_amount?: {
        value?: string;
        currency_code?: string;
    };
    dispute_life_cycle_stage?: string;
    create_time?: string;
};

type LivePayPalDisputesProps = {
    disputes: PayPalDispute[];
    loading: boolean;
    error: string | null;
};

export default function LivePayPalDisputes({
    disputes,
    loading,
    error,
}: LivePayPalDisputesProps) {
    return (
    <section className="overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">PayPal Sandbox · Live API</p>
                    <h3 className="mt-2 text-lg font-bold text-slate-900">Live PayPal Disputes</h3>
                    <p className="mt-1 text-sm text-slate-500">Disputes retrieved directly from your connected Sandbox account.</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">Sandbox data</span>
            </div>
        </div>
        <div className="p-5 sm:p-6">
            {loading ? (
                <p className="text-sm text-slate-500">Retrieving PayPal disputes...</p>
            ) : error ? (
            <p className="rounded-lg bg-rose-50 p-4 text-sm text-rose-700">{error}</p>
        ) : disputes.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <p className="text-lg font-semibold text-slate-800">No Sandbox disputes found</p>
            <p className="mt-2 text-sm leading-6 text-slate-500">PayPal successfully responded to the dispute request, but this Sandbox account currently has no disputes.</p>
            <p className="mt-3 text-xs text-slate-400">Your five fictional demonstration cases remain available in Demo mode.</p>
        </div>
        ) : (
        <div className="space-y-3">
            {disputes.map((dispute) => (
                <article key={dispute.dispute_id} className="rounded-xl border border-slate-200 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="font-mono text-sm font-semibold text-slate-800">{dispute.dispute_id}</p>
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">{dispute.status || "Status unavailable"}</span>
                    </div>
                    
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        <div>
                            <p className="text-xs text-slate-500">Amount</p>
                            <p className="mt-1 text-sm font-semibold text-slate-800">
                                {dispute.dispute_amount ? `${dispute.dispute_amount.value ?? "—"} ${dispute.dispute_amount.currency_code ?? ""}` : "Not provided"}
                            </p>
                        </div>
                        
                        <div>
                            <p className="text-xs text-slate-500">Reason</p>
                            <p className="mt-1 text-sm text-slate-800">{dispute.reason || "Not provided"}</p>
                        </div>
                        
                        <div>
                            <p className="text-xs text-slate-500">Lifecycle stage</p>
                            <p className="mt-1 text-sm text-slate-800">{dispute.dispute_life_cycle_stage || "Not provided"}</p>
                        </div>
                        
                        <div>
                            <p className="text-xs text-slate-500">Created</p>
                            <p className="mt-1 text-sm text-slate-800">
                                {dispute.create_time ? new Date(dispute.create_time).toLocaleString() : "Not provided"}
                            </p>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    )}
    </div>
    </section>
    );
}