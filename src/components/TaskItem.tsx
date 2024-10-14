import Checkbox from '@mui/material/Checkbox';
import ListItem  from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import DragHandle from '@mui/icons-material/DragHandle';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '../task';
import TaskItemButton from './TaskItemButton';
import { useState } from 'react';

const listItemTextStyle: React.CSSProperties = {
  padding: '0 15px 0 0',
  minWidth: '150px'
};

const taskItemStyle: React.CSSProperties = {
  backgroundColor: 'lightblue',
  borderRadius: '10px',
  margin: '2px 0 2px 0',
}

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

type TaskItemProps = {
  task: Task;
  completeTask: Function;
  deleteTask: Function;
  editTask: Function;
}

function TaskItem(props: TaskItemProps) {
  const {
    attributes,
    listeners, 
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: props.task.id,
  });

  const [isHovered, setHovered] = useState(false);

  const dragAndDropStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return(
    <div style={dragAndDropStyle} ref={setNodeRef} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <ListItem style={taskItemStyle} divider={true}>
        <Checkbox 
          checked={props.task.completed}
          onChange={() => props.completeTask(props.task.id)}
        >
        </Checkbox>
        <ListItemText 
          spellCheck={false}
          style={listItemTextStyle}
        >
          {props.task.text}
        </ListItemText>
        <DragHandle {...attributes} {...listeners} style={dragHandleStyle}></DragHandle>
        <div style={removeButtonStyle}>
          <TaskItemButton 
            task={props.task} 
            clickHandler={() => props.deleteTask(props.task.id)} 
            display={isHovered}
            colour='red'
          >
            <ClearIcon fontSize={'6px' as any}/>
          </TaskItemButton>
        </div>
        <div style={editButtonStyle}>
          <TaskItemButton
            task={props.task} 
            clickHandler={() => props.editTask(props.task.id)} 
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

export default TaskItem;