/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './global.css'
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: [
      'Catamaran:100,200,300,400,500,600,700,800,900',
      'Poppins:100,200,300,400,500,600,700,800,900',
      'Inter:100,200,300,400,500,600,700,800,900']
  }
})


ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
