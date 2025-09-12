import { useGetAllCriteria } from '@/hooks/criteria/use-get-all-criteria';
import { columnsCriteria } from '@/pages/tenant/app/criteria/manage-all-criteria';
import type { UseQueryResult } from '@tanstack/react-query';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
  type Table,
  type VisibilityState,
} from '@tanstack/react-table';
import React, { createContext, useContext, type ReactNode } from 'react';

interface CriteriaContextType<TData> {
  table: Table<TData>;
  hasSelectedCriteria: boolean;
  countSelectedCriteria: number;
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
  queryCriteria: UseQueryResult<any, Error>;
}

const CriteriaContext = createContext<CriteriaContextType<any> | null>(null);

interface CriteriaProviderProps {
  children: ReactNode;
}

export const CriteriaProvider = ({ children }: CriteriaProviderProps) => {
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const queryCriteria = useGetAllCriteria({
    limit: pagination.pageSize,
    offset: pagination.pageIndex,
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: queryCriteria.data?.records || [],
    columns: columnsCriteria,
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
    pageCount: queryCriteria.data?.total_page_count ?? 0,
    rowCount: queryCriteria.data?.total_row_count ?? 0,
  });

  const countSelectedCriteria = table.getSelectedRowModel().rows.length;
  const hasSelectedCriteria = countSelectedCriteria > 0;

  const value = {
    table,
    hasSelectedCriteria,
    countSelectedCriteria,
    pagination_information: queryCriteria.data ?? {
      total_row_count: 0,
      total_page_count: 0,
      current_row_count: 0,
      current_page_count: 0,
    },
    pagination,
    queryCriteria,
  };

  return (
    <CriteriaContext.Provider value={value}>
      {children}
    </CriteriaContext.Provider>
  );
};

export const useCriteriaContext = <TData = any,>() => {
  const context = useContext(CriteriaContext);
  if (context === null) {
    throw new Error(
      'useCriteriaContext debe usarse dentro de CriteriaProvider'
    );
  }
  return context as CriteriaContextType<TData>;
};
