import AppManagementLayout from '@/layout/app-management-layout';
import AppTenantLayout from '@/layout/app-tenant-layout';
import AuthManagementLayout from '@/layout/auth-management-layout';
import AuthTenantLayout from '@/layout/auth-tenant-layout';
import { ManagementLayout } from '@/layout/management-layout';
import { RootLayout } from '@/layout/root-layout';
import { TenantLayout } from '@/layout/tenant-layout';
import CreateAdministrator from '@/pages/management/app/administrators/create-administrator';
import { ManageAllAdministrator } from '@/pages/management/app/administrators/manage-all-administrators';
import { HomeManagement } from '@/pages/management/app/home';
import { ManageAllTenants } from '@/pages/management/app/tenants/manage-all-tenants';
import { LoginManagement } from '@/pages/management/auth/login-management';
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
            Component: AuthManagementLayout,
            children: [
              {
                index: true,
                element: <Navigate to={'login'} />,
              },
              {
                path: 'login',
                Component: LoginManagement,
              },
            ],
          },
          {
            path: 'app',
            Component: AppManagementLayout,
            children: [
              {
                index: true,
                element: <Navigate to={'home'} />,
              },
              {
                path: 'home',
                Component: HomeManagement,
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
                    Component: ManageAllTenants,
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
