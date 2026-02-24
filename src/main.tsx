import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { WinnerProvider } from './context/WinnerContext.tsx';
import WinnerOverlay from './components/WinnerOverlay';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <WinnerProvider>
        <App />
        <WinnerOverlay />
      </WinnerProvider>
    </BrowserRouter>
  </StrictMode>
);
