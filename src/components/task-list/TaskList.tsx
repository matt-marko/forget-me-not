import './TaskList.css';
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import ItemInput from "../item-input/ItemInput";
import List from "@mui/material/List";
import { SortableContext } from "@dnd-kit/sortable";
import { restrictToParentElement, restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { Group } from "../../interfaces/group";
import { generateId } from "../../services/generateId";
import DragAndDropHelper from "../../services/DragAndDropHelper";
import { Task } from '../../interfaces/task';
import UndoIcon from '@mui/icons-material/Undo';
import Button from '@mui/material/Button';
import TaskItem from '../task-item/TaskItem';
import { useNavigate } from 'react-router';

type TasksListProps = {
  groupId: number;
  tasks: Task[];
  editTask(taskId: number): void;
  updateTasks(newTasks: Task[]): void;
}

function TaskList(props: TasksListProps) {
  const dragAndDropHelper = new DragAndDropHelper(props.tasks);

  const getTaskListClass = (): string => {
    return props.tasks.length ? 'task-list extra-padding' : 'task-list';
  };

  const getCurrentGroup = (): Group => {
    const groups: Group[] = JSON.parse(localStorage.getItem('groups') ?? '[]');
    const currentGroup: Group | undefined = groups.find((group: Group) => group.id === props.groupId);
    return currentGroup!;
  }

  const addTask = (taskName: string): void => {
    if (!taskName) {
      return;
    }

    const newTask: Task = {
      id: generateId(props.tasks),
      text: taskName,
      completed: false,
    };

    const newTasks: Task[] = [...props.tasks, newTask];

    props.updateTasks(newTasks);
  };

  const completeTask = (id: number): void => {
    const completedItem: Task | undefined = props.tasks.find((item: Task) => item.id === id);

    if (completedItem) {
      if (completedItem.completed) {
        completedItem.completed = false;
      } else {
        completedItem.completed = true;
      }

      const newTasks: Task[] = [...props.tasks];
  
      props.updateTasks(newTasks);
    }
  };

  const deleteTask = (id: number): void => {
    const remainingItems: Task[] = props.tasks.filter((item: Task) => item.id !== id);
    props.updateTasks(remainingItems);
  };

  const updateTasksAfterDragEnd = (event: DragEndEvent): void => {
    const newTasks: Task[] = dragAndDropHelper.getNewItemsAfterDragEnd(event) as Task[];
    props.updateTasks(newTasks);
  }

  const navigate = useNavigate();

  return (
    <div>
      <div className='tasks-title'>
        <Button onClick={() => navigate('/')}>
          <UndoIcon />
        </Button>
        <h1>{getCurrentGroup().name}</h1>
      </div>
      <ItemInput addItem={addTask} label={'Add Task'} />
      <List className={getTaskListClass()}>
        <DndContext 
          onDragEnd={updateTasksAfterDragEnd} 
          modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        >
          <SortableContext items={props.tasks}>
            {props.tasks.map((task: Task) => {
              return (
                <TaskItem
                  key={task.id}
                  task={task}
                  completeTask={completeTask}
                  deleteTask={deleteTask}
                  editTask={props.editTask}
                />
              );
            })}
          </SortableContext>
        </DndContext>
      </List>
    </div>
  );
}

export default TaskList;