import { Group } from "../interfaces/group"

export const isGroupCompleted = (group: Group): boolean => {
  return group.tasks.length > 0 && group.tasks.every(task => task.completed);
}