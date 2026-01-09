import React from 'react';

export const Error = ({ message = "Something went wrong", code = "500" }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-gray-300">
      <div className="text-6xl mb-4 text-red-500">⚠️</div>
      <h1 className="text-5xl font-bold mb-2 text-red-500">{code}</h1>
      <p className="text-lg mb-4">{message}</p>
      <a href="/" className="text-blue-400 hover:text-blue-300 hover:underline">Go back to Home</a>
    </div>
  );
};
