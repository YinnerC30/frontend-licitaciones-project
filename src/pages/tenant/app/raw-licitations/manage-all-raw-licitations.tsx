import ButtonRefetch from '@/components/button-refetch';
import { TemplateDataTable } from '@/components/data-table/template-data-table';
import { useGetAllLicitations } from '@/hooks/licitations/use-get-all-licitations';
import { columnsLicitations } from './columns-licitations-table';

const ManageAllRawLicitations = () => {
  const query = useGetAllLicitations();

  if (query.isFetching) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Todas las licitaciones</h1>
      <ButtonRefetch
        onRefetch={async () => {
          await query.refetch();
        }}
      />

      <TemplateDataTable
        columns={columnsLicitations}
        data={query.data.records}
      />
    </div>
  );
};

export default ManageAllRawLicitations;
