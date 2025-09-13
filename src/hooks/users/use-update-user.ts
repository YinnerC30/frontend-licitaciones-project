import { AxiosInstance } from '@/services/axios-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const updateUser = async (data: any) => {
  const { id, ...rest } = data;
  const res = AxiosInstance.patch('/users/update/one/' + id, rest);
  return res;
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: async () => {
      toast.success('El registro del usuario fue actualizado');
      await queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return mutation;
};
