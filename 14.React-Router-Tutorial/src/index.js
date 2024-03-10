import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import {
  Root,
  loader as rootloader,
  action as rootaction,
} from './routes/root';
import { Contact, loader as contactLoader } from './routes/contacts';
import ErrorPage from './error-page';
import { EditContact, action as editAction } from './routes/edit';

/* root route 설정 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootloader,
    action: rootaction,
    children: [
      {
        path: 'contacts/:contactId',
        loader: contactLoader,
        element: <Contact />,
      },
      {
        path: 'contacts/:contactId/edit',
        loader: contactLoader,
        action: editAction,
        element: <EditContact />,
      },
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
