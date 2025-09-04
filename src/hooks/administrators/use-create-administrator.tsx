import { AxiosInstance } from '@/services/axios-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const createAdministrator = async (data: any) => {
  const res = AxiosInstance.post('/administrators/create/one', data);
  return res;
};

export const useCreateAdministrator = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createAdministrator,
    onSuccess: () => {
      toast.success('El registro del administrador fue exitoso');
      queryClient.invalidateQueries({ queryKey: ['administrators'] });
    },
  });

  return mutation;
};
