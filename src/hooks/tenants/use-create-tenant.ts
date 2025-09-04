import { AxiosInstance } from '@/services/axios-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const createTenant = async (data: any) => {
  const res = AxiosInstance.post('/tenants/create/one', data);
  return res;
};

export const useCreateTenant = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createTenant,
    onSuccess: async () => {
      toast.success('El registro del inquilino fue exitoso');
      await queryClient.invalidateQueries({ queryKey: ['tenants'] });
    },
  });

  return mutation;
};
