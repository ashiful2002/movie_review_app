export interface IRagQueryPayload {
  query: string;
  limit?: number;
  sourceType?: string;
}

export interface IRagSource {
  id: string;
  content: string;
  similarity: number;
  sourceType?: string;
  metadata?: {
    name?: string;
    [key: string]: unknown;
  };
}

export interface IMovie {
  name: string;
  director: string;
  genre: string;
}

export interface IRagAnswerMovies {
  movies: IMovie[];
}

export interface IRagQueryData {
  success: boolean;
  message: string;
  data: {
    answer:
      | string
      | {
          movies: IMovie[];
        };
    sources: {
      similarity: number;
    }[];
    contextUsed: boolean;
  };
}

export interface IIngestMovieData {
  success: boolean;
  message: string;
  indexedCount: number;
}

export const queryRagServices = async (
  payload: IRagQueryPayload
): Promise<IRagQueryData> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/rag/query`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch rag query");
  }

  const result = await response.json();

  return result;
};

export const ingestMovieServices = async (): Promise<IIngestMovieData> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/rag/ingest-movies`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to ingest movies");
  }

  return response.json() as Promise<IIngestMovieData>;
};
