import { supabase } from "@/utils/supabase/client";


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