import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from '@/App';
import '@/styles/index.css';

const rootElement = document.getElementById('root');

if (rootElement === null) {
  throw new Error('No se encontró el elemento #root');
}

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
