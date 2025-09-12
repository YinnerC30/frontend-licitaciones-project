import { useParams } from 'react-router';

const ManageOneLicitationSelected = () => {
  const { id } = useParams();
  return <div>ManageOneLicitationSelected {id}</div>;
};

export default ManageOneLicitationSelected;
