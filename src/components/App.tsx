import { useState } from 'react';
import { AppBar, List } from '@mui/material';
import { DndContext } from '@dnd-kit/core';
import './App.css';
import { Task } from '../task';
import TaskInput from './TaskInput';
import TaskItem from './TaskItem';
import Footer from './Footer';

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
    <div>
      <AppBar style={{ fontSize: '26px', textAlign: 'center'}}>Forget Me Not</AppBar>
      <div className="mainContent">
        <TaskInput addTodoItem={addTodoItem} />
        <DndContext>
          <List className="todoItemsList" style={todoItems.length ? { paddingLeft: '20px', paddingRight: '20px'} : {}}>
            {todoItems.map((task: Task) => {
              return <TaskItem key={task.id} id={task.id} task={task} completeTask={completeTask} deleteTask={deleteTask}/>
            })}
          </List>
        </DndContext>
      </div>
      <Footer />
    </div>
  );
}

export default App;
