import './Taskboard.css';
import { useState } from 'react';
import List from '@mui/material/List';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { Task } from '../../interfaces/task';
import ItemInput from '../../components/item-input/ItemInput';
import TaskItem from '../../components/task-item/TaskItem';
import Footer from '../../components/footer/Footer';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers';
import Header from '../../components/header/Header';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { Group } from '../../interfaces/group';
import ItemEditor from '../../components/item-editor/ItemEditor';
import UndoIcon from '@mui/icons-material/Undo';
import { Button } from '@mui/material';

function Taskboard() {
  const getCurrentGroup = (): Group => {
    const groups: Group[] = JSON.parse(localStorage.getItem('groups') ?? '[]');
    const currentGroup: Group | undefined = groups.find((group: Group) => group.id === parseInt(groupId!));
    return currentGroup!;
  }

  const { groupId } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(getCurrentGroup().tasks);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskId, setEditedTaskId] = useState(0);

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

  const editTask = (id: number) => {
    setEditedTaskId(id);
    setIsEditing(true);
  };

  const confirmEdit = (newText: string): void => {
    const taskToEdit: Task | undefined = tasks.find((item: Task) => item.id === editedTaskId);

    if (taskToEdit) {
      taskToEdit.text = newText;

      const newTasks: Task[] = [...tasks];
      updateTasks(newTasks);
    }

    setIsEditing(false);
  }

  const updateTasks = (newTasks: Task[]): void => {
    const groups = JSON.parse(localStorage.getItem('groups')!);
    const currentGroup = groups.find((group: Group) => group.id === parseInt(groupId!));
    currentGroup.tasks = newTasks;
    localStorage.setItem('groups', JSON.stringify(groups));
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
      <Header description={getCurrentGroup().name}></Header>
      <div className="main-content">
        {
          isEditing
            ? 
              <ItemEditor 
                label="Add Task"
                text={tasks.find((task: Task) => task.id === editedTaskId)!.text}
                confirmEdit={confirmEdit}
              /> 
            :
              <div>
                <div className="tasks-title">
                  <Button className="back-button" onClick={() => navigate('/')}>
                    <UndoIcon />
                  </Button>
                  <h1 className="current-group-text">{getCurrentGroup().name}</h1>
                </div>
                <ItemInput addItem={addTask} label={'Add Task'} />
                <List style={getTaskListStyle()}>
                  <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis, restrictToParentElement]}>
                    <SortableContext items={tasks}>
                      {tasks.map((task: Task) => {
                        return (
                          <TaskItem
                            key={task.id}
                            task={task}
                            completeTask={completeTask}
                            deleteTask={deleteTask}
                            editTask={editTask}
                          />
                        );
                      })}
                    </SortableContext>
                  </DndContext>
                </List>
              </div>
        }
      </div>
      <Footer></ Footer>
    </div>
  );
}

export default Taskboard;
