import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import AddIcon from '@mui/icons-material/Add';

const containerStyle: React.CSSProperties = {
  marginBottom: '5px',
};

const buttonStyle: React.CSSProperties = {
  height: '55px',
  fontSize: '30px',
}

type TaskInputProps = {
  addTask: Function;
}

function TaskInput(props: TaskInputProps) {
  const [taskInput, setTaskInput] = useState('');

  const handleTaskInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTaskInput(event.target.value);
  };

  return(
    <Container style={containerStyle}>
      <TextField value={taskInput} onChange={handleTaskInputChange} label="Task" variant="outlined"/>
      <Button 
        style={buttonStyle}
        variant="contained"
        onClick={() => {
            props.addTask(taskInput);
            setTaskInput('');
        }}
      >
        <AddIcon></AddIcon>
      </Button>
    </Container>
  );
}

export default TaskInput;