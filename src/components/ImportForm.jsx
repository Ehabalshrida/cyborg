import React from "react";
import { useForm } from "react-hook-form";
import Field from "./Field";
import StorageService from "../services/storage";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const ImportForm = () => {
  const importedField = {
    label: "Attachment",
    name: "importedField",
    type: "file",
    required: true,
  };
  const navigate = useNavigate();
  const isValidSchema = (schema) => {
    if (!schema || typeof schema !== "object") return false;

    const { title, fields } = schema;

    if (typeof title !== "string" || !Array.isArray(fields)) return false;

    const validTypes = ["text", "email", "dropdown", "date"];

    for (const field of fields) {
      if (
        typeof field.label !== "string" ||
        typeof field.name !== "string" ||
        typeof field.type !== "string" ||
        !validTypes.includes(field.type)
      ) {
        return false;
      }

      if (field.type === "dropdown" && !Array.isArray(field.options)) {
        return false;
      }
    }

    return true;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const file = data.importedField[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const schema = JSON.parse(event.target.result);
        if (!isValidSchema(schema)) {
          toast.error(
            "Invalid schema structure. Please upload a valid form schema."
          );
          return;
        }
        StorageService.setItem("formSchema", schema); 
        navigate("/renderer"); 
        toast.success(
          "Form schema imported successfully!"
        );
      } catch (err) {
        console.error("Invalid JSON file", err);
        toast.error(
          "Failed to parse JSON file. Make sure it's a valid schema."
        );
      }
    };
    reader.readAsText(file); 
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6">{"Import Form Schema"}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          key="importedField"
          field={importedField}
          register={register}
          errors={errors}
        />
        <button
          type="submit"
          className={`mt-4 cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default ImportForm;
