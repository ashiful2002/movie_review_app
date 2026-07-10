export interface IRagQueryPayload {
    query: string
    limit?: number
    sourceType?: string
}

export interface IRagSource {
    id: string
    content: string
    similarity: number
    sourceType?: string
    metadata?: {
        name?: string
        [key: string]: unknown
    }
}

export interface IMovie {
    title: string
    poster: string
    genre: string
    rating: number | string
}

export interface IRagAnswerMovies {
    movies: IMovie[]
}

export interface IRagQueryData {
    answer: IRagAnswerMovies | string
    source: IRagSource[]
    contextUsed: string
}

export interface IIngestMovieData {
    success: boolean
    message: string
    indexedCount: number
}

export const queryRagServices = async (payload: IRagQueryPayload): Promise<IRagQueryData> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/rag/query`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })

    if (!response.ok) {
        throw new Error("Failed to fetch rag query")
    }

    return response.json() as Promise<IRagQueryData>
}

export const ingestMovieServices = async (): Promise<IIngestMovieData> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/rag/ingest-movies`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })

    if (!response.ok) {
        throw new Error("Failed to ingest movies")
    }

    return response.json() as Promise<IIngestMovieData>
}