import React, { useState } from "react";
import FormRenderer from "../components/FormRenderer";
import { Link } from "react-router-dom";
const defaultField = {
  label: "",
  name: "",
  type: "text",
  required: false,
  options: [],
};

const FormBuilder = ({ onSave }) => {
  const [fields, setFields] = useState([]);
  const [currentField, setCurrentField] = useState({ ...defaultField });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentField({
      ...currentField,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const addField = () => {
    if (!currentField.label || !currentField.name) return;
    setFields([...fields, currentField]);
    setCurrentField({ ...defaultField });
  };

  const exportSchema = () => {
    const schema = {
      title: "My Custom Form",
      fields,
    };

    const blob = new Blob([JSON.stringify(schema, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "form-schema.json";
    link.click();

    if (onSave) onSave(schema);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-6 text-center">Form Builder</h2>
      <h3 className="text-xl font-normal text-black mb-6 text-left">
        Please fill data bellow to create form fields :- or{" "}
        <Link
          to="/import"
          className="text-blue-600 hover:underline font-semibold"
        >
          {" "}
          Import{" "}
        </Link>
      </h3>

      {/* Field Editor */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          name="label"
          placeholder="Label"
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={currentField.label}
          onChange={handleChange}
        />
        <input
          name="name"
          placeholder="Field Name"
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={currentField.name}
          onChange={handleChange}
        />

        <select
          name="type"
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={currentField.type}
          onChange={handleChange}
        >
          <option value="text">Text</option>
          <option value="email">Email</option>
          <option value="dropdown">Dropdown</option>
          <option value="date">Date</option>
        </select>

        <label className="flex items-center space-x-2">
          <input
            name="required"
            type="checkbox"
            checked={currentField.required}
            onChange={handleChange}
          />
          <span className="text-gray-700">Required</span>
        </label>

        {currentField.type === "dropdown" && (
          <input
            name="options"
            placeholder="Comma separated options"
            className="col-span-1 md:col-span-2 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={currentField.options.join(",")}
            onChange={(e) =>
              setCurrentField({
                ...currentField,
                options: e.target.value.split(",").map((opt) => opt.trim()),
              })
            }
          />
        )}
      </div>

      <button
        onClick={addField}
        className="bg-green-600 cursor-pointer text-white px-6 py-2 rounded hover:bg-green-700 transition"
      >
        ➕ Add Field
      </button>

      {/* Field List & Preview */}
      {fields.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-3">Form Fields</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-800">
            {fields.map((f, idx) => (
              <li key={idx}>
                <strong>{f.label}</strong> ({f.type}){" "}
                {f.required && <span className="text-red-500">*required</span>}
              </li>
            ))}
          </ul>

          <div className="my-6 border-t pt-6">
            <h4 className="text-lg font-semibold mb-2">Live Form Preview</h4>
            <FormRenderer
              disabled={true}
              schema={{ fields: [...fields], title: "My Custom Form" }}
            />
          </div>

          <button
            onClick={exportSchema}
            className="mt-4 cursor-pointer bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            💾 Save & Export Form Schema
          </button>
        </div>
      )}
    </div>
  );
};

export default FormBuilder;
