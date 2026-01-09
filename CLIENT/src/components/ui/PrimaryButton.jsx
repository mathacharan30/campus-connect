import React from 'react';

export const PrimaryButton = ({ className = '', children, ...props }) => {
  return (
    <button
      {...props}
      className={
        "inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 text-white px-4 py-2 " +
        "font-medium shadow-sm hover:shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 " +
        "focus:ring-blue-500/50 active:scale-[0.98] transition " +
        className
      }
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
