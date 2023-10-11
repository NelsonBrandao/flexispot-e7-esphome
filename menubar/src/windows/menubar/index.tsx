import React from 'react';
import ReactDOM from 'react-dom/client';
import { Menubar } from './Menubar';
import '../../tailwind.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Menubar />
  </React.StrictMode>,
);
