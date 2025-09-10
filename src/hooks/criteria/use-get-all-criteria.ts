import { AxiosInstance } from '@/services/axios-service';
import { useQuery } from '@tanstack/react-query';

const getAllCriteria = () => {
  return AxiosInstance.get('/criteria/all');
};

export const useGetAllCriteria = () => {
  const query = useQuery({
    queryKey: ['criteria'],
    queryFn: getAllCriteria,
    select({ data }) {
      return data;
    },
  });

  return query;
};
