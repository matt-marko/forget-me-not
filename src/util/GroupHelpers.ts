import { Group } from "../interfaces/group"
import { Task } from "../interfaces/task";

export function isGroupCompleted(group: Group): boolean {
  return group.tasks.length > 0 && group.tasks.every(task => task.completed);
};

export function getNewGroupsAfterInsertingTasksToGroup(
  groups: Group[],
  groupId: number,
  newTasks: Task[],
): Group[] {
  const newGroups = structuredClone(groups);
  const groupIndex = newGroups.findIndex((group: Group) => group.id === groupId);
  newGroups[groupIndex].tasks = newTasks;

  return newGroups;
}

export function getTaskInGroupWithId(groupOfTask: Group, taskId: number): Task {
  const foundTask: Task | undefined = 
    groupOfTask?.tasks.find((task: Task) => task.id === taskId);

  if (foundTask === undefined) {
    throw new Error(`Task with id ${taskId} in group ${groupOfTask.id} not found.`);
  }

  return foundTask;
}

export function findGroupById(allGroups: Group[], groupId: number){
  const groupOfTask = allGroups.find((group: Group) => group.id === groupId);

  if (groupOfTask === undefined) {
    throw new Error(`Group for task not found.`);
  }

  return groupOfTask;
}