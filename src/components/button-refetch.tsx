import { Button } from './ui/button';

interface ButtonRefetchProps {
  onRefetch: () => Promise<void>;
}

const ButtonRefetch: React.FC<ButtonRefetchProps> = (props) => {
  const { onRefetch } = props;
  return (
    <Button
      type="button"
      onClick={async () => {
        await onRefetch();
      }}
    >
      Recargar
    </Button>
  );
};

export default ButtonRefetch;
