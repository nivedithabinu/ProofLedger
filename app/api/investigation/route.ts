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
        console.error("ProofLedger investigation error:", error instanceof Error ? error.message : "Unknown error");
        return NextResponse.json({
            success: false,
            error: "Unable to generate the investigation report.",
        },
        
        { 
            status: 502 
        });
    }
}