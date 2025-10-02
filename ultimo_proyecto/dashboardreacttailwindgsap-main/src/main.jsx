import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SidebarProvider } from './context/SidebarContext.jsx'
import { LoadingProvider } from './context/LoadingContext.jsx'

createRoot(document.getElementById('root')).render(
  <SidebarProvider>
    <StrictMode>
      <LoadingProvider>
      <App />
      </LoadingProvider>
    </StrictMode>
  </SidebarProvider>,
)
