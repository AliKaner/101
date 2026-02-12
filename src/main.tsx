import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { WinnerProvider } from './context/WinnerContext.tsx';
import WinnerOverlay from './components/WinnerOverlay';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WinnerProvider>
      <App />
      <WinnerOverlay />
    </WinnerProvider>
  </StrictMode>
);
