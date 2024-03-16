import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Main from './routes/MainPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ErrorPage from './routes/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      { path: 'login', element: null, errorElement: <ErrorPage /> },
      { path: 'MyPage', element: null, errorElement: <ErrorPage /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
