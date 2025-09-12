import { useGetAllLicitationsByCriteria } from '@/hooks/licitations/use-get-all-licitations-by-criteria';
import { columnsLicitations } from '@/pages/tenant/app/raw-licitations/columns-licitations-table';
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
  queryByCriteria: UseQueryResult<any, Error>
}

const LicitationsFilterByCriteriaContext =
  createContext<LicitationsFilterByCriteriaContextType<any> | null>(null);

interface LicitationsFilterByCriteriaProviderProps {
  children: ReactNode;
}

export const LicitationsFilterByCriteriaProvider = ({
  children,
}: LicitationsFilterByCriteriaProviderProps) => {
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const queryByCriteria = useGetAllLicitationsByCriteria({
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
    data: queryByCriteria.data?.records || [],
    columns: columnsLicitations,
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
    pageCount: queryByCriteria.data?.total_page_count ?? 0,
    rowCount: queryByCriteria.data?.total_row_count ?? 0,
  });

  const countSelectedLicitations = table.getSelectedRowModel().rows.length;
  const hasSelectedLicitations = countSelectedLicitations > 0;

  const value = {
    table,
    hasSelectedLicitations,
    countSelectedLicitations,
    pagination_information: queryByCriteria.data ?? {
      total_row_count: 0,
      total_page_count: 0,
      current_row_count: 0,
      current_page_count: 0,
    },
    pagination,
    queryByCriteria,
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
