import { AxiosInstance } from '@/services/axios-service';
import { useQuery } from '@tanstack/react-query';

interface AllLicitationsSelectedProps {
  limit?: number;
  offset?: number;
  id_licitacion_selected: string;
}

const getAllLogbooksByLicitationSelected = (
  data: AllLicitationsSelectedProps
) => {
  const { limit = 10, offset = 0, id_licitacion_selected } = data;
  return AxiosInstance.get(
    '/logbook/all/licitation-selected/' + id_licitacion_selected,
    {
      params: { limit, offset },
    }
  );
};

export const useGetAllLogbooksByLicitationSelected = (
  data: AllLicitationsSelectedProps
) => {
  const query = useQuery({
    queryKey: ['logbooks-by-licitation-selected', data],
    queryFn: () => getAllLogbooksByLicitationSelected(data),
    select({ data }) {
      return data;
    },
  });

  return query;
};
