import { useGetAllLicitationsSelected } from '@/hooks/licitations/use-get-all-licitations-selected';
import { columnsLicitationsSelected } from '@/pages/tenant/app/licitations-selected/licitations-selected';
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

type OptionQuery = 'all_selected_records' | 'only_accepted' | 'only_rejected';

interface LicitationsSelectedContextType<TData> {
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
  queryLicitationsSelected: UseQueryResult<any, Error>;
  optionQuery: OptionQuery;
  setOptionQuery: (option: OptionQuery) => void;
  hasSelectedLicitations: boolean;
  countSelectedLicitations: number;
}

const LicitationsSelectedContext =
  createContext<LicitationsSelectedContextType<any> | null>(null);

interface LicitationsSelectedProviderProps {
  children: ReactNode;
}

export const LicitationsSelectedProvider = ({
  children,
}: LicitationsSelectedProviderProps) => {
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [optionQuery, setOptionQuery] =
    React.useState<OptionQuery>('only_accepted');

  const queryLicitationsSelected = useGetAllLicitationsSelected({
    limit: pagination.pageSize,
    offset: pagination.pageIndex,
    [optionQuery]: true,
  });

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // Transformar los datos para la tabla
  const dataRecords = React.useMemo(() => {
    if (!queryLicitationsSelected.data?.records) return [];

    return queryLicitationsSelected.data.records.map(
      ({ id, licitacion, etapa, es_aceptada }: any) => ({
        ...licitacion,
        id,
        id_licitacion: licitacion.id,
        etapa: etapa,
        es_aceptada: es_aceptada,
      })
    );
  }, [queryLicitationsSelected.data?.records]);

  const table = useReactTable({
    data: dataRecords,
    columns: columnsLicitationsSelected,
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
    pageCount: queryLicitationsSelected.data?.total_page_count ?? 0,
    rowCount: queryLicitationsSelected.data?.total_row_count ?? 0,
  });

  const countSelectedLicitations = table.getSelectedRowModel().rows.length;
  const hasSelectedLicitations = countSelectedLicitations > 0;

  const value = {
    table,
    pagination_information: queryLicitationsSelected.data ?? {
      total_row_count: 0,
      total_page_count: 0,
      current_row_count: 0,
      current_page_count: 0,
    },
    pagination,
    queryLicitationsSelected,
    optionQuery,
    setOptionQuery,
    hasSelectedLicitations,
    countSelectedLicitations,
  };

  return (
    <LicitationsSelectedContext.Provider value={value}>
      {children}
    </LicitationsSelectedContext.Provider>
  );
};

export const useLicitationsSelectedContext = <TData = any,>() => {
  const context = useContext(LicitationsSelectedContext);
  if (context === null) {
    throw new Error(
      'useLicitationsSelectedContext debe usarse dentro de LicitationsSelectedProvider'
    );
  }
  return context as LicitationsSelectedContextType<TData>;
};
