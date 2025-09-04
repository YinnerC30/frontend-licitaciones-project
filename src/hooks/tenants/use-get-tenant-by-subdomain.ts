import { useAuthTenantStore } from '@/data/auth-tenant-store';
import { AxiosInstance } from '@/services/axios-service';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const getTenantBySubdomain = async (subdomain: string) => {
  const res = await AxiosInstance.get('/tenants/one/subdomain/' + subdomain);
  return res;
};

export const useGetTenantBySubdomain = () => {
  const { updateTenantId } = useAuthTenantStore((state) => state);
  const query = useQuery({
    queryKey: ['tenant'],
    queryFn: async () => {
      const subdomain = window.location.hostname.split('.')[0];
      return await getTenantBySubdomain(subdomain);
    },
    select: (res) => res.data,
  });

  useEffect(() => {
    if (query.isSuccess && query.data) {
      updateTenantId(query.data.id);
    }
  }, [query.data, query.isSuccess]);

  return query;
};
