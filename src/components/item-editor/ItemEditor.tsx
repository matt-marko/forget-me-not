import './ItemEditor.css';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';

type ItemEditorProps = {
  text: string;
  confirmEdit(editedText: string): void;
  label: string;
}

function ItemEditor(props: ItemEditorProps) {
  const handleItemEditorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedItemInput(event.target.value);
  };

  const [editedItemInput, setEditedItemInput] = useState<string>(props.text);

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

export default ItemEditor;