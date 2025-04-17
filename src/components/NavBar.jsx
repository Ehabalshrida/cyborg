import React from 'react'
import { Link } from 'react-router-dom';
export default function NavBar() {
  return (
    <nav className="bg-white shadow mb-6 sticky top-0 z-10">
    <div className="max-w-7xl mx-auto px-4 py-4 flex space-x-6">
      <Link to="/builder" className="text-blue-600 hover:underline font-semibold">
        Form Builder
      </Link>
      <Link to="/renderer" className="text-blue-600 hover:underline font-semibold">
        Form Renderer
      </Link>
      </div>
  </nav>
  )
}
