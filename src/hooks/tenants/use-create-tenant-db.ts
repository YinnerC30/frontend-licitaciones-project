import { AxiosInstance } from '@/services/axios-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const createTenantDB = async (tenantId: string) => {
  const res = AxiosInstance.post('/tenants/create/database/' + tenantId);
  return res;
};

export const useCreateTenantDB = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createTenantDB,
    onSuccess: async () => {
      toast.success('La base de datos fue creada');
      await queryClient.invalidateQueries({ queryKey: ['tenants'] });
    },
  });

  return mutation;
};
