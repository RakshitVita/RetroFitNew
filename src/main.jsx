import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import router from './utils/route.jsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from "react-hot-toast";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster position="top-center"
      toastOptions={{
        duration: 5000, // <-- set global duration (in ms)
      }}
    />
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>,
)
