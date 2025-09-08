import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { Input } from '@/components/ui/input';
import { useUpdateCriterion } from '@/hooks/criteria/use-update-criterion';

import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Esquema de validación con Zod
const createCriterionSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  es_valido: z.boolean(),
});

type UpdateCriterionFormData = z.infer<typeof createCriterionSchema>;

interface UpdateCriterionProps {
  data: any;
  statusDialog: boolean;
  onChangeStatusDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateCriterion: React.FC<UpdateCriterionProps> = (props) => {
  const { statusDialog, onChangeStatusDialog, data } = props;

  const { mutate, isPending } = useUpdateCriterion();

  const form = useForm<UpdateCriterionFormData>({
    resolver: zodResolver(createCriterionSchema),
    defaultValues: data,
  });

  const onSubmit = (data: UpdateCriterionFormData) => {
    mutate(
      { id: props.data.id, ...data },
      {
        onSuccess: ({ data }: { data: UpdateCriterionFormData }) => {
          form.reset(data);
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
          <DialogTitle>Actualizar información del criterio</DialogTitle>
          <DialogDescription>
            Complete los campos para actualizar al criterio en el sistema.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingrese el nombre" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="es_valido"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>¿Es válido?</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
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

export default UpdateCriterion;
