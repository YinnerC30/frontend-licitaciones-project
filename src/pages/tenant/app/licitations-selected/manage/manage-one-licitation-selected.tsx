import { TemplateDataTable } from '@/components/data-table/template-data-table';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useGetOneLicitationSelected } from '@/hooks/licitations/use-get-one-licitation-selected';
import { useGetAllLogbooksByLicitationSelected } from '@/hooks/logbooks/use-get-all-logbooks-by-licitation-selected';
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

const columnsLogbooks: ColumnDef<any>[] = [
  {
    accessorKey: 'usuario',
    header: 'Usuario',
    cell: ({ row }) => {
      return <div>{row.original.usuario.username}</div>;
    },
  },
  {
    accessorKey: 'contenido',
    header: 'Contenido',
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
];

interface TableLogbooksProps {
  data: any[];
}

const TableLogbooks = (props: TableLogbooksProps) => {
  const { data } = props;
  return (
    <div>
      <TemplateDataTable columns={columnsLogbooks} data={data} />
    </div>
  );
};

const ManageOneLicitationSelected = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetOneLicitationSelected(id || '');
  const { data: logbooks, isLoading: isLoadingLogbooks } =
    useGetAllLogbooksByLicitationSelected({
      id_licitacion_selected: id || '',
    });
  if (isLoading || isLoadingLogbooks) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <CardLicitationInfo data={data?.licitacion} />
      <div className="my-4 grid grid-cols-2 gap-4">
        <TableLogbooks data={logbooks.records} />
      </div>
    </div>
  );
};

export default ManageOneLicitationSelected;
