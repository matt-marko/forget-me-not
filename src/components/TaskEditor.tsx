import TextField from '@mui/material/TextField';
import { Task } from '../task';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';

const buttonStyle: React.CSSProperties = {
  height: '55px',
  fontSize: '20px',
}

type TaskEditorProps = {
  task: Task;
  confirmEdit: Function;
}

function TaskEditor(props: TaskEditorProps) {
  const [editedTaskInput, setEditedTaskInput] = useState(props.task.text);

  const handleTaskEditorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEditedTaskInput(event.target.value);
  };

  return(
    <div>
      <TextField label="Edit Task" onChange={handleTaskEditorChange} value={editedTaskInput} variant="outlined"/>
      <Button 
        style={buttonStyle}
        variant="contained"
        color="success"
        onClick={() => props.confirmEdit(props.task.id, editedTaskInput)}
      >
        <CheckIcon />
      </Button>
    </div>
  );
}

export default TaskEditor;