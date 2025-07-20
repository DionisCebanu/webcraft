import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';
import '@/i18n';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen w-screen bg-background">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
  </div>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={<LoadingSpinner />}>
      <App />
    </Suspense>
  </React.StrictMode>
);