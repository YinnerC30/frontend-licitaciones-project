import { RefreshCw } from 'lucide-react';
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
      variant={'outline'}
    >
      <RefreshCw className="w-4 h-4" />
      Recargar
    </Button>
  );
};

export default ButtonRefetch;
