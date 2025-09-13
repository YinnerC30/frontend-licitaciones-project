import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  LicitationsLogbooksProvider,
  useLicitationsLogbooksContext,
} from '@/context/tenants/licitations-selected/table-logbooks-context';
import { useGetOneLicitationSelected } from '@/hooks/licitations/use-get-one-licitation-selected';
import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  ArrowLeft,
  CalendarDays,
  Coins,
  DollarSign,
  Globe,
  Hash,
  Landmark,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { LicitationsLogbooksDataTable } from './licitations-logbooks-data-table';
import ButtonRefetch from '@/components/button-refetch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLicitationsFilterByCriteriaContext } from '@/context/tenants/home/licitations-filter-by-criteria-context';

interface CardLicitationInfoProps {
  data: {
    id_original: string;
    nombre: string;
    nombre_organismo: string;
    descripcion: string;
    moneda: string;
    fecha_hora_publicacion: string;
    fecha_hora_cierre: string;
    monto_disponible: number;
  };
}

const CardLicitationInfo = (props: CardLicitationInfoProps) => {
  const { data } = props;
  const navigate = useNavigate();
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{data.nombre}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
              <Globe className="w-4 h-4 text-gray-400" />
              {data.descripcion || 'Sin descripción'}
            </p>
            <div className="grid grid-cols-1 gap-x-8 gap-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-gray-400" />
                <span className="font-medium">ID licitación: </span>
                <span>{data.id_original}</span>
              </div>
              <div className="flex items-center gap-2">
                <Landmark className="w-4 h-4 text-gray-400" />
                <span className="font-medium">Organismo: </span>
                <span>{data.nombre_organismo}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-gray-400" />
                <span className="font-medium">Fecha publicación: </span>
                <span>
                  {format(
                    new Date(data.fecha_hora_publicacion),
                    "dd 'de' MMMM 'del' yyyy, hh:mm a",
                    { locale: es }
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-gray-400" />
                <span className="font-medium">Fecha cierre: </span>
                <span>
                  {format(
                    new Date(data.fecha_hora_cierre),
                    "dd 'de' MMMM 'del' yyyy, hh:mm a",
                    { locale: es }
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-gray-400" />
                <span className="font-medium">Monto disponible: </span>
                <span>
                  {data.monto_disponible.toLocaleString('es-CL', {
                    style: 'currency',
                    currency: data.moneda || 'CLP',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-gray-400" />
                <span className="font-medium">Moneda: </span>
                <span>{data.moneda}</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            variant="outline"
            onClick={() => navigate('/tenant/app/licitations-selected')}
            className="cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export const columnsLogbooks: ColumnDef<any>[] = [
  {
    accessorKey: 'usuario',
    header: 'Usuario',
    cell: ({ row }) => {
      return <div>{row.original.usuario.username}</div>;
    },
  },

  {
    accessorKey: 'fecha_hora',
    header: 'Fecha y hora',
    cell: ({ row }) => {
      return (
        <div>
          {format(
            new Date(row.original.fecha_hora),
            "dd 'de' MMMM 'del' yyyy, hh:mm a",
            { locale: es }
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'contenido',
    header: 'Contenido',
  },
];

const ActionsLogbooks = () => {
  const { queryLicitationLogbooks } = useLicitationsLogbooksContext();
  return (
    <div className="my-2 flex">
      <ButtonRefetch
        onRefetch={async () => {
          queryLicitationLogbooks.refetch();
        }}
      />
    </div>
  );
};

export const InformationPagination = () => {
  const { countSelectedLicitationLogbooks, pagination_information, table } =
    useLicitationsLogbooksContext();

  return (
    <div className="grid grid-cols-2 gap-2 my-2">
      <div className="">
        <p>Total: {pagination_information?.total_row_count}</p>
        <p>N° de seleccionados: {countSelectedLicitationLogbooks}</p>
      </div>

      <div className="flex items-center gap-2 justify-end">
        <p className="text-sm font-medium text-muted-foreground">
          N° registros:
        </p>
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

const ManageOneLicitationSelected = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetOneLicitationSelected(id || '');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <CardLicitationInfo data={data?.licitacion} />
      {id && (
        <LicitationsLogbooksProvider id_licitacion_selected={id}>
          <div className="my-4 grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <h2 className="text-lg font-bold my-2">Historial de bitácora</h2>
              <ActionsLogbooks />
              <InformationPagination />
              <LicitationsLogbooksDataTable />
            </div>
          </div>
        </LicitationsLogbooksProvider>
      )}
    </div>
  );
};

export default ManageOneLicitationSelected;
