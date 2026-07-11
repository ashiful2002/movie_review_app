// "use client";

// import { useState, useMemo } from "react";
// import { deleteGenre, updateGenre } from "@/services/genre";
// import { toast } from "sonner";
// import {
//   Search,
//   Trash2,
//   Edit2,
//   ChevronUp,
//   ChevronDown,
//   CheckCircle,
//   XCircle,
//   MoveRightIcon,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";

// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";

// interface Genre {
//   id: string;
//   name: string;
//   slug?: string;
//   image: string;
//   isActive: boolean;
//   isDeleted: boolean;
//   createdAt: string;
//   updatedAt: string;
//   deletedAt?: string | null;
//   movies: any[];
// }

// interface SortConfig {
//   key: keyof Genre;
//   direction: "asc" | "desc";
// }

// export default function GenreTableAdvanced({ genres }: { genres: Genre[] }) {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState<
//     "all" | "active" | "inactive"
//   >("all");
//   const [sortConfig, setSortConfig] = useState<SortConfig>({
//     key: "createdAt",
//     direction: "desc",
//   });
//   const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
//   const [deletingId, setDeletingId] = useState<string | null>(null);

//   // Filter and sort logic
//   const filteredAndSortedGenres = useMemo(() => {
//     let filtered = genres.filter((genre) => {
//       const matchesSearch = genre.name
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase());
//       const matchesStatus =
//         filterStatus === "all" ||
//         (filterStatus === "active" && genre.isActive) ||
//         (filterStatus === "inactive" && !genre.isActive);
//       return matchesSearch && matchesStatus;
//     });

//     filtered.sort((a, b) => {
//       const aValue = a[sortConfig.key];
//       const bValue = b[sortConfig.key];

//       if (typeof aValue === "string") {
//         const comparison = aValue.localeCompare(bValue as string);
//         return sortConfig.direction === "asc" ? comparison : -comparison;
//       }

//       if (typeof aValue === "number") {
//         return sortConfig.direction === "asc"
//           ? (aValue as any) - (bValue as any)
//           : (bValue as any) - (aValue as any);
//       }

//       if (aValue instanceof Date || typeof aValue === "string") {
//         const aDate = new Date(aValue);
//         const bDate = new Date(bValue as string);
//         return sortConfig.direction === "asc"
//           ? aDate.getTime() - bDate.getTime()
//           : bDate.getTime() - aDate.getTime();
//       }

//       return 0;
//     });

//     return filtered;
//   }, [genres, searchTerm, filterStatus, sortConfig]);

//   const handleSort = (key: keyof Genre) => {
//     setSortConfig((prev) => ({
//       key,
//       direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
//     }));
//   };

//   const handleEdit = (id: string) => {
//     // will open modal for editing genre
//     toast.success(`${id} clickled`);
//     updateGenre(id, { name: "Updated Genre Name for" });
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this genre?")) return;

