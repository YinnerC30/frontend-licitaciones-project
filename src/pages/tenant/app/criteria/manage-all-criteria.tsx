import ButtonRefetch from '@/components/button-refetch';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useGetAllCriteria } from '@/hooks/criteria/use-get-all-criteria';
import { useRemoveCriterion } from '@/hooks/criteria/use-remove-criterion';
import type { ColumnDef } from '@tanstack/react-table';
import { Copy, MoreHorizontal, Pencil, Trash } from 'lucide-react';

import CreateCriterion from './create-criterion';
import { useState } from 'react';
import UpdateCriterion from './update-criterion';
import { TemplateDataTable } from '@/components/data-table/template-data-table';
import { Checkbox } from '@/components/ui/checkbox';

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

const ManageAllCriteria = () => {
  const queryCriteria = useGetAllCriteria();

  if (queryCriteria.isFetching) {
    return <div>Cargando...</div>;
  }

  const { records } = queryCriteria.data;

  return (
    <div className="flex gap-2 flex-col">
      <h1 className="font-bold text-2xl my-4">Todos los criterios</h1>

      <div className="flex justify-between">
        <ButtonRefetch
          onRefetch={async () => {
            await queryCriteria.refetch();
          }}
        />

        <CreateCriterion />
      </div>

      <TemplateDataTable columns={columnsCriteria} data={records} />
    </div>
  );
};

export default ManageAllCriteria;
