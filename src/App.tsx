import { RouterProvider } from 'react-router';
import { BrowSerRouter } from './router/browser-router';

function App() {
  return (
    <>
      <RouterProvider router={BrowSerRouter} />
    </>
  );
}

export default App;
