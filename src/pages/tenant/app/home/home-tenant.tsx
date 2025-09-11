import ButtonRefetch from '@/components/button-refetch';
import { HomeTenantProvider } from '@/context/tenants/home/home-tenant-context';
import { useGetAllLicitationsByCriteria } from '@/hooks/licitations/use-get-all-licitations-by-criteria';
import { useGetLicitationsCounts } from '@/hooks/licitations/use-get-licitations-counts';
import { columnsLicitations } from '../raw-licitations/columns-licitations-table';
import CardInfoLicitacion from './card-info-licitation';
import LicitationsFilterByCriteriaDataTable from './licitations-filter-by-criteria-data-table';

import { useAuthTenantStore } from '@/data/auth-tenant-store';
import { CalendarDays, CheckCircle, Filter } from 'lucide-react';
import { Navigate } from 'react-router';

export const CountsInformation = () => {
  const queryCounts = useGetLicitationsCounts();
  const { data } = queryCounts;

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center p-4 rounded-lg bg-green-100 shadow">
          <CheckCircle className="text-green-600 w-8 h-8 mr-3" />
          <div>
            <p className="text-sm text-green-800 font-semibold">
              Licitaciones aceptadas
            </p>
            <p className="text-xl font-bold text-green-900">
              {data?.valid_licitations ?? 0}
            </p>
          </div>
        </div>
        <div className="flex items-center p-4 rounded-lg bg-blue-100 shadow">
          <CalendarDays className="text-blue-600 w-8 h-8 mr-3" />
          <div>
            <p className="text-sm text-blue-800 font-semibold">Cerradas hoy</p>
            <p className="text-xl font-bold text-blue-900">
              {data?.closed_today_licitations ?? 0}
            </p>
          </div>
        </div>
        <div className="flex items-center p-4 rounded-lg bg-yellow-100 shadow">
          <Filter className="text-yellow-600 w-8 h-8 mr-3" />
          <div>
            <p className="text-sm text-yellow-800 font-semibold">
              Por criterio
            </p>
            <p className="text-xl font-bold text-yellow-900">
              {data?.all_licitations_by_criteria ?? 0}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export const HomeTenant = () => {
  const { isAuthenticated } = useAuthTenantStore((state) => state);

  if (!isAuthenticated) {
    return <Navigate to={'../../auth/login'} replace />;
  }
  const queryByCriteria = useGetAllLicitationsByCriteria();

  if (queryByCriteria.isFetching) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-8">
      <HomeTenantProvider>
        <div className="col-span-2">
          <CountsInformation />
        </div>

        <div className="col-span-2">
          <h1>Todas las licitaciones por criterio</h1>
          <ButtonRefetch
            onRefetch={async () => {
              await queryByCriteria.refetch();
            }}
          />
        </div>

        <div className="lg:col-span-1 col-span-2">
          <LicitationsFilterByCriteriaDataTable
            columns={columnsLicitations}
            data={queryByCriteria.data.records}
          />
        </div>

        <div className="lg:col-span-1 col-span-2">
          <CardInfoLicitacion />
        </div>
      </HomeTenantProvider>
    </div>
  );
};
