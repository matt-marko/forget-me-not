import { useState } from 'react';
import { AppBar, TextField, Button, Container } from '@mui/material';

function TaskInput(props: any) {
    const [taskInput, setTaskInput] = useState('');

    const handleTodoInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTaskInput(event.target.value);
    };

    return(
        <>
            <AppBar style={{ height: '40px', fontSize: '26px'}}>Forget Me Not</AppBar>
            <Container>
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
                +
            </Button>
            </Container>
        </>
    );
}

export default TaskInput;