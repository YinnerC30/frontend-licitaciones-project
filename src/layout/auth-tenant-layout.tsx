import { useAuthTenantStore } from '@/data/auth-tenant-store';
import { Navigate, Outlet } from 'react-router';

export const AuthTenantLayout = () => {
  const isAuthUser = useAuthTenantStore((state) => state.isAuthenticated);

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

export default AuthTenantLayout;
