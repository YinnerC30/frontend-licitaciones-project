import { AxiosInstance } from '@/services/axios-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const updateAdministrator = async (data: any) => {
  const { id, ...rest } = data;
  const res = AxiosInstance.patch('/administrators/update/one/' + id, rest);
  return res;
};

export const useUpdateAdministrator = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateAdministrator,
    onSuccess: async () => {
      toast.success('El registro del administrador fue actualizado');
      await queryClient.invalidateQueries({ queryKey: ['administrators'] });
    },
  });

  return mutation;
};
