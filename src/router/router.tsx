import { createBrowserRouter } from 'react-router';

export const BrowSerRouter = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello World</div>,
    errorElement: <div>Hubo un error</div>,
    children: [
      {
        path: 'management',
        element: <div>Management</div>,
        children: [
          {
            path: 'auth',
            element: <div>Auth</div>,
            children: [
              {
                path: 'login',
                element: <div>Login</div>,
              },
            ],
          },
          {
            path: 'app',
            element: <div>App</div>,
            children: [
              {
                path: 'home',
                element: <div>Home App Administration</div>,
              },
              {
                path: 'administrators',
                element: <div>Administradores</div>,
              },
              {
                path: 'tenants',
                element: <div>Inquilinos</div>,
              },
            ],
          },
        ],
      },
    ],
  },
]);
