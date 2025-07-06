"use server"
import { supabase } from "@/utils/supabase/client"

export async function testingSB() {
    const { data, error } = await supabase
        .from('users')
        .select()
    return JSON.parse(JSON.stringify(data))
}