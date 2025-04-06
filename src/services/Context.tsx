import { createContext, ReactNode, useReducer } from 'react';
import { Group } from '../interfaces/group';

const GroupsContext = createContext(getGroupsFromLocalStorage());
const GroupsDispatchContext = createContext(groupsReducer);

type GroupsProviderProps = {
  children: ReactNode
}

function GroupsProvider(props: GroupsProviderProps) {
  const [groups, dispatch] = useReducer(groupsReducer, getGroupsFromLocalStorage());

  return(
    <GroupsContext.Provider value={groups}>
      <GroupsDispatchContext.Provider value={dispatch}>
        {props.children}
      </GroupsDispatchContext.Provider>
    </GroupsContext.Provider>
  );
}

function getGroupsFromLocalStorage(): Group[] {
  const groups = localStorage.getItem('groups') ?? '{}';

  return JSON.parse(groups);
}

function groupsReducer(groups: Group[], action: string): Group[] {
  
}

export {
  GroupsProvider,
};