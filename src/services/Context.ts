import { createContext, Dispatch } from 'react';
import { Group } from '../interfaces/group';
import { DispatchAction } from './Reducer';

export const GroupsContext = createContext([] as Group[]);
export const GroupsDispatchContext = createContext({} as Dispatch<DispatchAction>);