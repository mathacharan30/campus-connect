import React from 'react';

const base = "w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer text-gray-300 bg-slate-700/80 border border-slate-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";

export const FileInput = ({ label, className = '', inputClassName = '', ...props }) => {
  return (
    <div className={"mb-4 " + className}>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}
      <input type="file" className={`${base} ${inputClassName}`} {...props} />
    </div>
  );
};

export default FileInput;
