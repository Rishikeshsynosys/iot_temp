import React from "react";

const SelectBox = ({ options, onChange, value, label, className = "" }) => {
  return (
    <div>
      {/* Custom dropdown arrow */}
      <select
        onChange={onChange}
        value={value}
        className={`w-full bg-white text-gray rounded-sm
                  px-4 py-2.5 pr-8 leading-tight focus:outline-none
                  transition-all duration-200 text-sm hover:border-gray-300 font-medium ${className}`}
      >
        {label && (
          <option
            value=""
            className="text-gray-600 font-medium"
            disabled={options?.length > 0}
          >
            {label}
          </option>
        )}

        {options?.map((option) => (
          <option key={option?.value} value={option?.value} className="py-2 font-medium">
            {option?.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;
