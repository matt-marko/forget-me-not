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

const listItemTextStyle: React.CSSProperties = {
  padding: '0 15px 0 0',
  minWidth: '150px'
};

const dragHandleStyle: React.CSSProperties = {
  marginRight: '20px',
  cursor: 'ns-resize',
};

const removeButtonStyle: React.CSSProperties = {
  position: 'absolute',
  right: '10px',
  top: '5px',
}

const editButtonStyle: React.CSSProperties = {
  position: 'absolute',
  right: '10px',
  bottom: '5px',
}

type GroupItemProps = {
  group: Group;
  completeTask: Function;
  deleteTask: Function;
  editTask: Function;
}

function GroupItem(props: GroupItemProps) {
  const {
    attributes,
    listeners, 
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: props.group.id,
  });

  const [isHovered, setHovered] = useState(false);

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
          spellCheck={false}
          style={listItemTextStyle}
        >
          {props.group.name}
        </ListItemText>
        <DragHandle {...attributes} {...listeners} style={dragHandleStyle}></DragHandle>
        <div style={removeButtonStyle}>
          <TaskItemButton 
            item={props.group} 
            clickHandler={() => props.deleteTask(props.group.id)} 
            display={isHovered}
            colour='red'
          >
            <ClearIcon fontSize={'6px' as any}/>
          </TaskItemButton>
        </div>
        <div style={editButtonStyle}>
          <TaskItemButton
            item={props.group} 
            clickHandler={() => { 
              props.editTask(props.group.id)
            }} 
            display={isHovered}
            colour='blue'
          >
            <EditIcon fontSize={'6px' as any}/>
          </TaskItemButton>
        </div>
      </ListItem>
    </div>
  );
}

export default GroupItem;