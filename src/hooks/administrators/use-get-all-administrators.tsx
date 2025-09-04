import { AxiosInstance } from '@/services/axios-service';
import { useQuery } from '@tanstack/react-query';

const getAllAdministrators = () => {
  return AxiosInstance.get('/administrators/all');
};

export const useGetAllAdministrators = () => {
  const query = useQuery({
    queryKey: ['administrators'],
    queryFn: getAllAdministrators,
    select({ data }) {
      return data;
    },
  });

  return query;
};
