import { useAuthStore } from '@/data/auth-store';
import { useAuthTenantStore } from '@/data/auth-tenant-store';
import { AxiosInstance } from '@/services/axios-service';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useGetTenantBySubdomain } from './use-get-tenant-by-subdomain';

const loginTenant = async (data: any) => {
  const res = await AxiosInstance.post('/auth/login', data);
  return res;
};

export const useLoginTenant = () => {
  useGetTenantBySubdomain();
  const navigate = useNavigate();
  const { login } = useAuthTenantStore((state) => state);

  const mutation = useMutation({
    mutationFn: loginTenant,
    onSuccess: ({ data: { id, username } }) => {
      login({ id, username });
      navigate('/tenant/app');
      toast.success('Puedes ingresar Tenant');
    },
    onError: () => {
      toast.error('Ocurrió un error');
    },
  });

  return mutation;
};
