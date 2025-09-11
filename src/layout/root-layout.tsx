import { Link } from 'react-router';

export const RootLayout = () => {
  return (
    <>
      <h1>RootLayout</h1>
      <Link to="/management" className="text-blue-500 underline block">
        Management
      </Link>
      <Link to="/tenant" className="text-blue-500 underline block">
        Tenant
      </Link>
    </>
  );
};
