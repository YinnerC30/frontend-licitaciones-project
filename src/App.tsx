import { RouterProvider } from 'react-router';
import { BrowSerRouter } from './router/router';

function App() {
  return (
    <>
      <RouterProvider router={BrowSerRouter} />
    </>
  );
}

export default App;
