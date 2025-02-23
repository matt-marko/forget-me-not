import './Dashboard.css';
import { useState } from 'react';
import { Group } from '../../interfaces/group';
import ItemEditor from '../../components/item-editor/ItemEditor';
import GroupList from '../../components/group-list/GroupList';

type DashboardProps = {
  updateGroups(newGroups: Group[]): void;
  groups: Group[];
}

function Dashboard(props: DashboardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedGroupId, setEditedGroupId] = useState(0);

  const editGroup = (id: number) => {
    setEditedGroupId(id);
    setIsEditing(true);
  };

  const confirmEdit = (newName: string): void => {
    const groupToEdit: Group | undefined = props.groups.find((item: Group) => item.id === editedGroupId);

    if (groupToEdit) {
      groupToEdit.name = newName;
      const newGroups: Group[] = [...props.groups];
      props.updateGroups(newGroups);
    }

    setIsEditing(false);
  };

  return (
    <div className='main-content'>
      {
        isEditing 
          ?
            <ItemEditor
              label='Edit Group'
              text={props.groups.find((group: Group) => group.id === editedGroupId)!.name} 
              confirmEdit={confirmEdit}
            />
          :
            <GroupList
              groups={props.groups}
              updateGroups={props.updateGroups}
              editGroup={editGroup} 
            />
      }
    </div>
  );
}

export default Dashboard;
