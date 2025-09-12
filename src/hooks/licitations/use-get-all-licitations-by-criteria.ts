import { AxiosInstance } from '@/services/axios-service';
import { useQuery } from '@tanstack/react-query';

interface AllLicitationsByCriteriaProps {
  limit?: number;
  offset?: number;
}

const getAllLicitationsByCriteria = (data: AllLicitationsByCriteriaProps) => {
  const { limit = 10, offset = 0 } = data;
  return AxiosInstance.get('/licitations/all-by-criteria', {
    params: { limit, offset },
  });
};

export const useGetAllLicitationsByCriteria = (
  data: AllLicitationsByCriteriaProps
) => {
  const query = useQuery({
    queryKey: ['licitations-by-criteria', data],
    queryFn: () => getAllLicitationsByCriteria(data),
    select({ data }) {
      return data;
    },
  });

  return query;
};
