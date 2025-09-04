import { AxiosInstance } from '@/services/axios-service';
import { useQuery } from '@tanstack/react-query';

const getAllTenants = () => {
  return AxiosInstance.get('/tenants/all');
};

export const useGetAllTenants = () => {
  const query = useQuery({
    queryKey: ['tenants'],
    queryFn: getAllTenants,
    select({ data }) {
      return data;
    },
  });

  return query;
};
