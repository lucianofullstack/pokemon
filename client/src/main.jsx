import React from 'react'
import { createRoot } from 'react-dom/client';
import App from './App.jsx'
import store from '%store%'
import { Provider } from 'react-redux'
import '@/css/main.css'

const 
root = document.createElement('div'),
 dom = createRoot(root)
 dom.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
)
document.body.appendChild(root)
