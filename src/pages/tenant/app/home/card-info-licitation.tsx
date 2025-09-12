import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useHomeTenantContext } from '@/context/tenants/home/home-tenant-context';
import { useClasifyLicitation } from '@/hooks/licitations/use-clasify-licitation';

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
        <CardTitle>Información de la licitación</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-1">
            {selectedLicitacion.nombre}
          </h2>
          <p className="text-sm text-gray-600 mb-2">
            {selectedLicitacion.descripcion || 'Sin descripción'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
            <div>
              <span className="font-medium">ID licitación: </span>
              <span>{selectedLicitacion.id_original}</span>
            </div>
            <div>
              <span className="font-medium">Organismo: </span>
              <span>{selectedLicitacion.nombre_organismo}</span>
            </div>
            <div>
              <span className="font-medium">Fecha publicación: </span>
              <span>
                {formatFecha(selectedLicitacion.fecha_hora_publicacion)}
              </span>
            </div>
            <div>
              <span className="font-medium">Fecha cierre: </span>
              <span>{formatFecha(selectedLicitacion.fecha_hora_cierre)}</span>
            </div>
            <div>
              <span className="font-medium">Monto disponible: </span>
              <span>
                {formatMonto(
                  selectedLicitacion.monto_disponible,
                  selectedLicitacion.moneda
                )}
              </span>
            </div>
            <div>
              <span className="font-medium">Moneda: </span>
              <span>{selectedLicitacion.moneda}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button onClick={handleSelect}>Seleccionar</Button>
          <Button variant="destructive" onClick={handleDiscard}>
            Descartar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardInfoLicitacion;
