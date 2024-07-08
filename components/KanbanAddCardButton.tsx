import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusSquare } from 'lucide-react';

interface Props {
  onClick: () => void;
  children?: React.ReactNode;
}

const KanbanAddCardButton: React.FC<Props> = ({ onClick, children }) => {
  return (
    <Button
      onClick={onClick}
      className="w-full mt-4 bg-accent text-black hover:bg-accent/90"
    >
      <PlusSquare className="mr-2 h-4 w-4" />
      {children}
    </Button>
  );
};

export default KanbanAddCardButton;