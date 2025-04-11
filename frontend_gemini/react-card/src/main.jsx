import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthApp from './auth/AuthApp.jsx'; 


//When test the Main component, comment out the below code and uncomment the current code

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )




//When test the AuthApp component, comment out the above code and uncomment the below code

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthApp />
  </StrictMode>
);
