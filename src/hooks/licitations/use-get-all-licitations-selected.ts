import { AxiosInstance } from '@/services/axios-service';
import { useQuery } from '@tanstack/react-query';

const getAllLicitationsSelected = () => {
  return AxiosInstance.get('/licitations/all-selected');
};

export const useGetAllLicitationsSelected = () => {
  const query = useQuery({
    queryKey: ['licitations-selected'],
    queryFn: getAllLicitationsSelected,
    select({ data }) {
      return data;
    },
  });

  return query;
};
