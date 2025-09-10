import ButtonRefetch from '@/components/button-refetch';
import { TemplateDataTable } from '@/components/data-table/template-data-table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useGetAllLicitations } from '@/hooks/licitations/use-get-all-licitations';
import { useGetAllLicitationsByCriteria } from '@/hooks/licitations/use-get-all-licitations-by-criteria';
import { useSelectedLicitation } from '@/hooks/licitations/use-selected-licitation';
import { type ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import LicitationsSelected from '../licitations-selected';

export const columnsLicitations: ColumnDef<any>[] = [
  {
    id: 'actions',
    cell: ({ row }) => {
      const record = row.original;

      const { mutate } = useSelectedLicitation();

      const handleSelected = () => {
        mutate({ id_licitacion: record.id, es_aceptada: true });
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

              <DropdownMenuItem onClick={handleSelected}>
                Seleccionar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
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

export const HomeTenant = () => {
  const query = useGetAllLicitations();

  const queryByCriteria = useGetAllLicitationsByCriteria();

  if (query.isFetching || queryByCriteria.isFetching) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Todas las licitaciones</h1>
      <ButtonRefetch
        onRefetch={async () => {
          await query.refetch();
        }}
      />

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
      <TemplateDataTable
        columns={columnsLicitations}
        data={queryByCriteria.data.records}
      />

      <LicitationsSelected />
    </div>
  );
};
