import React from 'react';

export const PageContainer = ({ className = '', children }) => {
  return (
    <div className={"mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 bg-slate-900 min-h-screen " + className}>
      {children}
    </div>
  );
};

export default PageContainer;
