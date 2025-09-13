import { AxiosInstance } from '@/services/axios-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface SelectedLicitationProps {
  licitaciones_seleccionadas: {
    id_licitacion_seleccionada: string;
  }[];
  es_aceptada: boolean;
}

const updateClasifyLicitationBulk = async (data: SelectedLicitationProps) => {
  const res = await AxiosInstance.patch('/licitations/update-clasify-bulk', {
    licitaciones_seleccionadas: data.licitaciones_seleccionadas,
    es_aceptada: data.es_aceptada,
  });
  return res;
};

export const useUpdateClasifyLicitationBulk = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateClasifyLicitationBulk,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['licitations-selected'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['licitations-by-criteria'],
      });
      await queryClient.invalidateQueries({ queryKey: ['licitations-counts'] });
      toast.success('Licitaciones actualizadas');
    },
    onError: () => {
      toast.error('Ocurrió un error al actualizar las licitaciones');
    },
  });

  return mutation;
};
