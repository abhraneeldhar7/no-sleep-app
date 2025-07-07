"use server"
import { apiLog, endpointType, projectType } from "@/lib/types";
import { supabase } from "@/utils/supabase/client";
import { v4 as uuidv4 } from "uuid";


export async function getUserDetails({ userId, email }: { userId?: string, email?: string }) {
    const userTable = supabase.from("users").select().limit(1)
    if (userId || email) {
        const { data: userRes, error } = userId
            ? await userTable.eq("user_id", userId)
            : await userTable.eq("email", email!);
        return JSON.parse(JSON.stringify(userRes));
    }

    else {
        return ({ "msg": "no credentaials provided" })
    }
}


export async function createNewProject(newProj: projectType) {
    newProj.updated_at = Date.now();
    await supabase.from("projects").insert(newProj);
    return (newProj)
}

export async function getUserProjects(userId: string) {
    const { data: res } = await supabase.from("projects").select("*").eq("owner_id", userId).order("updated_at", { ascending: false });

    return JSON.parse(JSON.stringify(res))
}

export async function saveProjectDetails(projectDetails: projectType) {
    projectDetails.updated_at = Date.now();
    const { data: res } = await supabase.from("projects").update(projectDetails).eq("id", projectDetails.id).eq("owner_id", projectDetails.owner_id)
    return JSON.parse(JSON.stringify(res))
}

export async function getRandomThumbnailUrl() {
    const { data: thumbnails, error } = await supabase
        .storage
        .from('default-thumbnails')
        .list('', {
            limit: 100,
            offset: 0,
            sortBy: { column: 'name', order: 'asc' },
        })
    if (thumbnails) {
        const randomTh = thumbnails[Math.floor(Math.random() * thumbnails.length)]
        const { data } = supabase
            .storage
            .from('default-thumbnails')
            .getPublicUrl(randomTh.name)
        return data.publicUrl
    }
    else {
        return null
    }
}

export async function deleteProject(projectDetails: projectType) {
    const response = await supabase
        .from('projects')
        .delete()
        .eq('id', projectDetails.id)
}



export async function getProjectEndpoints(project_id: string) {
    const { data: res, error } = await supabase.from("endpoints").select().eq("project_id", project_id);
    if (res) {
        return JSON.parse(JSON.stringify(res));
    }
    else {
        return null;
    }
}

export async function addProjectEndpoint(endpoint: endpointType) {
    await supabase.from("endpoints").insert(endpoint);
}

export async function deleteProjectEndpoint(id: string) {
    await supabase.from("endpoints").delete().eq("id", id)

}

export async function updateProjectEndpoint(endpoint: endpointType) {
    await supabase.from("endpoints").update(endpoint).eq("id", endpoint.id);
}


export async function pingEndpoint(endpoint: endpointType) {
    const userAgents = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/134.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Version/15.1 Safari/605.1.15",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/91.0.4472.114 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 Chrome/88.0.4324.150 Safari/537.36",
    ];
    const acceptLanguages = [
        "en-US,en;q=0.9",
        "en-GB,en;q=0.8",
        "en;q=0.7",
        "en-US;q=0.6,en;q=0.4",
    ];
    function getRandomHeaders() {
        const userAgent =
            userAgents[Math.floor(Math.random() * userAgents.length)];
        const acceptLanguage =
            acceptLanguages[Math.floor(Math.random() * acceptLanguages.length)];

        return {
            "User-Agent": userAgent,
            "Accept":
                "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": acceptLanguage,
            "Accept-Encoding": "gzip, deflate, br",
            "Connection": "keep-alive",
        };
    }
    function sleep(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    function getRandomDelay(min = 20, max = 1000): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const delay = getRandomDelay();
    // console.log(`⏱️ Waiting ${delay}ms before pinging ${endpoint.url}`);
    await sleep(delay);
    const headers = getRandomHeaders();
    try {
        const res = await fetch(endpoint.url, { method: "GET", cache: "no-store", headers });
        makeLog({
            url: endpoint.url,
            project_id: endpoint.project_id,
            status_code: res.status,
        })
        console.log(`✅ Pinged: ${endpoint.url}`);
    } catch (error) {
        console.log(`❌ Failed to ping: ${endpoint.url}`);
    }
}


export async function makeLog({ url, project_id, status_code }: { url: string, project_id: string, status_code: number }) {
    const newLog: apiLog = {
        id: uuidv4(),
        project_id: project_id,
        status_code: status_code,
        url: url,
        timestamp: Date.now(),
    }
    await supabase.from("logs").insert(newLog);
}