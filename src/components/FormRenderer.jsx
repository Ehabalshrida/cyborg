import React from 'react';
import { useForm } from 'react-hook-form';
import Field from './Field';
import { toast } from 'react-toastify';
import { sendFormData } from '../services/form';
const FormRenderer = ({ schema, disabled=false }) => {
     
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await sendFormData(data);
      toast.success('Form submitted successfully!');
      reset();
    } catch (error) {
      console.log('Error submitting form:', error);
      toast.error('Error submitting form');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6">{schema.title || 'Dynamic Form'}</h2>
      <form onSubmit={handleSubmit(onSubmit)} >
        {schema.fields.map(field => (
          <Field
            key={field.name}
            field={field}
            register={register}
            errors={errors}
          />
        ))}
        <button 
          disabled={disabled}         
          type="submit"
          className={`mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${!disabled&&'cursor-pointer'}`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormRenderer;
