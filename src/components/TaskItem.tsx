import { Checkbox, ListItem, Button, ListItemText } from '@mui/material';

function TaskItem(props: any) {

  return(
    <>
      <ListItem className="todoItem" divider={true}>
        <Checkbox 
          checked={props.task.completed}
          onChange={() => props.completeTask(props.task.id)}
        >
        </Checkbox>
          <ListItemText style={{padding: '0 15px 0 0', minWidth: '150px'}}>{props.task.task}</ListItemText>
        <Button 
          className="deleteTaskButton"
          variant="contained" 
          style={{backgroundColor: 'red', fontSize: '30px', height: '40px'}}
          onClick={() => props.deleteTask(props.task.id)}
        >
          -
        </Button>
      </ListItem>
    </>
  );
}

export default TaskItem;