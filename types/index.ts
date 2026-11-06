export type Dispute = {
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

export type TransactionEvent = {
    event: string;
    timestamp: string;
};

export type TransactionRecord = {
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

export type RiskSignal = {
    title: string;
    explanation: string;
};

export type EvidenceGuidance = {
    item: string;
    category: string;
    explanation: string;
};

export type AuditEntry = {
    id: string;
    disputeId: string;
    action: "Evidence collected" | "Evidence unmarked";
    evidence: string;
    timestamp: string;
};