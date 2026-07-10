"use server"

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API;

export const getFavourite = async () => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        const res = await fetch(`${BASE_URL}/favourite`, {
            headers: {
                Authorization: token || "",
            },
            next: {
                tags: ["favourite"],
            },
        });

        if (!res.ok) {
            throw new Error("Failed to fetch favourite");
        }

        return res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const addToFavourite = async (movieId: string) => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        const res = await fetch(`${BASE_URL}/favourite`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token || "",
            },
            body: JSON.stringify({ movieId }),
        });

        if (!res.ok) {
            throw new Error("Failed to add favourite");
        }

        revalidateTag("favourite", {});

        return res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};
export const removeFromfavourite = async (movieId: string) => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        const res = await fetch(`${BASE_URL}/favourite/${movieId}`, {
            method: "DELETE",
            headers: {
                Authorization: token || "",
            },
        });

        if (!res.ok) {
            throw new Error("Failed to remove movie favourite");
        }

        revalidateTag("favourite", {});

        return res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};