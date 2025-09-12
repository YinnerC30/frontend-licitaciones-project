import { flexRender } from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useHomeTenantContext } from '@/context/tenants/home/home-tenant-context';
import { useLicitationsFilterByCriteriaContext } from '@/context/tenants/home/licitations-filter-by-criteria-context';

export function LicitationsFilterByCriteriaDataTable<TData>() {
  const { setSelectedLicitacion, selectedLicitacion } = useHomeTenantContext();
  const { table } = useLicitationsFilterByCriteriaContext<TData>();

  return (
    <div className="overflow-hidden rounded-md border px-2 py-1">
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
            table.getRowModel().rows.map((row: any) => {

              const isSelected = row.original?.id === selectedLicitacion?.id;
              return (
                <>
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className={`cursor-pointer ${isSelected ? 'bg-muted' : ''}`}
                    onDoubleClick={() => {
                      setSelectedLicitacion(row.original);
                    }}
                  >
                    {row.getVisibleCells().map((cell: any) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </>
              );
            })
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.getAllColumns().length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default LicitationsFilterByCriteriaDataTable;
