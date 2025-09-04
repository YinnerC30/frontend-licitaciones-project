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
import { Input } from '@/components/ui/input';
import { useUpdateAdministrator } from '@/hooks/administrators/use-update-administrator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Esquema de validación con Zod
const createAdministratorSchema = z.object({
  first_name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  last_name: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
  email: z.email('Debe ser un email válido'),
  cell_phone_number: z
    .string()
    .min(10, 'El número de teléfono debe tener al menos 10 dígitos'),
  role: z.enum(['user', 'admin']),
});

type UpdateAdministratorFormData = z.infer<typeof createAdministratorSchema>;

interface UpdateAdministratorProps {
  data: any;
  statusDialog: boolean;
  onChangeStatusDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateAdministrator: React.FC<UpdateAdministratorProps> = (props) => {
  const { statusDialog, onChangeStatusDialog, data } = props;

  const { mutate, isPending } = useUpdateAdministrator();

  const form = useForm<UpdateAdministratorFormData>({
    resolver: zodResolver(createAdministratorSchema),
    defaultValues: data,
  });

  const onSubmit = (data: UpdateAdministratorFormData) => {
    mutate(
      { id: props.data.id, ...data },
      {
        onSuccess: ({ data }) => {
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
          <DialogTitle>Actualizar información del administrador</DialogTitle>
          <DialogDescription>
            Complete los campos para actualizar al administrador en el sistema.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="first_name"
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
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingrese el apellido" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="ejemplo@correo.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cell_phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de celular</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="3123456789" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rol</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      {...field}
                    >
                      <option value="user">Usuario</option>
                      <option value="admin">Administrador</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

export default UpdateAdministrator;
