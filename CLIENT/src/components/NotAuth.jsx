import React from 'react';

export const NotAuthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-gray-300">
      <div className="text-6xl mb-4">🚫</div>
      <h1 className="text-4xl font-bold mb-2 text-white">Not Authorized</h1>
      <p className="text-lg">You do not have permission to view this page.</p>
    </div>
  );
};


