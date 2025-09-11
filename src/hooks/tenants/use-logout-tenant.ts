import { useAuthTenantStore } from '@/data/auth-tenant-store';
import { AxiosInstance } from '@/services/axios-service';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useGetTenantBySubdomain } from './use-get-tenant-by-subdomain';

const logoutTenant = async () => {
  const res = await AxiosInstance.post('/auth/logout');
  return res;
};

export const useLogoutTenant = () => {
  useGetTenantBySubdomain();
  const navigate = useNavigate();
  const { logout } = useAuthTenantStore((state) => state);

  const mutation = useMutation({
    mutationFn: logoutTenant,
    onSuccess: () => {
      logout();
      navigate('/tenant/auth/login', { replace: true });
      window.location.reload();
      toast.success('Has cerrado sesión');
    },
    onError: () => {
      toast.error('Ocurrió un error al cerrar sesión');
    },
  });

  return mutation;
};
