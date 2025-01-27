import './Taskboard.css';
import { useState } from 'react';
import { Task } from '../../interfaces/task';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import { useParams } from 'react-router';
import { Group } from '../../interfaces/group';
import ItemEditor from '../../components/item-editor/ItemEditor';
import TaskList from '../../components/task-list/TaskList';
import GroupDrawer from '../../components/group-drawer/GroupDrawer';

function Taskboard() {
  const groups: Group[] = JSON.parse(localStorage.getItem('groups') ?? '[]');
  
  const getCurrentGroup = (): Group => {
    const currentGroup: Group | undefined = groups.find((group: Group) => group.id === parseInt(groupId!));
    return currentGroup!;
  };

  const { groupId } = useParams();
  const [tasks, setTasks] = useState(getCurrentGroup().tasks);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskId, setEditedTaskId] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const editTask = (id: number) => {
    setEditedTaskId(id);
    setIsEditing(true);
  };

  const confirmEdit = (newText: string): void => {
    const taskToEdit: Task | undefined = tasks.find((item: Task) => item.id === editedTaskId);

    if (taskToEdit) {
      taskToEdit.text = newText;

      const newTasks: Task[] = [...tasks];
      updateTasks(newTasks);
    }

    setIsEditing(false);
  };

  const updateTasks = (newTasks: Task[]): void => {
    const currentGroup = getCurrentGroup();
    currentGroup.tasks = newTasks;
    localStorage.setItem('groups', JSON.stringify(groups));
    setTasks(newTasks);
  };

  return (
    <>
      <Header description={getCurrentGroup().name} handleMenuIconClick={() => setIsDrawerOpen(true)} />
      <div className='main-content'>
      <GroupDrawer
        isOpen={isDrawerOpen} 
        groups={groups}
        handleCloseDrawerClick={() => setIsDrawerOpen(false)}
      />
        {
          isEditing
            ?
              <ItemEditor 
                label="Add Task"
                text={tasks.find((task: Task) => task.id === editedTaskId)!.text}
                confirmEdit={confirmEdit}
              /> 
            :
              <TaskList 
                groupId={parseInt(groupId!)}
                tasks={tasks}
                editTask={editTask}
                updateTasks={updateTasks}
              />
        }
      </div>
      <Footer />
    </>
  );
}

export default Taskboard;
