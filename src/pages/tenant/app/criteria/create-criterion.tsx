import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useCreateCriterion } from '@/hooks/criteria/use-create-criterion';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus } from 'lucide-react';

// Esquema de validación con Zod
const createCriterionSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  es_valido: z.boolean(),
});

type CreateCriterionFormData = z.infer<typeof createCriterionSchema>;

const CreateCriterion = () => {
  const { mutate, isPending } = useCreateCriterion();
  const [statusDialog, setStatusDialog] = useState(false);

  const form = useForm<CreateCriterionFormData>({
    resolver: zodResolver(createCriterionSchema),
    defaultValues: {
      nombre: '',
      es_valido: true,
    },
  });

  const onSubmit = (data: CreateCriterionFormData) => {
    mutate(data, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  const onCancel = () => {
    form.reset();
    setStatusDialog(false);
  };

  return (
    <Dialog open={statusDialog} onOpenChange={setStatusDialog}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="w-24 dark:text-white"
          onClick={() => setStatusDialog(true)}
        >
          <Plus className="h-4 w-4" />
          Crear
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Registrar un criterio</DialogTitle>
          <DialogDescription>
            Complete los campos para crear un nuevo criterio en el sistema.
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

export default CreateCriterion;
