import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useHomeTenantContext } from '@/context/tenants/home/home-tenant-context';
import { useClasifyLicitation } from '@/hooks/licitations/use-clasify-licitation';
import { useIsMobile } from '@/hooks/use-mobile';

// Iconos de Lucide
import {
  BadgeDollarSign,
  CalendarDays,
  CheckCircle,
  Coins,
  Globe,
  Hash,
  Landmark,
  X,
  XCircle,
} from 'lucide-react';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { toast } from 'sonner';



const formatMonto = (monto?: number, moneda?: string) => {
  if (monto == null) return '-';
  return monto.toLocaleString('es-CL', {
    style: 'currency',
    currency: moneda || 'CLP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

const CardInfoLicitacion = () => {
  const { selectedLicitacion, setSelectedLicitacion } = useHomeTenantContext();
  const { mutate } = useClasifyLicitation();
  const isMobile = useIsMobile();

  const handleSelect = () => {
    mutate(
      { id_licitacion: selectedLicitacion?.id, es_aceptada: true },
      {
        onSuccess: () => {
          setSelectedLicitacion(null);
        },
      }
    );
  };

  const handleDiscard = () => {
    mutate(
      { id_licitacion: selectedLicitacion?.id, es_aceptada: false },
      {
        onSuccess: () => {
          setSelectedLicitacion(null);
        },
      }
    );
  };

  const handleConsult = () => {
    toast.error('Pendiente de implementación');
    
  };

  const handleClose = () => {
    setSelectedLicitacion(null);
  };

  if (!selectedLicitacion) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Información de la licitación</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">
            Selecciona una licitación para ver los detalles.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{selectedLicitacion.nombre}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
            <Globe className="w-4 h-4 text-gray-400" />
            {selectedLicitacion.descripcion || 'Sin descripción'}
          </p>
          <div className="grid grid-cols-1 gap-x-8 gap-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-gray-400" />
              <span className="font-medium">ID licitación: </span>
              <span>{selectedLicitacion.id_original}</span>
            </div>
            <div className="flex items-center gap-2">
              <Landmark className="w-4 h-4 text-gray-400" />
              <span className="font-medium">Organismo: </span>
              <span>{selectedLicitacion.nombre_organismo}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-gray-400" />
              <span className="font-medium">Fecha publicación: </span>
              <span>
                {format(
                  new Date(selectedLicitacion.fecha_hora_publicacion),
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
                  new Date(selectedLicitacion.fecha_hora_cierre),
                  "dd 'de' MMMM 'del' yyyy, hh:mm a",
                  { locale: es }
                )}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <BadgeDollarSign className="w-4 h-4 text-gray-400" />
              <span className="font-medium">Monto disponible: </span>
              <span>
                {formatMonto(
                  selectedLicitacion.monto_disponible,
                  selectedLicitacion.moneda
                )}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-gray-400" />
              <span className="font-medium">Moneda: </span>
              <span>{selectedLicitacion.moneda}</span>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
          <div className="flex gap-2 lg:justify-start justify-center px-2">
            <Button
              onClick={handleConsult}
              variant="default"
              className="bg-blue-500 text-white hover:bg-blue-500/80 cursor-pointer"
            >
              {!isMobile && <Globe className="w-4 h-4" />}
              Consultar
            </Button>
            <Button
              onClick={handleSelect}
              variant="default"
              className="bg-green-500 text-white hover:bg-green-500/80 cursor-pointer"
            >
              {!isMobile && <CheckCircle className="w-4 h-4" />}
              Validar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDiscard}
              className="bg-red-500 text-white hover:bg-red-500/80 cursor-pointer"
            >
              {!isMobile && <XCircle className="w-4 h-4" />}
              Descartar
            </Button>
          </div>
          <div className="flex lg:justify-end justify-center">
            <Button
              variant="outline"
              onClick={handleClose}
              className=" hover:bg-gray-500/50 cursor-pointer"
            >
              {!isMobile && <X className="w-4 h-4" />}
              Cerrar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardInfoLicitacion;
