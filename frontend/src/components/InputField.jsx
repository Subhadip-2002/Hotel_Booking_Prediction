// File: components/InputField.jsx
import React from 'react';

const InputField = ({ label, name, options, ...props }) => {
  // If options are provided, render a select dropdown
  if (options) {
    return (
      <div>
        <label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
        <select
          id={name}
          name={name}
          {...props}
          className="w-full border rounded p-2"
        >
          <option value="">Select {label}</option> {/* Default placeholder */}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  // Otherwise, render a standard input field
  return (
    <div>
      <label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        id={name}
        name={name}
        {...props}
        className="w-full border rounded p-2"
      />
    </div>
  );
};

export default InputField;
