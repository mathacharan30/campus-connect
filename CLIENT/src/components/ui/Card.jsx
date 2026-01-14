import React from 'react';

export const Card = ({ className = '', children, ...props }) => {
  return (
    <div
      data-animate="fade-up"
      data-float
      data-glow
      {...props}
      className={
        "bg-slate-800/95 bg-blue-glow backdrop-blur-sm border border-slate-700 rounded-2xl " +
        "shadow-sm hover:shadow-md transition " +
        className
      }
    >
      {children}
    </div>
  );
};

export default Card;
