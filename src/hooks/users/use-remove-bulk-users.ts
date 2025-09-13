import { AxiosInstance } from '@/services/axios-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface RemoveUserBulkProps {
  recordsIds: {
    id: string;
  }[];
}

const removeUserBulk = async (data: RemoveUserBulkProps) => {
  const res = AxiosInstance.delete('/criteria/remove/bulk', { data });
  return res;
};

export const useRemoveUserBulk = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: removeUserBulk,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Los usuarios fueron eliminados con éxito');
    },
  });

  return mutation;
};
