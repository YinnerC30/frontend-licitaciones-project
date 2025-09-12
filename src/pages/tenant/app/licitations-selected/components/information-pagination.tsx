import { useLicitationsSelectedContext } from '@/context/tenants/licitations-selected/licitations-selected-context';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const InformationPagination = () => {
  const { pagination_information, table } = useLicitationsSelectedContext();

  return (
    <div className="grid grid-cols-2 gap-2 my-2">
      <div className="">
        <p>Total: {pagination_information?.total_row_count}</p>
      </div>

      <div className="flex items-center gap-2 justify-end">
        <p className="text-sm font-medium">N° registros:</p>
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
