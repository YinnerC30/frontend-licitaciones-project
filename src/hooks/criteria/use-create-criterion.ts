import { AxiosInstance } from '@/services/axios-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const createCriterion = async (data: any) => {
  const res = AxiosInstance.post('/criteria/create/one', data);
  return res;
};

export const useCreateCriterion = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createCriterion,
    onSuccess: async () => {
      toast.success('El criterio fue creado');
      await queryClient.invalidateQueries({ queryKey: ['criteria'] });
    },
  });

  return mutation;
};
