"use client";

import { useState } from "react";
import type { InvestigationReport } from "@/types";
import type { Dispute } from "@/types";
import { getEvidence } from "@/lib/evidence";

type AIInvestigationProps = {
    selected: Dispute;
    collectedEvidence: string[];
};

export default function AIInvestigation({
    selected,
    collectedEvidence,
}: AIInvestigationProps) {
    const [report, setReport] = useState<InvestigationReport | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    async function runInvestigation() {
        setLoading(true);
        setError("");
        setReport(null);
        const evidence = getEvidence(selected.reason).map((name) => ({
            name,
            availability: collectedEvidence.includes(`${selected.id}-${name}`) ? "available" : "unknown",
        }));
        
        const caseData = {
            source: "fictional_demo_case",
            disputeId: selected.id,
            customer: selected.customer,
            reason: selected.reason,
            amount: selected.amount,
            status: selected.status,
            riskLevel: selected.risk,
            evidence,
        };
        
        try {
            const response = await fetch("/api/investigation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ caseData }),
            });
            
            const data = await response.json();
            
            if (!response.ok || !data.success) {
                throw new Error(data.error || "Unable to generate investigation report.");
            }
            
            setReport(data.report as InvestigationReport);
        } 
        
        catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong during investigation.");
        } 
        
        finally {
            setLoading(false);
        }
    }
    
    return (
    <section className="mt-6 rounded-xl border border-violet-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
                <p className="text-xs font-bold uppercase tracking-widest text-violet-600">Gemini AI · Investigation engine</p>
                <h4 className="mt-2 text-lg font-bold text-slate-900">AI-powered dispute investigation</h4>
                <p className="mt-1 text-sm text-slate-500">Generate an evidence-aware investigation report for this fictional demo case.</p>
            </div>
            <button onClick={runInvestigation} disabled={loading} className="rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Investigating..." : "✦ Run AI Investigation"}</button>
        </div>
        {loading && (
            <div className="mt-5 rounded-lg bg-violet-50 p-4 text-sm text-violet-700">Gemini is analysing the dispute and preparing its investigation report...</div>
        )}
        
        {error && (
            <div className="mt-5 rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{error}</div>
        )}
        
        {report && (
            <div className="mt-6 space-y-5">
                <div className="rounded-lg border border-violet-100 bg-violet-50/60 p-4">
                <h5 className="font-bold text-slate-900">Investigation summary</h5>
                <p className="mt-2 text-sm leading-6 text-slate-700">{report.summary}</p>
            </div>
            <div>
                <h5 className="font-bold text-slate-900">Investigation findings</h5>
                <div className="mt-3 space-y-3">{report.findings.map((finding, index) => (
                    <div key={index} className="rounded-lg border border-slate-200 p-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className="font-semibold text-slate-900">{finding.title}</p>
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase text-slate-700">{finding.severity} severity</span>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{finding.explanation}</p>
                        <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-slate-500">{finding.supportingFacts.map((fact, i) => (
                            <li key={i}>{fact}</li>
                        ))}</ul>
                    </div>
                ))}
                </div>
            </div>
            
            <div>
                <h5 className="font-bold text-slate-900">Evidence recommendations</h5>
                <div className="mt-3 space-y-3">{report.evidenceRecommendations.map((item, index) => (
                    <div key={index} className="rounded-lg border border-slate-200 p-4">
                        <div className="flex flex-wrap justify-between gap-2">
                            <p className="font-semibold text-slate-900">{item.evidenceName}</p>
                            <span className="text-xs font-semibold text-violet-700">{item.priority} priority</span>
                        </div>
                        <p className="mt-2 text-sm text-slate-600">{item.reason} </p>
                        <p className="mt-2 text-xs text-slate-500">Availability: {item.availability}</p>
                    </div>
                ))}
                </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-amber-50 p-4">
                    <h5 className="font-semibold text-slate-900">Missing information</h5>
                    <ul className="mt-2 list-disc space-y-2 pl-4 text-sm text-slate-600">{report.missingInformation.map((item, i) => (<li key={i}>{item}</li>))}</ul>
                </div>
                
                <div className="rounded-lg bg-blue-50 p-4">
                    <h5 className="font-semibold text-slate-900">Suggested next steps</h5>
                    <ul className="mt-2 list-disc space-y-2 pl-4 text-sm text-slate-600">{report.suggestedNextSteps.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}</ul>
                </div>
                
                <div className="rounded-lg bg-slate-50 p-4">
                    <h5 className="font-semibold text-slate-900">Limitations</h5>
                    <ul className="mt-2 list-disc space-y-2 pl-4 text-sm text-slate-600">
                        {report.limitations.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
            
            <p className="text-xs text-slate-400">AI-generated analysis of fictional demo data. Findings and recommendations require merchant verification. No dispute outcome is guaranteed.</p>
            </div>
        )}
        </section>
    );
}