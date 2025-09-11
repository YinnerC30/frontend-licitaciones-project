import ButtonRefetch from '@/components/button-refetch';
import { HomeTenantProvider } from '@/context/tenants/home/home-tenant-context';
import {
  LicitationsFilterByCriteriaProvider,
  useLicitationsFilterByCriteriaContext,
} from '@/context/tenants/home/licitations-filter-by-criteria-context';
import { useGetAllLicitationsByCriteria } from '@/hooks/licitations/use-get-all-licitations-by-criteria';
import { useGetLicitationsCounts } from '@/hooks/licitations/use-get-licitations-counts';
import { columnsLicitations } from '../raw-licitations/columns-licitations-table';
import CardInfoLicitacion from './card-info-licitation';
import LicitationsFilterByCriteriaDataTable from './licitations-filter-by-criteria-data-table';

import { Button } from '@/components/ui/button';
import { useAuthTenantStore } from '@/data/auth-tenant-store';
import { useClasifyLicitationBulk } from '@/hooks/licitations/use-clasify-licitations-bulk';
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

const ButtonClasifyToSelectedLicitationsBulk = () => {
  const { table } = useLicitationsFilterByCriteriaContext();
  const { mutate } = useClasifyLicitationBulk();

  const id_licitaciones = table.getSelectedRowModel().rows.map((row) => {
    return { id_licitacion: row.original.id };
  });

  const handleSelected = () => {
    mutate(
      { licitaciones: id_licitaciones, es_aceptada: true },
      {
        onSuccess: () => {
          table.resetRowSelection();
        },
      }
    );
  };

  return <Button onClick={handleSelected}>Seleccionar licitaciones</Button>;
};

const ButtonClasifyToDiscardLicitationsBulk = () => {
  const { table } = useLicitationsFilterByCriteriaContext();
  const { mutate } = useClasifyLicitationBulk();

  const id_licitaciones = table.getSelectedRowModel().rows.map((row) => {
    return { id_licitacion: row.original.id };
  });

  const handleDiscard = () => {
    mutate(
      { licitaciones: id_licitaciones, es_aceptada: false },
      {
        onSuccess: () => {
          table.resetRowSelection();
        },
      }
    );
  };

  return <Button onClick={handleDiscard}>Descartar licitaciones</Button>;
};

export const LicitationsByCriteria = () => {
  const queryByCriteria = useGetAllLicitationsByCriteria();

  if (queryByCriteria.isFetching) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <LicitationsFilterByCriteriaProvider
        columns={columnsLicitations}
        data={queryByCriteria.data.records}
      >
        <div className="col-span-2">
          <h1>Todas las licitaciones por criterio</h1>
          <ButtonRefetch
            onRefetch={async () => {
              await queryByCriteria.refetch();
            }}
          />
          <ButtonClasifyToSelectedLicitationsBulk />
          <ButtonClasifyToDiscardLicitationsBulk />
        </div>

        <div className="lg:col-span-1 col-span-2">
          <LicitationsFilterByCriteriaDataTable />
        </div>
      </LicitationsFilterByCriteriaProvider>
    </>
  );
};

export const HomeTenant = () => {
  const { isAuthenticated } = useAuthTenantStore((state) => state);

  if (!isAuthenticated) {
    return <Navigate to={'../../auth/login'} replace />;
  }

  return (
    <div className="grid grid-cols-2 gap-8">
      <HomeTenantProvider>
        <div className="col-span-2">
          <CountsInformation />
        </div>

        <LicitationsByCriteria />

        <div className="lg:col-span-1 col-span-2">
          <CardInfoLicitacion />
        </div>
      </HomeTenantProvider>
    </div>
  );
};
