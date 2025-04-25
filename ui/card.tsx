

// ui/card.tsx
import React from "react";

type CardProps = {
  children: React.ReactNode;
  title?: string;
  className?: string;
};

export const Card = ({ children, title, className = "" }: CardProps) => {
  return (
    <div className={`bg-gray-100 border-2 border-gray-300  text-center rounded-2xl shadow p-6 ${className}`}>
      {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
      {children}
    </div>
  );
};
