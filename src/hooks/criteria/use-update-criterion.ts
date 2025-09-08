import { AxiosInstance } from '@/services/axios-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const updateCriterion = async (data: any) => {
  const { id, ...rest } = data;
  const res = AxiosInstance.patch('/criteria/update/one/' + id, rest);
  return res;
};

export const useUpdateCriterion = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateCriterion,
    onSuccess: async () => {
      toast.success('El registro del criterio fue actualizado');
      await queryClient.invalidateQueries({ queryKey: ['criteria'] });
    },
  });

  return mutation;
};
