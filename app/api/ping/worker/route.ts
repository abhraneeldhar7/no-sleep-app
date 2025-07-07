import { pingEndpoint } from "@/app/actions/supabaseFunctions";
import { endpointType } from "@/lib/types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const endpoint: endpointType = await req.json();
    console.log("pinging: ",endpoint.url)
    pingEndpoint(endpoint);
    return NextResponse.json({ msg: "ping dispatched" });
}