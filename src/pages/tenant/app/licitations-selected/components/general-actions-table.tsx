import ButtonRefetch from '@/components/button-refetch';
import { useLicitationsSelectedContext } from '@/context/tenants/licitations-selected/licitations-selected-context';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const GeneralActionsTable = () => {
  const { queryLicitationsSelected, optionQuery, setOptionQuery } =
    useLicitationsSelectedContext();

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

        <div className="flex items-center gap-2 justify-end">
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
