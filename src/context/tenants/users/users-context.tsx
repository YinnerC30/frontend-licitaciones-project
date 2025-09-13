import { useGetAllCriteria } from '@/hooks/criteria/use-get-all-criteria';
import { useGetAllUsersTenant } from '@/hooks/users/use-get-all-users-tenant';
import { columnsCriteria } from '@/pages/tenant/app/criteria/manage-all-criteria';
import { columnsUsers } from '@/pages/tenant/app/users/manage-all-tenant-users';
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

interface UsersContextType<TData> {
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
  queryUsers: UseQueryResult<any, Error>;
}

const UsersContext = createContext<UsersContextType<any> | null>(null);

interface UsersProviderProps {
  children: ReactNode;
}

export const UsersProvider = ({ children }: UsersProviderProps) => {
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const queryUsers = useGetAllUsersTenant({
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
    data: queryUsers.data?.records || [],
    columns: columnsUsers,
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
    pageCount: queryUsers.data?.total_page_count ?? 0,
    rowCount: queryUsers.data?.total_row_count ?? 0,
  });

  const countSelectedCriteria = table.getSelectedRowModel().rows.length;
  const hasSelectedCriteria = countSelectedCriteria > 0;

  const value = {
    table,
    hasSelectedCriteria,
    countSelectedCriteria,
    pagination_information: queryUsers.data ?? {
      total_row_count: 0,
      total_page_count: 0,
      current_row_count: 0,
      current_page_count: 0,
    },
    pagination,
    queryUsers,
  };

  return (
    <UsersContext.Provider value={value}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsersContext = <TData = any,>() => {
  const context = useContext(UsersContext);
  if (context === null) {
    throw new Error(
      'useCriteriaContext debe usarse dentro de CriteriaProvider'
    );
  }
  return context as UsersContextType<TData>;
};
