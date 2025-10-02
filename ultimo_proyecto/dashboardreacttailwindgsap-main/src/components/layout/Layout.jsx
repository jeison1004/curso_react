import Aside from './Aside';
import Header from './Header';
import Footer from './Footer';
import { useSidebar } from '../../context/SidebarContext';

const Layout = ({children}) => {
    const { isSidebarOpen, isMobile } = useSidebar();
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Sidebar */}
      <Aside />

      {/* Contenido Principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main
          className={`
            flex-1 p-6 pt-28 overflow-auto
            
            transition-all duration-300 ease-in-out
            ${isSidebarOpen && !isMobile ? 'md:pl-64' : ''}
          `}
        >
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}

export default Layout