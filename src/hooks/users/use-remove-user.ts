import { AxiosInstance } from '@/services/axios-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const removeUser = async (userId: string) => {
  const res = AxiosInstance.delete('/users/remove/one/' + userId);
  return res;
};

export const useRemoveUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: removeUser,
    onSuccess: async () => {
      toast.success('El usuario fue eliminado con éxito');
      await queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return mutation;
};
