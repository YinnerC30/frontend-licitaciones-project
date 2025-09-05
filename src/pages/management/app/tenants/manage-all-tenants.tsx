import { type ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'subdomain',
    header: 'Subdominio',
  },
  {
    accessorKey: 'company_name',
    header: 'Nombre de empresa',
  },
  {
    accessorKey: 'cell_phone_number',
    header: 'N° Celular',
  },
  {
    accessorKey: 'email',
    header: 'Correo',
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const record = row.original;

      const { mutate, isPending } = useCreateTenantDB();

      const configDbMutation = useConfigTenantDB();

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
                disabled={isPending}
                onClick={() => {
                  mutate(record.id);
                }}
              >
                Crear DB
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={isPending}
                onClick={() => {
                  configDbMutation.mutate(record.id);
                }}
              >
                Config DB
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import ButtonRefetch from '@/components/button-refetch';
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

import { useGetAllTenants } from '@/hooks/tenants/use-get-all-tenants';
import CreateTenant from './create-tenant';
import { useCreateTenantDB } from '@/hooks/tenants/use-create-tenant-db';
import { useConfigTenantDB } from '@/hooks/tenants/use-config-tenant-db';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function TenantsDataTable<TData, TValue>({
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

export const ManageAllTenants = () => {
  const { data, isFetching, refetch } = useGetAllTenants();

  if (isFetching) {
    return <div>Cargando...</div>;
  }

  const { records } = data;

  return (
    <div className="flex gap-2 flex-col">
      <h1 className="font-bold text-2xl my-4">Inquilinos del sistema</h1>

      <div className="flex justify-between">
        <ButtonRefetch
          onRefetch={async () => {
            await refetch();
          }}
        />

        <CreateTenant />
      </div>

      <TenantsDataTable columns={columns} data={records} />
    </div>
  );
};
