import { AxiosInstance } from '@/services/axios-service';
import { useQuery } from '@tanstack/react-query';

const getAllLicitationsStatus = () => {
  return AxiosInstance.get('/licitations/all-status');
};

export const useGetAllLicitationsStatus = () => {
  const query = useQuery({
    queryKey: ['licitations-status'],
    queryFn: getAllLicitationsStatus,
    select({ data }) {
      return data;
    },
  });

  return query;
};
