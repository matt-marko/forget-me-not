import { useState } from 'react';
import { AppBar, List, ListItem, Button, Checkbox, ListItemText } from '@mui/material';
import './App.css';
import { TodoItem } from './todo-item';
import TaskInput from './components/TaskInput';

function App() {
  const [todoItems, setTodoItems] = useState(JSON.parse(localStorage.getItem('todoItems')?? '[]'));

  const generateId = (): number => {
    let existDuplicate = false;

    for (let i = 0; i < todoItems.length; i++) {
      for (let j = 0; j < todoItems.length; j++) {
        if (todoItems[j].id === i) {
          existDuplicate = true;
        }
      }

      if (!existDuplicate) {
        return i;
      } 

      existDuplicate = false;
    }

    return todoItems.length;
  }

  const addTodoItem = (taskName: string) => {
    if (!taskName) {
      return;
    }

    const newTodoItem: TodoItem = {
      id: generateId(),
      task: taskName,
      completed: false,
    };

    const newTodoItems: TodoItem[] = [...todoItems, newTodoItem];

    updateTodoItems(newTodoItems);
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
    console.log(newTodoItems);
    localStorage.setItem('todoItems', JSON.stringify(newTodoItems));
    setTodoItems(newTodoItems);
  }

  return (
    <>
      <AppBar style={{ height: '40px', fontSize: '26px'}}>Forget Me Not</AppBar>
      <TaskInput addTodoItem={addTodoItem} />
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

export default App;
