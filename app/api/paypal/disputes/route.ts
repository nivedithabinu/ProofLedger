import { connection, NextResponse } from "next/server";
import { getPayPalDisputes } from "@/lib/paypal";

export async function GET() {
    await connection();
    
    try {
        const data = await getPayPalDisputes();
        return NextResponse.json({
            success: true,
            source: "paypal_sandbox",
            total: data.total_items ?? data.items?.length ?? 0,
            disputes: data.items ?? [],
        });
    } 
    
    catch (error) {
        console.error("ProofLedger PayPal API error:", error instanceof Error ? error.message : "Unknown error");
        
        return NextResponse.json(
            {
                success: false,
                error: "Unable to retrieve PayPal disputes.",
            },
            
            { 
                status: 502 
            }
        );
    }
}