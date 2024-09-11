import { useState } from 'react';
import { AppBar, List, ListItem, TextField, Button, Container, Checkbox, ListItemText } from '@mui/material';
import './App.css';
import { TodoItem } from './todo-item';

function App() {
  const [todoInput, setTodoInput] = useState('');
  const [todoItems, setTodoItems] = useState(JSON.parse(localStorage.getItem('todoItems')?? '[]'));

  const handleTodoInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoInput(event.target.value);
  };

  const addTodoItem = () => {
    if (!todoInput) {
      return;
    }

    const newTodoItem: TodoItem = {
      id: todoItems.length + 1,
      task: todoInput,
      completed: false,
    };

    const newTodoItems: TodoItem[] = [...todoItems, newTodoItem];

    updateTodoItems(newTodoItems);
    setTodoInput('');
  };

  const completeTask = (id: number) => {
    const completedItem: TodoItem | undefined = todoItems.find((item: TodoItem) => item.id === id);

    if (completedItem) {
      if (completedItem.completed) {
        completedItem.completed = false;
      } else {
        completedItem.completed = true;
      }

      const newTodoItems: TodoItem[] = [...todoItems];
  
      updateTodoItems(newTodoItems);
    }
  };

  const deleteTask = (id: number) => {
    const remainingItems: TodoItem[] = todoItems.filter((item: TodoItem) => item.id !== id);

    updateTodoItems(remainingItems);
  };

  const updateTodoItems = (newTodoItems: TodoItem[]) => {
    localStorage.setItem('todoItems', JSON.stringify(newTodoItems));
    setTodoItems(newTodoItems);
  }

  return (
    <>
      <AppBar style={{ height: '40px', fontSize: '26px'}}>Archana</AppBar>
      <Container>
        <TextField value={todoInput} onChange={handleTodoInputChange} label="Task" variant="outlined"/>
        <Button 
          style={{ height: '55px', fontSize: '30px' }}
          className="addTodoButton" 
          onClick={addTodoItem}
          variant="contained"
        >
          +
        </Button>
      </Container>
      <List className="TodoItemsList">
        {todoItems.map((todoItem: TodoItem) => {
          return (
            <ListItem key={todoItem.id} className="todoItem" divider={true}>
              <Checkbox 
                checked={todoItem.completed}
                onChange={() => completeTask(todoItem.id)}
              >
              </Checkbox>
              <ListItemText>{todoItem.task}</ListItemText>
              <Button 
                className="deleteTaskButton"
                variant="contained" 
                style={{backgroundColor: 'red', fontSize: '30px', height: '40px'}}
                onClick={() => deleteTask(todoItem.id)}
              >
                -
              </Button>
            </ListItem>
          )
        })}
      </List>
    </>
  );
}

export default App
