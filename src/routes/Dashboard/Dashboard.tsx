import './Dashboard.css';
import { useContext, useState } from 'react';
import { Group } from '../../interfaces/group';
import ItemEditor from '../../components/item-editor/ItemEditor';
import GroupList from '../../components/group-list/GroupList';
import { GroupsContext, GroupsDispatchContext } from '../../services/Context';
import { DispatchEditGroupName, GroupsReducerActionType } from '../../services/Reducer';

function Dashboard() {
  const editGroup = (id: number) => {
    setEditedGroupId(id);
    setIsEditing(true);
  };

  const confirmEdit = (newName: string): void => {
    groupsDispatch({
      type: GroupsReducerActionType.EditGroupName,
      id: editedGroupId,
      newName,
    } as DispatchEditGroupName);

    setIsEditing(false);
  };

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedGroupId, setEditedGroupId] = useState<number>(0);
  
  const groups = useContext(GroupsContext);
  const groupsDispatch = useContext(GroupsDispatchContext);

  return (
    <div className='main-content'>
      {
        isEditing 
          ?
            <ItemEditor
              label='Edit Group'
              text={groups.find((group: Group) => group.id === editedGroupId)!.name} 
              confirmEdit={confirmEdit}
            />
          :
            <GroupList editGroup={editGroup} />
      }
    </div>
  );
}

export default Dashboard;
