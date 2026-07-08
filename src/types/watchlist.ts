export interface WatchlistItem {
  id: string;  
  movieId: string;
  createdAt: string;

  movie: {
    id: string;
    title: string;
    thumbnail: string;
    releaseYear: number;
    rating: number;
  };
}


