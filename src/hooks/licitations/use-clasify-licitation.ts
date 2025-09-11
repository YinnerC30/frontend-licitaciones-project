import { AxiosInstance } from '@/services/axios-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface SelectedLicitationProps {
  id_licitacion: string;
  es_aceptada: boolean;
}

const clasifyLicitation = async (data: SelectedLicitationProps) => {
  const res = await AxiosInstance.post('/licitations/clasify', data);
  return res;
};

export const useClasifyLicitation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: clasifyLicitation,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['licitations-selected'] });
      await queryClient.invalidateQueries({ queryKey: ['licitations-by-criteria'] });
      await queryClient.invalidateQueries({ queryKey: ['licitations-counts'] });
      toast.success('Licitación clasificada');
    },
    onError: () => {
      toast.error('Ocurrió un error');
    },
  });

  return mutation;
};
