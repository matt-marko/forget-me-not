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
  completeTask(taskId: number): void;
  deleteTask(taskId: number): void;
  editTask(taskId: number): void;
}

export default function TaskItem(props: TaskItemProps) {
  const [isHovered, setHovered] = useState(false);

  const {
    attributes,
    listeners, 
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: props.task.id,
  });

  const dragAndDropStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  function getCompletedClass(completed: boolean): string {
    return completed ? 'completed-task-item' : '';
  }

  return(
    <div style={dragAndDropStyle} 
      ref={setNodeRef} 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <ListItem className='task-item' divider={true}>
        <Checkbox 
          checked={props.task.completed}
          onChange={() => props.completeTask(props.task.id)}
        >
        </Checkbox>
        <ListItemText>
          <div className={`list-item-text ${getCompletedClass(props.task.completed)}`} spellCheck={false}>
            {props.task.text}
          </div>
        </ListItemText>
        <DragHandle {...attributes} {...listeners} className='drag-handle' />
        <div className='remove-button'>
          <TaskItemButton 
            item={props.task} 
            clickHandler={() => props.deleteTask(props.task.id)} 
            display={isHovered}
            colour='red'
          >
            <ClearIcon fontSize={'inherit'}/>
          </TaskItemButton>
        </div>
        <div className='edit-button'>
          <TaskItemButton
            item={props.task} 
            clickHandler={() => props.editTask(props.task.id)} 
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