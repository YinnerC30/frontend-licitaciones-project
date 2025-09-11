import { AxiosInstance } from '@/services/axios-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface SelectedLicitationProps {
  licitaciones: {
    id_licitacion: string;
  }[];
  es_aceptada: boolean;
}

const clasifyLicitationBulk = async (data: SelectedLicitationProps) => {
  const res = await AxiosInstance.post('/licitations/clasify-bulk', data);
  return res;
};

export const useClasifyLicitationBulk = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: clasifyLicitationBulk,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['licitations-selected'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['licitations-by-criteria'],
      });
      await queryClient.invalidateQueries({ queryKey: ['licitations-counts'] });
      toast.success('Licitaciónes clasificadas');
    },
    onError: () => {
      toast.error('Ocurrió un error');
    },
  });

  return mutation;
};
