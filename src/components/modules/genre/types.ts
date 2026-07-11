export interface Genre {
  id: string;
  name: string;
  slug?: string;
  image: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  movies: any[];
}

export type SortableKey = "name" | "movies" | "isActive" | "createdAt";

export interface SortConfig {
  key: SortableKey;
  direction: "asc" | "desc";
}
