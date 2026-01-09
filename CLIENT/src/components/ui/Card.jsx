import React from 'react';

export const Card = ({ className = '', children }) => {
  return (
    <div className={
      "bg-slate-800/95 backdrop-blur-sm border border-slate-700 rounded-xl shadow-sm hover:shadow-md transition " +
      className
    }>
      {children}
    </div>
  );
};

export default Card;
