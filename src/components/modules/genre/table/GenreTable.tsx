"use client";

import { deleteGenre } from "@/services/genre";
import { toast } from "sonner";

export default function GenreTable({ genres }: any) {
  const handleDelete = async (id: string) => {
    try {
      await deleteGenre(id);
      toast.success("Genre deleted");
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  console.log(genres);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Genres</h2>
        <a
          href="/dashboard/admin/genres/add"
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Add Genre
        </a>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Movies</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {genres.map((genre: any) => (
            <tr key={genre.id} className="border-t">
              <td className="p-2">{genre.name}</td>

              {/* count movies from relation */}
              <td className="p-2">{genre.movies?.length || 0}</td>

              <td className="p-2 flex gap-2">
                <a
                  href={`/dashboard/admin/genres/edit/${genre.id}`}
                  className="text-blue-500"
                >
                  Edit
                </a>

                <button
                  onClick={() => handleDelete(genre.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
