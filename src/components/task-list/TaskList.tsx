import './TaskList.css';
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import ItemInput from "../item-input/ItemInput";
import List from "@mui/material/List";
import { SortableContext } from "@dnd-kit/sortable";
import { restrictToParentElement, restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { Group } from "../../interfaces/group";
import { Task } from '../../interfaces/task';
import UndoIcon from '@mui/icons-material/Undo';
import Button from '@mui/material/Button';
import TaskItem from '../task-item/TaskItem';
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { GroupsContext, GroupsDispatchContext } from '../../services/Context';
import { DispatchAddTask, DispatchCompleteTask, DispatchDeleteTask, DispatchEditTaskOrder, GroupsReducerActionType } from '../../services/Reducer';

type TasksListProps = {
  groupId: number;
  tasks: Task[];
  editTask: (id: number) => void;
}

export default function TaskList(props: TasksListProps) {
  const navigate = useNavigate();
  const groups = useContext(GroupsContext);
  const groupsDispatch = useContext(GroupsDispatchContext);

  const currentGroup = getCurrentGroup();

  function getTaskListClass(): string {
    return props.tasks.length ? 'task-list extra-padding' : 'task-list';
  };

  function getCurrentGroup(): Group {
    const currentGroup: Group | undefined = groups.find((group: Group) => group.id === props.groupId);
    return currentGroup!;
  }

  function addTask(taskText: string): void {
    if (!taskText) {
      return;
    }

    groupsDispatch({
      type: GroupsReducerActionType.AddTask,
      groupId: currentGroup.id,
      taskText,
    } as DispatchAddTask);
  };

  function completeTask(taskId: number): void {
    groupsDispatch({
      type: GroupsReducerActionType.CompleteTask,
      taskId,
      groupId: currentGroup.id,
    } as DispatchCompleteTask);
  }

  function deleteTask(taskId: number): void {
    groupsDispatch({
      type: GroupsReducerActionType.DeleteTask,
      taskId,
      groupId: currentGroup.id,
    } as DispatchDeleteTask);
  };

  function updateTasksAfterDragEnd(dragEndEvent: DragEndEvent): void {
    groupsDispatch({
      type: GroupsReducerActionType.EditTaskOrder,
      dragEndEvent,
      tasks: props.tasks,
      groupId: currentGroup.id,
    } as DispatchEditTaskOrder);
  }

  return (
    <div>
      <div className='tasks-title'>
        <Button onClick={() => navigate('/')}>
          <UndoIcon />
        </Button>
        <h1>{currentGroup.name}</h1>
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