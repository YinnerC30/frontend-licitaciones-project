import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useLicitationsLogbooksContext } from '@/context/tenants/licitations-selected/table-logbooks-context';
import { useCreateLogbook } from '@/hooks/logbooks/use-create-logbook';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Esquema de validación con Zod
const createLogbookSchema = z.object({
  contenido: z.string().min(2, 'El contenido debe tener al menos 2 caracteres'),
});

type CreateLogbookFormData = z.infer<typeof createLogbookSchema>;

const CreateLogbook = () => {
  const { id_licitacion_selected } = useLicitationsLogbooksContext();
  const { mutate, isPending } = useCreateLogbook();
  const [statusDialog, setStatusDialog] = useState(false);

  const form = useForm<CreateLogbookFormData>({
    resolver: zodResolver(createLogbookSchema),
    defaultValues: {
      contenido: '',
    },
  });

  const onSubmit = (data: CreateLogbookFormData) => {
    mutate(
      { ...data, id_licitacion_seleccionada: id_licitacion_selected },
      {
        onSuccess: () => {
          form.reset();
          setStatusDialog(false);
        },
      }
    );
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
          className="w-24 dark:text-white cursor-pointer"
          onClick={() => setStatusDialog(true)}
        >
          <Plus className="h-4 w-4" />
          Crear
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Registrar una bitácora</DialogTitle>
          <DialogDescription>
            Complete el contenido para crear un nuevo registro en la bitácora.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="contenido"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Contenido</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ingrese el contenido"
                        {...field}
                        className="h-36"
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

export default CreateLogbook;
