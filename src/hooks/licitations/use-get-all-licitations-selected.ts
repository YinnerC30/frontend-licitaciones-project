import { AxiosInstance } from '@/services/axios-service';
import { useQuery } from '@tanstack/react-query';

interface AllLicitationsSelectedProps {
  limit?: number;
  offset?: number;
  only_accepted?: boolean;
  all_selected_records?: boolean;
}

const getAllLicitationsSelected = (data: AllLicitationsSelectedProps) => {
  const {
    limit = 10,
    offset = 0,
    only_accepted = false,
    all_selected_records = false,
  } = data;
  return AxiosInstance.get('/licitations/all-selected', {
    params: { limit, offset, only_accepted, all_selected_records },
  });
};

export const useGetAllLicitationsSelected = (
  data: AllLicitationsSelectedProps
) => {
  const query = useQuery({
    queryKey: ['licitations-selected', data],
    queryFn: () => getAllLicitationsSelected(data),
    select({ data }) {
      return data;
    },
  });

  return query;
};
