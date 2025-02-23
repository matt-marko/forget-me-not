import './GroupList.css';
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import ItemInput from "../item-input/ItemInput";
import List from "@mui/material/List";
import { SortableContext } from "@dnd-kit/sortable";
import { restrictToParentElement, restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { Group } from "../../interfaces/group";
import GroupItem from "../group-item/GroupItem";
import DragAndDropHelper from "../../services/DragAndDropHelper";
import { generateId } from '../../services/generateId';

type GroupListProps = {
  groups: Group[]
  editGroup(groupId: number): void;
  updateGroups(newGroups: Group[]): void;
}

function GroupList(props: GroupListProps) {
  const dragAndDropHelper = new DragAndDropHelper(props.groups);

  const getGroupsListClass = (): string => {
    return props.groups.length ? 'group-list extra-padding' : 'group-list';
  };

  const addGroup = (groupName: string): void => {
    if (!groupName) {
      return;
    }

    const newGroup: Group = {
      id: generateId(props.groups),
      name: groupName,
      tasks: [],
    };

    const newGroups: Group[] = [...props.groups, newGroup];

    props.updateGroups(newGroups);
  };

  const deleteGroup = (id: number): void => {
    const remainingItems: Group[] = props.groups.filter((item: Group) => item.id !== id);
    props.updateGroups(remainingItems);
  };

  const updateGroupsAfterDragEnd = (event: DragEndEvent): void => {
    const newGroups: Group[] = dragAndDropHelper.getNewItemsAfterDragEnd(event) as Group[];
    props.updateGroups(newGroups);
  }

  return (
    <div>
      <ItemInput addItem={addGroup} label={'Add Group'} />
      <List className={getGroupsListClass()}>
        <DndContext 
          onDragEnd={updateGroupsAfterDragEnd}
          modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        >
          <SortableContext items={props.groups}>
            {props.groups.map((group: Group) => {
              return (
                <GroupItem
                  key={group.id}
                  group={group}
                  deleteGroup={deleteGroup}
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