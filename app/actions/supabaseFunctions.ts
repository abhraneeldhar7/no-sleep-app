"use server"
import { projectType } from "@/lib/types";
import { supabase } from "@/utils/supabase/client";
import { createClient } from "@supabase/supabase-js";
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

    const thUrl = await getRandomThumbnailUrl();
    newProj.thumbnail_url = thUrl;

    await supabase.from("projects").insert(newProj);
    return (newProj)
}

export async function getUserProjects(userId: string) {
    const { data: res } = await supabase.from("projects").select("*").eq("owner_id", userId);

    return JSON.parse(JSON.stringify(res))
}

export async function saveProjectDetails(projectDetails: projectType) {
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