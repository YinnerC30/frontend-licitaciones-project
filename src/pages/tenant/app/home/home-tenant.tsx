import { HomeTenantProvider } from '@/context/tenants/home/home-tenant-context';
import {
  LicitationsFilterByCriteriaProvider,
  useLicitationsFilterByCriteriaContext,
} from '@/context/tenants/home/licitations-filter-by-criteria-context';
import { useGetLicitationsCounts } from '@/hooks/licitations/use-get-licitations-counts';
import CardInfoLicitacion from './card-info-licitation';
import LicitationsFilterByCriteriaDataTable from './licitations-filter-by-criteria-data-table';

import ButtonRefetch from '@/components/button-refetch';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuthTenantStore } from '@/data/auth-tenant-store';
import { useClasifyLicitationBulk } from '@/hooks/licitations/use-clasify-licitations-bulk';
import { cn } from '@/lib/utils';
import { CalendarDays, CheckCircle, XCircle } from 'lucide-react';
import { Navigate } from 'react-router';

export const CountsInformation = () => {
  const queryCounts = useGetLicitationsCounts();
  const { data } = queryCounts;

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center p-4 rounded-lg bg-green-100 shadow">
          <CheckCircle className="text-green-600 w-8 h-8 mr-3" />
          <div>
            <p className="text-sm text-green-800 font-semibold">
              Licitaciones validas
            </p>
            <p className="text-xl font-bold text-green-900">
              {data?.valid_licitations ?? 0}
            </p>
          </div>
        </div>
        <div className="flex items-center p-4 rounded-lg bg-red-100 shadow">
          <CalendarDays className="text-red-600 w-8 h-8 mr-3" />
          <div>
            <p className="text-sm text-red-800 font-semibold">Cierran hoy</p>
            <p className="text-xl font-bold text-red-900">
              {data?.closed_today_licitations ?? 0}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const ButtonClasifyToSelectedLicitationsBulk = ({
  className,
}: {
  className?: string;
}) => {
  const { table } = useLicitationsFilterByCriteriaContext();
  const { mutate } = useClasifyLicitationBulk();

  const { hasSelectedLicitations } = useLicitationsFilterByCriteriaContext();

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

  return (
    <Button
      onClick={handleSelected}
      variant="default"
      className={cn(className, !hasSelectedLicitations ? 'hidden' : '')}
      disabled={!hasSelectedLicitations}
    >
      <CheckCircle className="w-4 h-4" />
      Validar
    </Button>
  );
};

const ButtonClasifyToDiscardLicitationsBulk = ({
  className,
}: {
  className?: string;
}) => {
  const { table } = useLicitationsFilterByCriteriaContext();
  const { mutate } = useClasifyLicitationBulk();

  const { hasSelectedLicitations } = useLicitationsFilterByCriteriaContext();

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

  return (
    <Button
      onClick={handleDiscard}
      variant="destructive"
      className={cn(className, !hasSelectedLicitations ? 'hidden' : '')}
      disabled={!hasSelectedLicitations}
    >
      <XCircle className="w-4 h-4" />
      Descartar
    </Button>
  );
};

export const InformationPagination = () => {
  const { countSelectedLicitations, pagination_information, table } =
    useLicitationsFilterByCriteriaContext();

  return (
    <div className="grid grid-cols-2 gap-2 my-2">
      <div className="">
        <p>Total: {pagination_information?.total_row_count}</p>
        <p>N° de seleccionados: {countSelectedLicitations}</p>
      </div>

      <div className="flex items-center gap-2 justify-end">
        <p className="text-sm font-medium text-muted-foreground">
          N° registros:
        </p>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger
            className="h-8 w-[70px]"
            data-testid="btn-page-size-selector"
          >
            <SelectValue
              className="font-medium text-muted-foreground"
              placeholder={table.getState().pagination.pageSize}
              data-testid="page-size-value"
            />
          </SelectTrigger>
          <SelectContent
            side="top"
            onPointerDownOutside={(e) => e.preventDefault()}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem
                key={pageSize}
                value={`${pageSize}`}
                data-testid={`select-item-page-size-${pageSize}`}
              >
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
export const GeneralActionsTable = () => {
  const { queryByCriteria } = useLicitationsFilterByCriteriaContext();

  return (
    <>
      <div className="flex gap-2 justify-between my-2 flex-wrap">
        <ButtonRefetch
          disabled={queryByCriteria.isFetching}
          onRefetch={async () => {
            await queryByCriteria.refetch();
          }}
        />
        <div className="flex gap-2">
          <ButtonClasifyToSelectedLicitationsBulk className="bg-green-500 text-white" />
          <ButtonClasifyToDiscardLicitationsBulk />
        </div>
      </div>
    </>
  );
};

export const LicitationsByCriteria = () => {
  return (
    <>
      <LicitationsFilterByCriteriaProvider>
        <h1 className="col-span-2 text-2xl font-bold">
          Licitaciones que cumplen con los criterios registrados
        </h1>

        <div className="col-span-2">
          <CountsInformation />
        </div>

        <div className="lg:col-span-1 col-span-2">
          <GeneralActionsTable />

          <InformationPagination />
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
        <LicitationsByCriteria />

        <div className="lg:col-span-1 col-span-2">
          <CardInfoLicitacion />
        </div>
      </HomeTenantProvider>
    </div>
  );
};
