import ButtonRefetch from '@/components/button-refetch';
import { useGetAllLicitationsStatus } from '@/hooks/licitations-status/use-get-all-licitations-status';
import type { ColumnDef } from '@tanstack/react-table';
import { TemplateDataTable } from '@/components/data-table/template-data-table';

export const columnsLicitationsSelected: ColumnDef<any>[] = [
  // {
  //   id: 'actions',
  //   cell: ({ row }) => {
  //     const record = row.original;

  //     const { mutate } = useSelectedLicitation();

  //     const handleSelected = () => {
  //       mutate({ id_licitacion: record.id, es_aceptada: true });
  //     };

  //     return (
  //       <>
  //         <DropdownMenu>
  //           <DropdownMenuTrigger asChild>
  //             <Button variant="ghost" className="h-8 w-8 p-0">
  //               <span className="sr-only">Open menu</span>
  //               <MoreHorizontal className="h-4 w-4" />
  //             </Button>
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent align="end">
  //             <DropdownMenuLabel>Acciones</DropdownMenuLabel>
  //             <DropdownMenuItem
  //               onClick={() => navigator.clipboard.writeText(record.id)}
  //             >
  //               Copiar ID
  //             </DropdownMenuItem>

  //             <DropdownMenuItem onClick={handleSelected}>
  //               Seleccionar
  //             </DropdownMenuItem>
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //       </>
  //     );
  //   },
  // },
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'codigo',
    header: 'Codigo',
  },
  {
    accessorKey: 'descripcion',
    header: 'Descripcion',
  },
];

const ManageAllLicitationsStatus = () => {
  const { data, isFetching, refetch } = useGetAllLicitationsStatus();
  if (isFetching) {
    return <div>Cargando...</div>;
  }
  return (
    <div>
      <h1>Licitaciones status</h1>
      <ButtonRefetch
        onRefetch={async () => {
          await refetch();
        }}
      />

      <TemplateDataTable
        columns={columnsLicitationsSelected}
        data={data.records}
      />
    </div>
  );
};

export default ManageAllLicitationsStatus;
