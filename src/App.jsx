import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NavBar from './components/NavBar';

const FormBuilderPage = lazy(() => import('./pages/FormBuilderPage'));
const FormRendererPage = lazy(() => import('./pages/FormRendererPage'));
const ImportFormPage = lazy(() => import('./pages/ImportFormPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));


export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer />

      {/* Navbar */} 
      <NavBar />
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 h-screen">
        <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
          <Routes>
            <Route path="/" element={<FormBuilderPage />} />
            <Route path="/builder" element={<FormBuilderPage />} />
            <Route path="/renderer" element={<FormRendererPage />} />
            <Route path="/import" element={<ImportFormPage />} />
            <Route path="*" element={<NotFoundPage />} /> {/* fallback */}
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}
