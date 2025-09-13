import { AxiosInstance } from '@/services/axios-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const createUser = async (data: any) => {
  const res = AxiosInstance.post('/users/create/one', data);
  return res;
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: async () => {
      toast.success('El usuario fue creado');
      await queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return mutation;
};
