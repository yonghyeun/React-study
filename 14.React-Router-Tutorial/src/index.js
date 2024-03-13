import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import {
  Root,
  loader as rootloader,
  action as rootaction,
} from './routes/root';
import {
  Contact,
  loader as contactLoader,
  action as contactAction,
} from './routes/contacts';
import { action as deleteAction } from './routes/destory';
import ErrorPage from './error-page';
import { EditContact, action as editAction } from './routes/edit';
import Index from './routes';

/* root route 설정 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootloader,
    action: rootaction,
    children: [
      { index: true, element: <Index /> },
      {
        path: 'contacts/:contactId',
        loader: contactLoader,
        action: contactAction,
        element: <Contact />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'contacts/:contactId/edit',
        loader: contactLoader,
        action: editAction,
        element: <EditContact />,
      },
      {
        path: 'contacts/:contactId/destory',
        action: deleteAction,
        errorElement: <h1> 삭제에 실패했슴둥</h1>,
      },
    ],
  },
]);

/* root node 하위에 렌더링 될 모든 컴포넌트에게 
RouterProvider 를 통해 context 로 router를 건내줌 
*/

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
  <RouterProvider router={router} />,
  // </React.StrictMode>,
);
