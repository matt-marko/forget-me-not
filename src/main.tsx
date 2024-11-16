import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@fontsource/roboto/700.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './routes/Dashboard.tsx';
import Header from './components/header/Header.tsx';
import Footer from './components/footer/Footer.tsx';
import Taskboard from './routes/Taskboard.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: '/groups/:groupId',
    element: <Taskboard />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
 