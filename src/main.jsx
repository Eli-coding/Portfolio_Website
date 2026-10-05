import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import '@fontsource/lexend/400.css';
import '@fontsource/lexend/500.css';
import '@fontsource/lexend/700.css';
import './i18n';
import { ThemeModeProvider } from './context/ThemeContext';
import App from './App';
import { ROUTER_FUTURE } from './routerFuture';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeModeProvider>
      <HashRouter future={ROUTER_FUTURE}>
        {/* Suspense waits for the lazily loaded translation file. */}
        <Suspense fallback={null}>
          <App />
        </Suspense>
      </HashRouter>
    </ThemeModeProvider>
  </React.StrictMode>,
);
