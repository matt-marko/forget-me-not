import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@fontsource/roboto/700.css';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Dashboard from './routes/Dashboard/Dashboard.tsx';
import Taskboard from './routes/Taskboard/Taskboard.tsx';
import Header from './components/header/Header.tsx';
import Footer from './components/footer/Footer.tsx';
import GroupDrawer from './components/group-drawer/GroupDrawer.tsx';
import ModalWrapper, { ModalType } from './components/modal/modal-wrapper/ModalWrapper.tsx';
import { GroupsProvider } from './services/GroupsProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);

  return (
    <BrowserRouter>
      <GroupsProvider>
        <Header 
          description=''
          handleMenuIconClick={() => setIsDrawerOpen(true)}
          handleExportButtonClick={() => setActiveModal(ModalType.Export)}
          handleImportButtonClick={() => setActiveModal(ModalType.Import)}
        />
        <GroupDrawer
          isOpen={isDrawerOpen}
          handleCloseDrawerClick={() => setIsDrawerOpen(false)}
        />
        <ModalWrapper
          open={activeModal !== null}
          modalType={activeModal}
          handleClose={() => setActiveModal(null)}
        />
        <Routes>
          <Route 
            path='/'
            element={<Dashboard />}
          />
          <Route 
            path='/groups/:groupId'
            element={<TaskboardRouter />}
          />
        </Routes>
        <Footer />
      </GroupsProvider>
    </BrowserRouter>
  )
}

// This forces the component to re-render when navigating between groups
function TaskboardRouter() {
  const { groupId } = useParams();
  return <Taskboard key={groupId}/>;
}