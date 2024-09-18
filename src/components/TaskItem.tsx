import { Checkbox, ListItem, Button, ListItemText } from '@mui/material';
import { useDraggable } from '@dnd-kit/core';

function TaskItem(props: any) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: String(props.id), // dnd-kit does not work with number 0 id
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return(
    <>
      <div style={style} ref={setNodeRef}>
        <ListItem className="todoItem" divider={true}>
          <Checkbox 
            checked={props.task.completed}
            onChange={() => props.completeTask(props.task.id)}
          >
          </Checkbox>
            <ListItemText {...listeners} {...attributes} style={{padding: '0 15px 0 0', minWidth: '150px'}}>{props.task.task}</ListItemText>
          <Button 
            className="deleteTaskButton"
            variant="contained" 
            style={{backgroundColor: 'red', fontSize: '30px', height: '40px'}}
            onClick={() => props.deleteTask(props.task.id)}
          >
            -
          </Button>
        </ListItem>
      </div>
    </>
  );
}

export default TaskItem;