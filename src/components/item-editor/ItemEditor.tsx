import './ItemEditor.css';
import TextField from '@mui/material/TextField';
import { useState, ChangeEvent } from 'react';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';

type ItemEditorProps = {
  text: string;
  confirmEdit(editedText: string): void;
  label: string;
}

export default function ItemEditor(props: ItemEditorProps) {
  const [editedItemInput, setEditedItemInput] = useState<string>(props.text);
  
  function handleItemEditorChange(event: ChangeEvent<HTMLInputElement>): void {
    setEditedItemInput(event.target.value);
  };

  return(
    <div>
      <TextField
        autoFocus
        label={props.label}
        onChange={handleItemEditorChange}
        value={editedItemInput}
        variant="outlined"
        onKeyDown={(event) => {
          if(event.key === 'Enter') {
            props.confirmEdit(editedItemInput);
            setEditedItemInput('');
          }
        }}  
      />
      <Button 
        className='editor-button'
        variant='contained'
        color='success'
        onClick={() => props.confirmEdit(editedItemInput)}
      >
        <CheckIcon />
      </Button>
    </div>
  );
}