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
import { MoreHorizontal } from 'lucide-react';
import { TemplateDataTable } from '../home-tenant';
import CreateCriterion from './create-criterion';
import { useState } from 'react';
import UpdateCriterion from './update-criterion';

export const columnsCriteria: ColumnDef<any>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
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
                Copiar ID
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {
                  setOpenDialog(true);
                }}
              >
                Modificar
              </DropdownMenuItem>

              <DropdownMenuItem onClick={handleRemove}>
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

      {/* <pre>{JSON.stringify(queryCriteria.data, null, 2)}</pre> */}
      <TemplateDataTable columns={columnsCriteria} data={records} />
    </div>
  );
};

export default ManageAllCriteria;
