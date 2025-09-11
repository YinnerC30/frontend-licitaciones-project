import ButtonRefetch from '@/components/button-refetch';
import { HomeTenantProvider } from '@/context/tenants/home/home-tenant-context';
import { useGetAllLicitationsByCriteria } from '@/hooks/licitations/use-get-all-licitations-by-criteria';
import { columnsLicitations } from '../raw-licitations/columns-licitations-table';
import LicitationsFilterByCriteriaDataTable from './licitations-filter-by-criteria-data-table';
import CardInfoLicitacion from './card-info-licitation';

export const HomeTenant = () => {
  const queryByCriteria = useGetAllLicitationsByCriteria();

  if (queryByCriteria.isFetching) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-8">
      <HomeTenantProvider>
        <div>
          <h1>Todas las licitaciones por criterio</h1>
          <ButtonRefetch
            onRefetch={async () => {
              await queryByCriteria.refetch();
            }}
          />
          <LicitationsFilterByCriteriaDataTable
            columns={columnsLicitations}
            data={queryByCriteria.data.records}
          />
        </div>
        <div>
          <CardInfoLicitacion />
        </div>
      </HomeTenantProvider>
    </div>
  );
};
