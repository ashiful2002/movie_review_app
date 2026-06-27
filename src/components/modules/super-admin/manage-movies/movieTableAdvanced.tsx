"use client";

import { useMemo, useState } from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
    SortingState,
    ColumnFiltersState,
    VisibilityState,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Settings2,
    X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MovieColumns } from "./colums";

interface Movie {
    id: string;
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

interface MoviesTableAdvancedProps {
    movies: Movie[];
}

export const MoviesTableAdvanced = ({ movies }: MoviesTableAdvancedProps) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [searchValue, setSearchValue] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("");
    const [premiumFilter, setPremiumFilter] = useState<string>("");

    const columns: ColumnDef<Movie>[] = useMemo(() => MovieColumns, []);

    const table = useReactTable({
        data: movies,
        columns,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const handleSearch = (value: string) => {
        setSearchValue(value);
        table.getColumn("title")?.setFilterValue(value);
    };

    const handleStatusFilter = (value: string) => {
        setStatusFilter(value);
        if (value === "") {
            table.getColumn("status")?.setFilterValue(undefined);
        } else {
            table.getColumn("status")?.setFilterValue(value);
        }
    };

    const handlePremiumFilter = (value: string) => {
        setPremiumFilter(value);
        if (value === "") {
            table.getColumn("isPremium")?.setFilterValue(undefined);
        } else {
            table.getColumn("isPremium")?.setFilterValue(value === "premium");
        }
    };

    const activeFilters = [
        { label: `Title: ${searchValue}`, show: !!searchValue, clear: () => handleSearch("") },
        { label: `Status: ${statusFilter}`, show: !!statusFilter, clear: () => handleStatusFilter("") },
        { label: `Premium: ${premiumFilter}`, show: !!premiumFilter, clear: () => handlePremiumFilter("") },
    ].filter((f) => f.show);

    const pageIndex = table.getState().pagination.pageIndex;
    const pageSize = table.getState().pagination.pageSize;
    const totalRows = table.getFilteredRowModel().rows.length;
    const totalPages = table.getPageCount();

    return (
        <div className="space-y-4">
            {/* Search and Filter Bar */}
            <div className="px-6 py-4 border-b bg-muted/50 space-y-4">
                <div className="flex gap-3 flex-wrap">
                    <Input
                        placeholder="Search by movie title..."
                        value={searchValue}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="max-w-md"
                    />

                    {/* Status Filter */}
                    <Select value={statusFilter} onValueChange={handleStatusFilter}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="">All Statuses</SelectItem>
                            <SelectItem value="released">Released</SelectItem>
                            <SelectItem value="upcoming">Upcoming</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Premium Filter */}
                    <Select value={premiumFilter} onValueChange={handlePremiumFilter}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Filter by premium" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="">All</SelectItem>
                            <SelectItem value="premium">Premium Only</SelectItem>
                            <SelectItem value="free">Free Only</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Column Visibility */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="gap-2">
                                <Settings2 className="w-4 h-4" />
                                Columns
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Active Filters Display */}
                {activeFilters.length > 0 && (
                    <div className="flex gap-2 flex-wrap items-center">
                        <span className="text-sm text-muted-foreground">Active filters:</span>
                        {activeFilters.map((filter, idx) => (
                            <Badge key={idx} variant="secondary" className="gap-2">
                                {filter.label}
                                <button
                                    onClick={filter.clear}
                                    className="hover:text-destructive"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </Badge>
                        ))}
                    </div>
                )}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="hover:bg-transparent">
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="h-12">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="py-4">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center text-muted-foreground"
                                >
                                    {movies.length === 0
                                        ? "No movies in your catalog."
                                        : "No movies match the selected filters."}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Footer */}
            <div className="px-6 py-4 border-t bg-muted/50 flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                    <span className="font-medium">{totalRows}</span> movies
                    {totalRows > 0 && (
                        <>
                            {" "}
                            • Showing{" "}
                            <span className="font-medium">
                                {pageIndex * pageSize + 1}-{Math.min((pageIndex + 1) * pageSize, totalRows)}
                            </span>{" "}
                            of <span className="font-medium">{totalRows}</span>
                        </>
                    )}
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">Rows per page</span>
                        <Select
                            value={String(pageSize)}
                            onValueChange={(value) => {
                                table.setPageSize(Number(value));
                            }}
                        >
                            <SelectTrigger className="w-16">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {[10, 20, 30, 50].map((size) => (
                                    <SelectItem key={size} value={String(size)}>
                                        {size}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <ChevronsLeft className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </Button>

                        <div className="flex items-center gap-1 text-sm">
                            Page <span className="font-medium">{pageIndex + 1}</span> of{" "}
                            <span className="font-medium">{totalPages || 1}</span>
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.setPageIndex(totalPages - 1)}
                            disabled={!table.getCanNextPage()}
                        >
                            <ChevronsRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