//     setDeletingId(id);
//     try {
//       await deleteGenre(id);
//       toast.success("Genre deleted successfully");
//       setSelectedIds((prev) => {
//         const newSet = new Set(prev);
//         newSet.delete(id);
//         return newSet;
//       });
//     } catch (err: any) {
//       toast.error(err.message || "Failed to delete genre");
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   const toggleSelectAll = () => {
//     if (selectedIds.size === filteredAndSortedGenres.length) {
//       setSelectedIds(new Set());
//     } else {
//       setSelectedIds(new Set(filteredAndSortedGenres.map((g) => g.id)));
//     }
//   };

//   const toggleSelect = (id: string) => {
//     setSelectedIds((prev) => {
//       const newSet = new Set(prev);
//       if (newSet.has(id)) {
//         newSet.delete(id);
//       } else {
//         newSet.add(id);
//       }
//       return newSet;
//     });
//   };

//   const SortIcon = ({ column }: { column: keyof Genre }) => {
//     if (sortConfig.key !== column) return <div className="w-4 h-4" />;
//     return sortConfig.direction === "asc" ? (
//       <ChevronUp className="w-4 h-4" />
//     ) : (
//       <ChevronDown className="w-4 h-4" />
//     );
//   };

//   const formatDate = (date: string) => {
//     return new Date(date).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   return (
//     <div className="p-6   min-h-screen">
//       <div className="mb-6">
//         <div className="flex justify-between items-center mb-4">
//           <div>
//             <h2 className="text-2xl font-bold ">Genres</h2>
//             <p className="text-sm  mt-1">Manage your content genres</p>
//           </div>
//           <a
//             href="/dashboard/add-genre"
//             className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
//           >
//             Create New Genre
//             <MoveRightIcon className="w-4 h-4" />
//           </a>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-3 w-5 h-5  " />
//             <input
//               type="text"
//               placeholder="Search genres..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className=" w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
//             />
//           </div>

//           <select
//             value={filterStatus}
//             onChange={(e) =>
//               setFilterStatus(e.target.value as "all" | "active" | "inactive")
//             }
//             className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
//           >
//             <option value="all">All Status</option>
//             <option value="active">Active Only</option>
//             <option value="inactive">Inactive Only</option>
//           </select>

//           <div className="flex items-center justify-end px-4 py-2  border border-gray-300 rounded-lg">
//             <span className="text-sm text-gray-600">
//               {filteredAndSortedGenres.length} of {genres.length} genres
//             </span>
//           </div>
//         </div>
//       </div>

//       <div className="rounded-lg shadow overflow-hidden">
//         {filteredAndSortedGenres.length === 0 ? (
//           <div className="p-8 text-center text-gray-500">
//             <p className="text-lg font-medium">No genres found</p>
//             <p className="text-sm mt-1">
//               Try adjusting your filters or search term
//             </p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className=" border">
//                 <tr>
//                   <th className="px-6 py-3 text-left">
//                     <input
//                       type="checkbox"
//                       checked={
//                         selectedIds.size === filteredAndSortedGenres.length &&
//                         filteredAndSortedGenres.length > 0
//                       }
//                       onChange={toggleSelectAll}
//                       className="w-4 h-4 cursor-pointer"
//                     />
//                   </th>
//                   <th className="px-6 py-3 text-left">
//                     <button
//                       onClick={() => handleSort("name")}
//                       className="flex items-center gap-2 font-semibold "
//                     >
//                       Name <SortIcon column="name" />
//                     </button>
//                   </th>
//                   <th className="px-6 py-3 text-left font-semibold ">Image</th>
//                   <th className="px-6 py-3 text-left">
//                     <button
//                       onClick={() => handleSort("movies")}
//                       className="flex items-center gap-2 font-semibold "
//                     >
//                       Movies <SortIcon column="movies" />
//                     </button>
//                   </th>
//                   <th className="px-6 py-3 text-left">
//                     <button
//                       onClick={() => handleSort("isActive")}
//                       className="flex items-center gap-2 font-semibold"
//                     >
//                       Status <SortIcon column="isActive" />
//                     </button>
//                   </th>
//                   <th className="px-6 py-3 text-left">
//                     <button
//                       onClick={() => handleSort("createdAt")}
//                       className="flex items-center gap-2 font-semibold "
//                     >
//                       Created <SortIcon column="createdAt" />
//                     </button>
//                   </th>
//                   <th className="px-6 py-3 text-left font-semibold ">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y">
//                 {filteredAndSortedGenres.map((genre) => (
//                   <tr
//                     key={genre.id}
//                     className={`hover:b0 transition-colors ${
//                       selectedIds.has(genre.id) ? "" : ""
//                     }`}
//                   >
//                     <td className="px-6 py-4">
//                       <input
//                         type="checkbox"
//                         checked={selectedIds.has(genre.id)}
//                         onChange={() => toggleSelect(genre.id)}
//                         className="w-4 h-4 cursor-pointer"
//                       />
//                     </td>
//                     <td className="px-6 py-4 font-medium ">{genre.name}</td>
//                     <td className="px-6 py-4">
//                       <img
//                         src={genre.image}
//                         alt={genre.name}
//                         className="w-10 h-10 rounded object-cover"
//                         onError={(e) => {
//                           (e.target as HTMLImageElement).src =
//                             "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect fill='%23e5e7eb' width='40' height='40'/%3E%3C/svg%3E";
//                         }}
//                       />
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm font-medium ">
//                         {genre.movies?.length || 0}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-2">
//                         {genre.isActive ? (
//                           <>
//                             <CheckCircle className="w-4 h-4 text-green-500" />
//                             <span className="text-sm text-green-700 font-medium">
//                               Active
//                             </span>
//                           </>
//                         ) : (
//                           <>
//                             <XCircle className="w-4 h-4 text-red-500" />
//                             <span className="text-sm text-red-700 font-medium">
//                               Inactive
//                             </span>
//                           </>
//                         )}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm  ">
//                       {formatDate(genre.createdAt)}
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-3">
//                         <Button
//                           size={"xs"}
//                           onClick={() => handleEdit(genre.id)}
//                           className="inline-flex items-center gap-1 bg-transparent border text-yellow-400 hover:text-yellow-500  hover:bg-transparent cursor-pointer px-3 py-1 rounded transition-colors"
//                           title="Edit"
//                         >
//                           <Edit2 className="w-4 h-4" />
//                         </Button>
//                         <button
//                           onClick={() => handleDelete(genre.id)}
//                           disabled={deletingId === genre.id}
//                           className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-1 rounded transition-colors disabled:opacity-50"
//                           title="Delete"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* Bulk Actions */}
//       {selectedIds.size > 0 && (
//         <div className="fixed bottom-6 left-6 right-6  px-6 py-4 rounded-lg shadow-lg flex items-center justify-between max-w-md">
//           <span className="font-medium">{selectedIds.size} selected</span>
//           <Button
//             variant={"destructive"}
//             onClick={() => {
//               if (
//                 confirm(
//                   `Delete ${selectedIds.size} genre(s)? This action cannot be undone.`
//                 )
//               ) {
//                 selectedIds.forEach((id) => handleDelete(id));
//               }
//             }}
//             className="ml-2 cursor-pointer   font-medium text-sm"
//           >
//             Delete All
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// }
