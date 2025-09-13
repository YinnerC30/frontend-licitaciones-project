import { AxiosInstance } from '@/services/axios-service';
import { useQuery } from '@tanstack/react-query';

interface AllUsersTenantProps {
  limit?: number;
  offset?: number;
}

const getAllUsersTenant = (data: AllUsersTenantProps) => {
  const { limit = 10, offset = 0 } = data;
  return AxiosInstance.get('/users/all', {
    params: { limit, offset },
  });
};

export const useGetAllUsersTenant = (data: AllUsersTenantProps) => {
  const query = useQuery({
    queryKey: ['users'],
    queryFn: () => getAllUsersTenant(data),
    select({ data }) {
      return data;
    },
  });

  return query;
};
