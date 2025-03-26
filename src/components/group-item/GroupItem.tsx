import './GroupItem.css';
import ListItem  from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import DragHandle from '@mui/icons-material/DragHandle';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TaskItemButton from '../item-button/ItemButton';
import { useState } from 'react';
import { Group } from '../../interfaces/group';
import { useNavigate } from "react-router-dom";
import { isGroupCompleted } from '../../services/isGroupCompleted';

type GroupItemProps = {
  group: Group;
  deleteGroup(groupId: number): void;
  editGroup(groupId: number): void;
}

function GroupItem(props: GroupItemProps) {
  const getGroupItemTextClassName = () => {
    let className = isGroupCompleted(props.group) ? 'completed-group-item' : '';
    className += ' group-item-text';
    return className;
  };

  const {
    attributes,
    listeners, 
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: props.group.id,
  });

  const [isHovered, setHovered] = useState<boolean>(false);
  const navigate = useNavigate();

  const dragAndDropStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
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
            clickHandler={() => props.deleteGroup(props.group.id)} 
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

export default GroupItem;