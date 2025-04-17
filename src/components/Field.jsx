import React from 'react';

const Field = ({ field, register, errors }) => {
  const { label, name, type, required, options } = field;
  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1 text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {type === 'dropdown' ? (
        <select
          {...register(name, { required })}
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select...</option>
          {(options || []).map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          {...register(name, { required })}
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}

      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">This field is required</p>
      )}
    </div>
  );
};

export default Field;
