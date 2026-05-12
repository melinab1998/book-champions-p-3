import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from './components/services/auth/AuthContextProvider.jsx'
import  ThemeContextProvider  from "./components/services/theme/ThemeContextProvider.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ThemeContextProvider>
  </StrictMode>
)
