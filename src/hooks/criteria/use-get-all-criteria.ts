import { AxiosInstance } from '@/services/axios-service';
import { useQuery } from '@tanstack/react-query';

interface GetAllCriteriaParams {
  limit?: number;
  offset?: number;
}

const getAllCriteria = (params: GetAllCriteriaParams) => {
  const { limit = 10, offset = 0 } = params;

  return AxiosInstance.get('/criteria/all', {
    params: { limit, offset },
  });
};

export const useGetAllCriteria = (params: GetAllCriteriaParams) => {
  const query = useQuery({
    queryKey: ['criteria'],
    queryFn: () => getAllCriteria(params),
    select({ data }) {
      return data;
    },
  });

  return query;
};
