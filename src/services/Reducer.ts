import { DragEndEvent } from "@dnd-kit/core";
import { Group } from "../interfaces/group";
import { generateId } from "../util/Id";
import { getNewItemsAfterDragEnd } from "../util/DragAndDropHelpers";
import { Task } from "../interfaces/task";
import { findGroupById, getNewGroupsAfterInsertingTasksToGroup, getTaskInGroupWithId } from "../util/GroupHelpers";

export enum GroupsReducerActionType {
  AddGroup = 'Add-Group',
  EditGroupName = 'Edit-Group-Name',
  EditGroupOrder = 'Edit-Group-Order',
  DeleteGroup = 'Delete-Group',

  AddTask = 'Add-Task',
  EditTaskText = 'Edit-Task-Text',
  EditTaskOrder = 'Edit-Task-Order',
  CompleteTask = 'Complete-Task',
  DeleteTask = 'Delete-Task',

  SetAllGroups = 'Set-All-Groups',
};

export type DispatchAddGroup = {
  type: typeof GroupsReducerActionType.AddGroup;
  groupName: string;
}

export type DispatchEditGroupName = {
  type: typeof GroupsReducerActionType.EditGroupName;
  id: number;
  newName: string;
}

export type DispatchEditGroupOrder = {
  type: typeof GroupsReducerActionType.EditGroupOrder;
  dragEndEvent: DragEndEvent;
  groups: Group[];
}

export type DispatchDeleteGroup = {
  type: typeof GroupsReducerActionType.DeleteGroup;
  id: number;
}

export type DispatchAddTask = {
  type: typeof GroupsReducerActionType.AddTask;
  groupId: number;
  taskText: string;
}

export type DispatchEditTaskText = {
  type: typeof GroupsReducerActionType.EditTaskText;
  groupId: number;
  taskId: number;
  newText: string;
}

export type DispatchEditTaskOrder = {
  type: typeof GroupsReducerActionType.EditTaskOrder;
  groupId: number;
  dragEndEvent: DragEndEvent;
  tasks: Task[];
}

export type DispatchCompleteTask = {
  type: typeof GroupsReducerActionType.CompleteTask;
  groupId: number;
  taskId: number;
}

export type DispatchDeleteTask = {
  type: typeof GroupsReducerActionType.DeleteTask;
  groupId: number;
  taskId: number;
}

export type DispatchSetAllGroups = {
  type: typeof GroupsReducerActionType.SetAllGroups;
  groups: Group[]; 
}

export type DispatchAction = 
  DispatchAddGroup | 
  DispatchDeleteGroup |
  DispatchEditGroupOrder |
  DispatchEditGroupName |
  DispatchAddTask |
  DispatchEditTaskText | 
  DispatchEditTaskOrder |
  DispatchCompleteTask |
  DispatchDeleteTask |
  DispatchSetAllGroups;

export function groupsReducer(groups: Group[], action: DispatchAction): Group[] {
  switch(action.type) {
    case GroupsReducerActionType.AddGroup: {
      const newGroups = [
        ...groups,
        {
          id: generateId(groups),
          name: action.groupName,
          tasks: [],
        },
      ];

      return newGroups;
    }

    case GroupsReducerActionType.EditGroupName: {
      const groupToEdit: Group | undefined = groups.find((item: Group) => item.id === action.id);

      if (groupToEdit) {
        groupToEdit.name = action.newName;
        const newGroups: Group[] = [...groups];
        return newGroups;
      }
  
      throw new Error(`Group with id ${action.id} not found.`);
    }

    case GroupsReducerActionType.EditGroupOrder: {
      const newGroups: Group[] = getNewItemsAfterDragEnd(action.dragEndEvent, action.groups) as Group[];
  
      return newGroups;
    }

    case GroupsReducerActionType.DeleteGroup: {
      const idToDelete = action.id;

      const newGroups = groups.filter(group => group.id !== idToDelete);

      return newGroups;
    }

    case GroupsReducerActionType.AddTask: {
      const groupForTask = findGroupById(groups, action.groupId);

      const newTask: Task = {
        id: generateId(groupForTask.tasks),
        text: action.taskText,
        completed: false,
      };
  
      const newTasks: Task[] = [...groupForTask.tasks, newTask];

      const updatedGroup: Group = {
        ...groupForTask,
        tasks: newTasks,
      }

      const newGroups = groups.map((group: Group) => {
        if (group.id === action.groupId) {
          return updatedGroup;
        } else {
          return group;
        }
      });

      return newGroups;
    }

    case GroupsReducerActionType.EditTaskText: {
      const groupOfTask = findGroupById(groups, action.groupId);

      const taskToEdit = getTaskInGroupWithId(groupOfTask, action.taskId);

      const updatedTask: Task = {...taskToEdit, text: action.newText};

      const newTasks: Task[] = structuredClone(groupOfTask.tasks);
      const taskIndex = newTasks.findIndex((task: Task) => task.id === updatedTask.id);
      newTasks[taskIndex] = updatedTask;
  
      return getNewGroupsAfterInsertingTasksToGroup(groups, action.groupId, newTasks);
    }

    case GroupsReducerActionType.EditTaskOrder: {
      const newTasks: Task[] = getNewItemsAfterDragEnd(action.dragEndEvent, action.tasks) as Task[];
  
      return getNewGroupsAfterInsertingTasksToGroup(groups, action.groupId, newTasks);
    }

    case GroupsReducerActionType.CompleteTask: {
      const groupOfTask = findGroupById(groups, action.groupId);

      const completedTask = getTaskInGroupWithId(groupOfTask, action.taskId);

      let updatedTask: Task;
      if (completedTask.completed) {
        updatedTask = {...completedTask, completed: false};
      } else {
        updatedTask = {...completedTask, completed: true};
      }
  
      const newTasks: Task[] = structuredClone(groupOfTask.tasks);
      const taskIndex = newTasks.findIndex((task: Task) => task.id === updatedTask.id);
      newTasks[taskIndex] = updatedTask;
  
      return getNewGroupsAfterInsertingTasksToGroup(groups, action.groupId, newTasks);
    }

    case GroupsReducerActionType.DeleteTask: {
      const groupOfTask = findGroupById(groups, action.groupId);

      const idOftaskToDelete: number | undefined = 
        groupOfTask?.tasks.find((task: Task) => task.id === action.taskId)?.id;

      let newTasks: Task[] = structuredClone(groupOfTask.tasks);
      newTasks = newTasks.filter((task: Task) => task.id !== idOftaskToDelete);

      return getNewGroupsAfterInsertingTasksToGroup(groups, action.groupId, newTasks);
    }

    case GroupsReducerActionType.SetAllGroups: {
      return action.groups;
    }

    default:
      throw new Error(`Unrecognized groups reducer action type: ${action}`);
  }
} 