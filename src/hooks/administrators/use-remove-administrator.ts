import { AxiosInstance } from '@/services/axios-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const removeAdministrator = async (adminId: string) => {
  const res = AxiosInstance.delete('/administrators/remove/one/' + adminId);
  return res;
};

export const useRemoveAdministrator = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: removeAdministrator,
    onSuccess: async () => {
      toast.success('El administrador fue eliminado con éxito');
      await queryClient.invalidateQueries({ queryKey: ['administrators'] });
    },
  });

  return mutation;
};
