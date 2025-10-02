import React from 'react'
import { useSidebar } from '../../context/SidebarContext';

const Header = () => {
    const { isSidebarOpen, toggleSidebar, isMobile } = useSidebar();
  return (
    <header className="
      bg-white shadow-sm h-16 fixed top-0 left-0 right-0 z-20 
      flex items-center justify-between px-6
    ">
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-lg"
          aria-label="Toggle sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        <h2 className="text-lg font-semibold text-gray-800 hidden md:block">
          Dashboard Overview
        </h2>
      </div>

      <div className="flex items-center space-x-4">
        <span className="text-gray-600">👤 Admin</span>
      </div>
    </header>
  )
}

export default Header