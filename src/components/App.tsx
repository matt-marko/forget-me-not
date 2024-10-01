import { useState } from 'react';
import { AppBar, List } from '@mui/material';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import './App.css';
import { Task } from '../task';
import TaskInput from './TaskInput';
import TaskItem from './TaskItem';
import Footer from './Footer';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers';

function App() {
  const [todoItems, setTodoItems] = useState(JSON.parse(localStorage.getItem('todoItems')?? '[]'));

  const generateId = (): number => {
    let existDuplicate = false;

    for (let i = 1; i < todoItems.length + 1; i++) {
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

    return todoItems.length + 1;
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event; 

    const oldIndex = todoItems.findIndex((item: Task) => item.id === active.id);
    const newIndex = todoItems.findIndex((item: Task) => item.id === over?.id);

    const newTodoItems: Task[] = arrayMove(todoItems, oldIndex, newIndex);

    updateTodoItems(newTodoItems);
  };

  return (
    <div>
      <AppBar style={{ fontSize: '26px', textAlign: 'center'}}>Forget Me Not</AppBar>
      <div className="mainContent">
        <TaskInput addTodoItem={addTodoItem} />
        <List className="todoItemsList" style={todoItems.length ? { paddingLeft: '20px', paddingRight: '20px'} : {}}>
          <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis, restrictToParentElement]}>
            <SortableContext items={todoItems}>
              {todoItems.map((task: Task) => {
                return <TaskItem key={task.id} id={task.id} task={task} completeTask={completeTask} deleteTask={deleteTask}/>
              })}
            </SortableContext>
          </DndContext>
        </List>
      </div>
      <Footer />
    </div>
  );
}

export default App;
