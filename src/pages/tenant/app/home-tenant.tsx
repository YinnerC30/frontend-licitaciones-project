import ButtonRefetch from '@/components/button-refetch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetAllCriteria } from '@/hooks/criteria/use-get-all-criteria';
import { useGetAllLicitations } from '@/hooks/licitations/use-get-all-licitations';
import { useGetAllLicitationsByCriteria } from '@/hooks/licitations/use-get-all-licitations-by-criteria';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table';

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
];

export const columnsLicitations: ColumnDef<any>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'id_original',
    header: 'ID original',
  },
  {
    accessorKey: 'fecha_hora_ejecucion_cron',
    header: 'Fecha y hora de ejecución cron',
  },
  {
    accessorKey: 'nombre',
    header: 'Nombre',
  },
  {
    accessorKey: 'nombre_organismo',
    header: 'Nombre del organismo',
  },
  {
    accessorKey: 'descripcion',
    header: 'Descripción',
  },
  {
    accessorKey: 'moneda',
    header: 'Moneda',
  },
  {
    accessorKey: 'fecha_hora_cierre',
    header: 'Fecha y hora de cierre',
  },
  {
    accessorKey: 'monto_disponible',
    header: 'Monto disponible',
  },
];

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function TemplateDataTable<TData, TValue>({
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

export const HomeTenant = () => {
  const query = useGetAllLicitations();

  const queryByCriteria = useGetAllLicitationsByCriteria();

  const queryCriteria = useGetAllCriteria();

  if (
    query.isFetching ||
    queryByCriteria.isFetching ||
    queryCriteria.isFetching
  ) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Todos los criterios</h1>
      <ButtonRefetch
        onRefetch={async () => {
          await queryCriteria.refetch();
        }}
      />
      {/* <pre>{JSON.stringify(queryCriteria.data, null, 2)}</pre> */}
      <TemplateDataTable
        columns={columnsCriteria}
        data={queryCriteria.data.records}
      />

      <h1>Todas las licitaciones</h1>
      <ButtonRefetch
        onRefetch={async () => {
          await query.refetch();
        }}
      />
      {/* <pre>{JSON.stringify(query.data, null, 2)}</pre> */}
      <TemplateDataTable
        columns={columnsLicitations}
        data={query.data.records}
      />

      <h1>Todas las licitaciones por criterio</h1>
      <ButtonRefetch
        onRefetch={async () => {
          await queryByCriteria.refetch();
        }}
      />
      {/* <pre>{JSON.stringify(queryByCriteria.data, null, 2)}</pre> */}
      <TemplateDataTable
        columns={columnsLicitations}
        data={queryByCriteria.data.records}
      />
    </div>
  );
};
