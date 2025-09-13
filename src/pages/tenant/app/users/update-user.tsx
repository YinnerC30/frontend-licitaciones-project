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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUpdateUser } from '@/hooks/users/use-update-user';

import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Esquema de validación con Zod
const updateUserSchema = z.object({
  username: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  role: z.enum(['employee', 'admin']),
});

type UpdateUserFormData = z.infer<typeof updateUserSchema>;

interface UpdateUserProps {
  data: any;
  statusDialog: boolean;
  onChangeStatusDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateUser: React.FC<UpdateUserProps> = (props) => {
  const { statusDialog, onChangeStatusDialog, data } = props;

  const { mutate, isPending } = useUpdateUser();

  const form = useForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: data,
  });

  const onSubmit = (data: UpdateUserFormData) => {
    mutate(
      { id: props.data.id, ...data },
      {
        onSuccess: ({ data }: { data: UpdateUserFormData }) => {
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
          <DialogTitle>Actualizar información del usuario</DialogTitle>
          <DialogDescription>
            Complete los campos para actualizar al usuario en el sistema.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="username"
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
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rol</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione el rol" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="employee">Empleado</SelectItem>
                          <SelectItem value="admin">Administrador</SelectItem>
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

export default UpdateUser;
