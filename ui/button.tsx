// packages/ui/Button.tsx

import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button className="flex items-center gap-1 bg-black text-white px-4 py-2 rounded-xl" onClick={onClick}>
      {children}
    </button>
  );
};
