import { AxiosInstance } from '@/services/axios-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const removeCriterion = async (adminId: string) => {
  const res = AxiosInstance.delete('/criteria/remove/one/' + adminId);
  return res;
};

export const useRemoveCriterion = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: removeCriterion,
    onSuccess: async () => {
      toast.success('El criterio fue eliminado con éxito');
      await queryClient.invalidateQueries({ queryKey: ['criteria'] });
    },
  });

  return mutation;
};
