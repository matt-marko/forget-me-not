import { useState } from 'react';
import List from '@mui/material/List';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { Task } from '../task';
import TaskInput from './TaskInput';
import TaskItem from './TaskItem';
import Footer from './Footer';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers';
import Header from './Header';

const mainContentStyle: React.CSSProperties = {
  margin: '0 auto',
  textAlign: 'center',
};

function App() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks') ?? '[]'));

  const generateId = (): number => {
    let existDuplicate = false;

    for (let i = 1; i < tasks.length + 1; i++) {
      for (let j = 0; j < tasks.length; j++) {
        if (tasks[j].id === i) {
          existDuplicate = true;
        }
      }

      if (!existDuplicate) {
        return i;
      } 

      existDuplicate = false;
    }

    return tasks.length + 1;
  }

  const getTaskListStyle = (): React.CSSProperties => {
    const style: React.CSSProperties = {
      display: 'inline-flex',
      flexDirection: 'column',
      backgroundColor: 'lightcyan',
      borderRadius: '10px',
      maxHeight: '70vh',
      overflow: 'auto',
    };

    if (tasks.length) {
      style.paddingLeft = '20px';
      style.paddingRight = '20px';
    }

    return style;
  };

  const addTask = (taskName: string): void => {
    if (!taskName) {
      return;
    }

    const newTask: Task = {
      id: generateId(),
      text: taskName,
      completed: false,
    };

    const newTasks: Task[] = [...tasks, newTask];

    updateTasks(newTasks);
  };

  const completeTask = (id: number): void => {
    const completedItem: Task | undefined = tasks.find((item: Task) => item.id === id);

    if (completedItem) {
      if (completedItem.completed) {
        completedItem.completed = false;
      } else {
        completedItem.completed = true;
      }

      const newTasks: Task[] = [...tasks];
  
      updateTasks(newTasks);
    }
  };

  const deleteTask = (id: number): void => {
    const remainingItems: Task[] = tasks.filter((item: Task) => item.id !== id);
    updateTasks(remainingItems);
  };

  // TODO: implement?
  const editTask = (id: number): void => {

  }

  const updateTasks = (newTasks: Task[]): void => {
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    setTasks(newTasks);
  }

  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event; 

    const oldIndex = tasks.findIndex((item: Task) => item.id === active.id);
    const newIndex = tasks.findIndex((item: Task) => item.id === over?.id);

    const newTasks: Task[] = arrayMove(tasks, oldIndex, newIndex);

    updateTasks(newTasks);
  };

  return (
    <div>
      <Header />
      <div style={mainContentStyle}>
        <TaskInput addTask={addTask} />
        <List style={getTaskListStyle()}>
          <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis, restrictToParentElement]}>
            <SortableContext items={tasks}>
              {tasks.map((task: Task) => {
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
