import { AxiosInstance } from '@/services/axios-service';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useGetTenantBySubdomain } from './use-get-tenant-by-subdomain';

export const TIME_REFRESH_TOKEN = 1000 * 60 * 60 * 24; // 24 hours

const refreshTenantToken = async () => {
  const res = await AxiosInstance.put('/auth/refresh');
  return res;
};

export const useRefreshTenantToken = () => {
  useGetTenantBySubdomain();

  const mutation = useMutation({
    mutationFn: refreshTenantToken,
    onSuccess: () => {
      toast.success('Token actualizado');
    },
    onError: () => {
      toast.error('Ocurrió un error');
    },
  });

  return mutation;
};
