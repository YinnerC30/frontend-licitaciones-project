import { useAuthStore } from '@/data/auth-store';
import { Navigate, Outlet } from 'react-router';

export const AuthLayout = () => {
  const isAuthUser = useAuthStore((state) => state.isAuthenticated);

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

export default AuthLayout;
