import { endpointType } from "@/lib/types";
import { supabase } from "@/utils/supabase/client";
import { NextResponse } from "next/server";

export async function GET() {
    // 1. Fetch all endpoints
    const { data: endpoints, error } = await supabase
      .from("endpoints")
      .select("*")
      .eq("active", true); // only ping active ones
  
    if (error || !endpoints) {
      console.error("Failed to fetch endpoints:", error);
      return NextResponse.json({ error: "Failed to fetch endpoints" }, { status: 500 });
    }
  
    // 2. Group by project_id and pick one random endpoint per group
    const uniqueMap = new Map<string, endpointType>();
  
    endpoints.forEach((ep) => {
      if (!uniqueMap.has(ep.project_id)) {
        // First one we see — just set
        uniqueMap.set(ep.project_id, ep);
      } else if (Math.random() < 0.5) {
        // 50% chance to replace — random pick
        uniqueMap.set(ep.project_id, ep);
      }
    });
  
    const endpointsToPing = Array.from(uniqueMap.values());
  
    // 3. Fire-and-forget async pings
    endpointsToPing.forEach((endpoint) => {
      (async () => {
        try {
          await fetch(endpoint.url, { method: "GET", cache: "no-store" });
          console.log(`✅ Pinged: ${endpoint.url}`);
        } catch (error) {
          console.log(`❌ Failed to ping: ${endpoint.url}`, error);
        }
      })();
    });
  
    return NextResponse.json({ msg: "Pinging initiated", total: endpointsToPing.length });
  }