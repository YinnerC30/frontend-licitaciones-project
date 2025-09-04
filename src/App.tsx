import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router';
import { BrowSerRouter } from './router/browser-router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from './components/theme-provider';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={BrowSerRouter} />
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster richColors closeButton />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
