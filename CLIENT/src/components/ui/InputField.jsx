import React from 'react';

const base = "w-full px-3 py-2 rounded-lg bg-slate-700/80 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";

export const InputField = ({ label, className = '', inputClassName = '', ...props }) => {
  return (
    <div className={"mb-4 " + className}>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}
      <input className={`${base} ${inputClassName}`} {...props} />
    </div>
  );
};

export default InputField;
