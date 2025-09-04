import { AxiosInstance } from '@/services/axios-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const configTenantDB = async (tenantId: string) => {
  const res = AxiosInstance.put('/tenants/config-db/one/' + tenantId);
  return res;
};

export const useConfigTenantDB = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: configTenantDB,
    onSuccess: async () => {
      toast.success('La base de datos fue configurada');
      await queryClient.invalidateQueries({ queryKey: ['tenants'] });
    },
  });

  return mutation;
};
