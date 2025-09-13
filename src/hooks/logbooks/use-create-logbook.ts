import { AxiosInstance } from '@/services/axios-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const createLogbook = async (data: any) => {
  console.log('🚀 ~ createLogbook ~ data:', data)
  const res = AxiosInstance.post('/logbook/create/one', data);
  return res;
};

export const useCreateLogbook = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createLogbook,
    onSuccess: async () => {
      toast.success('El registro de bitácora fue creado');
      await queryClient.invalidateQueries({ queryKey: ['logbooks-by-licitation-selected'] });
    },
  });

  return mutation;
};
