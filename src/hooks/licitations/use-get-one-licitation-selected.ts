import { AxiosInstance } from '@/services/axios-service';
import { useQuery } from '@tanstack/react-query';

const getOneLicitationSelected = (id: string) => {
  return AxiosInstance.get('/licitations/one-selected/' + id);
};

export const useGetOneLicitationSelected = (id: string) => {
  const query = useQuery({
    queryKey: ['licitations-selected', id],
    queryFn: () => getOneLicitationSelected(id),
    select({ data }) {
      return data;
    },
  });

  return query;
};
