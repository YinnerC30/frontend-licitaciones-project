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
import { useCreateTenant } from '@/hooks/tenants/use-create-tenant';
import { useState } from 'react';

// Esquema de validación con Zod
const createTenantSchema = z.object({
  subdomain: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  company_name: z
    .string()
    .min(2, 'El apellido debe tener al menos 2 caracteres'),
  email: z.string().email('Debe ser un email válido'),
  cell_phone_number: z
    .string()
    .min(10, 'El número de teléfono debe tener al menos 10 dígitos'),
});

type CreateTenantFormData = z.infer<typeof createTenantSchema>;

const CreateTenant = () => {
  const { mutate, isPending } = useCreateTenant();
  const [statusDialog, setStatusDialog] = useState(false);

  const form = useForm<CreateTenantFormData>({
    resolver: zodResolver(createTenantSchema),
    defaultValues: {
      subdomain: '',
      company_name: '',
      cell_phone_number: '',
      email: '',
    },
  });

  const onSubmit = (data: CreateTenantFormData) => {
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
          className="w-24"
          onClick={() => setStatusDialog(true)}
        >
          Crear
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Registrar un inquilino</DialogTitle>
          <DialogDescription>
            Complete los campos para crear un nuevo inquilino en el sistema.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="subdomain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subdominio</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingrese el subdominio" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de empresa</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingrese el nombre de la empresa"
                        {...field}
                      />
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

export default CreateTenant;
