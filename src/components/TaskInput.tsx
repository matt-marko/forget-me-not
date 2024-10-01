import { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function TaskInput(props: any) {
  const [taskInput, setTaskInput] = useState('');

  const handleTodoInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTaskInput(event.target.value);
  };

  return(
    <>
      <Container style={{ marginBottom: '5px' }}>
        <TextField value={taskInput} onChange={handleTodoInputChange} label="Task" variant="outlined"/>
        <Button 
          style={{ height: '55px', fontSize: '30px' }}
          className="addTodoButton" 
          onClick={() => {
              props.addTodoItem(taskInput);
              setTaskInput('');
          }}
          variant="contained"
        >
          <AddIcon></AddIcon>
        </Button>
      </Container>
    </>
  );
}

export default TaskInput;