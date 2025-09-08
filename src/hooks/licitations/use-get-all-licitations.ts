import { AxiosInstance } from '@/services/axios-service';
import { useQuery } from '@tanstack/react-query';

const getAllLicitations = () => {
  return AxiosInstance.get('/licitations/all');
};

export const useGetAllLicitations = () => {
  const query = useQuery({
    queryKey: ['licitations'],
    queryFn: getAllLicitations,
    select({ data }) {
      return data;
    },
  });

  return query;
};
