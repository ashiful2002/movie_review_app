export interface Genre {
  id: string;
  name: string;
  slug: string;
  image: string;
}

export interface MovieGenre {
  genreId: string;
  movieId: string;
  genre: Genre;
}

export interface Review {
  id: string;
  rating: number;
  content: string;
  userId: string;
  movieId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Movie {
  id: string;
  slug: string;

  title: string;
  description: string;

  thumbnail: string;
  banner: string;

  releaseYear: number;
  duration: number;

  director: string;
  cast: string[];

  language: string[];
  country: string;

  imdbRating: number;
  averageRating: number;
  rating: number | null;

  budget: number;
  boxOffice: number | null;

  trailerLink: string;
  streamingLink: string;

  subtitles: string[];
  awards: string[];

  status: "UPCOMING" | "RELEASED" | "ARCHIVED" | string;

  isPremium: boolean;
  isFeatured: boolean;
  isDeleted: boolean;

  price: number;
  views: number;

  createdAt: string;
  updatedAt: string;

  genres: MovieGenre[];
  reviews: Review[];
}