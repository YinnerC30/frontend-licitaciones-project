import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetOneLicitationSelected } from '@/hooks/licitations/use-get-one-licitation-selected';
import { useGetAllLogbooksByLicitationSelected } from '@/hooks/logbooks/use-get-all-logbooks-by-licitation-selected';
import {
  CalendarDays,
  Coins,
  DollarSign,
  Globe,
  Hash,
  Landmark,
} from 'lucide-react';
import { useParams } from 'react-router';

// "id": "3a329dd0-216d-466b-b367-33acb3c218da",
//     "id_original": "2484-666-COT25",
//     "fecha_hora_ejecucion_cron": "2025-09-12T17:50:59.000Z",
//     "nombre": "Suministro de insumos para encuentros en salas de espera de los centros de salud con la comunidad",
//     "nombre_organismo": "I MUNICIPALIDAD DE QUILICURA",
//     "descripcion": "",
//     "moneda": "CLP",
//     "fecha_hora_publicacion": "2025-09-07T01:20:00.000Z",
//     "fecha_hora_cierre": "2025-09-08T21:00:00.000Z",
//     "monto_disponible": 3500000,

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
                <span>{data.fecha_hora_publicacion}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-gray-400" />
                <span className="font-medium">Fecha cierre: </span>
                <span>{data.fecha_hora_cierre}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-gray-400" />
                <span className="font-medium">Monto disponible: </span>
                <span>{data.monto_disponible}</span>
              </div>
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-gray-400" />
                <span className="font-medium">Moneda: </span>
                <span>{data.moneda}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
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
      <pre>{JSON.stringify(logbooks, null, 2)}</pre>
    </div>
  );
};

export default ManageOneLicitationSelected;
