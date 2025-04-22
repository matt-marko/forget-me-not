import { ReactNode, useEffect, useReducer } from "react";
import { Group } from "../interfaces/group";
import { groupsReducer } from "./Reducer";
import { GroupsContext, GroupsDispatchContext } from "./Context";

type GroupsProviderProps = {
  children: ReactNode
};

function getGroupsFromLocalStorage(): Group[] {
  const groups = localStorage.getItem('groups') ?? '[]';

  return JSON.parse(groups);
}

export function GroupsProvider(props: GroupsProviderProps) {
  const [groups, dispatch] = useReducer(groupsReducer, getGroupsFromLocalStorage());

  useEffect(() => {
    localStorage.setItem('groups', JSON.stringify(groups));
  }, [groups]);

  return(
    <GroupsContext.Provider value={groups}>
      <GroupsDispatchContext.Provider value={dispatch}>
        {props.children}
      </GroupsDispatchContext.Provider>
    </GroupsContext.Provider>
  );
}