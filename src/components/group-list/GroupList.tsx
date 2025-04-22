import './GroupList.css';
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import ItemInput from "../item-input/ItemInput";
import List from "@mui/material/List";
import { SortableContext } from "@dnd-kit/sortable";
import { restrictToParentElement, restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { Group } from "../../interfaces/group";
import GroupItem from "../group-item/GroupItem";
import { useContext } from 'react';
import { DispatchAddGroup, DispatchEditGroupOrder, GroupsReducerActionType } from '../../services/Reducer';
import { GroupsContext, GroupsDispatchContext } from '../../services/Context';

type GroupListProps = {
  editGroup(groupId: number): void;
}

function GroupList(props: GroupListProps) {
  const getGroupsListClass = (): string => {
    return groups.length ? 'group-list extra-padding' : 'group-list';
  };

  const addGroup = (groupName: string): void => {
    if (!groupName) {
      return;
    }

    groupsDispatch({
      groupName,
      type: GroupsReducerActionType.AddGroup,
    } as DispatchAddGroup);
  };

  const updateGroupsAfterDragEnd = (dragEndEvent: DragEndEvent): void => {
    groupsDispatch({
      type: GroupsReducerActionType.EditGroupOrder,
      dragEndEvent,
      groups,
    } as DispatchEditGroupOrder);
  }

  const groups = useContext(GroupsContext);
  const groupsDispatch = useContext(GroupsDispatchContext);

  return (
    <div>
      <ItemInput addItem={addGroup} label={'Add Group'} />
      <List className={getGroupsListClass()}>
        <DndContext 
          onDragEnd={updateGroupsAfterDragEnd}
          modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        >
          <SortableContext items={groups}>
            {groups.map((group: Group) => {
              return (
                <GroupItem
                  key={group.id}
                  group={group}
                  editGroup={props.editGroup}
                />
              );
            })}
          </SortableContext>
        </DndContext>
      </List>
    </div>
  );
}

export default GroupList;