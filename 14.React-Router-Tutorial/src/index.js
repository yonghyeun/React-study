import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Root from './routes/root';
import ErrorPage from './error-page';
import Contact from './contacts';

/* root route 설정 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      // Contact 컴포넌트를 Root 컴포넌트의 하위 컴포넌트로 생성
      { path: 'contacts/:contactId', element: <Contact /> },
    ],
  },
]);

/* root node 하위에 렌더링 될 모든 컴포넌트에게 
RouterProvider 를 통해 context 로 router를 건내줌 
*/

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
