import { createContext, Dispatch } from 'react';
import { Group } from '../interfaces/group';

export const GroupsContext = createContext([] as Group[]);
export const GroupsDispatchContext = createContext({} as Dispatch<any>);