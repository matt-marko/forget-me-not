import { useState } from 'react';
import List from '@mui/material/List';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers';
import React from 'react';
import { Group } from '../interfaces/group';
import GroupItem from '../components/group-item/GroupItem';
import ItemInput from '../components/item-input/ItemInput';
import ItemEditor from '../components/item-editor/ItemEditor';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

const mainContentStyle: React.CSSProperties = {
  margin: '0 auto',
  textAlign: 'center',
};

function Dashboard() {
  const [groups, setGroups] = useState(JSON.parse(localStorage.getItem('groups') ?? '[]'));
  const [isEditing, setIsEditing] = useState(false);
  const [editedGroupId, setEditedGroupId] = useState(0);

  const generateId = (): number => {
    let existDuplicate = false;

    for (let i = 1; i < groups.length + 1; i++) {
      for (let j = 0; j < groups.length; j++) {
        if (groups[j].id === i) {
          existDuplicate = true;
        }
      }

      if (!existDuplicate) {
        return i;
      } 

      existDuplicate = false;
    }

    return groups.length + 1;
  }

  const getGroupsListStyle = (): React.CSSProperties => {
    const style: React.CSSProperties = {
      display: 'inline-flex',
      flexDirection: 'column',
      backgroundColor: 'lightcyan',
      borderRadius: '10px',
      maxHeight: '70vh',
      overflow: 'auto',
    };

    if (groups.length) {
      style.paddingLeft = '20px';
      style.paddingRight = '20px';
    }

    return style;
  };

  const addGroup = (groupName: string): void => {
    if (!groupName) {
      return;
    }

    const newGroup: Group = {
      id: generateId(),
      name: groupName,
      tasks: [],
    };

    const newGroups: Group[] = [...groups, newGroup];

    updateGroups(newGroups);
  };

  const deleteGroup = (id: number): void => {
    const remainingItems: Group[] = groups.filter((item: Group) => item.id !== id);
    updateGroups(remainingItems);
  };

  const editTask = (id: number) => {
    setEditedGroupId(id);
    setIsEditing(true);
  };

  const confirmEdit = (newName: string): void => {
    const groupToEdit: Group | undefined = groups.find((item: Group) => item.id === editedGroupId);

    if (groupToEdit) {
      groupToEdit.name = newName;

      const newGroups: Group[] = [...groups];
      updateGroups(newGroups);
    }

    setIsEditing(false);
  }

  const updateGroups = (newGroups: Group[]): void => {
    localStorage.setItem('groups', JSON.stringify(newGroups));
    setGroups(newGroups);
  }

  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event; 

    const oldIndex = groups.findIndex((item: Group) => item.id === active.id);
    const newIndex = groups.findIndex((item: Group) => item.id === over?.id);

    const newGroups: Group[] = arrayMove(groups, oldIndex, newIndex);

    updateGroups(newGroups);
  };

  return (
    <div>
      <Header description=''></Header>
      <div style={mainContentStyle}>
        {
          isEditing ?
            <ItemEditor
              label="Edit Group"
              text={groups.find((group: Group) => group.id === editedGroupId).name} 
              confirmEdit={confirmEdit}
            />
          :
            <div>
              <ItemInput addItem={addGroup} label={'Add Group'} />
              <List style={getGroupsListStyle()}>
                <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis, restrictToParentElement]}>
                  <SortableContext items={groups}>
                    {groups.map((group: Group) => {
                      return (
                        <GroupItem
                          key={group.id}
                          group={group}
                          completeTask={deleteGroup}
                          deleteTask={deleteGroup}
                          editTask={editTask}
                        />
                      );
                    })}
                  </SortableContext>
                </DndContext>
              </List>
            </div>
        }
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Dashboard;
