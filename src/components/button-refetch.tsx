import { RefreshCw } from 'lucide-react';
import { Button } from './ui/button';

interface ButtonRefetchProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onRefetch: () => Promise<void>;
}

const ButtonRefetch: React.FC<ButtonRefetchProps> = (props) => {
  const { onRefetch, ...rest } = props;
  return (
    <Button
      type="button"
      onClick={async () => {
        await onRefetch();
      }}
      variant={'outline'}
      {...rest}
    >
      <RefreshCw className="w-4 h-4" />
      Recargar
    </Button>
  );
};

export default ButtonRefetch;
