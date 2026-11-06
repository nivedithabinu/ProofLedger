import type { Dispute, TransactionRecord, RiskSignal } from "@/types";

export function getTransactionRiskSignals(transaction: TransactionRecord): RiskSignal[] {
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

export function getRiskSignals(dispute: Dispute): RiskSignal[] {
    const signals: RiskSignal[] = [];
    if (dispute.status==="Evidence needed") {
        signals.push({
            title: "Evidence collection needed",
            explanation: "This demo case is marked as needing evidence. Review the relevant records before deciding on a response.",
        })
    }
    return signals;
}