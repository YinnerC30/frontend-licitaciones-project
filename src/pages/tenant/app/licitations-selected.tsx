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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetAllLicitationsStatus } from '@/hooks/licitations-status/use-get-all-licitations-status';
import { useGetAllLicitationsSelected } from '@/hooks/licitations/use-get-all-licitations-selected';
import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import UpdateLicitationStatus from './update-licitation-status';

export const columnsLicitationsSelected: ColumnDef<any>[] = [
  {
    id: 'actions',
    cell: ({ row }) => {
      const record = row.original;

      const [openDialog, setOpenDialog] = useState(false);
      const queryLicitationsStatus = useGetAllLicitationsStatus();

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

              <DropdownMenuItem onClick={() => setOpenDialog(true)}>
                Actualizar status
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {openDialog && (
            <UpdateLicitationStatus
              data={record}
              statusDialog={openDialog}
              onChangeStatusDialog={setOpenDialog}
              query={queryLicitationsStatus}
            />
          )}
        </>
      );
    },
  },
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'id_licitacion',
    header: 'ID licitación',
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
  {
    accessorKey: 'es_aceptada',
    header: 'Aceptada',
  },
  {
    accessorKey: 'estado.codigo',
    header: 'Estado',
  },
];

type OptionQuery = 'all_records' | 'only_accepted' | 'only_rejected';

const LicitationsSelected = () => {
  const [optionQuery, setOptionQuery] = useState<OptionQuery>('only_accepted');

  const { data, isFetching, refetch } = useGetAllLicitationsSelected({
    [optionQuery]: true,
  });
  if (isFetching) {
    return <div>Cargando...</div>;
  }

  const dataRecords = data.records.map(
    ({ id, licitacion, es_aceptada, estado }: any) => ({
      ...licitacion,
      id,
      id_licitacion: licitacion.id,
      es_aceptada: es_aceptada ? 'Si' : 'No',
      estado: estado,
    })
  );

  return (
    <div className="my-10">
      <h1>Licitaciones seleccionadas</h1>
      <ButtonRefetch
        onRefetch={async () => {
          await refetch();
        }}
      />

      <Select
        value={optionQuery}
        onValueChange={(value) => setOptionQuery(value as OptionQuery)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Selecciona una opción" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all_records">Todas las licitaciones</SelectItem>
          <SelectItem value="only_accepted">Licitaciones aceptadas</SelectItem>
          <SelectItem value="only_rejected">Licitaciones rechazadas</SelectItem>
        </SelectContent>
      </Select>

      <TemplateDataTable
        columns={columnsLicitationsSelected}
        data={dataRecords}
      />
    </div>
  );
};

export default LicitationsSelected;
