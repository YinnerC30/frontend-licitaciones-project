import { Button } from '@/components/ui/button';
import {
  UsersProvider,
  useUsersContext,
} from '@/context/tenants/users/users-context';
import UsersDataTable from './users-data-table';

import ButtonRefetch from '@/components/button-refetch';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRemoveUserBulk } from '@/hooks/users/use-remove-bulk-users';
import { useRemoveUser } from '@/hooks/users/use-remove-user';
import type { ColumnDef } from '@tanstack/react-table';
import { Copy, MoreHorizontal, Pencil, Trash } from 'lucide-react';
import { useState } from 'react';
import CreateUser from './create-user';
import UpdateUser from './update-user';

export const columnsUsers: ColumnDef<any>[] = [
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
    accessorKey: 'username',
    header: 'Nombre',
  },
  {
    accessorKey: 'role',
    header: 'Rol',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const record = row.original;

      const [openDialog, setOpenDialog] = useState(false);
      const { mutate } = useRemoveUser();

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
          <UpdateUser
            statusDialog={openDialog}
            onChangeStatusDialog={setOpenDialog}
            data={record}
          />
        </>
      );
    },
  },
];

const PaginationInformation = () => {
  const { pagination_information, countSelectedUsers, table } =
    useUsersContext();
  return (
    <div className="grid grid-cols-2 gap-2 my-2">
      <div className="">
        <p>Total: {pagination_information.total_row_count}</p>
        <p>N° de seleccionados: {countSelectedUsers}</p>
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

const GeneralActionsTable = () => {
  const { queryUsers, table, hasSelectedUsers } = useUsersContext();
  const { mutate } = useRemoveUserBulk();

  const handleRemove = () => {
    const selectedIds = table.getSelectedRowModel().rows.map((row) => {
      return { id: row.original.id };
    });
    mutate({ recordsIds: selectedIds });
  };

  return (
    <div className="flex justify-between">
      <ButtonRefetch
        onRefetch={async () => {
          await queryUsers.refetch();
        }}
      />

      <div className="flex gap-2">
        {hasSelectedUsers && (
          <Button variant="destructive" className="w-24 cursor-pointer bg-red-500 text-white hover:bg-red-500/80" onClick={handleRemove}>
            <Trash className="h-4 w-4" />
            Eliminar
          </Button>
        )}

        <CreateUser />
      </div>
    </div>
  );
};

const ManageAllTenantUsers = () => {
  return (
    <div>
      <h1 className="font-bold text-2xl my-4">Usuarios del sistema</h1>
      <UsersProvider>
        <GeneralActionsTable />
        <PaginationInformation />
        <UsersDataTable />
      </UsersProvider>
    </div>
  );
};

export default ManageAllTenantUsers;
