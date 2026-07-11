import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  MoreHorizontal,
  Star,
  Eye,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  StatusBadge,
  RatingBadge,
  PremiumBadge,
  ViewsCard,
  PriceCard,
} from "./movie-cells";

interface Movie {
  id: string;
  slug: string;
  title: string;
  director: string;
  releaseYear: number;
  duration: number;
  rating: number;
  price: number;
  status: "released" | "upcoming" | "archived";
  views: number;
  isPremium: boolean;
  isFeatured: boolean;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}

// Sortable header component
const SortableHeader = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <Button
    variant="ghost"
    onClick={onClick}
    className="h-8 gap-2 p-0 hover:bg-transparent"
  >
    {children}
    <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
  </Button>
);

const ActionsCell = ({ movie }: { movie: Movie }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="h-8 w-8 p-0">
        <span className="sr-only">Open menu</span>
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link href={`/admin/movies/${movie.id}/edit`}>Edit</Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href={`/admin/movies/${movie.id}/analytics`}>Analytics</Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="text-destructive focus:text-destructive">
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export const MovieColumns: ColumnDef<Movie>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <SortableHeader
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Title
      </SortableHeader>
    ),
    cell: ({ row }) => {
      const movie = row.original;
      return (
        <Link
          href={`/movies/${movie.slug}`}
          className="flex items-center gap-3 hover:underline max-w-xs"
        >
          <img
            src={movie.thumbnail}
            alt={movie.title}
            className="w-10 h-14 rounded object-cover flex-shrink-0"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-medium truncate">{movie.title}</span>
            <span className="text-xs text-muted-foreground">
              {movie.releaseYear}
            </span>
          </div>
        </Link>
      );
    },
    filterFn: (row, id, value) => {
      return row
        .getValue<string>(id)
        .toLowerCase()
        .includes(value.toLowerCase());
    },
  },
  {
    accessorKey: "director",
    header: "Director",
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("director")}</span>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <SortableHeader
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
      </SortableHeader>
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return <StatusBadge status={status as any} />;
    },
  },
  {
    accessorKey: "rating",
    header: ({ column }) => (
      <SortableHeader
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Rating
      </SortableHeader>
    ),
    cell: ({ row }) => {
      const rating = row.getValue("rating") as number;
      return <RatingBadge rating={rating} />;
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <SortableHeader
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Price
      </SortableHeader>
    ),
    cell: ({ row }) => {
      const price = row.getValue("price") as number;
      const isPremium = row.original.isPremium;
      return <PriceCard price={price} isPremium={isPremium} />;
    },
  },
  {
    accessorKey: "views",
    header: ({ column }) => (
      <SortableHeader
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Views
      </SortableHeader>
    ),
    cell: ({ row }) => {
      const views = row.getValue("views") as number;
      return <ViewsCard views={views} />;
    },
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
    cell: ({ row }) => {
      const isFeatured = row.getValue("isFeatured") as boolean;
      return (
        <Badge variant={isFeatured ? "default" : "secondary"}>
          {isFeatured ? "Featured" : "Not Featured"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "duration",
    header: ({ column }) => (
      <SortableHeader
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Duration
      </SortableHeader>
    ),
    cell: ({ row }) => {
      const duration = row.getValue("duration") as number;
      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;
      return (
        <span className="text-sm text-muted-foreground">
          {hours}h {minutes}m
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsCell movie={row.original} />,
  },
];
