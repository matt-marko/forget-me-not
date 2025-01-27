import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@fontsource/roboto/700.css';
import { createBrowserRouter, RouterProvider, useParams } from 'react-router-dom';
import Dashboard from './routes/Dashboard/Dashboard.tsx';
import Taskboard from './routes/Taskboard/Taskboard.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/groups/:groupId',
    element: <TaskboardRouter />,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

// This forces the component to re-render when navigating between groups
function TaskboardRouter() {
  const { groupId } = useParams();
  return <Taskboard key={groupId}/>;
}