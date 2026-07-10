"use server"

import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API;

const getStats = async () => {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    if (!token) {
        throw new Error("Authentication token not found. Please log in.");

    }

    try {
        const res = await fetch(`${BASE_URL}/stats`, {
            method: 'GET',
            headers: {
                Authorization: token || ""
            }
        }
        )

        if (!res.ok) {
            throw new Error("Failed to fetch ststs")
        }
        return res.json()
    } catch (error) {
        console.error(error);
        return null;

    }
}

export default getStats