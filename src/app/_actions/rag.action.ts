"use server"

import { randomUUID } from "crypto"
import { IMovie, ingestMovieServices, queryRagServices } from "@/services/rag"
import { getUser } from "@/services/authentication"

export type ChatRole = "user" | "assistant" | "system"

export interface IChatMessage {
    id: string
    role: ChatRole
    content: string
    timestamp: string
    meta?: {
        success: boolean
        sourceMatch?: string
        error?: string
    }
}

export const queryRagAction = async (query: string): Promise<IChatMessage> => {
    try {
        const data = await queryRagServices({ query })

        let content: string = typeof data.answer === "string" ? data.answer : "Failed to fetch rag query"

        // if the answer is an object, convert it to an HTML string
        if (typeof data.answer === "object" && data.answer !== null) {
            if ("movies" in data.answer && Array.isArray(data.answer.movies)) {
                const movies = data.answer.movies.slice(0, 5)

                if (movies.length > 0) {
                    content = `I found ${movies.length} movies matching your query
                    ${movies
                            .map((movie: IMovie) => {
                                return `
                        <div class="flex items-center gap-4">
                            <img src="${movie.poster}" alt="${movie.title}" class="w-16 h-16 object-cover rounded-lg">
                            <div>
                                <h3 class="text-lg font-semibold">${movie.title}</h3>
                                <p class="text-gray-400">${movie.genre}</p>
                                <p class="text-gray-400">${movie.rating}</p>
                            </div>
                        </div>
                        `
                            })
                            .join("")}
                    `
                } else {
                    content = "No movies found"
                }
            } else {
                content = "No movies found"
            }
        }

        const rawSimilarity = data.source?.[0]?.similarity
        const sourceMatch = typeof rawSimilarity === "number" ? `${(rawSimilarity * 100).toFixed(2)}% matched` : undefined

        return {
            id: randomUUID(),
            role: "assistant",
            content,
            timestamp: new Date().toISOString(),
            meta: {
                success: true,
                sourceMatch,
            },
        }
    } catch (error) {
        console.log(error)

        return {
            id: randomUUID(),
            role: "assistant",
            content: "Sorry, something went wrong while fetching a response.",
            timestamp: new Date().toISOString(),
            meta: {
                success: false,
                error: error instanceof Error ? error.message : "Unknown error",
            },
        }
    }
}


export const ingestMoviesAction = async () => {
    try {
        const res = await ingestMovieServices()
        return {
            success: true,
            indexedCount: res.indexedCount,
            message: res.message ?? "Movies ingested successfully",

        }
    } catch (error) {
        console.log(error)

        return {
            success: false,
            indexedCount: 0,
            message: error instanceof Error ? error.message : "Failed to ingest movies",
        }
    }
}

export const getUserRoleAction = async () => {
    try {
        const res = await getUser()

        return res?.role ?? null

    } catch (error) {
        console.log(error)

        return {
            success: false,
            role: null, 
        }
    }
}