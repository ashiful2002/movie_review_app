"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteGenre, updateGenre } from "@/services/genre";
import { toast } from "sonner";
import { ChevronUp, ChevronDown, MoveRightIcon } from "lucide-react";
import { Genre, SortableKey, SortConfig } from "../types";
import GenreFilters from "./genreFilters";
import GenreTableRow from "./GenreTableRow";
import BulkActionsBar from "./BulkActionsBar";
import EditGenreDialog from "./EditGenreDialog";
import DeleteGenreDialog from "./DeleteGenreDialog";
import Link from "next/link";

function getSortValue(genre: Genre, key: SortableKey): string | number {
  switch (key) {
    case "name":
      return genre.name.toLowerCase();
    case "movies":
      return genre.movies?.length ?? 0;
    case "isActive":
      return genre.isActive ? 1 : 0;
    case "createdAt":
      return new Date(genre.createdAt).getTime();
    default:
      return 0;
  }
}

export default function GenreTableAdvanced({ genres }: { genres: Genre[] }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "createdAt",
    direction: "desc",
  });
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [genreToDelete, setGenreToDelete] = useState<Genre | null>(null);
  const [editingGenre, setEditingGenre] = useState<Genre | null>(null);

  const filteredAndSortedGenres = useMemo(() => {
    const filtered = genres?.filter((genre) => {
      const matchesSearch = genre.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "active" && genre.isActive) ||
        (filterStatus === "inactive" && !genre.isActive);
      return matchesSearch && matchesStatus;
    });

    return [...filtered].sort((a, b) => {
      const aValue = getSortValue(a, sortConfig.key);
      const bValue = getSortValue(b, sortConfig.key);

      if (typeof aValue === "string" && typeof bValue === "string") {
        const comparison = aValue.localeCompare(bValue);
        return sortConfig.direction === "asc" ? comparison : -comparison;
      }

      const comparison = (aValue as number) - (bValue as number);
      return sortConfig.direction === "asc" ? comparison : -comparison;
    });
  }, [genres, searchTerm, filterStatus, sortConfig]);

  const handleSort = (key: SortableKey) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredAndSortedGenres.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredAndSortedGenres.map((g) => g.id)));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleSaveEdit = async (
    id: string,
    data: { name: string; isActive: boolean }
  ) => {
    try {
      await updateGenre(id, data);
      toast.success("Genre updated successfully", { position: "top-center" });
      setEditingGenre(null);
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to update genre", {
        position: "top-center",
      });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!genreToDelete) return;
    const id = genreToDelete.id;

    setDeletingId(id);
    try {
      await deleteGenre(id);
      toast.success("Genre deleted successfully", { position: "top-center" });
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    } catch (err: any) {
      toast.error(err.message || "Failed to delete genre");
    } finally {
      setDeletingId(null);
      setGenreToDelete(null);
    }
  };

  const handleBulkDelete = async () => {
    const ids = Array.from(selectedIds);
    const results = await Promise.allSettled(ids.map((id) => deleteGenre(id)));

    const failed = results.filter((r) => r.status === "rejected").length;
    const succeeded = ids.length - failed;

    if (succeeded > 0) {
      toast.success(`${succeeded} genre(s) deleted successfully`);
    }
    if (failed > 0) {
      toast.error(`Failed to delete ${failed} genre(s)`);
    }

    setSelectedIds(new Set());
  };

  const SortIcon = ({ column }: { column: SortableKey }) => {
    if (sortConfig.key !== column) return <div className="w-4 h-4" />;
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold">Genres</h2>
            <p className="text-sm mt-1">Manage your content genres</p>
          </div>

          <Link
            href="/dashboard/add-genre"
            className="group flex items-center gap-2 px-4 py-2 rounded-lg border border-yellow-400 hover:bg-yellow-400 hover:text-black transition-colors duration-500"
          >
            Create New Genre
            <MoveRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110" />{" "}
          </Link>
        </div>

        <GenreFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterStatus={filterStatus}
          onFilterChange={setFilterStatus}
          filteredCount={filteredAndSortedGenres.length}
          totalCount={genres.length}
        />
      </div>

      <div className="rounded-lg shadow overflow-hidden">
        {filteredAndSortedGenres.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p className="text-lg font-medium">No genres found</p>
            <p className="text-sm mt-1">
              Try adjusting your filters or search term
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={
                        selectedIds.size === filteredAndSortedGenres.length &&
                        filteredAndSortedGenres.length > 0
                      }
                      onChange={toggleSelectAll}
                      className="w-4 h-4 cursor-pointer"
                    />
                  </th>
                  <th className="px-6 py-3 text-left">
                    <button
                      onClick={() => handleSort("name")}
                      className="flex items-center gap-2 font-semibold"
                    >
                      Name <SortIcon column="name" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left font-semibold">Image</th>
                  <th className="px-6 py-3 text-left">
                    <button
                      onClick={() => handleSort("movies")}
                      className="flex items-center gap-2 font-semibold"
                    >
                      Movies <SortIcon column="movies" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <button
                      onClick={() => handleSort("isActive")}
                      className="flex items-center gap-2 font-semibold"
                    >
                      Status <SortIcon column="isActive" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <button
                      onClick={() => handleSort("createdAt")}
                      className="flex items-center gap-2 font-semibold"
                    >
                      Created <SortIcon column="createdAt" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredAndSortedGenres.map((genre) => (
                  <GenreTableRow
                    key={genre.id}
                    genre={genre}
                    isSelected={selectedIds.has(genre.id)}
                    isDeleting={deletingId === genre.id}
                    onToggleSelect={toggleSelect}
                    onEdit={setEditingGenre}
                    onDeleteRequest={setGenreToDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <BulkActionsBar
        selectedCount={selectedIds.size}
        onDeleteAll={handleBulkDelete}
      />

      <EditGenreDialog
        genre={editingGenre}
        onClose={() => setEditingGenre(null)}
        onSave={handleSaveEdit}
      />

      <DeleteGenreDialog
        genre={genreToDelete}
        onClose={() => setGenreToDelete(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
