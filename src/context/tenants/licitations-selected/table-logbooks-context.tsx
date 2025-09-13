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
import { useGetAllLogbooksByLicitationSelected } from '../../../hooks/logbooks/use-get-all-logbooks-by-licitation-selected';
import { columnsLogbooks } from '../../../pages/tenant/app/licitations-selected/manage/manage-one-licitation-selected';

interface LicitationLogbookContextType<TData> {
  table: Table<TData>;
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
  queryLicitationLogbooks: UseQueryResult<any, Error>;

  hasSelectedLicitationLogbooks: boolean;
  countSelectedLicitationLogbooks: number;
  id_licitacion_selected: string;
}

const LicitationsLogbooksContext =
  createContext<LicitationLogbookContextType<any> | null>(null);

interface LicitationsLogbooksProviderProps {
  children: ReactNode;
  id_licitacion_selected: string;
}

export const LicitationsLogbooksProvider = ({
  children,
  id_licitacion_selected,
}: LicitationsLogbooksProviderProps) => {
  console.log(
    '🚀 ~ LicitationsLogbooksProvider ~ id_licitacion_selected:',
    id_licitacion_selected
  );
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const queryLicitationLogbooks = useGetAllLogbooksByLicitationSelected({
    limit: pagination.pageSize,
    offset: pagination.pageIndex,
    id_licitacion_selected: id_licitacion_selected,
  });

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: queryLicitationLogbooks.data?.records || [],
    columns: columnsLogbooks,
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
    pageCount: queryLicitationLogbooks.data?.total_page_count ?? 0,
    rowCount: queryLicitationLogbooks.data?.total_row_count ?? 0,
  });

  const countSelectedLicitationLogbooks =
    table.getSelectedRowModel().rows.length;
  const hasSelectedLicitationLogbooks = countSelectedLicitationLogbooks > 0;

  const value = {
    table,
    pagination_information: queryLicitationLogbooks.data ?? {
      total_row_count: 0,
      total_page_count: 0,
      current_row_count: 0,
      current_page_count: 0,
    },
    pagination,
    queryLicitationLogbooks,
    hasSelectedLicitationLogbooks,
    countSelectedLicitationLogbooks,
    id_licitacion_selected,
  };

  return (
    <LicitationsLogbooksContext.Provider value={value}>
      {children}
    </LicitationsLogbooksContext.Provider>
  );
};

export const useLicitationsLogbooksContext = <TData = any,>() => {
  const context = useContext(LicitationsLogbooksContext);
  if (context === null) {
    throw new Error(
      'useLicitationsLogbooksContext debe usarse dentro de LicitationsLogbooksProvider'
    );
  }
  return context as LicitationLogbookContextType<TData>;
};
