export interface Genre {
  id: string;
  name: string;
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
  title: string;
  description: string;
  thumbnail: string;
  banner: string;

  releaseYear: number;
  duration: number;
  language: string;
  country: string;
  ageRating: string;

  director: string;
  cast: string[];

  rating: number;
  views?: number;

  isPremium: boolean;
  price: number;

  budget: number;
  boxOffice: number;

  trailerLink: string;
  streamingLink: string;

  subtitles: string[];
  awards: string[];

  status: string;

  createdAt: string;
  updatedAt: string;

  genres: MovieGenre[];
  reviews: Review[];
}