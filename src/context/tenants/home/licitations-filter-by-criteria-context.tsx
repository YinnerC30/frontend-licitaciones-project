import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type Table,
  type VisibilityState,
} from '@tanstack/react-table';
import React from 'react';
import { createContext, useContext, type ReactNode } from 'react';

interface LicitationsFilterByCriteriaContextType<TData> {
  table: Table<TData>;
  hasSelectedLicitations: boolean;
  countSelectedLicitations: number;
  pagination_information: {
    total_row_count: number;
    current_row_count: number;
    total_page_count: number;
    current_page_count: number;
  };
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
}

const LicitationsFilterByCriteriaContext =
  createContext<LicitationsFilterByCriteriaContextType<any> | null>(null);

interface LicitationsFilterByCriteriaProviderProps<TData, TValue> {
  children: ReactNode;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination_information?: {
    total_row_count: number;
    current_row_count: number;
    total_page_count: number;
    current_page_count: number;
  };
}

export const LicitationsFilterByCriteriaProvider = <TData, TValue>({
  children,
  columns,
  data,
  pagination_information = {
    total_row_count: 0,
    current_row_count: 0,
    total_page_count: 0,
    current_page_count: 0,
  },
}: LicitationsFilterByCriteriaProviderProps<TData, TValue>) => {
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    // No usamos getPaginationRowModel porque la paginación es manual
    pageCount: pagination_information?.total_page_count ?? 0,
    rowCount: pagination_information?.total_row_count ?? 0,
  });

  const countSelectedLicitations = table.getSelectedRowModel().rows.length;
  const hasSelectedLicitations = countSelectedLicitations > 0;

  const value = {
    table,
    hasSelectedLicitations,
    countSelectedLicitations,
    pagination_information,
    pagination,
  };

  return (
    <LicitationsFilterByCriteriaContext.Provider value={value}>
      {children}
    </LicitationsFilterByCriteriaContext.Provider>
  );
};

export const useLicitationsFilterByCriteriaContext = <TData = any,>() => {
  const context = useContext(LicitationsFilterByCriteriaContext);
  if (context === null) {
    throw new Error(
      'useLicitationsFilterByCriteriaContext debe usarse dentro de LicitationsFilterByCriteriaProvider'
    );
  }
  return context as LicitationsFilterByCriteriaContextType<TData>;
};
