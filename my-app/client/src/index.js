import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Main from './routes/MainPage';
import Index from './routes/Index';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ErrorPage from './routes/ErrorPage';
import { Login } from './routes/Login';
import { Mypage, loader as myPageLoader } from './routes/Mypage';
import { Content, loader as ContentLoader } from './routes/Content';
import { ContextProvider } from './Context/context';

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
      },
      {
        path: 'content/:contentId',
        element: <Content />, // TODO content element 추가하기
        loader: ContentLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: 'MyPage',
        element: <Mypage />,
        loader: myPageLoader,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>,
);
