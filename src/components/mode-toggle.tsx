import { ChevronUp, Moon, Sun, Check } from 'lucide-react';

import { useTheme } from '@/components/theme-provider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar';

export function CheckIcon() {
  return <Check className="mr-2 h-4 w-4" />;
}

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />{' '}
                Cambio de tema
                <ChevronUp className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')}>
                <span className="flex items-center justify-between  w-full">
                  Claro
                  {theme === 'light' && <CheckIcon />}
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                <span className="flex items-center justify-between  w-full">
                  Oscuro
                  {theme === 'dark' && <CheckIcon />}
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                <span className="flex items-center justify-between  w-full">
                  Sistema
                  {theme === 'system' && <CheckIcon />}
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  );
}
