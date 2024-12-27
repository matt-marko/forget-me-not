import { Task } from "./task";

export interface Group {
  id: number;
  name: string;
  tasks: Task[];
}