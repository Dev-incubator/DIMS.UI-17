import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App/App';
import reportWebVitals from './reportWebVitals';
import './firebase';
import AuthProvider from './Hooks/useAuth';
import { StoreProvider } from './Hooks/useStore';
import { SettingsProvider } from './Hooks/useSettings';
import { store } from './store/store';

const root = createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <SettingsProvider>
          <AuthProvider>
            <StoreProvider>
              <App />
            </StoreProvider>
          </AuthProvider>
        </SettingsProvider>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>,
);

reportWebVitals();
