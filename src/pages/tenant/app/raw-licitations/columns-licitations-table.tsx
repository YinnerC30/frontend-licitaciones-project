import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useClasifyLicitation } from '@/hooks/licitations/use-clasify-licitation';

import type { ColumnDef } from '@tanstack/react-table';
import { CheckCircle, Copy, MoreHorizontal, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const columnsLicitations: ColumnDef<any>[] = [
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

      const { mutate } = useClasifyLicitation();

      const handleSelected = () => {
        mutate({ id_licitacion: record.id, es_aceptada: true });
      };

      const handleDiscard = () => {
        mutate({ id_licitacion: record.id, es_aceptada: false });
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

              <DropdownMenuItem onClick={handleSelected}>
                <CheckCircle className="h-4 w-4" />
                Validar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDiscard}>
                <XCircle className="h-4 w-4" />
                Descartar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
  // {
  //   accessorKey: 'id',
  //   header: 'ID',
  // },
  {
    accessorKey: 'id_original',
    header: 'Id',
  },
  // {
  //   accessorKey: 'fecha_hora_ejecucion_cron',
  //   header: 'Fecha y hora de ejecución cron',
  // },
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
    header: 'Fecha de cierre',
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
          <span className="font-medium text-end">
            {row.original.monto_disponible?.toLocaleString('es-CL', {
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
];
