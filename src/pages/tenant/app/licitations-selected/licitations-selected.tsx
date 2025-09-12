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
  LicitationsSelectedProvider,
  useLicitationsSelectedContext,
} from '@/context/tenants/licitations-selected/licitations-selected-context';
import { useGetAllLicitationsStatus } from '@/hooks/licitations-status/use-get-all-licitations-status';
import { useUpdateClasifyLicitation } from '@/hooks/licitations/use-update-clasify-licitation';
import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  CheckCircle,
  Copy,
  Globe,
  MoreHorizontal,
  Pencil,
  XCircle,
} from 'lucide-react';
import { useState } from 'react';
import {
  GeneralActionsTable,
  InformationPagination,
  LicitationsSelectedDataTable,
} from './components';
import UpdateLicitationStatus from './update-licitation-status';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router';
import { Checkbox } from '@/components/ui/checkbox';

export const columnsLicitationsSelected: ColumnDef<any>[] = [
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
    id: 'actions',
    cell: ({ row }) => {
      const record = row.original;
      console.log('🚀 ~ record:', record);

      const [openDialog, setOpenDialog] = useState(false);
      const queryLicitationsStatus = useGetAllLicitationsStatus();
      const navigate = useNavigate();
      const isAccepted = record.es_aceptada;

      const { mutate } = useUpdateClasifyLicitation();

      const handleSelect = () => {
        mutate(
          { id: record.id, es_aceptada: true },
          {
            onSuccess: () => {
              setOpenDialog(false);
            },
          }
        );
      };

      const handleDiscard = () => {
        mutate(
          { id: record.id, es_aceptada: false },
          {
            onSuccess: () => {
              setOpenDialog(false);
            },
          }
        );
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
                onClick={() => setOpenDialog(true)}
                disabled={!isAccepted}
              >
                <Pencil className="h-4 w-4" />
                Actualizar status
              </DropdownMenuItem>

              <DropdownMenuItem
                // onClick={() => setOpenDialog(true)}
                disabled={!isAccepted}
              >
                <Globe className="h-4 w-4" />
                Consultar
              </DropdownMenuItem>

              {isAccepted && (
                <DropdownMenuItem onClick={handleDiscard}>
                  <XCircle className="h-4 w-4" />
                  Descartar
                </DropdownMenuItem>
              )}

              {!isAccepted && (
                <DropdownMenuItem onClick={handleSelect}>
                  <CheckCircle className="h-4 w-4" />
                  Validar
                </DropdownMenuItem>
              )}

              <DropdownMenuItem
                onClick={() =>
                  navigate(
                    `/tenant/app/licitations-selected/manage/${record.id}`
                  )
                }
              >
                <Pencil className="h-4 w-4" />
                Administrar
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
    accessorKey: 'fecha_hora_publicacion',
    header: 'Fecha de publicación',
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <span className="text-end">
            {format(
              new Date(row.original.fecha_hora_publicacion),
              "dd 'de' MMMM 'del' yyyy, hh:mm a",
              { locale: es }
            )}
          </span>
        </div>
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
      console.log(row.original.es_aceptada);
      const color = row.original.es_aceptada ? 'bg-green-500' : 'bg-red-500';
      return (
        <Badge className={cn(color, 'dark:text-white')}>
          {row.original.es_aceptada ? 'Si' : 'No'}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'etapa.codigo',
    header: 'Etapa',
    cell: ({ row }) => {
      const color = row.original.etapa?.codigo ? 'bg-blue-500' : 'bg-gray-500';
      return (
        <Badge className={cn(color, 'dark:text-white')}>
          {row.original.etapa?.codigo ?? 'Sin etapa'}
        </Badge>
      );
    },
  },
];

const LicitationsSelectedContent = () => {
  const { queryLicitationsSelected } = useLicitationsSelectedContext();

  if (queryLicitationsSelected.isFetching) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="my-10">
      <h1 className="text-2xl font-bold">Licitaciones seleccionadas</h1>

      <GeneralActionsTable />
      <InformationPagination />

      <LicitationsSelectedDataTable />
    </div>
  );
};

const LicitationsSelected = () => {
  return (
    <LicitationsSelectedProvider>
      <LicitationsSelectedContent />
    </LicitationsSelectedProvider>
  );
};

export default LicitationsSelected;
