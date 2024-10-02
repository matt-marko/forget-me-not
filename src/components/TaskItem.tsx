import { Checkbox, ListItem, Button, ListItemText } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import DragHandle from '@mui/icons-material/DragHandle';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function TaskItem(props: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: props.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return(
    <div style={style} ref={setNodeRef}>
      <ListItem className="todoItem" divider={true}>
        <Checkbox 
          checked={props.task.completed}
          onChange={() => props.completeTask(props.task.id)}
        >
        </Checkbox>
        <ListItemText style={{padding: '0 15px 0 0', minWidth: '150px'}}>{props.task.task}</ListItemText>
        <DragHandle {...attributes} {...listeners} style={{ marginRight: '20px', cursor: 'ns-resize' }}></DragHandle>
        <Button 
          variant="contained" 
          style={{backgroundColor: 'red', height: '40px', width: '10px'}}
          onClick={() => props.deleteTask(props.task.id)}
        >
          <RemoveIcon></RemoveIcon>
        </Button>
      </ListItem>
    </div>
  );
}

export default TaskItem;