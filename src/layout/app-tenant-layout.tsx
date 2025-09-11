import {
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

import { Link, Navigate, Outlet } from 'react-router';

import { ModeToggle } from '@/components/mode-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { useAuthTenantStore } from '@/data/auth-tenant-store';
import { NAVIGATION_ROUTES } from '@/router/navigation-routes';
import { ChevronUp, Home, Layers, List, ListCheck, Stamp, User2 } from 'lucide-react';
import { useEffect } from 'react';
import {
  TIME_REFRESH_TOKEN,
  useRefreshTenantToken,
} from '@/hooks/tenants/use-refresh-tenant-token';

const items = [
  {
    title: 'Inicio',
    url: NAVIGATION_ROUTES.tenant.home,
    icon: Home,
  },
  {
    title: 'Licitaciones seleccionadas',
    url: NAVIGATION_ROUTES.tenant.licitationsSelected,
    icon: ListCheck,
  },
  {
    title: 'Criterios',
    url: NAVIGATION_ROUTES.tenant.criteria,
    icon: List,
  },
  {
    title: 'Estados',
    url: NAVIGATION_ROUTES.tenant.licitationStatus,
    icon: Stamp,
  },
  {
    title: 'Licitaciones',
    url: NAVIGATION_ROUTES.tenant.rawLicitations,
    icon: Layers,
  },
];

export function AppSidebar() {
  const { isAuthenticated, logout, user } = useAuthTenantStore(
    (state) => state
  );

  if (!isAuthenticated) {
    return <Navigate to={'../auth'} replace />;
  }

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Barra de navegación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <ModeToggle />
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="capitalize">
                  <User2 /> {user?.username}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem
                  onClick={() => {
                    logout();
                  }}
                >
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

const AppTenantLayout = () => {
  const mutationRenewToken = useRefreshTenantToken();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      mutationRenewToken.mutate();
    }, TIME_REFRESH_TOKEN);

    return () => clearTimeout(timeOut);
  }, [mutationRenewToken]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="px-4">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default AppTenantLayout;
