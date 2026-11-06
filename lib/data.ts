import type {
    Dispute,
    TransactionRecord
} from "@/types";

export const disputes: Dispute[] = [
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

export const transactions: TransactionRecord[] = [
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

export const metrics = [
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
        tone: "text-rose-600 bg-rose-50"
    },

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