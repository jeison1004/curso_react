import React from 'react'
import { useSidebar } from '../../context/SidebarContext';
import { Link } from 'react-router-dom';

const Aside = () => {
    const { isSidebarOpen, closeSidebar, isMobile } = useSidebar();
  return (
     <>
      {/* Overlay oscuro para móvil */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={closeSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-30 h-full bg-gray-900 text-white transition-all duration-300 ease-in-out
          ${isSidebarOpen ? 'w-64 translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 md:w-64
        `}
      >
        <div className="p-5 border-b border-gray-700">
          <h1 className="text-xl font-bold truncate">
            {isSidebarOpen ? 'Dashboard Pro' : 'DP'}
          </h1>
        </div>
        <nav className="mt-6">
          <ul>
            <li>
              <Link to={'/dashboard'} href="#" className="block py-3 px-6 hover:bg-gray-800 transition-colors">
                📊 {isSidebarOpen && 'Dashboard'}
              </Link>
            </li>
            <li>
              <Link to={'/analytics'} href="#" className="block py-3 px-6 hover:bg-gray-800 transition-colors">
                📈 {isSidebarOpen && 'Analytics'}
              </Link>
            </li>
             <li>
              <Link to={'/animation'} href="#" className="block py-3 px-6 hover:bg-gray-800 transition-colors">
                🎬 {isSidebarOpen && 'Animación'}
              </Link>
            </li>
            <li>
              <Link to={'/settings'} href="#" className="block py-3 px-6 hover:bg-gray-800 transition-colors">
                ⚙️ {isSidebarOpen && 'Settings'}
              </Link>
            </li>
            <li>
              <Link to={'/testpage'} href="#" className="block py-3 px-6 hover:bg-gray-800 transition-colors">
                ⚙️ {isSidebarOpen && 'TestPage'}
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  )
}

export default Aside