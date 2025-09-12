import ButtonRefetch from '@/components/button-refetch';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRemoveCriterion } from '@/hooks/criteria/use-remove-criterion';
import type { ColumnDef } from '@tanstack/react-table';
import { Copy, MoreHorizontal, Pencil, Trash } from 'lucide-react';

import { Checkbox } from '@/components/ui/checkbox';
import {
  CriteriaProvider,
  useCriteriaContext,
} from '@/context/tenants/criteria/criteria-context';
import { useState } from 'react';
import CreateCriterion from './create-criterion';
import CriteriaDataTable from './criteria-data-table';
import UpdateCriterion from './update-criterion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRemoveCriterionBulk } from '@/hooks/criteria/use-remove-bulk-criteria';
import { Badge } from '@/components/ui/badge';

export const columnsCriteria: ColumnDef<any>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'nombre',
    header: 'Nombre',
  },
  {
    accessorKey: 'es_valido',
    header: '¿Es valido?',
    cell: ({ row }) => {
      const record = row.original;
      return (
        <Badge
          variant={record.es_valido ? 'default' : 'destructive'}
          className="dark:text-white"
        >
          {record.es_valido ? 'Si' : 'No'}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const record = row.original;

      const [openDialog, setOpenDialog] = useState(false);
      const { mutate } = useRemoveCriterion();

      const handleRemove = () => {
        mutate(record.id);
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(record.id)}
              >
                <Copy className="h-4 w-4" />
                Copiar ID
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {
                  setOpenDialog(true);
                }}
              >
                <Pencil className="h-4 w-4" />
                Modificar
              </DropdownMenuItem>

              <DropdownMenuItem onClick={handleRemove}>
                <Trash className="h-4 w-4" />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <UpdateCriterion
            statusDialog={openDialog}
            onChangeStatusDialog={setOpenDialog}
            data={record}
          />
        </>
      );
    },
  },
];

export const GeneralActionsTable = () => {
  const { queryCriteria, table, hasSelectedCriteria } = useCriteriaContext();
  const { mutate } = useRemoveCriterionBulk();

  const handleRemove = () => {
    const selectedIds = table.getSelectedRowModel().rows.map((row) => {
      return { id: row.original.id };
    });
    mutate({ recordsIds: selectedIds });
  };

  return (
    <div className="flex gap-2 justify-between">
      <ButtonRefetch
        disabled={queryCriteria.isFetching}
        onRefetch={async () => {
          await queryCriteria.refetch();
        }}
      />
      <div className="flex gap-2">
        {hasSelectedCriteria && (
          <Button
            onClick={handleRemove}
            variant="destructive"
            className="bg-red-500 text-white hover:bg-red-500/80 cursor-pointer"
            disabled={!hasSelectedCriteria}
          >
            <Trash className="h-4 w-4" />
            Eliminar
          </Button>
        )}
        <CreateCriterion />
      </div>
    </div>
  );
};

const PaginationInformation = () => {
  const { pagination_information, countSelectedCriteria, table } =
    useCriteriaContext();
  return (
    <div className="grid grid-cols-2 gap-2 my-2">
      <div className="">
        <p>Total: {pagination_information.total_row_count}</p>
        <p>N° de seleccionados: {countSelectedCriteria}</p>
      </div>
      <div className="flex items-center gap-2 justify-end">
        <p className="text-sm">N° registros:</p>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger
            className="h-8 w-[70px]"
            data-testid="btn-page-size-selector"
          >
            <SelectValue
              className="font-medium text-muted-foreground"
              placeholder={table.getState().pagination.pageSize}
              data-testid="page-size-value"
            />
          </SelectTrigger>
          <SelectContent
            side="top"
            onPointerDownOutside={(e) => e.preventDefault()}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem
                key={pageSize}
                value={`${pageSize}`}
                data-testid={`select-item-page-size-${pageSize}`}
              >
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

const ManageAllCriteria = () => {
  return (
    <div className="grid grid-cols-1 gap-2">
      <h1 className="font-bold text-2xl my-4">Criterios de búsqueda</h1>

      <CriteriaProvider>
        <GeneralActionsTable />

        <PaginationInformation />

        <CriteriaDataTable />
      </CriteriaProvider>
    </div>
  );
};

export default ManageAllCriteria;
