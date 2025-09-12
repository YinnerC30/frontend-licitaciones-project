import { AxiosInstance } from '@/services/axios-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface RemoveCriterionBulkProps {
  recordsIds: {
    id: string;
  }[];
}

const removeCriterionBulk = async (data: RemoveCriterionBulkProps) => {
  const res = AxiosInstance.delete('/criteria/remove/bulk', { data });
  return res;
};

export const useRemoveCriterionBulk = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: removeCriterionBulk,
    onSuccess: async () => {
      toast.success('Los criterios fueron eliminados con éxito');
      await queryClient.invalidateQueries({ queryKey: ['criteria'] });
    },
  });

  return mutation;
};
