import './Taskboard.css';
import { useContext, useState } from 'react';
import { Task } from '../../interfaces/task';
import { useParams } from 'react-router';
import { Group } from '../../interfaces/group';
import ItemEditor from '../../components/item-editor/ItemEditor';
import TaskList from '../../components/task-list/TaskList';
import { GroupsContext, GroupsDispatchContext } from '../../services/Context';
import { DispatchEditTaskText, GroupsReducerActionType } from '../../services/Reducer';

function Taskboard() {
  const getCurrentGroup = (): Group => {
    const currentGroup: Group | undefined = groups.find((group: Group) => group.id === parseInt(groupId!));
    return currentGroup!;
  };

  const editTask = (id: number) => {
    setEditedTaskId(id);
    setIsEditing(true);
  };

  const confirmEdit = (newText: string): void => {
    const taskToEdit: Task = tasks.find((item: Task) => item.id === editedTaskId)!;

    groupsDispatch({
      type: GroupsReducerActionType.EditTaskText,
      taskId: taskToEdit.id,
      groupId: parseInt(groupId!),
      newText,
    } as DispatchEditTaskText);

    setIsEditing(false);
  };

  const { groupId } = useParams();
  const groups = useContext(GroupsContext);
  const groupsDispatch = useContext(GroupsDispatchContext);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTaskId, setEditedTaskId] = useState<number>(0);

  const tasks = getCurrentGroup().tasks;

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
            />
      }
    </div>
  );
}

export default Taskboard;
