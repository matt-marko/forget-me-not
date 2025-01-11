import './Dashboard.css';
import { useState } from 'react';
import { Group } from '../../interfaces/group';
import ItemEditor from '../../components/item-editor/ItemEditor';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import GroupList from '../../components/group-list/GroupList';

function Dashboard() {
  const [groups, setGroups] = useState(JSON.parse(localStorage.getItem('groups') ?? '[]'));
  const [isEditing, setIsEditing] = useState(false);
  const [editedGroupId, setEditedGroupId] = useState(0);

  const editGroup = (id: number) => {
    setEditedGroupId(id);
    setIsEditing(true);
  };

  const confirmEdit = (newName: string): void => {
    const groupToEdit: Group | undefined = groups.find((item: Group) => item.id === editedGroupId);

    if (groupToEdit) {
      groupToEdit.name = newName;

      const newGroups: Group[] = [...groups];
      updateGroups(newGroups);
    }

    setIsEditing(false);
  }

  const updateGroups = (newGroups: Group[]): void => {
    localStorage.setItem('groups', JSON.stringify(newGroups));
    setGroups(newGroups);
  }

  return (
    <div>
      <Header description=''></Header>
      <div className='main-content'>
        {
          isEditing 
            ?
              <ItemEditor
                label='Edit Group'
                text={groups.find((group: Group) => group.id === editedGroupId).name} 
                confirmEdit={confirmEdit}
              />
            :
              <GroupList
                groups={groups}
                updateGroups={updateGroups}
                editGroup={editGroup} 
              />
        }
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Dashboard;
