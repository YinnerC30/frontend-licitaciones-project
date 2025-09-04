import AppLayout from '@/layout/app-layout';
import AppTenantLayout from '@/layout/app-tenant-layout';
import AuthLayout from '@/layout/auth-layout';
import AuthTenantLayout from '@/layout/auth-tenant-layout';
import { ManagementLayout } from '@/layout/management-layout';
import { RootLayout } from '@/layout/root-layout';
import { TenantLayout } from '@/layout/tenant-layout';
import CreateAdministrator from '@/pages/management/app/administrators/create-administrator';
import { ManageAllAdministrator } from '@/pages/management/app/administrators/manage-all-administrators';
import { Home } from '@/pages/management/app/home';
import { ManageAllTenant } from '@/pages/management/app/tenants/manage-all-tenants';
import { Login } from '@/pages/management/auth/login';
import { HomeTenant } from '@/pages/tenant/app/home-tenant';
import { LoginTenant } from '@/pages/tenant/auth/login-tenant';
import { createBrowserRouter, Navigate } from 'react-router';

export const BrowSerRouter = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    errorElement: <div>Hubo un error</div>,
    children: [
      {
        path: 'management',
        Component: ManagementLayout,
        children: [
          {
            index: true,
            element: <Navigate to={'auth'} />,
          },
          {
            path: 'auth',
            Component: AuthLayout,
            children: [
              {
                index: true,
                element: <Navigate to={'login'} />,
              },
              {
                path: 'login',
                Component: Login,
              },
            ],
          },
          {
            path: 'app',
            Component: AppLayout,
            children: [
              {
                index: true,
                element: <Navigate to={'home'} />,
              },
              {
                path: 'home',
                Component: Home,
              },
              {
                path: 'administrators',
                children: [
                  {
                    index: true,
                    element: <Navigate to="all" />,
                  },
                  {
                    path: 'all',
                    Component: ManageAllAdministrator,
                  },
                  {
                    path: 'create',
                    Component: CreateAdministrator,
                  },
                ],
              },
              {
                path: 'tenants',
                children: [
                  {
                    index: true,
                    element: <Navigate to="all" />,
                  },
                  {
                    path: 'all',
                    Component: ManageAllTenant,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: 'tenant',
        Component: TenantLayout,
        children: [
          {
            index: true,
            element: <Navigate to={'auth'} />,
          },
          {
            path: 'auth',
            Component: AuthTenantLayout,
            children: [
              {
                index: true,
                element: <Navigate to={'login'} />,
              },
              {
                path: 'login',
                Component: LoginTenant,
              },
            ],
          },
          {
            path: 'app',
            Component: AppTenantLayout,
            children: [
              {
                index: true,
                element: <Navigate to={'home'} />,
              },
              {
                path: 'home',
                Component: HomeTenant,
              },
            ],
          },
        ],
      },
    ],
  },
]);
