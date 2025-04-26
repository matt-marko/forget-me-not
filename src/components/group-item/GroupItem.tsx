import './GroupItem.css';
import ListItem  from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import DragHandle from '@mui/icons-material/DragHandle';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TaskItemButton from '../item-button/ItemButton';
import { useContext, useState } from 'react';
import { Group } from '../../interfaces/group';
import { useNavigate } from "react-router-dom";
import { isGroupCompleted } from '../../util/GroupHelpers';
import { GroupsDispatchContext } from '../../services/Context';
import { DispatchDeleteGroup, GroupsReducerActionType } from '../../services/Reducer';

type GroupItemProps = {
  group: Group;
  editGroup(groupId: number): void;
}

export default function GroupItem(props: GroupItemProps) {
  const [isHovered, setHovered] = useState<boolean>(false);
  const navigate = useNavigate();
  const groupsDispatch = useContext(GroupsDispatchContext);

  const {
    attributes,
    listeners, 
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: props.group.id,
  });

  const dragAndDropStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  function getGroupItemTextClassName(): string {
    let className = isGroupCompleted(props.group) ? 'completed-group-item' : '';
    className += ' group-item-text';
    return className;
  };

  function deleteGroup(): void {
    groupsDispatch({
      type: GroupsReducerActionType.DeleteGroup,
      id: props.group.id
    } as DispatchDeleteGroup);
  }

  return(
    <div 
      style={dragAndDropStyle}
      ref={setNodeRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate('/groups/' + props.group.id)}
    >
      <ListItem divider={true} className='group-item'>
        <ListItemText 
          className={getGroupItemTextClassName()}
          spellCheck={false}
        >
          {props.group.name}
        </ListItemText>
        <DragHandle {...attributes} {...listeners} className='drag-handle' />
        <div className='remove-button'>
          <TaskItemButton 
            item={props.group} 
            clickHandler={deleteGroup} 
            display={isHovered}
            colour='red'
          >
            <ClearIcon fontSize={'inherit'}/>
          </TaskItemButton>
        </div>
        <div className='edit-button'>
          <TaskItemButton
            item={props.group} 
            clickHandler={() => { 
              props.editGroup(props.group.id)
            }} 
            display={isHovered}
            colour='blue'
          >
            <EditIcon fontSize={'inherit'}/>
          </TaskItemButton>
        </div>
      </ListItem>
    </div>
  );
}