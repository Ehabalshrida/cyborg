import React from 'react';
import FormBuilder from '../components/FormBuilder';
import { useNavigate } from 'react-router-dom';
import StorageService from '../services/storage';
const FormBuilderPage = () => {
  const navigate = useNavigate();

  const handleSave = (schema) => {
    StorageService.setItem('formSchema', schema);
    navigate('/renderer');
  };

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Create Your Form</h1>
      <FormBuilder onSave={handleSave} />
    </div>
  );
};

export default FormBuilderPage;
