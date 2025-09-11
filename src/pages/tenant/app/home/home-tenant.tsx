import ButtonRefetch from '@/components/button-refetch';
import { TemplateDataTable } from '@/components/data-table/template-data-table';
import { useGetAllLicitationsByCriteria } from '@/hooks/licitations/use-get-all-licitations-by-criteria';
import { columnsLicitations } from '../raw-licitations/columns-licitations-table';

export const HomeTenant = () => {
  const queryByCriteria = useGetAllLicitationsByCriteria();

  if (queryByCriteria.isFetching) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Todas las licitaciones por criterio</h1>
      <ButtonRefetch
        onRefetch={async () => {
          await queryByCriteria.refetch();
        }}
      />
      <TemplateDataTable
        columns={columnsLicitations}
        data={queryByCriteria.data.records}
      />

    </div>
  );
};
