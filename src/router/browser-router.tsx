import AppLayout from '@/layout/app-layout';
import AuthLayout from '@/layout/auth-layout';
import { ManagementLayout } from '@/layout/management-layout';
import { RootLayout } from '@/layout/root-layout';
import CreateAdministrator from '@/pages/app/administrators/create-administrator';
import { ManageAllAdministrator } from '@/pages/app/administrators/manage-all-administrators';
import { Home } from '@/pages/app/home';
import { ManageAllTenant } from '@/pages/app/tenants/manage-all-tenants';
import { Login } from '@/pages/auth/login';
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
    ],
  },
]);
