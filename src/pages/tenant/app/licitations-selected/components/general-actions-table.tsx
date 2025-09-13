import ButtonRefetch from '@/components/button-refetch';
import { useLicitationsSelectedContext } from '@/context/tenants/licitations-selected/licitations-selected-context';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useUpdateClasifyLicitationBulk } from '@/hooks/licitations/use-update-clasify-licitation-bulk';

export const GeneralActionsTable = () => {
  const {
    queryLicitationsSelected,
    optionQuery,
    setOptionQuery,
    hasSelectedLicitations,
    table,
  } = useLicitationsSelectedContext();
  const isMobile = useIsMobile();

  const { mutate } = useUpdateClasifyLicitationBulk();

  const id_licitaciones = table.getSelectedRowModel().rows.map((row: any) => {
    return { id_licitacion_seleccionada: row.original.id };
  });

  const resetRowSelection = () => {
    table.resetRowSelection();
  };

  const handleSelect = () => {
    mutate(
      {
        licitaciones_seleccionadas: id_licitaciones,
        es_aceptada: true,
      },
      {
        onSuccess: () => {
          resetRowSelection();
        },
      }
    );
  };

  const handleDiscard = () => {
    mutate(
      {
        licitaciones_seleccionadas: id_licitaciones,
        es_aceptada: false,
      },
      {
        onSuccess: () => {
          resetRowSelection();
        },
      }
    );
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-2 my-2">
        <div>
          <ButtonRefetch
            className=""
            disabled={queryLicitationsSelected.isFetching}
            onRefetch={async () => {
              await queryLicitationsSelected.refetch();
            }}
          />
        </div>

        {hasSelectedLicitations && (
          <div className=" flex items-center gap-2 justify-end">
            {(optionQuery === 'all_selected_records' ||
              optionQuery === 'only_accepted') && (
              <Button
                variant="destructive"
                onClick={handleDiscard}
                className="bg-red-500 text-white hover:bg-red-500/80 cursor-pointer"
                disabled={
                  queryLicitationsSelected.isFetching ||
                  queryLicitationsSelected.isLoading ||
                  !hasSelectedLicitations
                }
              >
                {!isMobile && <XCircle className="w-4 h-4" />}
                Descartar
              </Button>
            )}

            {(optionQuery === 'all_selected_records' ||
              optionQuery === 'only_rejected') && (
              <Button
                variant="default"
                onClick={handleSelect}
                className="bg-green-500 text-white hover:bg-green-500/80 cursor-pointer"
                disabled={
                  queryLicitationsSelected.isFetching ||
                  queryLicitationsSelected.isLoading ||
                  !hasSelectedLicitations
                }
              >
                {!isMobile && <CheckCircle className="w-4 h-4" />}
                Validar
              </Button>
            )}
          </div>
        )}

        <div className=" col-span-2 flex gap-2 justify-end items-center ">
          <span>Filtrar por:</span>
          <Select
            value={optionQuery}
            onValueChange={(value) => setOptionQuery(value as any)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una opción" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all_selected_records">Todas</SelectItem>
              <SelectItem value="only_accepted">Validas</SelectItem>
              <SelectItem value="only_rejected">Descartadas</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};
