import ButtonRefetch from '@/components/button-refetch';
import { useGetAllCriteria } from '@/hooks/criteria/use-get-all-criteria';
import type { ColumnDef } from '@tanstack/react-table';
import { TemplateDataTable } from '../home-tenant';

export const columnsCriteria: ColumnDef<any>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'nombre',
    header: 'Nombre',
  },
  {
    accessorKey: 'es_valido',
    header: '¿Es valido?',
  },
];

const ManageAllCriteria = () => {
  const queryCriteria = useGetAllCriteria();

  if (queryCriteria.isFetching) {
    return <div>Cargando...</div>;
  }

  const { records } = queryCriteria.data;

  return (
    <div className="flex gap-2 flex-col">
      <h1>Todos los criterios</h1>
      <ButtonRefetch
        onRefetch={async () => {
          await queryCriteria.refetch();
        }}
      />
      {/* <pre>{JSON.stringify(queryCriteria.data, null, 2)}</pre> */}
      <TemplateDataTable columns={columnsCriteria} data={records} />
    </div>
  );
};

export default ManageAllCriteria;
