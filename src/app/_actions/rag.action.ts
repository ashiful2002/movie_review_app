"use server";

import { randomUUID } from "crypto";
import { IMovie, ingestMovieServices, queryRagServices } from "@/services/rag";
import { getUser } from "@/services/authentication";

export type ChatRole = "user" | "assistant" | "system";

export interface IChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: string;
  meta?: {
    success: boolean;
    sourceMatch?: string;
    error?: string;
  };
}

// export const queryRagAction = async (query: string): Promise<IChatMessage> => {
//   try {
//     const result = await queryRagServices({ query });
//     let answer = result.answer;
//     let sources = result.source;

//     let content =
//       typeof answer === "string" ? answer : "Failed to fetch rag query";

//     // if the answer is an object, convert it to an HTML string
//     if (typeof answer === "object" && answer !== null) {
//       if ("movies" in answer && Array.isArray(answer.movies)) {
//         const movies = answer.movies.slice(0, 5);

//         if (movies.length > 0) {
//           content = `I found ${movies.length} movies matching your query
//                     ${movies
//                       .map((movie: IMovie) => {
//                         return `
//                         <div class="flex items-center gap-4">
//                            <img src="${movie.poster}" alt="${movie.title}" class="w-16 h-16 object-cover rounded-lg">
//                                         <div>
//                                             <h3>${movie.title}</h3>
//                                             <p>${movie.genre}</p>
//                                             <p>${movie.rating}</p>
//                                         </div>
//                         </div>
//                         `;
//                       })
//                       .join("")}
//                     `;
//         } else {
//           content = "No movies found";
//         }
//       } else {
//         content = "No movies found";
//       }
//     }

//     const rawSimilarity = result.source?.[0]?.similarity;
//     const sourceMatch =
//       typeof rawSimilarity === "number"
//         ? `${(rawSimilarity * 100).toFixed(2)}% matched`
//         : undefined;

//     return {
//       id: randomUUID(),
//       role: "assistant",
//       content,
//       timestamp: new Date().toISOString(),
//       meta: {
//         success: true,
//         sourceMatch,
//       },
//     };
//   } catch (error) {
//     console.log(error);

//     return {
//       id: randomUUID(),
//       role: "assistant",
//       content: "Sorry, something went wrong while fetching a response.",
//       timestamp: new Date().toISOString(),
//       meta: {
//         success: false,
//         error: error instanceof Error ? error.message : "Unknown error",
//       },
//     };
//   }
// };

export const queryRagAction = async (query: string): Promise<IChatMessage> => {
  try {
    const result = await queryRagServices({ query });

    const answer = result.data.answer;
    const sources = result.data.sources;

    let content = typeof answer === "string" ? answer : "No response received.";

    if (
      typeof answer === "object" &&
      answer !== null &&
      "movies" in answer &&
      Array.isArray(answer.movies)
    ) {
      const movies = answer.movies.slice(0, 5);

      if (movies.length > 0) {
        content = `
          <p class="mb-3 font-medium">
            I found ${movies.length} movie${
          movies.length > 1 ? "s" : ""
        } matching your query.
          </p>

          <div class="space-y-3">
            ${movies
              .map((movie: IMovie) => {
                return `
                  <div class="rounded-lg border p-3">
                    <h3 class="font-semibold text-base">
                      ${movie.name}
                    </h3>

                    <p class="text-sm text-gray-500">
                      <strong>Director:</strong> ${movie.director}
                    </p>

                    <p class="text-sm text-gray-500">
                      <strong>Genre:</strong> ${movie.genre}
                    </p>
                  </div>
                `;
              })
              .join("")}
          </div>
        `;
      } else {
        content = "No movies found.";
      }
    }

    const rawSimilarity = sources?.[0]?.similarity;

    const sourceMatch =
      typeof rawSimilarity === "number"
        ? `${(rawSimilarity * 100).toFixed(2)}% matched`
        : undefined;

    return {
      id: randomUUID(),
      role: "assistant",
      content,
      timestamp: new Date().toISOString(),
      meta: {
        success: true,
        sourceMatch,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      id: randomUUID(),
      role: "assistant",
      content: "Sorry, something went wrong while fetching a response.",
      timestamp: new Date().toISOString(),
      meta: {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
    };
  }
};

export const ingestMoviesAction = async () => {
  try {
    const res = await ingestMovieServices();
    return {
      success: true,
      indexedCount: res.indexedCount,
      message: res.message ?? "Movies ingested successfully",
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      indexedCount: 0,
      message:
        error instanceof Error ? error.message : "Failed to ingest movies",
    };
  }
};

export const getUserRoleAction = async () => {
  try {
    const res = await getUser();

    return res?.role ?? null;
  } catch (error) {
    console.log(error);

    return {
      success: false,
      role: null,
    };
  }
};
