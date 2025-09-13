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
import useUpdatePasswordTenantUser from '@/hooks/users/use-update-password-tenant-user';

import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Esquema de validación con Zod
const updatePasswordUserSchema = z.object({
  currentPassword: z
    .string()
    .min(6, 'La contraseña actual debe tener al menos 6 caracteres'),
  newPassword: z
    .string()
    .min(6, 'La nueva contraseña debe tener al menos 6 caracteres'),
});

type UpdatePasswordUserFormData = z.infer<typeof updatePasswordUserSchema>;

interface UpdatePasswordUserProps {
  statusDialog: boolean;
  onChangeStatusDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdatePasswordUser: React.FC<UpdatePasswordUserProps> = (props) => {
  const { statusDialog, onChangeStatusDialog } = props;

  const { mutate, isPending } = useUpdatePasswordTenantUser();

  const form = useForm<UpdatePasswordUserFormData>({
    resolver: zodResolver(updatePasswordUserSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
  });

  const onSubmit = (data: UpdatePasswordUserFormData) => {
    mutate(
      { ...data },
      {
        onSuccess: ({ data }: { data: UpdatePasswordUserFormData }) => {
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
          <DialogTitle>Actualizar contraseña del usuario</DialogTitle>
          <DialogDescription>
            Complete los campos para actualizar la contraseña del usuario en el
            sistema.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña actual</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingrese la contraseña actual"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nueva contraseña</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingrese la nueva contraseña"
                        {...field}
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

export default UpdatePasswordUser;
