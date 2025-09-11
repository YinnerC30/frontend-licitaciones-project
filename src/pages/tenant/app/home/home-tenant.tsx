import ButtonRefetch from '@/components/button-refetch';
import { HomeTenantProvider } from '@/context/tenants/home/home-tenant-context';
import { useGetAllLicitationsByCriteria } from '@/hooks/licitations/use-get-all-licitations-by-criteria';
import { columnsLicitations } from '../raw-licitations/columns-licitations-table';
import LicitationsFilterByCriteriaDataTable from './licitations-filter-by-criteria-data-table';
import CardInfoLicitacion from './card-info-licitation';
import { useGetLicitationsCounts } from '@/hooks/licitations/use-get-licitations-counts';

export const HomeTenant = () => {
  const queryByCriteria = useGetAllLicitationsByCriteria();
  const queryCounts = useGetLicitationsCounts();

  if (queryByCriteria.isFetching) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-8">
      <HomeTenantProvider>
        <div className="col-span-2">
          <h1>Contadores de licitaciones</h1>
          <pre>{JSON.stringify(queryCounts.data, null, 2)}</pre>
        </div>

        <div className="col-span-2">
          <h1>Todas las licitaciones por criterio</h1>
          <ButtonRefetch
            onRefetch={async () => {
              await queryByCriteria.refetch();
            }}
          />
        </div>
        <div>
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
