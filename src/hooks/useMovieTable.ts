import { useState, useMemo } from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  Table, // <-- add this
} from "@tanstack/react-table";

interface UseMovieTableConfig<T> {
  table: Table<T>;
  columns: ColumnDef<T>[];
  data: T[];
  pageSize?: number;
  enableColumnVisibility?: boolean;
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enablePagination?: boolean;
}

interface UseMovieTableReturn<T> {
  table: ReturnType<typeof useReactTable<T>>;
  sorting: SortingState;
  setSorting: (sorting: SortingState) => void;
  columnFilters: ColumnFiltersState;
  setColumnFilters: (filters: ColumnFiltersState) => void;
  columnVisibility: VisibilityState;
  setColumnVisibility: (visibility: VisibilityState) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  selectedRows: Record<string, boolean>;
  setSelectedRows: (rows: Record<string, boolean>) => void;
  clearFilters: () => void;
  getActiveFiltersCount: () => number;
}

/**
 * Custom hook for managing movie table state and logic
 * Handles sorting, filtering, pagination, and column visibility
 *
 * @example
 * const {
 *   table,
 *   searchValue,
 *   setSearchValue,
 *   clearFilters,
 * } = useMovieTable({
 *   columns: MovieColumns,
 *   data: movies,
 *   pageSize: 20,
 * });
 */
export const useMovieTable = <T>({
  columns,
  data,
  pageSize = 10,
  enableColumnVisibility = true,
  enableSorting = true,
  enableFiltering = true,
  enablePagination = true,
}: UseMovieTableConfig<T>): UseMovieTableReturn<T> => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [searchValue, setSearchValue] = useState("");
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    onSortingChange: enableSorting ? setSorting : undefined,
    onColumnFiltersChange: enableFiltering ? setColumnFilters : undefined,
    onColumnVisibilityChange: enableColumnVisibility
      ? setColumnVisibility
      : undefined,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
    getPaginationRowModel: enablePagination
      ? getPaginationRowModel()
      : undefined,
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  const clearFilters = () => {
    setSorting([]);
    setColumnFilters([]);
    setSearchValue("");
    setSelectedRows({});
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchValue) count++;
    if (columnFilters.length > 0) count += columnFilters.length;
    if (Object.values(selectedRows).some(Boolean)) count++;
    return count;
  };

  return {
    table,
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
    columnVisibility,
    setColumnVisibility,
    searchValue,
    setSearchValue,
    selectedRows,
    setSelectedRows,
    clearFilters,
    getActiveFiltersCount,
  };
};

/**
 * Hook for managing bulk actions on selected rows
 *
 * @example
 * const { selectedCount, isAllSelected, toggleAll } = useBulkActions({
 *   selectedRows,
 *   rowCount: table.getRowModel().rows.length,
 * });
 */
interface UseBulkActionsConfig {
  selectedRows: Record<string, boolean>;
  rowCount: number;
}

interface UseBulkActionsReturn {
  selectedCount: number;
  isAllSelected: boolean;
  toggleAll: (selected: boolean) => void;
  canDelete: boolean;
  canArchive: boolean;
  canFeature: boolean;
}

export const useBulkActions = ({
  selectedRows,
  rowCount,
}: UseBulkActionsConfig): UseBulkActionsReturn => {
  const selectedCount = Object.values(selectedRows).filter(Boolean).length;
  const isAllSelected = selectedCount === rowCount && rowCount > 0;

  const toggleAll = (selected: boolean) => {
    // Implementation would depend on how you handle row IDs
    // This is a placeholder
  };

  return {
    selectedCount,
    isAllSelected,
    toggleAll,
    canDelete: selectedCount > 0,
    canArchive: selectedCount > 0,
    canFeature: selectedCount > 0,
  };
};

/**
 * Hook for managing table export functionality
 *
 * @example
 * const { exportToCSV, exportToJSON } = useTableExport({
 *   data: movies,
 *   fileName: "movies",
 * });
 */
interface UseTableExportConfig<T> {
  data: T[];
  fileName: string;
  columns?: string[];
}

interface UseTableExportReturn {
  exportToCSV: () => void;
  exportToJSON: () => void;
  exportToXLS: () => Promise<void>;
}

export const useTableExport = <T>({
  data,
  fileName,
  columns,
}: UseTableExportConfig<T>): UseTableExportReturn => {
  const exportToCSV = () => {
    if (data.length === 0) {
      console.warn("No data to export");
      return;
    }

    const headers = columns || Object.keys(data[0] as object);
    const csvContent = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((header) => {
            const value = (row as any)[header];
            // Escape quotes and wrap in quotes if contains comma
            if (typeof value === "string" && value.includes(",")) {
              return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
          })
          .join(",")
      ),
    ].join("\n");

    downloadFile(csvContent, `${fileName}.csv`, "text/csv");
  };

  const exportToJSON = () => {
    const jsonContent = JSON.stringify(data, null, 2);
    downloadFile(jsonContent, `${fileName}.json`, "application/json");
  };

  const exportToXLS = async () => {
    // This would require a library like xlsx
    // Placeholder for future implementation
    console.log("XLS export requires xlsx library");
  };

  return {
    exportToCSV,
    exportToJSON,
    exportToXLS,
  };
};

/**
 * Helper function to trigger file download
 */
const downloadFile = (content: string, fileName: string, mimeType: string) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Hook for local storage persistence of table state
 *
 * @example
 * const { saveState, loadState } = useTableStatePersistence("movies-table");
 *
 * // Save state
 * useEffect(() => {
 *   saveState({ sorting, columnFilters, columnVisibility });
 * }, [sorting, columnFilters, columnVisibility]);
 *
 * // Load state on mount
 * useEffect(() => {
 *   const saved = loadState();
 *   if (saved) {
 *     setSorting(saved.sorting);
 *     setColumnFilters(saved.columnFilters);
 *     setColumnVisibility(saved.columnVisibility);
 *   }
 * }, []);
 */
interface UseTableStatePersistenceReturn {
  saveState: (state: any) => void;
  loadState: () => any | null;
  clearState: () => void;
}

export const useTableStatePersistence = (
  storageKey: string
): UseTableStatePersistenceReturn => {
  const saveState = (state: any) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch (error) {
      console.error("Failed to save table state:", error);
    }
  };

  const loadState = () => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error("Failed to load table state:", error);
      return null;
    }
  };

  const clearState = () => {
    try {
      localStorage.removeItem(storageKey);
    } catch (error) {
      console.error("Failed to clear table state:", error);
    }
  };

  return {
    saveState,
    loadState,
    clearState,
  };
};
