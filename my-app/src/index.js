import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Main from './routes/MainPage';
import Index from './routes/Index';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ErrorPage from './routes/ErrorPage';
import { Login, action as loginAction } from './routes/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      {
        path: 'Login',
        element: <Login />,
        errorElement: <ErrorPage />,
        action: loginAction,
      },
      { path: 'MyPage', element: null, errorElement: <ErrorPage /> },
      {
        path: 'content/:contentId',
        element: null, // TODO content element 추가하기
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
