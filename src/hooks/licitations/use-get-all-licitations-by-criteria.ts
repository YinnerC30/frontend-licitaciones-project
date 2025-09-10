import { AxiosInstance } from '@/services/axios-service';
import { useQuery } from '@tanstack/react-query';

const getAllLicitationsByCriteria = () => {
  return AxiosInstance.get('/licitations/all-by-criteria');
};

export const useGetAllLicitationsByCriteria = () => {
  const query = useQuery({
    queryKey: ['licitations-by-criteria'],
    queryFn: getAllLicitationsByCriteria,
    select({ data }) {
      return data;
    },
  });

  return query;
};
