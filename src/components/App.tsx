import { useState } from 'react';
import { AppBar, List } from '@mui/material';
import './App.css';
import { Task } from '../task';
import TaskInput from './TaskInput';
import TaskItem from './TaskItem';

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

    const newTodoItem: Task = {
      id: generateId(),
      task: taskName,
      completed: false,
    };

    const newTodoItems: Task[] = [...todoItems, newTodoItem];

    updateTodoItems(newTodoItems);
  };

  const completeTask = (id: number) => {
    const completedItem: Task | undefined = todoItems.find((item: Task) => item.id === id);

    if (completedItem) {
      if (completedItem.completed) {
        completedItem.completed = false;
      } else {
        completedItem.completed = true;
      }

      const newTodoItems: Task[] = [...todoItems];
  
      updateTodoItems(newTodoItems);
    }
  };

  const deleteTask = (id: number) => {
    const remainingItems: Task[] = todoItems.filter((item: Task) => item.id !== id);
    updateTodoItems(remainingItems);
  };

  const updateTodoItems = (newTodoItems: Task[]) => {
    localStorage.setItem('todoItems', JSON.stringify(newTodoItems));
    setTodoItems(newTodoItems);
  }

  return (
    <>
      <AppBar style={{ height: '40px', fontSize: '26px'}}>Forget Me Not</AppBar>
      <TaskInput addTodoItem={addTodoItem} />
      <List className="TodoItemsList">
        {todoItems.map((task: Task) => {
          return <TaskItem key={task.id} task={task} completeTask={completeTask} deleteTask={deleteTask}/>
        })}
      </List>
    </>
  );
}

export default App;
