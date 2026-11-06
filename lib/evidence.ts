import type { EvidenceGuidance, TransactionEvent } from "@/types";

export function getEvidence(reason: string): string[] {
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

export function getEvidenceGuidance(reason: string): EvidenceGuidance[] {
    return getEvidence(reason).map((item) => {
        const text = item.toLowerCase();

        let category = "Supporting records";
        let explanation ="Provides additional context that may help the merchant review this dispute.";

        if (text.includes("customer") || text.includes("communication") || text.includes("complaint")) {
            category = "Communication records";
            explanation = "Provides context about customer interactions, complaints, and attempts to resolve the issue.";
        }

        else if (text.includes("refund") || text.includes("reversal")) {
            category = "Refund records";
            explanation = "Helps establish whether a refund or payment reversal was requested, initiated, or processed.";
        }

        else if (text.includes("shipping") || text.includes("delivery") || text.includes("fulfillment")) {
            category = "Delivery records";
            explanation = "Helps establish the fulfillment, dispatch, and delivery status of the order.";
        }

        else if (text.includes("transaction") || text.includes("payment")) {
            category = "Transaction records";
            explanation = "Helps identify the disputed payment using transaction references, amounts, and payment records.";
        }

        else if (text.includes("product listing") || text.includes("description")) {
            category = "Product records";
            explanation = "Helps compare the original product representation with the customer's reported complaint.";
        }

        else if (text.includes("order")) {
            category = "Order records";
            explanation = "Helps establish what was ordered and connect the order to the disputed transaction.";
        }

        return {
            item,
            category,
            explanation,
        };
    });
}

export function getEvidencePriority(reason: string, category: string): "High" | "Medium" {
    const highPriorityCategories: Record<string, string[]> = {
        "Item not received": ["Delivery records"],
        "Unrecognized transaction": ["Transaction records"],
        "Duplicate charge": ["Transaction records", "Refund records"],
        "Item not as described": ["Product records"],
        "Refund not received": ["Refund records"],
    };

    const priorities = highPriorityCategories[reason] ?? [];
    return priorities.includes(category) ? "High" : "Medium";
}

export function getEvidenceEventLinks(evidenceItems: EvidenceGuidance[], events: TransactionEvent[]) {
    return evidenceItems.map((evidence) => {
        const item = evidence.item.toLowerCase();
        let matchedEvent: TransactionEvent | undefined;

        if (item.includes("refund") || item.includes("reversal")) {
            matchedEvent = events.find((event) => event.event.toLowerCase().includes("refund"));
        }

        else if (item.includes("shipping") || item.includes("delivery") || item.includes("fulfillment")) {
            matchedEvent = events.find((event) => {
                const name = event.event.toLowerCase();
                return name.includes("shipped") || name.includes("delivered");
            });
        }

        else if (item.includes("transaction") || item.includes("payment")) {
            matchedEvent = events.find((event) => event.event.toLowerCase().includes("payment completed"));
        }

        return {
            evidence: evidence.item,
            event: matchedEvent,
        };
    });
}