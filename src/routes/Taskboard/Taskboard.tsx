import './Taskboard.css';
import { useState } from 'react';
import { Task } from '../../interfaces/task';
import { useParams } from 'react-router';
import { Group } from '../../interfaces/group';
import ItemEditor from '../../components/item-editor/ItemEditor';
import TaskList from '../../components/task-list/TaskList';

type TaskboardProps = {
  updateGroups: Function;
  groups: Group[];
}

function Taskboard(props: TaskboardProps) {
  const getCurrentGroup = (): Group => {
    const currentGroup: Group | undefined = props.groups.find((group: Group) => group.id === parseInt(groupId!));
    return currentGroup!;
  };

  const { groupId } = useParams();
  const [tasks, setTasks] = useState(getCurrentGroup().tasks);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskId, setEditedTaskId] = useState(0);

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

    const newGroups = props.groups.map((group: Group) => {
      if (group.id === currentGroup.id) {
        return currentGroup;
      } else {
        return group;
      }
    })

    setTasks(newTasks);
    props.updateGroups(newGroups);
  };

  return (
    <div className='main-content'>
      {
        isEditing
          ?
            <ItemEditor 
              label='Add Task'
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
  );
}

export default Taskboard;
