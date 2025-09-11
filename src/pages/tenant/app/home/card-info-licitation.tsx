import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useHomeTenantContext } from '@/context/tenants/home/home-tenant-context';
import { useClasifyLicitation } from '@/hooks/licitations/use-selected-licitation';

const CardInfoLicitacion = () => {
  const { selectedLicitacion } = useHomeTenantContext();
  const { mutate } = useClasifyLicitation();

  const handleSelect = () => {
    mutate({ id_licitacion: selectedLicitacion?.id, es_aceptada: true });
  };

  const handleDiscard = () => {
    mutate({ id_licitacion: selectedLicitacion?.id, es_aceptada: false });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Información de la licitación</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{selectedLicitacion?.nombre}</p>
        <pre>{JSON.stringify(selectedLicitacion, null, 2)}</pre>
        <Button onClick={handleSelect}>Seleccionar</Button>
        <Button variant="destructive" onClick={handleDiscard}>
          Descartar
        </Button>
      </CardContent>
    </Card>
  );
};

export default CardInfoLicitacion;
