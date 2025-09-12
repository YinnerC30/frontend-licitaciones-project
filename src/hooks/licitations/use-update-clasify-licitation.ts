import { AxiosInstance } from '@/services/axios-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface SelectedLicitationProps {
  id: string;
  es_aceptada: boolean;
}

const updateClasifyLicitation = async (data: SelectedLicitationProps) => {
  const res = await AxiosInstance.patch(
    '/licitations/update-clasify/' + data.id,
    { es_aceptada: data.es_aceptada }
  );
  return res;
};

export const useUpdateClasifyLicitation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateClasifyLicitation,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['licitations-selected'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['licitations-by-criteria'],
      });
      await queryClient.invalidateQueries({ queryKey: ['licitations-counts'] });
      toast.success('Licitación actualizada');
    },
    onError: () => {
      toast.error('Ocurrió un error');
    },
  });

  return mutation;
};
