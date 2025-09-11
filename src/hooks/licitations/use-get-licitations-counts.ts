import { AxiosInstance } from '@/services/axios-service';
import { useQuery } from '@tanstack/react-query';

const getLicitationsCounts = () => {
  return AxiosInstance.get('/licitations/counts');
};

export const useGetLicitationsCounts = () => {
  const query = useQuery({
    queryKey: ['licitations-counts'],
    queryFn: getLicitationsCounts,
    select({ data }) {
      return data;
    },
  });

  return query;
};
