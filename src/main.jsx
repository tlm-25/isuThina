import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './index.css'
import './fanta.css'
import { AuthProvider } from './context/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StrictMode>
    
    <AuthProvider>
      <App />

    </AuthProvider>
    
  </StrictMode>,
  
  </BrowserRouter>
  
  
)
