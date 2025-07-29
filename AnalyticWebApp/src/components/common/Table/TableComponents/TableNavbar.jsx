import React, { useState } from "react";
import { Link } from "react-router-dom";  

export default function Navbar({ title }) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full  border-gray-50 shadow- mb-3">
      {/* Top Bar */}
    
      <div className="flex justify-between items-center px-1 py-4">
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}

       

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      
    </nav>
  );
}
