import './ItemInput.css';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import AddIcon from '@mui/icons-material/Add';

type ItemInputProps = {
  addItem: Function;
  label: string;
}

function ItemInput(props: ItemInputProps) {
  const [itemInput, setItemInput] = useState('');

  const handleItemInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setItemInput(event.target.value);
  };

  return(
    <Container className='container'>
      <TextField value={itemInput} onChange={handleItemInputChange} label={props.label} variant="outlined"/>
      <Button 
        className='addButton'
        variant="contained"
        onClick={() => {
            props.addItem(itemInput);
            setItemInput('');
        }}
      >
        <AddIcon></AddIcon>
      </Button>
    </Container>
  );
}

export default ItemInput;