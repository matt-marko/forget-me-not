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
import { Group } from './interfaces/group.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

function App () {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [groups, setGroups] = useState(JSON.parse(localStorage.getItem('groups') ?? '[]'));

  const updateGroups = (newGroups: Group[]): void => {
    localStorage.setItem('groups', JSON.stringify(newGroups));
    setGroups(newGroups);
  };

  return (
    <>
      <BrowserRouter>
        <Header description='' handleMenuIconClick={() => setIsDrawerOpen(true)} />
        <GroupDrawer
          isOpen={isDrawerOpen}
          groups={groups}
          handleCloseDrawerClick={() => setIsDrawerOpen(false)}
        />
        <Routes>
          <Route 
            path='/'
            element={<Dashboard updateGroups={updateGroups} groups={groups}/>}
          />
          <Route 
            path='/groups/:groupId'
            element={<TaskboardRouter updateGroups={updateGroups} groups={groups}/>}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

type TaskboardProps = {
  updateGroups: Function;
  groups: Group[];
}

// This forces the component to re-render when navigating between groups
function TaskboardRouter(props: TaskboardProps) {
  const { groupId } = useParams();
  return <Taskboard updateGroups={props.updateGroups} groups={props.groups} key={groupId}/>;
}