
import { useRouteError } from 'react-router';

const ErrorPage = () => {
  const error: any = useRouteError();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>¡Ha ocurrido un error!</h1>
      <p>
        {error?.status && <strong>Código: {error.status}</strong>}
      </p>
      <p>
        {error?.statusText || error?.message || 'Ocurrió un error inesperado.'}
      </p>
    </div>
  );
};

export default ErrorPage;