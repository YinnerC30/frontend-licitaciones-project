import { useAuthTenantStore } from '@/data/auth-tenant-store';
import { AxiosInstance } from '@/services/axios-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

const logoutTenant = async () => {
  const res = await AxiosInstance.post('/auth/logout');
  return res;
};

export const useLogoutTenant = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { logout } = useAuthTenantStore((state) => state);

  const mutation = useMutation({
    mutationFn: logoutTenant,
    onSuccess: async () => {
      queryClient.clear();
      await queryClient.invalidateQueries();
      logout();
      navigate('/tenant/auth/login', { replace: true });
      toast.success('Has cerrado sesión');
    },
    onError: () => {
      toast.error('Ocurrió un error al cerrar sesión');
    },
  });

  return mutation;
};
