import { connection, NextResponse } from "next/server";
import { generateInvestigationReport } from "@/lib/investigation";

export async function POST(request: Request) {
    await connection();
    try {
        const body = await request.json();
        const caseData = body?.caseData;
        if (!caseData||typeof caseData !== "object" || Array.isArray(caseData)) {
            return NextResponse.json({
                success: false,
                error: "Invalid investigation input."
            },

            {
                status: 400
            });
        }

        const serializedData = JSON.stringify(caseData);
        if (Object.keys(caseData).length===0 || serializedData.length>20000) {
            return NextResponse.json({
                success: false,
                error: "Investigation input is empty or too large."
            },

            {
                status: 400
            });
        }

        const report = await generateInvestigationReport(caseData);
        return NextResponse.json({
            success: true,
            report,
        });

    }

    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "";
        console.error("ProofLedger investigation error:", errorMessage);

        let status = 502;
        let message = "Unable to generate the investigation report. Please try again.";

        if (errorMessage.includes("504") || errorMessage.includes("DEADLINE_EXCEEDED") || errorMessage.includes("Timeout")) {
            status = 504;
            message = "Gemini took too long to complete the investigation. Please try again shortly.";
        }

        else if (errorMessage.includes("503") || errorMessage.includes("UNAVAILABLE")) {
            status = 503;
            message = "Gemini is temporarily experiencing high demand. Please try again shortly.";
        }

        else if (errorMessage.includes("429") || errorMessage.includes("RESOURCE_EXHAUSTED")) {
            status = 429;
            message = "Gemini's request quota or rate limit has been reached. Please try again later.";
        }

        else if (errorMessage.includes("401") || errorMessage.includes("403") || errorMessage.includes("PERMISSION_DENIED")) {
            message = "Gemini authentication failed. Please check the server API configuration.";
        }

        else if (errorMessage.includes("invalid investigation report")) {
            message = "Gemini returned an invalid report. Please try generating it again.";
        }

        return NextResponse.json({
            success: false,
            error: message,
        },

        {
            status
        });
    }
}