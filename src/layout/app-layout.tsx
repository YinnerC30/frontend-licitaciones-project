import {
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

import { Navigate, Outlet } from 'react-router';

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
import { useAuthStore } from '@/data/auth-store';
import { ChevronUp, Home, ShieldUser, User2, Users } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import { NAVIGATION_ROUTES } from '@/router/navigation-routes';

const items = [
  {
    title: 'Inicio',
    url: NAVIGATION_ROUTES.home,
    icon: Home,
  },
  {
    title: 'Administradores',
    url: NAVIGATION_ROUTES.administrators.all,
    icon: ShieldUser,
  },
  {
    title: 'Inquilinos',
    url: NAVIGATION_ROUTES.tenants.all,
    icon: Users,
  },
];

export function AppSidebar() {
  const { isAuthenticated, logout } = useAuthStore((state) => state);

  if (!isAuthenticated) {
    return <Navigate to={'../auth'} replace />;
  }

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Administración</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem
                  onClick={() => {
                    console.log('Hubo llamado');
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

const AppLayout = () => {
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

export default AppLayout;
