import { AxiosInstance } from '@/services/axios-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface SelectedLicitationProps {
  id: string;
  id_status: string;
}

const updateLicitationSelectedStatus = async (
  data: SelectedLicitationProps
) => {
  const { id, id_status } = data;
  const res = await AxiosInstance.patch(
    '/licitations/update-status-selected/' + id,
    { id_status }
  );
  return res;
};

export const useUpdateLicitationSelectedStatus = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateLicitationSelectedStatus,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['licitations-selected'],
      });
      toast.success('El estado de la licitación seleccionada fue actualizado');
    },
    onError: () => {
      toast.error('Ocurrió un error');
    },
  });

  return mutation;
};
