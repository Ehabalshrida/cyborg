import React from "react";
import FormRenderer from "../components/FormRenderer";
import StorageService from '../services/storage';

const FormRendererPage = () => {
  const [schema, setSchema] = React.useState(null);
  
  React.useEffect(() => {
    const formFields = StorageService.getItem("formSchema");
    setSchema(formFields);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      {!schema || !Array.isArray(schema.fields) ? (
        <div className="text-center text-red-600 p-6 bg-red-50 border border-red-300 rounded-lg">
          <p className="text-xl font-semibold">No valid form schema found.</p>
          <p>Please visit the Form Builder page to create a form.</p>
        </div>
      ) : (
        <div>
          <FormRenderer schema={schema} />
        </div>
      )}
    </div>
  );
};

export default FormRendererPage;
