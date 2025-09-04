import { AxiosInstance } from '@/services/axios-service';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

const loginAdministratorUser = async (data: any) => {
  const res = await AxiosInstance.post('/auth/login/administration', data);
  return res;
};

export const useLoginAdministratorUser = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginAdministratorUser,
    onSuccess: () => {
      navigate('/management/app');
      toast.success('Puedes ingresar Admin');
    },
    onError: () => {
      toast.error('Ocurrio un error');
    },
  });

  return mutation;
};
