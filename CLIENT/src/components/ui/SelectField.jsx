import React from 'react';

const base = "w-full px-3 py-2 rounded-lg bg-slate-700/80 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";

export const SelectField = ({ label, className = '', selectClassName = '', children, ...props }) => {
  return (
    <div className={"mb-4 " + className}>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}
      <select className={`${base} ${selectClassName}`} {...props}>
        {children}
      </select>
    </div>
  );
};

export default SelectField;
