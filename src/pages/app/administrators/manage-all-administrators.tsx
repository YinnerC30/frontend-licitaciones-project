import { useGetAllAdministrators } from '@/hooks/administrators/use-get-all-administrators';
import CreateAdministrator from './create-administrator';

import { type ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'first_name',
    header: 'Nombre',
  },
  {
    accessorKey: 'email',
    header: 'Correo',
  },
  {
    accessorKey: 'cell_phone_number',
    header: 'N° Celular',
  },
  {
    accessorKey: 'role',
    header: 'Rol',
  },
  {
    accessorKey: 'is_active',
    header: '¿Activo?',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const record = row.original;

      const { mutate } = useRemoveAdministrator();

      const handleRemove = () => {
        mutate(record.id);
      };

      return (
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
            <DropdownMenuItem onClick={handleRemove}>Eliminar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MoreHorizontal } from 'lucide-react';
import { useRemoveAdministrator } from '@/hooks/administrators/use-remove-administrator';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function AdministratorsDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export const ManageAllAdministrator = () => {
  const { data, isFetching, refetch } = useGetAllAdministrators();

  if (isFetching) {
    return <div>Cargando...</div>;
  }

  const { records } = data;

  return (
    <div className="flex gap-2 flex-col">
      <h1 className="font-bold text-2xl my-4">Administradores del sistema</h1>

      <div className="flex justify-between">
        <Button
          type="button"
          onClick={async () => {
            await refetch();
          }}
        >
          Recargar
        </Button>
        <CreateAdministrator />
      </div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <AdministratorsDataTable columns={columns} data={records} />
    </div>
  );
};
