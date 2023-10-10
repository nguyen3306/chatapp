import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="108296051331-f4t2kq6fgheevjs1b05iamtfbr058sti.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
