import './TaskItem.css';
import Checkbox from '@mui/material/Checkbox';
import ListItem  from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import DragHandle from '@mui/icons-material/DragHandle';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '../../interfaces/task';
import TaskItemButton from '../item-button/ItemButton';
import { useState } from 'react';

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
      <ListItem className="taskItem" divider={true}>
        <Checkbox 
          checked={props.task.completed}
          onChange={() => props.completeTask(props.task.id)}
        >
        </Checkbox>
        <ListItemText>
          <div className="listItemText" spellCheck={false}>
            {props.task.text}
          </div>
        </ListItemText>
        <DragHandle {...attributes} {...listeners} className="dragHandle"></DragHandle>
        <div className="removeButton">
          <TaskItemButton 
            item={props.task} 
            clickHandler={() => props.deleteTask(props.task.id)} 
            display={isHovered}
            colour='red'
          >
            <ClearIcon fontSize={'6px' as any}/>
          </TaskItemButton>
        </div>
        <div className='editButton'>
          <TaskItemButton
            item={props.task} 
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