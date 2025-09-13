import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUpdateLicitationSelectedStatus } from '@/hooks/licitations/use-update-licitation-selected-status';

import { zodResolver } from '@hookform/resolvers/zod';
import type { UseQueryResult } from '@tanstack/react-query';

import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface EstadoLicitacion {
  id: string;
  codigo: string;
  descripcion: string;
}

// Esquema de validación con Zod
const createLicitationStatusSchema = z.object({
  etapa: z.object({
    id: z.string(),
    codigo: z.string(),
    descripcion: z.string(),
  }),
});

type UpdateLicitationStatusFormData = z.infer<
  typeof createLicitationStatusSchema
>;

interface UpdateLicitationStatusProps {
  data: any;
  statusDialog: boolean;
  onChangeStatusDialog: React.Dispatch<React.SetStateAction<boolean>>;
  query: UseQueryResult<any, Error>;
}

const UpdateLicitationStatus: React.FC<UpdateLicitationStatusProps> = (
  props
) => {
  const { statusDialog, onChangeStatusDialog, data, query } = props;

  const defaultValues = {
    etapa: data.etapa || {
      id: '',
      codigo: '',
      descripcion: '',
    },
  };

  const queryLicitationsStatus = query;

  if (queryLicitationsStatus.isFetching) {
    return <div>Cargando...</div>;
  }

  const { mutate, isPending } = useUpdateLicitationSelectedStatus();

  const form = useForm<UpdateLicitationStatusFormData>({
    resolver: zodResolver(createLicitationStatusSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = (data: UpdateLicitationStatusFormData) => {
    mutate(
      { id: props.data.id, id_status: data.etapa.id },
      {
        onSuccess: ({ data }: { data: UpdateLicitationStatusFormData }) => {
          form.reset(data);
          onChangeStatusDialog(false);
        },
      }
    );
  };

  const onCancel = () => {
    form.reset();
    onChangeStatusDialog(false);
  };

  return (
    <Dialog open={statusDialog} onOpenChange={onChangeStatusDialog}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Actualizar etapa de la licitación</DialogTitle>
          <DialogDescription>
            Seleccione una de las opciones disponibles.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="etapa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Etapa</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value: string) => {
                          field.onChange({
                            id: value,
                            codigo: '',
                            descripcion: '',
                          });
                        }}
                        defaultValue={field.value.id}
                        value={field.value.id}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione la etapa" />
                        </SelectTrigger>
                        <SelectContent>
                          {queryLicitationsStatus.data.records.map(
                            (etapa: EstadoLicitacion) => (
                              <SelectItem key={etapa.id} value={etapa.id}>
                                {etapa.codigo}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="destructive"
                onClick={onCancel}
                disabled={isPending}
              >
                Cancelar
              </Button>
              <Button type="submit">Guardar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateLicitationStatus;
