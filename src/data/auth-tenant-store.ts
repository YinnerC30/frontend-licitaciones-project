import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  username: string;
}

interface AuthState {
  user: User | null;
  tenantId: string | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateTenantId: (tenantId: string) => void;
}

export const useAuthTenantStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      tenantId: null,
      isAuthenticated: false,
      login: (user: User) =>
        set((state) => ({
          user,
          isAuthenticated: true,
          tenantId: state.tenantId,
        })),
      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          tenantId: null,
        }),
      updateTenantId: (tenantId: string) =>
        set((state) => ({
          ...state,
          tenantId,
        })),
    }),
    {
      name: 'auth-tenant-storage',
    }
  )
);
