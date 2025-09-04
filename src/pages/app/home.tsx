import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/data/auth-store';
import { Navigate } from 'react-router';

export const Home = () => {
  const { isAuthenticated, logout } = useAuthStore((state) => state);

  if (!isAuthenticated) {
    return <Navigate to={'../../auth'} replace />;
  }

  return (
    <div>
      <h1>Home Administration</h1>
      <Button type="button" onClick={logout}>
        Logout
      </Button>
    </div>
  );
};
