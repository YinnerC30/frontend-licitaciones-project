import { AxiosInstance } from '@/services/axios-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface LicitationStatus {
  codigo: string;
  descripcion: string;
}

const createLicitationStatus = async (data: LicitationStatus) => {
  const res = AxiosInstance.post('/licitations/create-status', data);
  return res;
};

export const useCreateLicitationStatus = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createLicitationStatus,
    onSuccess: async () => {
      toast.success('El criterio fue creado');
      await queryClient.invalidateQueries({ queryKey: ['licitation-status'] });
    },
  });

  return mutation;
};
