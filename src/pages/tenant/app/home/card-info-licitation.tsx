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

const formatFecha = (fechaStr?: string) => {
  if (!fechaStr) return '-';
  const fecha = new Date(fechaStr);
  return fecha.toLocaleString('es-CL', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

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
                {formatFecha(selectedLicitacion.fecha_hora_publicacion)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-gray-400" />
              <span className="font-medium">Fecha cierre: </span>
              <span>{formatFecha(selectedLicitacion.fecha_hora_cierre)}</span>
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
              onClick={handleSelect}
              variant="default"
              className="bg-green-500 text-white"
            >
              {!isMobile && <CheckCircle className="w-4 h-4" />}
              Validar
            </Button>
            <Button variant="destructive" onClick={handleDiscard}>
              {!isMobile && <XCircle className="w-4 h-4" />}
              Descartar
            </Button>
          </div>
          <div className="flex lg:justify-end justify-center">
            <Button variant="outline" onClick={handleClose}>
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
