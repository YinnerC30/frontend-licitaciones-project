import { AxiosInstance } from '@/services/axios-service';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

type UpdatePasswordTenantUserProps = {
  currentPassword: string;
  newPassword: string;
};

const updatePasswordTenantUser = async (
  data: UpdatePasswordTenantUserProps
) => {
  const res = AxiosInstance.patch('/users/update/password', data);
  return res;
};

export const useUpdatePasswordTenantUser = () => {
  const mutation = useMutation({
    mutationFn: updatePasswordTenantUser,
    onSuccess: async () => {
      toast.success('La contraseña fue actualizada');
    },
  });

  return mutation;
};

export default useUpdatePasswordTenantUser;
