"use client"

import { getUserDetails } from "@/app/actions/supabaseFunctions";
import { useStore } from "@/lib/store"
import { useSession } from "next-auth/react";
import { useEffect } from "react";


export default function InitPage() {
    const userDetails = useStore((state) => state.userDetails);
    const setUserDetails = useStore((state) => state.setUserDetails);

    const { data: session } = useSession();


    useEffect(() => {
        const initUser = async () => {
            if (!session) return;
            if (!userDetails) {
                console.log("getting user details");
                const res = await getUserDetails({ email: session.user.email })
                setUserDetails(res[0]);
            }
        }

        initUser();

    }, [userDetails, session])
    return (<></>)
}