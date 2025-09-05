import { useAuthManagementStore } from '@/data/auth-management-store';
import { Navigate, Outlet } from 'react-router';

export const AuthManagementLayout = () => {
  const isAuthUser = useAuthManagementStore((state) => state.isAuthenticated);

  if (isAuthUser) {
    return <Navigate to={'../app'} replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthManagementLayout;
