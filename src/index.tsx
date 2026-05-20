import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

// set default zoom on page load
// document.body.style.zoom = 1.0;
// const scale = 'scale(1)';
// document.body.style.webkitTransform = scale;
// document.body.style.msTransform = scale;
// document.body.style.transform = scale;

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
