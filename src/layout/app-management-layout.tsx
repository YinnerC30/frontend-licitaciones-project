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
import { useAuthManagementStore } from '@/data/auth-management-store';
import { NAVIGATION_ROUTES } from '@/router/navigation-routes';
import { ChevronUp, Home, ShieldUser, User2, Users } from 'lucide-react';

const items = [
  {
    title: 'Inicio',
    url: NAVIGATION_ROUTES.management.home,
    icon: Home,
  },
  {
    title: 'Administradores',
    url: NAVIGATION_ROUTES.management.administrators.all,
    icon: ShieldUser,
  },
  {
    title: 'Inquilinos',
    url: NAVIGATION_ROUTES.management.tenants.all,
    icon: Users,
  },
];

export function AppSidebar() {
  const { isAuthenticated, logout, user } = useAuthManagementStore(
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
                  <User2 /> {user?.first_name}
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

const AppManagementLayout = () => {
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

export default AppManagementLayout;
