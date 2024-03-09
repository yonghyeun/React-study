import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { Root, loader as rootloader } from './routes/root';
import Contact from './routes/contacts';
import ErrorPage from './error-page';

/* root route 설정 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootloader,
    children: [{ path: 'contacts/:contactId', element: <Contact /> }],
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
