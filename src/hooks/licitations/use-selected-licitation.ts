import { AxiosInstance } from '@/services/axios-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface SelectedLicitationProps {
  id_licitacion: string;
  es_aceptada: boolean;
}

const selectedLicitation = async (data: SelectedLicitationProps) => {
  const res = await AxiosInstance.post('/licitations/create-selected', data);
  return res;
};

export const useSelectedLicitation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: selectedLicitation,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['licitations-selected'] });
      toast.success('Licitación seleccionada');
    },
    onError: () => {
      toast.error('Ocurrió un error');
    },
  });

  return mutation;
};
