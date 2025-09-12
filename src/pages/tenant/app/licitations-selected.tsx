import ButtonRefetch from '@/components/button-refetch';
import { TemplateDataTable } from '@/components/data-table/template-data-table';
import { Badge } from '@/components/ui/badge';
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
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Copy, MoreHorizontal, Pencil } from 'lucide-react';
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
                <Copy className="h-4 w-4" />
                Copiar ID
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setOpenDialog(true)}>
                <Pencil className="h-4 w-4" />
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
    accessorKey: 'id_original',
    header: 'ID original',
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
    cell: ({ row }) => {
      return (
        <div className="line-clamp-2">
          {row.original.descripcion.length
            ? row.original.descripcion
            : 'Sin descripción'}
        </div>
      );
    },
  },
  {
    accessorKey: 'moneda',
    header: 'Moneda',
    cell: ({ row }) => {
      return (
        <Badge className="bg-purple-500 text-white">
          {row.original.moneda}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'fecha_hora_cierre',
    header: 'Fecha y hora de cierre',
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <span className="text-end">
            {format(
              new Date(row.original.fecha_hora_cierre),
              "dd 'de' MMMM 'del' yyyy, hh:mm a",
              { locale: es }
            )}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'monto_disponible',
    header: 'Monto disponible',
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <span className="text-end">
            {row.original.monto_disponible.toLocaleString('es-CL', {
              style: 'currency',
              currency: row.original.moneda || 'CLP',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'es_aceptada',
    header: 'Valida',
    cell: ({ row }) => {
      const color = row.original.es_aceptada ? 'bg-green-500' : 'bg-red-500';
      return (
        <Badge className={color}>
          {row.original.es_aceptada ? 'Si' : 'No'}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'estado.codigo',
    header: 'Estado',
    cell: ({ row }) => {
      return (
        <Badge className="bg-gray-500 text-white">
          {row.original.estado?.codigo ?? 'Sin estado'}
        </Badge>
      );
    },
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

  const dataRecords = data.records.map(({ id, licitacion, estado }: any) => ({
    ...licitacion,
    id,
    id_licitacion: licitacion.id,
    estado: estado,
  }));

  return (
    <div className="my-10">
      <h1 className="text-2xl font-bold">Licitaciones seleccionadas</h1>

      <div className="grid grid-cols-2 gap-2 my-2">
        <div>
          <ButtonRefetch
            className=""
            onRefetch={async () => {
              await refetch();
            }}
          />
        </div>

        <div className="flex items-center gap-2 justify-end">
          <span>Filtrar por:</span>
          <Select
            value={optionQuery}
            onValueChange={(value) => setOptionQuery(value as OptionQuery)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una opción" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all_records">Todas</SelectItem>
              <SelectItem value="only_accepted">Validas</SelectItem>
              <SelectItem value="only_rejected">Descartadas</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <TemplateDataTable
        columns={columnsLicitationsSelected}
        data={dataRecords}
      />
    </div>
  );
};

export default LicitationsSelected;
